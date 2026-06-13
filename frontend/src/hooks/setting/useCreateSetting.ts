
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SettingServices } from "@/services/setting/setting.service";
import useAuthStore from "@/store/authStore";

export function useCreateSetting() {

    const queryClient = useQueryClient();
    const user = useAuthStore(state => state.user)

    return useMutation({

        mutationFn: SettingServices.createSetting,

        onSuccess: () => {
            if(user) {
                queryClient.invalidateQueries({ queryKey: ["settings", user.id] });
            }
        },

    });
}