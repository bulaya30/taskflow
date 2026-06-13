import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NotificationServices } from "@/services/notifications/notifications.service";
import useAuthStore from "@/store/authStore";

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();
  const user = useAuthStore(state => state.user);
  return useMutation({
    mutationFn: (id: string) =>
      NotificationServices.markNotificationAsRead(id),

    onSuccess: () => {
      if(user) {
        queryClient.invalidateQueries({ queryKey: ["notifications", user.id] });
      }
    },
  });
}