
import type { Task } from '@/interfaces/task'
import TaskCard from '../../tasks/components/TaskCard'
type RecentTaskProps = {
    tasks: Task[]
}
export default function RecentTask({tasks}: RecentTaskProps) {
  return (
    <ul className="space-y-3">
        {tasks.map((task, index) => (
          <li key={task.id || index}>
            <TaskCard task={task} showDetails={false}/>

          </li>
        ))}
      </ul>
  )
}
