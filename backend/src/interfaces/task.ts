
export type Priority = "HIGH" | "MEDIUM" | "LOW"
export type FirestoreDate =
  | string
  | {
      _seconds: number;
      _nanoseconds: number;
    };

export interface Task {
    id?: string,
    userId?: string,
    title: string,
    description?: string,
    completed: boolean,
    dueDate : string,
    priority: Priority,
    date?: string,
    active?: boolean,
    createdAt?: FirestoreDate
    updatedAt?: FirestoreDate
    daysLeft?: number | null,
    isOverdue?: boolean,
    isDueToday?: boolean,    
    isDueSoon?: boolean,
}