import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import webRoutes from "@/routes/web.js"
import container from "@/container/index.js"
import TaskReminder from "@/jobs/taskReminder.js"

dotenv.config()

/* ================= PATH SETUP ================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ================= APP INIT ================= */
const app = express();

/* ================= MIDDLEWARE ================= */
app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        origin === process.env.CORS_ORIGIN
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.text());
app.use(express.json({ type: ["application/json", "text/plain"] }));
app.use(express.urlencoded({ extended: false }));

/* ================= API ================= */
app.use('/api', webRoutes);

/* ================= TASK REMINDER ================= */
const taskReminder = container.resolve<TaskReminder>('taskReminder')
taskReminder.start()

/* ================= STATIC ================= */
app.use(express.static(path.join(__dirname, '../dist')));

// deploying behind Render, Vercel, or NGINX,
app.set("trust proxy", true);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})