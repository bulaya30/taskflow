import { useState } from 'react'
import TaskCard from '@/features/tasks/components/TaskCard'
import TaskForm from '@/features/tasks/pages/TaskForm'
import TaskDrawer from '@/features/tasks/pages/TaskDrawer'
import type { Task } from '@/interfaces/task'
import type { TaskFormValues } from '@/lib/schema/TaskSchema'

import { useCreateTask } from '@/hooks/task/useCreateTask'
import { useUpdateTask } from '@/hooks/task/useUpdateTask'
import { useCompleteTask } from '@/hooks/task/useCompleteTask'
import { useDeleteTask } from '@/hooks/task/useDeleteTask'

import { motion } from 'framer-motion'

import { useGetTasks } from '@/hooks/task/useGetTasks'
import { useDashboardStore } from '@/store/dashboardStore'
import { getFilteredTasks } from '@/lib/utils'
import Loader from '@/features/dashboard/components/Loader'


type LoadingState = {
  id: string | number
  action: "delete" | "complete"
} | null

export default function Tasks() {
    const { data: tasks = [], isLoading: isLoadingTasks, isError: isErrorTasks } = useGetTasks();

    const search = useDashboardStore((state) => state.search);
    const filter = useDashboardStore((state) => state.filter);
    const setFilter = useDashboardStore((state) => state.setFilter);
    
    const buttonFilters = ["all", "pending", "completed"] as const
    const [isOpen, setIsOpen] = useState(false)
    const [editingTask, setEditingTask] = useState<Task | null>(null)

    const createMutation = useCreateTask()
    const updateMutation = useUpdateTask()
    const completeMutation = useCompleteTask()
    const deleteMutation = useDeleteTask()

    const [loadingState, setLoadingState] = useState<LoadingState>(null)
    const isLoading = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending

    const filteredTasks = getFilteredTasks(tasks, search, filter);
    

    const handleSubmit = (data: TaskFormValues) => {
        if (editingTask) {
            updateMutation.mutate(
            {
                id: editingTask.id!,
                data,
            },
            {
                onSuccess: () => {
                setIsOpen(false)
                setEditingTask(null)
                },
            }
            )
        } else {
            createMutation.mutate(data, {
            onSuccess: () => {
                setIsOpen(false)
            },
            })
        }
    }

    const handleToggleComplete = (task: Task) => {
        setLoadingState({ id: task.id!, action: "complete" })
        if(!task.completed) {
            completeMutation.mutate(task.id!, {
                onSettled: () => setLoadingState(null),
            })
        } else {
            updateMutation.mutate(
            {
                id: task.id!,
                data: { completed: !task.completed },
            },
            {
                onSettled: () => setLoadingState(null),
            }
            )
        }

    }

    const handleDelete = (id: string | number) => {
        setLoadingState({ id, action: "delete" })

        deleteMutation.mutate(id, {
        onSettled: () => setLoadingState(null),
        })
    }

    if(isLoadingTasks) {<Loader />}
    if(isErrorTasks) return <p>Error</p>
    
    return ( 
      <section
        aria-labelledby="task-heading"
        className="
            w-full
            min-w-0
            space-y-6
        "
    >
        <header className='space-y-1'>
          <h2 id='task-heading' className='text-2xl font-bold tracking-tight mb-2'>Tasks</h2>
          <p className='text-sm text-muted-foreground'>Manage, organize and track your work.</p>
        </header>

        <div
            className="
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:items-center
                sm:justify-between
            "
        >
          <motion.nav 
            layout 
            aria-label='Task filters' 
            className="
                flex
                gap-2
                overflow-x-auto
                scrollbar-hide
                pb-1
            "
          >
            {buttonFilters.map(item => {
              const isActive = filter === item;
              return (
              <button
                  key={item}
                  type='button'
                  aria-pressed={isActive}
                  onClick={()=> setFilter(item)}
                  className={`
                    px-3 py-1 text-sm rounded-full
                    transition-all duration-300
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-black
                    relative isolate
                    cursor-pointer
                  `}
              >
                  {isActive && (
                  <motion.span
                      layoutId="activeFilter"
                      className="absolute inset-0 rounded-full bg-gray-800 font-semibold"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                  />
                    
                  )}
                  <span className={`relative z-10 capitalize
                  ${isActive ? "text-white" : "text-muted-foreground"}`}>
                  {item}
                  </span>
              </button>
              )
            })}

          </motion.nav>
          <button 
            onClick={() => {
                setIsOpen(true)
                setEditingTask(null)
            }}
            className="
              w-full
              sm:w-auto
              px-4
              py-2
              bg-gray-800
              font-semibold
              text-white
              rounded-md
              cursor-pointer
              hover:bg-gray-700
              transition
            "
          >
            + New Task
          </button>
        </div>

        <div>
          {filteredTasks.length === 0 ? (
              <div className="text-center py-10 px-4">
                  <h3 className="font-semibold">No tasks found</h3>
                  <p className="text-muted-foreground">
                      Try changing your filters or create a new task.
                  </p>
              </div>
              ) : (
                  <div
                        className="
                            space-y-4
                            md:space-y-6
                        "
                    >
                      {filteredTasks.map((task) => (
                        
                        <TaskCard
                            key={task.id}
                            task={task}
                            showDetails
                            onEdit={() => {
                                setEditingTask(task)
                                setIsOpen(true)
                            }}
                            onDelete={() => handleDelete(task.id!)}
                            onToggleComplete={() => handleToggleComplete(task)}
                            isCompleting={
                                loadingState?.id === task.id &&
                                loadingState?.action === "complete"
                            }
                            isDeleting={
                                loadingState?.id === task.id &&
                                loadingState?.action === "delete"
                            }
                        />
                      ))}
                  </div>
              )
          }

        </div>

        <TaskDrawer open={isOpen} onClose={() => setIsOpen(false)}>
            <TaskForm
                key={editingTask?.id || "new"}
                task={editingTask ?? undefined}
                onSubmit={handleSubmit}
                isLoading={isLoading}
            />
          </TaskDrawer>

      </section>

    )
}

