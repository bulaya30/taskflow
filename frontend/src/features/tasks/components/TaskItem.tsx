import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import type { Task } from '@/interfaces/task'
import { priorityStyles } from '@/features/constants/Task'

import { formattedDate } from '@/lib/utils'

type itemProps = {
  task: Task
}

export default function TaskItem({ task }: itemProps) {
  const { title, dueDate, daysLeft, priority } = task
  const remainingDays = daysLeft


  return (
    <article aria-label={`Task: ${title}`}>
      <Card className="
        border border-transparent hover:border-muted hover:bg-muted/30
        shadow-sm hover:shadow-md transition duration-300 rounded-md   
      ">
        <CardHeader>        
          <CardTitle className='
            flex justify-between items-center gap-3
            font-semibold text-base
          '>
            <span>{title}</span>
            <p aria-label={`Priority ${priority}`} className={priorityStyles[priority]}>{priority}</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground ">
            {dueDate ? (
              <>
                Due: {" "}
                <time dateTime={dueDate}>{formattedDate(dueDate)}</time>
              </>
            ) : (
              <span>No deadline</span>
            )}
          </p>

          {dueDate && remainingDays != null ? (
            <p
              className={`text-sm font-medium ${
                remainingDays < 0 ? "text-red-500" : ""
              }`}
            >
              {remainingDays === 0
                ? "🔥 Due Today"
                : remainingDays < 0
                ? `Overdue by ${Math.abs(remainingDays)} ${
                    Math.abs(remainingDays) === 1 ? "day" : "days"
                  }`
                : `${remainingDays} ${
                    remainingDays === 1 ? "Day" : "Days"
                  } left`}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">No deadline</p>
          )}
        </CardContent>
      </Card>
    </article>
  )
}
