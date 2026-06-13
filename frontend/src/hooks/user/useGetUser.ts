import { useQuery } from "@tanstack/react-query";
import { UserServices } from "@/services/user/user.service";
import useAuthStore from "@/store/authStore";
import type { User } from "@/interfaces/user";

export function useGetUser() {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  return useQuery<User>({
    queryKey: ["users", user?.id],
    queryFn: UserServices.getUser,
    enabled: !!token && !!user,
    staleTime: 3 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
}