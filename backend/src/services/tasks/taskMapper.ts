import type { Task } from "@/interfaces/task.js";
import {
    getDaysLeft,
    isOverdue,
    isDueSoon,
    isDueToday,
} from "@/lib/dates/taskDates.js";

export function enrichTask(task: Task): Task {

    return {
        ...task,
        daysLeft: getDaysLeft(task.dueDate),
        isOverdue: isOverdue(task.dueDate),
        isDueToday: isDueToday(task.dueDate),
        isDueSoon: isDueSoon(task.dueDate, 3),
    };

}