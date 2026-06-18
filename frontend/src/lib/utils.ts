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

export const formattedDate = (dueDate: string | null) => {
  
  return dueDate ? new Date(dueDate).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  : null;
}

export const filterTasks = (
  tasks: Task[],
  search: string,
  filter: TaskFilter
) => {
  return tasks.filter((task) => {
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
  });
};

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

export const sortTasksByCompletion = (
  tasks: Task[]
) => {
  return [...tasks].sort((a, b) => {
    if (a.completed === b.completed) return 0;

    return a.completed ? 1 : -1;
  });
};

export const sortTasksByPriority = (tasks: Task[]) => {
  return [...tasks].sort(
    (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
  );
};
export const sortTasksByCreatedDate = (tasks: Task[]) => {
  return [...tasks].sort(
    (a, b) =>
      firestoreToDate(b.createdAt) -
      firestoreToDate(a.createdAt)
  );
};

export const sortTasksByDueDate = (tasks: Task[]) => {
  return [...tasks].sort((a, b) => {
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;

    return getRemainingDays(a.dueDate) - getRemainingDays(b.dueDate);
  });
};
export const sortPendingTasks = (tasks: Task[]) => {
  const byPriority = sortTasksByPriority(tasks);

  const withDueDate = byPriority.filter(
    (task) => !!task.dueDate
  );

  const withoutDueDate = byPriority.filter(
    (task) => !task.dueDate
  );

  return [
    ...sortTasksByDueDate(withDueDate),
    ...sortTasksByCreatedDate(withoutDueDate),
  ];
};

export const getFilteredTasks = (
  tasks: Task[],
  search: string,
  filter: TaskFilter
) => {
  const filtered = filterTasks(tasks, search, filter);

  if (filter === "pending") {
    return sortPendingTasks(filtered);
  }

  if (filter === "completed") {
    return sortTasksByCreatedDate(filtered);
  }

  const pending = sortPendingTasks(
    filtered.filter((task) => !task.completed)
  );

  const completed = sortTasksByCreatedDate(
    filtered.filter((task) => task.completed)
  );

  return [...pending, ...completed];
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