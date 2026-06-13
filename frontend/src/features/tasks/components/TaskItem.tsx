import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import type { Task } from '@/interfaces/task'
import { priorityStyles } from '@/features/constants/Task'
export default function TaskItem({title, dueDate, daysLeft, priority}: Task) {
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
            Due: {" "}
            <time dateTime={dueDate}>{dueDate}</time>
          </p>
          <p className="text-sm font-medium">{remainingDays} {remainingDays === 1 ? "Day" : "Days"} left</p>
        </CardContent>
      </Card>
    </article>
  )
}
