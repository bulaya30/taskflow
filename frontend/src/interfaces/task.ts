
export type Priority = 'HIGH' | 'MEDIUM' | 'LOW'


export interface Task {
    id: string,
    title: string,
    description?: string,
    completed: boolean,
    dueDate? : string | null,
    priority: Priority, 
    daysLeft?: number | null,
    isOverdue?: boolean,
    isDueToday?: boolean,    
    isDueSoon?: boolean,
}

export interface TaskInputs {
    title: string,
    description?: string,
    dueDate?: string | null,
    priority: Priority
}