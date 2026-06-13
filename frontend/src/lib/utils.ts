import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Task } from "@/interfaces/task"
import type { Notification, FirestoreDate } from "@/interfaces/notification"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function firestoreToDate(
  value?: FirestoreDate
): number {
  if (!value) return 0

  if (value instanceof Date) {
    return value.getTime()
  }

  if (typeof value === "string") {
    return new Date(value).getTime()
  }

  if (
    typeof value === "object" &&
    "_seconds" in value
  ) {
    return value._seconds * 1000
  }

  return 0
}

export const converToArray = <T>(data : T) => !Array.isArray(data) ? [data] : data

export function getRemainingDays(dueDate: string): number {
  const today = new Date();
  const due = new Date(dueDate);

  // Remove time portion to avoid partial-day issues
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  const diffMs = due.getTime() - today.getTime();

  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

type TaskFilter = "all" | "pending" | "completed";

const priorityOrder: Record<Task["priority"], number> = {
  HIGH: 3,
  MEDIUM: 2,
  LOW: 1,
};

export const getFilteredTasks = (
  tasks: Task[],
  search: string,
  filter: TaskFilter
) => {
  return tasks
    .filter((task) => {
      const matchesFilter =
        filter === "all"
          ? true
          : filter === "pending"
          ? !task.completed
          : task.completed;

      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
};

export function getSortedNotification(
  notifications: Notification[]
): Notification[] {
  return [...notifications].sort((a, b) => {
    // unread first
    if (a.read !== b.read) {
      return Number(a.read) - Number(b.read)
    }

    // newest first
    return (
      firestoreToDate(b.createdAt) -
      firestoreToDate(a.createdAt)
    )
  })
}