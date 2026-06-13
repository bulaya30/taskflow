import { useQuery } from "@tanstack/react-query";
import { SettingServices } from "@/services/setting/setting.service";
import type { Setting } from "@/interfaces/setting";
import useAuthStore from "@/store/authStore";

export function useGetSettings() {
    const token = useAuthStore((state) => state.token);
    const user = useAuthStore((state) => state.user);
    return useQuery<Setting, Error>({
        queryKey: ["settings", user?.id],
        queryFn: SettingServices.getSettings,
        enabled: !!token && !!user,
        staleTime: 3 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });
}