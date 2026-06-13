export type FirestoreDate = string | Date | object

export type NotificationType =
  | "TASK_CREATED"
  | "TASK_UPDATED"
  | "TASK_COMPLETED"
  | "TASK_DELETED"
  | "TASK_DUE_SOON"
  | "TASK_OVERDUE"
  | "SYSTEM"

export interface Notification {
  id?: string

  userId: string

  title: string
  message: string

  type: NotificationType

  read: boolean
  readAt?: FirestoreDate

  taskId?: string | number
  dedupeKey?: string

  createdAt?: FirestoreDate
  updatedAt?: FirestoreDate
}