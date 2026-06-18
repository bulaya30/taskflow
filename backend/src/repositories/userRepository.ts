import db, { auth} from "@/config/db.js";

import type { User } from "@/interfaces/user.js";
import { DecodedIdToken, UserRecord } from "firebase-admin/auth";

const COLLECTION = 'users'


export default class UserRepository {
    async findAll(field?: string, value?: string): Promise<User[] | null> {
        return await db.get(COLLECTION, field, value) as User[] | null
    }

    async findById(id:string): Promise<User | null> {
        return await db.get(COLLECTION, 'id', id) as User
    }

    async findByEmail(email: string): Promise<User | null> {
        return await db.get(COLLECTION, 'email', email) as User
    }

    async register(email: string, password: string): Promise<UserRecord> {
        return await auth.createUser({email, password})
    }

    async create(data: Partial<User>, id?: string): Promise<User> {
        return await db.add(COLLECTION, data, id) as User
    }

    async update(id: string, data: Partial<User>): Promise<boolean> {
        return await db.update(COLLECTION, id, data)
    }

    async delete(id:string):Promise<boolean> {
        
        await auth.deleteUser(id)
        return await db.remove(COLLECTION, id)
    }

    async verifyToken(tokenId: string):Promise<DecodedIdToken> {
        return await auth.verifyIdToken(tokenId)
    }
}