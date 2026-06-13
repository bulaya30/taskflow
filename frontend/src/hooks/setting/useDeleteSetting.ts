import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SettingServices } from "@/services/setting/setting.service";
import useAuthStore from "@/store/authStore";

export function useDeleteSetting() {
  const queryClient = useQueryClient();
  const user = useAuthStore(state => state.user);

  return useMutation({
    mutationFn: (id: string | number) =>
      SettingServices.deleteSetting(id),

    onSuccess: () => {
      if(user) {
        queryClient.invalidateQueries({ queryKey: ["settings", user.id] });
      }
    },
  });
}