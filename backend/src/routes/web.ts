import express from "express"

import taskRoutes from "./taskRoute.js"
import userRoutes from "./userRoute.js"
import notificationRoutes from "./notificationRoute.js"
import settingRoutes from "./settingRoute.js"

const router = express.Router()

/* ================= HEALTH CHECK ================= */
router.get("/", (_, res) => {
  res.json({
    message: "TaskFlow API running"
  })
})

/* ================= FEATURE ROUTES ================= */
router.use("/users/tasks", taskRoutes)
router.use("/users", userRoutes)
router.use("/users/auth", userRoutes)
router.use("/users/notifications", notificationRoutes)
router.use("/users/settings", settingRoutes)

/* ================= FALLBACK ================= */
router.use((_, res) => {
  res.status(404).json({ message: "API route not found" })
})

export default router