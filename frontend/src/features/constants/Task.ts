import type { Priority } from "@/interfaces/task"
export const priorityStyles : Record<Priority, string>= {
    HIGH: "bg-red-100 text-red-700",
    MEDIUM: "bg-yellow-100 text-yellow-700",
    LOW: "bg-green-100 text-green-700",
} as const