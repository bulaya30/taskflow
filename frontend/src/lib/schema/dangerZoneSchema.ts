// lib/schema/dangerSchema.ts
import { z } from "zod"

export const dangerSchema = z.object({
  confirmText: z.literal("DELETE"),
})

export type DangerFormValues = z.infer<typeof dangerSchema>