import { z } from "zod"

export const notificationSchema = z.object({
  email: z.boolean(),
  remind: z.boolean(),
  dueDateAlert: z.boolean(),
})

export type NotificationFormValues =
  z.infer<typeof notificationSchema>