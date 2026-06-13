import { useQuery } from "@tanstack/react-query";
import { TaskServices } from "@/services/task/task.service";
import type { Task } from "@/interfaces/task";
import useAuthStore from "@/store/authStore";

export function useGetTasks() {
    const token = useAuthStore((state) => state.token);
    const user = useAuthStore((state) => state.user);
    return useQuery<Task[], Error>({
        queryKey: ["tasks", user?.id],
        queryFn: TaskServices.getTasks,
        enabled: !!token && !!user,
        staleTime: 3 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });
}