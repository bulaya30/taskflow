export type FirestoreTimestamp = {
  _seconds: number
  _nanoseconds: number
}

export type FirestoreDate =
  | string
  | Date
  | FirestoreTimestamp

export interface Notification {
  id?: string

  userId: string

  title: string
  message: string

  type: string

  read: boolean

  taskId?: string

  createdAt?: FirestoreDate
}