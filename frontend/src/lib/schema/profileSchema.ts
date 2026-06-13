import { z } from "zod"

export const profileSchema = z.object({
  firstName: z
    .string()
    .min(2, "First Name must be at least 2 characters")
    .max(50, "First Name is too long"),
lastName: z
    .string()
    .min(2, "Last Name must be at least 2 characters")
    .max(50, "Last Name is too long"),
    
  email: z
    .string()
    .email("Please enter a valid email address"),
})

export type ProfileFormValues = z.infer<typeof profileSchema>