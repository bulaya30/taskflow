// lib/schema/themeSchema.ts
import { z } from "zod"

export const themeSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
})

export type ThemeFormValues = z.infer<typeof themeSchema>