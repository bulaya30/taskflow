import db from "@/config/db.js";

import type { Notification } from "@/interfaces/notification.js";

const COLLECTION = 'notifications'


export default class NotificationRepository {
    async findAll(field?: string, value?: string): Promise< Notification[] | null> {
        return await db.get(COLLECTION, field, value) as Notification[] | null
    }

    async findById(id:string): Promise<Notification | null> {
        return await db.get(COLLECTION, 'id', id) as Notification
    }

    async findByTaskId(taskId: string):Promise<Notification[]> {
        return await db.get(COLLECTION, 'taskId', taskId) as Notification[]
    }

    async findByUser(uid: string): Promise<Notification[]> {
        return await db.get(COLLECTION, 'userId', uid) as Notification[]
    }

    async create(data: Notification): Promise<Notification> {
        return await db.add(COLLECTION, data) as Notification
    }

    async update(id: string, data: Partial<Notification>): Promise<boolean> {
        return await db.update(COLLECTION, id, data)
    }

    async delete(id:string):Promise<boolean> {
        return await db.remove(COLLECTION, id)
    }

    async deleteByTask(taskId: string): Promise<boolean> {
        const notifications = await this.findByTaskId(taskId);
        await Promise.all(
            notifications
            .filter(notification => notification.id)
            .map(notification => db.remove(COLLECTION, notification.id!))
        );
        return true
    }
    async deleteAll(uid: string): Promise<boolean> {
        const notifications = await this.findByUser(uid);
        await Promise.all(
            notifications
            .filter(notification => notification.id)
            .map(notification => db.remove(COLLECTION, notification.id!))
        );
        return true
    }

    async reset(userId: string): Promise<boolean> {
        const notifications = await this.findByUser(userId);
        await Promise.all(
            notifications
            .filter(notification => notification.id)
            .map(notification => db.remove(COLLECTION, notification.id!))
        );
        return true
    }
}
