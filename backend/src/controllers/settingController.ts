import { Request, Response } from "express";
import SettingService from "@/services/settings/settingService.js"
import { Setting } from "@/interfaces/setting.js";

export default class SettingController {
  constructor(private settingService: SettingService) {}

  async createSetting(req: Request, res: Response) {
    try {
      const userId = req.user!.id

      const setting: Setting = req.body

      const result = await this.settingService.createSetting(userId, setting)

      return res.status(201).json({
        ...result,
        success: true
      })
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message
      })
    }
  }

  async getUserSettings(req: Request, res: Response) {
    try {
      const userId = req.user!.id

      const settings = await this.settingService.getUserSettings(userId)
      console.log(settings)
      return res.status(200).json(settings)
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message
      })
    }
  }

  async getSettingsById(req: Request, res: Response) {
    try {
      const userId = req.user!.id
      const id = req.params.id

      if (!id || Array.isArray(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid setting id"
        })
      }

      const setting = await this.settingService.getSettingsById(userId, id)

      return res.status(200).json(setting)
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message
      })
    }
  }

  async updateSetting(req: Request, res: Response) {
    try {
      const userId = req.user!.id
      const id = req.params.id
      const data = req.body

      if (!id || Array.isArray(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid setting id"
        })
      }

      await this.settingService.updateSetting(userId, id, data)

      return res.status(200).json({
        success: true,
        message: "Setting updated"
      })
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message
      })
    }
  }

  async deleteSetting(req: Request, res: Response) {
    try {
      const userId = req.user!.id
      const id = req.params.id

      if (!id || Array.isArray(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid setting id"
        })
      }

      await this.settingService.deleteSetting(userId, id)

      return res.status(200).json({
        success: true,
        message: "Setting deleted"
      })
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message
      })
    }
  }
}