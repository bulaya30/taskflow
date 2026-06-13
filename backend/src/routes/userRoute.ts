import { Router } from "express"
import container from "../container/index.js"
import UserController from "../controllers/userController.js"

import { authMiddleware } from "../middlewares/authMiddleware.js"

const router = Router()

const userController = container.resolve<UserController>("userController")

router.post("/register", userController.registerUser.bind(userController))
router.post("/login", userController.loginUser.bind(userController))
router.get("/me", authMiddleware(), userController.getUserById.bind(userController))
router.put("/", authMiddleware(), userController.updateUser.bind(userController))
router.delete("/", authMiddleware(), userController.deleteUser.bind(userController))

export default router