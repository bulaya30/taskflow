import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import type { Task } from "@/interfaces/task"
import { priorityStyles } from "@/features/constants/Task"
import { formattedDate } from "@/lib/utils"

import {
  Pencil,
  Trash2,
  Check,
  RotateCcw,
  Loader2
} from "lucide-react"

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
  const {
    title,
    dueDate,
    priority,
    description,
    completed,
    daysLeft
  } = task

  const deadlineText = React.useMemo(() => {
    if (daysLeft == null) return null
    if (daysLeft === 0) return "Due today"
    if (daysLeft < 0)
      return `Overdue by ${Math.abs(daysLeft)} ${
        Math.abs(daysLeft) === 1 ? "day" : "days"
      }`

    return `${daysLeft} ${daysLeft === 1 ? "day" : "days"} left`
  }, [daysLeft])

  const handleToggleLabel = completed
    ? "Mark task as pending"
    : "Mark task as complete"

  return (
    <article
      aria-label={`Task: ${title}`}
      aria-checked={completed}
      className={`rounded-md transition ${
        completed ? "opacity-70" : ""
      }`}
    >
      <Card
        className="
          shadow-sm hover:shadow-md transition duration-300
          bg-white/10 backdrop-blur-xl
          border border-transparent hover:border-black/20
          text-white
        "
      >
        {/* HEADER */}
        <CardHeader>
          <header className="flex items-start justify-between gap-4">
            {/* TITLE SECTION */}
            <div className="flex flex-col gap-1">
              <CardTitle
                className={`text-base font-semibold ${
                  completed ? "line-through text-white/60" : ""
                }`}
              >
                {title}
              </CardTitle>

              <Badge
                className={priorityStyles[priority]}
                aria-label={`Priority: ${priority}`}
              >
                {priority}
              </Badge>
            </div>

            {/* ACTIONS */}
            <nav
              aria-label="Task actions"
              className="flex items-center gap-2"
            >
              {onToggleComplete && (
                <Button
                  type="button"
                  onClick={onToggleComplete}
                  size="sm"
                  variant="ghost"
                  aria-label={handleToggleLabel}
                  disabled={isCompleting}
                  className={`w-8 h-8 p-0 text-white ${
                    completed
                      ? "bg-amber-500 hover:bg-amber-600"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {isCompleting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : completed ? (
                    <RotateCcw className="w-4 h-4" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                </Button>
              )}

              {onEdit && (
                <Button
                  type="button"
                  onClick={onEdit}
                  size="sm"
                  variant="ghost"
                  aria-label="Edit task"
                  disabled={completed}
                  className="w-8 h-8 p-0 bg-blue-500 hover:bg-blue-700 text-white disabled:opacity-50"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
              )}

              {onDelete && (
                <Button
                  type="button"
                  onClick={onDelete}
                  size="sm"
                  variant="ghost"
                  aria-label="Delete task"
                  disabled={isDeleting}
                  className="w-8 h-8 p-0 bg-red-500 hover:bg-red-700 text-white"
                >
                  {isDeleting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </Button>
              )}
            </nav>
          </header>
        </CardHeader>

        {/* CONTENT */}
        <CardContent>
          <section aria-label="Task details" className="space-y-2">
            {showDetails && description && (
              <p className="text-sm text-white/70 line-clamp-2">
                {description}
              </p>
            )}

            <p className="text-sm text-white/60">
              {dueDate ? (
                <>
                  Due:{" "}
                  <time dateTime={dueDate}>
                    {formattedDate(dueDate)}
                  </time>
                </>
              ) : (
                <span>No deadline</span>
              )}
            </p>

            {deadlineText && (
              <p
                className={`text-sm font-medium ${
                  daysLeft !== null && daysLeft! < 0
                    ? "text-red-500"
                    : "text-white/70"
                }`}
              >
                {deadlineText}
              </p>
            )}
          </section>
        </CardContent>
      </Card>
    </article>
  )
}