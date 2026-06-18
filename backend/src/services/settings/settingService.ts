import { Setting } from "@/interfaces/setting.js";
import SettingsRepository from "@/repositories/settingsRepository.js";

type CreateSettingInput = Omit<Setting, "id" | "uid">

export default class SettingService {

  constructor (private settingsRepository: SettingsRepository) {}

  private verifySettingOwnership = async (
    uid: string,
    taskId: string
  ): Promise<Setting> => {
  
    const setting = await this.settingsRepository.findById(taskId)
  
    if (!setting) {
      throw new Error("Setting not found")
    }
  
    if (setting.uid !== uid) {
      throw new Error("Unauthorized")
    }
  
    return setting
  }

  async getUserSettings(uid: string) : Promise<Setting> {
    if(!uid) throw new Error('User id required')
    return await this.settingsRepository.findByUser(uid) as Setting
  }

  async getSettingsById(uid: string, id: string): Promise<Setting> {
    if(!uid) throw new Error('User id required')
    return await this.verifySettingOwnership(uid, id)
  }

  async createSetting(uid: string, data: CreateSettingInput): Promise<Setting> {
    if(!uid) {
        throw new Error("User id is required")
    }
   
    const settingWithUserId = {...data, uid, active: true}
    return await this.settingsRepository.create(settingWithUserId)
  }

  async updateSetting(uid:string, id: string, data: Partial<Setting>): Promise<boolean> {
     if (Object.keys(data).length === 0) {
        throw new Error("No update data provided")
    }
    this.verifySettingOwnership(uid, id);
    return await this.settingsRepository.update(id, data);
  }

  async deleteSetting(uid:string, id:string): Promise<boolean> {
    if(!uid) {
        throw new Error("User id is required")
    }
    if (!id) {
        throw new Error("Setting id is required")
    }
    this.verifySettingOwnership(uid, id)
    return await this.settingsRepository.delete(id)
  }

  async deleteAllSettings(uid:string): Promise<boolean> {
    if(!uid) {
        throw new Error("User id is required")
    }
    return await this.settingsRepository.reset(uid)
  }

  async resetSetting(uid:string): Promise<boolean> {
    if(!uid) {
      throw new Error("User id is required")
    }
    return await this.settingsRepository.reset(uid)
  }

}

