import { useMutation } from "@tanstack/react-query";
import { UserServices } from "@/services/user/user.service";
import useAuthStore from "@/store/authStore";

export function useDeleteUser() {
  const logout = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: () => UserServices.deleteUser(),

    onSuccess: () => {
      logout();
    },
  });
}