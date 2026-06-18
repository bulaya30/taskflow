import db from "@/config/db.js";

import type { Task } from "@/interfaces/task.js";

const COLLECTION = "tasks";

export default class TaskRepository {
    async findAll(field?: string, value?: string): Promise<Task[]> {
        return await db.get(COLLECTION, field, value) as Task[]
    }

    async findById(id:string): Promise<Task | null> {
        return await db.get(COLLECTION, 'id', id) as Task | null
    }

    async findByUser(uid: string): Promise<Task[]> {
        return await db.get(COLLECTION, 'userId', uid) as Task[] ?? []
    }

    async create(data: Task): Promise<Task> {
        return await db.add(COLLECTION, data) as Task
    }

    async update(id: string, data: Partial<Task>): Promise<boolean> {
        return await db.update(COLLECTION, id, data)
    }

    async delete(id:string):Promise<boolean> {
        return await db.remove(COLLECTION, id)
    }

    async reset(userId: string): Promise<boolean> {
        const tasks = await this.findByUser(userId);
        await Promise.all(
            tasks
            .filter(task => task.id)
            .map(task => db.remove(COLLECTION, task.id!))
        )
        return true
    }
}
