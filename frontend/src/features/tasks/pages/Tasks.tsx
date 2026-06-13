import { useState } from 'react'
import TaskCard from '@/features/dashboard/components/TaskCard'
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
                id: editingTask.id,
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
        setLoadingState({ id: task.id, action: "complete" })
        if(!task.completed) {
            completeMutation.mutate(task.id, {
                onSettled: () => setLoadingState(null),
            })
        } else {
            updateMutation.mutate(
            {
                id: task.id,
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

    if(isLoadingTasks) return <p>Loading...</p>
    if(isErrorTasks) return <p>Error</p>
    
    return ( 
      <section 
        aria-labelledby='task-heading'
        className='space-y-6 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white'
      >
        <header>
          <h2 id='task-heading' className='text-2xl font-bold tracking-tight mb-2'>Tasks</h2>
          <p className='text-sm text-muted-foreground'>Manage, organize and track your work.</p>
        </header>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <motion.nav layout aria-label='Task filters' className="flex items-center gap-2">
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
                      `}
                  >
                      {isActive && (
                      <motion.span
                          layoutId="activeFilter"
                          className="absolute inset-0 rounded-full bg-black"
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
              className="px-3 py-2 text-sm bg-black text-white rounded-md cursor-pointer"
          >
              + New Task
          </button>
        </div>

        <div>
          {filteredTasks.length === 0 ? (
              <div className="text-center py-12">
                  <h3 className="font-semibold">No tasks found</h3>
                  <p className="text-muted-foreground">
                      Try changing your filters or create a new task.
                  </p>
              </div>
              ) : (
                  <div className='space-y-6'>
                      {filteredTasks.map((task) => (
                        
                        <TaskCard
                            key={task.id}
                            task={task}
                            showDetails
                            onEdit={() => {
                                setEditingTask(task)
                                setIsOpen(true)
                            }}
                            onDelete={() => handleDelete(task.id)}
                            onToggleComplete={() => handleToggleComplete(task)}
                            isCompleting={
                                loadingState?.id === task.id &&
                                loadingState.action === "complete"
                            }
                            isDeleting={
                                loadingState?.id === task.id &&
                                loadingState.action === "delete"
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

