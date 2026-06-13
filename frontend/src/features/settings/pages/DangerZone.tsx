import { Button } from "@/components/ui/button"
import { Trash2, CheckCircle, RefreshCcw, Loader2 } from "lucide-react"
import { useDeleteUser } from "@/hooks/user/useDeleteUser"
import { useGetTasks } from "@/hooks/task/useGetTasks"
import { useDeleteTask } from "@/hooks/task/useDeleteTask"
import { useState } from "react"

type ActionItem = {
  label: string
  description: string
  icon: React.ElementType
  variant?: "destructive" | "default"
  onClick: () => void
}

type LoadingState =
  | "delete account"
  | "clear completed task"
  | "reset tasks"
  | null;

export default function DangerZone() {
  const { data: tasks = [], isLoading: tasksLoading, isError: taskError } = useGetTasks()
  
  const deleteTaskMutate = useDeleteTask()
  const deleteUserMutate = useDeleteUser()

  const completedTasks = tasks.filter((task) => task.completed);

  const [loadingState, setLoadingState] = useState<LoadingState>(null);

  const actions: ActionItem[] = [
    {
      label: "Delete Account",
      description: "Permanently remove your account and all data",
      icon: Trash2,
      variant: "destructive",
      onClick: () => handleAccountDeletion(),
    },
    {
      label: "Clear Completed Tasks",
      description: "Remove all tasks marked as completed",
      icon: CheckCircle,
      variant: "destructive",
      onClick: () => handleClearCompletedTasks(),
    },
    {
      label: "Reset All Tasks",
      description: "Delete all tasks and start fresh",
      icon: RefreshCcw,
      variant: "destructive",
      onClick: () => handleResetTasks(),
    },
  ]

  const handleAccountDeletion = () => {
    setLoadingState("delete account");
    deleteUserMutate.mutate()
  }

  const handleClearCompletedTasks = () => {
    if (completedTasks.length === 0) return;

    setLoadingState("clear completed task");

    const promises = completedTasks.map(
      (task) =>
        new Promise<void>((resolve) => {
          deleteTaskMutate.mutate(task.id, {
            onSettled: () => resolve(),
          });
        })
    );

    Promise.all(promises).finally(() => {
      setLoadingState(null);
    });
  };
    const handleResetTasks = () => {
    if (tasks.length === 0) return;

    setLoadingState("reset tasks");

    const promises = tasks.map(
      (task) =>
        new Promise<void>((resolve) => {
          deleteTaskMutate.mutate(task.id, {
            onSettled: () => resolve(),
          });
        })
    );

    Promise.all(promises).finally(() => {
      setLoadingState(null);
    });
  };

  if(tasksLoading) return <p>Loading...</p>
    if(taskError) return <p>Error</p>

  return (
    <section aria-labelledby="danger-zone-title" className="p-4 rounded text-red-600 space-y-4">
      <header>
        <h2 id="danger-zone-title" className="text-lg font-bold text-red-600">
          Danger Zone
        </h2>
        <p className="text-sm ">
          Irreversible actions. Proceed with caution.
        </p>
      </header>

      <ul className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon

          return (
            <li key={action.label}>
              <div className="flex items-center justify-between p-4 border border-red-600 rounded-md hover:bg-muted/30 transition">
                <div className="flex items-start gap-3">
                  <Icon className="w-5 h-5 text-red-500 mt-1" />
                  <div>
                    <p className="font-medium">{action.label}</p>
                    <p className="text-sm">
                      {action.description}
                    </p>
                  </div>
                </div>

                <Button
                  size="sm"
                  className="shrink-0 cursor-pointer"
                  variant={action.variant === "destructive" ? "destructive" : "outline"}
                  onClick={action.onClick}
                >
                  {loadingState === action.label.toLowerCase() ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Execute"
                  )}
                </Button>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}