import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskServices } from "@/services/task/task.service";
import useAuthStore from "@/store/authStore";

export function useDeleteTask() {
  const queryClient = useQueryClient();
  const user = useAuthStore(state => state.user)
  return useMutation({
    mutationFn: (id: string | number) =>
      TaskServices.deleteTask(id),

    onSuccess: () => {
      if(user) {
        queryClient.invalidateQueries({ queryKey: ["tasks", user.id] });
      }
    },
  });
}