import { Request, Response } from "express"
import UserService from "@/services/users/userService.js"
import SettingService from "@/services/settings/settingService.js"
import TaskService from "@/services/tasks/taskService.js"
import NotificationService from "@/services/notifications/notificationService.js"


export default class UserController {
  
  constructor(
    private userService: UserService,
    private settingService: SettingService,
    private taskService: TaskService,
    private notificationService: NotificationService
  ) {}

  async createUser(req: Request, res: Response) {
    try {
      const user = req.body

      const result = await this.userService.createUser(user)

      return res.status(201).json({
        ...result,
        success: true,
      })
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        message: err.message
      })
    }
  }

  async registerUser(req: Request, res: Response) {
    try {
      const result = await this.userService.createUser(req.body)

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

  async loginUser(req: Request, res: Response) {
    try {
      const result = await this.userService.login(req.body)

      return res.status(200).json({
        ...result,
        success: true
      })
    } catch (err: any) {
        return res.status(400).json({
          success: false,
          message: err.message
      })
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const userId = req.user!.id

      const user = await this.userService.getUserById(userId)

      return res.status(200).json(user)
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        message: err.message
      })
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const userId = req.user!.id
      const data = req.body

      await this.userService.updateUser(userId, data)

      return res.status(200).json({
        success: true,
        message: "User updated"
      })
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        message: err.message
      })
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const userId = req.user!.id

      await this.notificationService.deleteAllNotification(userId)
      await this.settingService.deleteAllSettings(userId)
      await this.taskService.resetAllTasks(userId)

      await this.userService.deleteUser(userId)

      return res.status(200).json({
        success: true,
        message: "User deleted"
      })
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        message: err.message  
      })
    }
  }

}
