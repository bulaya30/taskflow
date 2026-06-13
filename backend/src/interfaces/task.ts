
export type Priority = "HIGH" | "MEDIUM" | "LOW"

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
    createdAt?: string | object,
    updatedAt?: string | object
    daysLeft?: number,
    isOverdue?: boolean,
    isDueToday?: boolean,    
    isDueSoon?: boolean,
}