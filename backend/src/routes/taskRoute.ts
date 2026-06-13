import { Router } from "express"
import container from "@/container/index.js"
import TaskController from "@/controllers/taskController.js"
import { authMiddleware } from "@/middlewares/authMiddleware.js"

const router = Router()

const taskController = container.resolve<TaskController>("taskController")

router.get("/", authMiddleware(), taskController.getUserTasks.bind(taskController))
router.get("/:id", authMiddleware(), taskController.getTaskById.bind(taskController))
router.post("/", authMiddleware(), taskController.createTask.bind(taskController))
router.put("/:id", authMiddleware(), taskController.updateTask.bind(taskController))
router.patch("/:id/complete", authMiddleware(), taskController.completeTask.bind(taskController))
router.delete("/:id", authMiddleware(), taskController.deleteTask.bind(taskController))

export default router