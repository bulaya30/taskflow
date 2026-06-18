import "dotenv/config"
import jwt, { SignOptions } from "jsonwebtoken";
import UserRepository from "@/repositories/userRepository.js";
import SettingsRepository from "@/repositories/settingsRepository.js";
import TaskRepository from "@/repositories/taskRepository.js";
import NotificationRepository from "@/repositories/notificationRepository.js";

import type { User, LoginDto, UserInput } from "../../interfaces/user.js"



if (!process.env.JWT_SECRET) {
  throw new Error("Missing JWT_SECRET");
}
const JWT_SECRET = process.env.JWT_SECRET;
const options: SignOptions = {
  expiresIn: "1d",
};

export type AuthResponse = {
  user: User;
  token: string;
};

export default class UserService {

  constructor(
    private userRepository: UserRepository,
    private settingsRepository: SettingsRepository,
    private taskRepository: TaskRepository,
    private notificationRepository: NotificationRepository
  ){}

  private async checkUser(uid: string): Promise<User> {

    if(!uid) throw new Error("User id required")

    const user = await this.userRepository.findById(uid)

    if(!user || Array.isArray(user)) {
      throw new Error("No user found")
    }

    return user
  }

  async getUsers(): Promise<User | User[]> {
    return await this.userRepository.findAll() as User | User[]
  }

  async getUserById(id: string): Promise<User> {

    return await this.checkUser(id)
  }

  async createUser(data: UserInput): Promise<AuthResponse> {
    if (Object.keys(data).length === 0) {
      throw new Error("No data provided");
    }

    const { name, email, password } = data;

    if (!email || !password || !name) {
      throw new Error("Missing required fields");
    }
    
    const existing = await this.userRepository.findByEmail(email);
    
    if (existing) {
      throw new Error("Email already in use");
    }

    try {
      const cred = await this.userRepository.register(
        email,
        password
      );
      const names = name.split(" ") ?? []
      const userData: User = {
        firstName: names[0] ?? "",
        lastName: names[1] ?? "",
        email,
        active: true,
      };
    
      const user = await this.userRepository.create(
        userData,
        cred.uid
      );

      await this.settingsRepository.createDefaultSettings(cred.uid)
   
      const token = jwt.sign(
      {
        id: cred.uid,
        email: user.email,
        theme: 'system'
      },
      JWT_SECRET!,
      options
    );

    return {
      token,
      user,
    };
    } catch (error) {
      throw error;
    }
  }
  async updateUser(id: string, data: Partial<User>): Promise<boolean> {

    if (Object.keys(data).length === 0) {
      throw new Error("No update data provided");
    }

    await this.checkUser(id)

    return await this.userRepository.update(id, data)

  }

  async deleteUser(id: string): Promise<boolean> {

    await this.checkUser(id)
    await this.settingsRepository.reset(id)
    await this.taskRepository.reset(id)
    await this.notificationRepository.reset(id)

    return await this.userRepository.delete(id)
  }

  async login(data: LoginDto): Promise<AuthResponse> {

    const { idToken } = data;

    if (!idToken) {
      throw new Error("Authentication token required");
    }

    try {
    const decoded = await this.userRepository.verifyToken(
      idToken
    );

    const user = await this.userRepository.findById(
      decoded.uid
    );

    if (!user || Array.isArray(user)) {
      throw new Error("User not found");
    }

    if (
      user.active === false 
    ) {
        throw new Error("User account disabled");
      }
      if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured");
      }

      const settings = await this.settingsRepository.findByUser(decoded.uid)

      const token = jwt.sign(
      {
        id: decoded.uid,
        email: user.email,
        theme: settings?.theme ?? null
      },
      JWT_SECRET,
      options
    );

      return {
        token,
        user,
      };
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "Login failed"
      );
    }
  }
}
