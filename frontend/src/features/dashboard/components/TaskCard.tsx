import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Task } from "@/interfaces/task"
import { priorityStyles } from "@/features/constants/Task"

import { Pencil, Trash2, Check, RotateCcw, Loader2 } from "lucide-react"

type TaskProps = {
  task: Task
  showDetails?: boolean
  onEdit?: () => void
  onDelete?: () => void
  onToggleComplete?: () => void

  isCompleting?: boolean
  isDeleting?: boolean
}

export default function TaskCard({
  task,
  showDetails = false,
  onEdit,
  onDelete,
  onToggleComplete,
  isCompleting = false,
  isDeleting = false
}: TaskProps) {
  const { title, dueDate, priority, description, completed, daysLeft } = task


  return (
    <article aria-label={`Task: ${title}`}>
      <Card
        className={`
          shadow-sm hover:shadow-md transition duration-300 space-y-1 
          hover:bg-black/30 bg-white/10 backdrop-blur-xl shadow-2xl
          border border-transparent hover:border-black/200 rounded-md
          text-white ${completed ? "opacity-70" : ""}
        `}
      >
        <CardHeader>
          <CardTitle className="flex justify-between items-center gap-3 text-base font-semibold">
            <span className={completed ? "line-through text-muted-foreground" : ""}>
              {title}
            </span>

            <div className="flex items-center gap-2">
              <Badge className={`${priorityStyles[priority]} py-2`}>
                {priority}
              </Badge>

              {onToggleComplete && (
                <Button
                  onClick={onToggleComplete}
                  size="sm"
                  variant="ghost"
                  className={`
                    w-8 h-8 p-0 text-white cursor-pointer
                    ${completed
                      ? "bg-amber-500 hover:bg-amber-600"
                      : "bg-green-500 hover:bg-green-600"}
                    }
                    hover:text-white
                  `}
                  aria-label={completed ? "Mark as pending" : "Mark as complete"}
                  disabled={isCompleting}
                >
                  {isCompleting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : completed ? (
                  <RotateCcw />
                ) : (
                  <Check />
                )}
                </Button>
              )}

              {onEdit && (
                <Button
                  onClick={onEdit}
                  size="sm"
                  variant="ghost"
                  className={`w-8 h-8 p-0 bg-blue-500 hover:bg-blue-700 
                    text-white hover:text-white
                    ${completed ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
                  `}
                  aria-label="Edit task"
                  disabled={completed}
                >
                  <Pencil />
                </Button>
              )}

              {onDelete && (
                <Button
                  onClick={onDelete}
                  size="sm"
                  variant="ghost"
                  className="w-8 h-8 p-0 bg-red-500 hover:bg-red-700 text-white cursor-pointer hover:text-white"
                  aria-label="Delete task"
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 />
                  )}
                </Button>
              )}
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent>
          {showDetails && description && (
            <p className="text-sm text-white/600 line-clamp-2 mb-2">
              {description}
            </p>
          )}

          <p className="text-sm text-white/50">
            Due: <time dateTime={dueDate}>{dueDate}</time>
          </p>

          <p className="text-sm font-medium">
            {daysLeft! > 0
              ? `${daysLeft} day${daysLeft === 1 ? "" : "s"} left`
              : daysLeft === 0
              ? "Due today"
              : `${Math.abs(daysLeft!)} day(s) overdue`}
          </p>
        </CardContent>
      </Card>
    </article>
  )
}