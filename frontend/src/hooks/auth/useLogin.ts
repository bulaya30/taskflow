import { useMutation } from "@tanstack/react-query";
import { AuthServices } from "@/services/auth/auth.service";
import useAuthStore from "@/store/authStore";

export function useLogin() {
  const login = useAuthStore((state) => state.login);
  const setTheme = useAuthStore((state) => state.setTheme);

  return useMutation({
    mutationFn: AuthServices.login,

   onSuccess: (res) => {
      login(res.user, res.token);    
      setTheme(res.theme);
    },
  });
}