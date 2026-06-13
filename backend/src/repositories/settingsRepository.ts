import db from "@/config/db.js";

import type { Setting } from "@/interfaces/setting.js";

const COLLECTION = 'settings'


export default class SettingsRepository {
    async findAll(field?: string, value?: string): Promise<Setting | Setting[] | null> {
        return await db.get(COLLECTION, field, value) as Setting | Setting[] | null
    }

    async findById(id:string): Promise<Setting | null> {
        return await db.get(COLLECTION, 'id', id) as Setting | null
    }

    async findByUser(uid: string): Promise<Setting> {
        return await db.get(COLLECTION, 'userId', uid) as Setting
    }

    async create(data: Setting): Promise<Setting> {
        return await db.add(COLLECTION, data) as Setting
    }

    async createDefaultSettings(uid: string): Promise<Setting> {
    
    return await db.add( COLLECTION, {
        uid,
        email: false,
        theme: "system",
        remind: false,
        dueDataAlert: false,
    }) as Setting;
}

    async update(id: string, data: Partial<Setting>): Promise<boolean> {
        return await db.update(COLLECTION, id, data)
    }

    async delete(id:string):Promise<boolean> {
        return await db.remove(COLLECTION, id)
    }

    async deleteAll(uid: string): Promise<boolean> {
        const settings = await this.findByUser(uid);

        if(!settings) return false;
        
        return await db.remove(COLLECTION, settings.id!)
    }


    async reset(userId: string): Promise<boolean> {

        const settings = await this.findByUser(userId);
        if(!settings) return false;

        await  db.remove(COLLECTION, settings.id!)

        return true;
    }
}

