import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskServices } from "@/services/task/task.service";
import type { Task } from "@/interfaces/task";
import useAuthStore from "@/store/authStore";

type UpdateTaskParams = {
  id: string | number;
  data: Partial<Task>;
};

export function useUpdateTask() {
  const queryClient = useQueryClient();
  const user = useAuthStore(state => state.user);
  return useMutation({
    mutationFn: ({ id, data }: UpdateTaskParams) =>
      TaskServices.updateTask(id, data),

    onSuccess: () => {
      if(user) {
        queryClient.invalidateQueries({ queryKey: ["tasks", user.id] });
      }
    },
  });
}