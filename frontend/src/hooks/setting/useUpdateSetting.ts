import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SettingServices } from "@/services/setting/setting.service";
import type { Setting } from "@/interfaces/setting";
import useAuthStore from "@/store/authStore";

type UpdateSettingParams = {
  id: string | number;
  data: Partial<Setting>;
};

export function useUpdateSetting() {
  const queryClient = useQueryClient();
  const user = useAuthStore(state => state.user)

  return useMutation({
    mutationFn: ({ id, data }: UpdateSettingParams) =>
      SettingServices.updateSetting(id, data),

    onSuccess: () => {
      if(user) {
        queryClient.invalidateQueries({ queryKey: ["settings", user.id] });
      }
    },
  });
}