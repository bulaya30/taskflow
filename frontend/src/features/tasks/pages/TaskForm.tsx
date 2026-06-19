import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import type { Task } from "@/interfaces/task"

import { taskSchema } from "@/lib/schema/TaskSchema"
import type { TaskFormValues } from "@/lib/schema/TaskSchema"

type TaskFormProps = {
  task? : Task,
  onSubmit: (data: TaskFormValues) => void,
  isLoading?: boolean,
}

const Spinner = () => (
  <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
)

export default function TaskForm({ onSubmit, task, isLoading }: TaskFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "MEDIUM",
      dueDate: "",
    },
  });

  watch(); 

  const isEditing = !!task
  useEffect(() => {
    if (!task) {
      reset({
        title: "",
        description: "",
        priority: "MEDIUM",
        dueDate: "",
      });
      return;
    }

    reset({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate ?? "",
    });
  }, [task, reset]);

  const inputClass = `h-12 bg-white/5 text-white placeholder:text-white/40
                      focus-visible:ring-green-200`

  return (
    <form
      onSubmit={handleSubmit(data => {
        onSubmit({
          ...data,
          dueDate: data.dueDate || null,
        });
      })}
      className="space-y-5"
      aria-label="Task form"
    >

      <header>
        <h1 className="text-lg font-bold">{!isEditing ? "Create Task" : "Edit Task"}</h1>
        <p className="text-sm text-muted-foreground">
          Fill in the details below
        </p>
      </header>

      <div className="space-y-1">
        <Label htmlFor="title"
          className={`text-white/80 ${errors.title ? "text-red-500" : ""}`}
        >Title</Label>
        <Input
          id="title"
          {...register("title")}
          placeholder="Enter task title"
          aria-invalid={!!errors.title}
          aria-describedby={`${errors.title ? "title-error" : undefined}`}
          className={`${inputClass} ${errors.title ? "border-red-500 focus-visible:ring-red-500"
            : "border-input"}
          `}
        />
        {errors.title && (
          <p id="title-error" className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="description">Description</Label>
        <Textarea
            id="description"
            {...register("description")}
            placeholder="Type your description here"
            aria-invalid={!!errors.description}
            aria-describedby={`${errors.description ? "description-error" : undefined}`}
            className={`${inputClass} ${errors.description ? "border-red-500 focus-visible:ring-red-500"
              : "border-input"}
            `}
        />
        {errors.description && (
          <p id="description-error" className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="priority">Priority</Label>
        <select
          id="priority"
          {...register("priority")}
          aria-invalid={!!errors.priority}
          aria-describedby={`${errors.priority ? "priority-error" : undefined}`}
          className={`${inputClass} ${errors.priority ? "border-red-500 focus-visible:ring-red-500"
            : "border-input"} w-full rounded-md text-sm p-2 border bg-black
            focus-visible:bg-black/100
          `}
        >
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
        {errors.priority && (
        <p className="text-sm text-red-500">
            {errors.priority.message}
        </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="dueDate">Due Date</Label>
        <Input
            type="date"
            id="dueDate"
            {...register("dueDate")}
            placeholder="Enter task Due Date"
            aria-invalid={!!errors.dueDate}
            aria-describedby={`${errors.dueDate ? "dueDate-error" : undefined}`}
            className={`${inputClass} ${errors.dueDate ? "border-red-500 focus-visible:ring-red-500"
                      : "border-input"}`}
        />
        {errors.dueDate && (
          <p id="dueDate-error" className="text-sm text-red-500">{errors.dueDate.message}</p>
        )}
      </div>

      <Button 
        type="submit" 
        className="w-full h-12 cursor-pointer rounded-xl bg-gray-800 font-semibold text-white font-semibold hover:scale-[1.02] transition"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Spinner />
            Saving...
          </span>
        ) : (
          isEditing ? "Update" : "Create"
        )}
      </Button>
    </form>
  )
}