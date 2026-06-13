import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserServices } from "@/services/user/user.service";
import type { User } from "@/interfaces/user";
import useAuthStore from "@/store/authStore";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const user = useAuthStore(state => state.user);

  return useMutation({
    mutationFn: (data: Partial<User>) =>
      UserServices.updateUser(data),

    onSuccess: () => {
      if(user) {
        queryClient.invalidateQueries({ queryKey: ["users", user.id] });
      }
    },
  });
}