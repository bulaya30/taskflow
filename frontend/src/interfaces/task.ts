
export type Priority = 'HIGH' | 'MEDIUM' | 'LOW'


export interface Task {
    id: string | number,
    title: string,
    description?: string,
    completed: boolean,
    dueDate : string,
    priority: Priority, 
    daysLeft?: number
}

export interface TaskInputs {
    title: string,
    description?: string,
    dueDate: string,
    priority: Priority
}