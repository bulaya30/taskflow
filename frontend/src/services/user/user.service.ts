import axios from "axios";
import instance, { AxiosError, convertToArray } from "@/api/axiosInstance";
import type { RegisterUserInput, User } from "@/interfaces/user";

const handleError = (
  error: unknown,
  fallbackMessage: string
): never => {
  if (axios.isAxiosError(error)) {
    throw AxiosError(error, fallbackMessage);
  }

  throw new Error("Unexpected error occurred");
};

export const UserServices = {
  register: async (data: Partial<RegisterUserInput>) => {
    const res = await instance.post("/auth/register", data);
    return res.data;
  },

  getUser: async () : Promise<User> => {
    const res = await instance.get(`/users/me`);
    return convertToArray(res.data) as User;
  },
  updateUser: async (data : Partial<User>) => {
    try {
      const res = await instance.put(`/users`, data);
      return convertToArray<User>(res.data);
    } catch (error) {
       handleError(error, "Failed to fetch Users");
    }
  },
  deleteUser: async () => {
    try {
      const res = await instance.delete(`/users`);
        return res.data;
      } catch (error) {
        handleError(error, "Failed to fetch Users");
    }
  }
};