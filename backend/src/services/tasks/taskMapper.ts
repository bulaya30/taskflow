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
        daysLeft: task.dueDate ? getDaysLeft(task.dueDate) : null,
        isOverdue: task.dueDate ? isOverdue(task.dueDate) : false,
        isDueToday: task.dueDate ? isDueToday(task.dueDate) : false,
        isDueSoon: task.dueDate ? isDueSoon(task.dueDate, 3) : false,
    };

}