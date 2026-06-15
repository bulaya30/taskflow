import type { Task } from "@/interfaces/task.js";
import {
    getDaysLeft,
    isOverdue,
    isDueSoon,
    isDueToday,
} from "@/lib/dates/taskDates.js";

export function enrichTask(task: Task): Task {
  const hasDueDate = !!task.dueDate;
  const isPending = !task.completed;

  return {
    ...task,
    daysLeft:
      hasDueDate && isPending ? getDaysLeft(task.dueDate!) : null,
    isOverdue:
      hasDueDate && isPending ? isOverdue(task.dueDate!) : false,
    isDueToday:
      hasDueDate && isPending ? isDueToday(task.dueDate!) : false,
    isDueSoon:
      hasDueDate && isPending ? isDueSoon(task.dueDate!, 3) : false,
  };
}