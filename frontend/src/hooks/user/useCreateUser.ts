import { useMutation } from "@tanstack/react-query";
import { UserServices } from "@/services/user/user.service";
import type { RegisterUserInput } from "@/interfaces/user";
export function useCreateUser() {
  return useMutation({
    mutationFn: (data: RegisterUserInput) =>
      UserServices.register(data),
  });
}