import { Router } from "express"
import container from "@/container/index.js"
import SettingController from "@/controllers/settingController.js"

import { authMiddleware } from "@/middlewares/authMiddleware.js"

const router = Router();

const settingController = container.resolve<SettingController>("settingController")

router.get("/", authMiddleware(), settingController.getUserSettings.bind(settingController))
router.get("/:id", authMiddleware(), settingController.getSettingsById.bind(settingController))
router.post("/", authMiddleware(), settingController.createSetting.bind(settingController))
router.put("/:id", authMiddleware(), settingController.updateSetting.bind(settingController))
router.delete("/:id", authMiddleware(), settingController.deleteSetting.bind(settingController))

export default router