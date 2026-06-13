import { Request, Response } from "express"
import NotificationService from "@/services/notifications/notificationService.js"


export default class NotificationController {

  constructor(private notificationService: NotificationService) {}

  async getUserNotifications(req: Request, res: Response) {
    try {
      
      const userId = req.user!.id
  
      const notifications = await this.notificationService.getUserNotification(userId)
      notifications
  
      return res.status(200).json(notifications)

    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message
      })
    }

  }

  async markNotificationAsRead(req: Request, res: Response) {
    try {
      const id = req.params.id

      if (!id || Array.isArray(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid task id"
        })
      }

      await this.notificationService.markNotificationAsRead(id)
      return res.status(200).json({
        success: true,
        message: "Notification marked as read"
      })
    } catch (error: any) {
      
    }
  }

  async deleteNotification(req: Request, res: Response) {
    try {
      const id = req.params.id

      if (!id || Array.isArray(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid task id"
        })
      }

      await this.notificationService.deleteNotification(id)
      return res.status(200).json({
        success: true,
        message: "Notification deleted"
      })
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message
      })
    }
  }
}

