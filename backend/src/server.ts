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
// app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || process.env.CORS_ORIGIN) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true,
  })
)
app.use(express.text());
app.use(express.json());
app.use(express.json({ type: ["application/json", "text/plain"] }));
app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));

/* ================= API ================= */
app.use('/api', webRoutes);

/* ================= TASK REMINDER ================= */
const taskReminder = container.resolve<TaskReminder>('taskReminder')
taskReminder.start()

/* ================= STATIC ================= */
app.use(express.static(path.join(__dirname, '../dist')));

/* ================= SPA FALLBACK ================= */
app.use((req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({ message: 'API route not found' });
  }
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// deploying behind Render, Vercel, or NGINX,
app.set("trust proxy", true);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})