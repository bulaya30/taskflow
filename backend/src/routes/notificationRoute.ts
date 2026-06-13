import { Router } from "express"
import container from "@/container/index.js"
import NotificationController from "@/controllers/notificationController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"

const router = Router()

const notificationController = container.resolve<NotificationController>("notificationController")

router.get("/", authMiddleware(), notificationController.getUserNotifications.bind(notificationController))
router.patch("/read/:id", authMiddleware(), notificationController.markNotificationAsRead.bind(notificationController))
router.delete("/:id", authMiddleware(), notificationController.deleteNotification.bind(notificationController))

export default router