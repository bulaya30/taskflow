import { useQuery } from "@tanstack/react-query";
import { NotificationServices } from "@/services/notifications/notifications.service";
import type { Notification } from "@/interfaces/notification";
import useAuthStore from "@/store/authStore";

export const useGetNotification = () => {
    const token = useAuthStore((state) => state.token);
    const user = useAuthStore((state) => state.user);
    return useQuery<Notification[]>({
        queryKey: ["notifications", user?.id],
        queryFn: NotificationServices.getNotifications,
        enabled: !!token && !!user,
        staleTime: 3 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });
};