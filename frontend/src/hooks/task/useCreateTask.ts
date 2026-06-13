
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskServices } from "@/services/task/task.service";
import useAuthStore from "@/store/authStore";

export function useCreateTask() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user)

  return useMutation({
    mutationFn: TaskServices.createTask,

    onSuccess: () => {
      if(user) {
        queryClient.invalidateQueries({ queryKey: ["tasks", user.id] });
      }
    },
  });
}