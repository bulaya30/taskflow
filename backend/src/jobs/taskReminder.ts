import cron from "node-cron";

import TaskService from "@/services/tasks/taskService.js";
import SettingService from "@/services/settings/settingService.js";
import NotificationService from "@/services/notifications/notificationService.js";

import {
  isDueSoon,
  isDueToday,
} from "@/lib/dates/taskDates.js";

export default class TaskReminder {

  constructor(
    private taskService: TaskService,
    private settingService: SettingService,
    private notificationService: NotificationService
  ) {}

  start() {

    // cron.schedule("*/10 * * * *", async () => {
    cron.schedule("0 * * * *", async () => {

      const tasks = await this.taskService.getTasks();

      for (const task of tasks) {

        const settings =
          await this.settingService.getUserSettings(
            String(task.userId)
          );

        if (!settings?.remind) continue;

        if (!task.dueDate || task.completed) continue;

        const dedupeBase = `${task.id}`;

        const existing =
          await this.notificationService.getUserNotification(
            String(task.userId)
          ) ?? [];

        // Due today
        if (isDueToday(task.dueDate)) {

          const dedupeKey = `${dedupeBase}-due-today`;

          const alreadySent = existing.some(
            n => n.dedupeKey === dedupeKey
          );

          if (!alreadySent) {

            await this.notificationService.createNotification(
              String(task.userId),
              {
                title: "Task due today",
                message: `"${task.title}" is due today`,
                type: "TASK_DUE_SOON",
                taskId: task.id!,
                dedupeKey,
              }
            );

          }
        }

        // Due soon
        if (isDueSoon(task.dueDate, 3)) {

          const dedupeKey = `${dedupeBase}-due-soon`;

          const alreadySent = existing.some(
            n => n.dedupeKey === dedupeKey
          );

          if (!alreadySent) {

            await this.notificationService.createNotification(
              String(task.userId),
              {
                title: "Task due soon",
                message: `"${task.title}" is due soon`,
                type: "TASK_DUE_SOON",
                taskId: task.id!,
                dedupeKey,
              }
            );

          }
        }

      }

    });

  }

}