import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Invalid email address").min(1).max(50),
    password: z.string().min(6, "Password must be at least 6 characters")
})

export type LoginValues = z.infer<typeof loginSchema>