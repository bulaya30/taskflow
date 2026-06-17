import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"

import {
  notificationSchema,
  type NotificationFormValues,
} from "@/lib/schema/notificationSchema"


import { useGetSettings } from "@/hooks/setting/useGetSettings"
import { useUpdateSetting } from "@/hooks/setting/useUpdateSetting"
import { useCreateSetting } from "@/hooks/setting/useCreateSetting"

import { Loader2, Save } from "lucide-react"
import Loader from "@/features/dashboard/components/Loader"

export default function NotificationCard() {
  const {
    data: settings,
    isLoading,
    isError,
  } = useGetSettings()

  const createMutation = useCreateSetting()
  const updateMutation = useUpdateSetting()

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      email: false,
      remind: false,
      dueDateAlert: false,
    },
  })

  useEffect(() => {
    
    if (!settings) return

    reset({
      email: settings.email ?? false,
      remind: settings.remind ?? false,
      dueDateAlert: settings.dueDateAlert ?? false,
    })
  }, [settings, reset])
  
  const onSubmit = (data: NotificationFormValues) => {
    if (settings) {
      updateMutation.mutate({
        id: settings.id,
        data,
      })
    } else {
      createMutation.mutate(data)
    }
  }

  const isSaving =
    isSubmitting ||
    createMutation.isPending ||
    updateMutation.isPending

  if (isLoading) {
    return (
      <Card
        className={`
          shadow-sm hover:shadow-md transition duration-300 space-y-1 
          hover:bg-black/30 bg-white/10 backdrop-blur-xl shadow-2xl
          border border-transparent hover:border-black/200 rounded-md
          text-white
        `}
      >
        <CardContent className="py-10 text-center">
          <Loader />
        </CardContent>
      </Card>
    )
  }

  if (isError) {
    return (
      <Card
        className={`
          shadow-sm hover:shadow-md transition duration-300 space-y-1 
          hover:bg-black/30 bg-white/10 backdrop-blur-xl shadow-2xl
          border border-transparent hover:border-black/200 rounded-md
          text-white 
        `}
      >
        <CardContent className="py-10 text-center text-red-500">
          Failed to load notification settings.
        </CardContent>
      </Card>
    )
  }

  return (
    <article aria-labelledby="notifications-settings-title">
      <Card
        className={`
          shadow-sm hover:shadow-md transition duration-300 space-y-1 
          hover:bg-black/30 bg-white/10 backdrop-blur-xl shadow-2xl
          border border-transparent hover:border-black/200 rounded-md
          text-white
        `}
      >
        <CardHeader>
          <header>
            <CardTitle id="notifications-settings-title">
              Notifications
            </CardTitle>

            <p className="text-sm text-muted-foreground">
              Control how and when you receive updates.
            </p>
          </header>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <fieldset className="space-y-5">
              <legend className="sr-only">
                Notification preferences
              </legend>

              <div className="flex items-center justify-between">
                <label
                  htmlFor="emailNotifications"
                  className="text-sm font-medium"
                >
                  Email notifications
                </label>

                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <Switch
                      id="emailNotifications"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="
                        data-[state=unchecked]:bg-white/10
                        data-[state=checked]:bg-indigo-500/50
                        transition-all duration-300
                        data-[state=checked]:shadow-[0_0_12px_rgba(99,102,241,0.5)]
                        border border-white/10
                      "
                    />
                  )}
                />
              </div>

              <div className="flex items-center justify-between">
                <label
                  htmlFor="taskReminders"
                  className="text-sm font-medium"
                >
                  Task reminders
                </label>

                <Controller
                  control={control}
                  name="remind"
                  render={({ field }) => (
                    <Switch
                      id="taskReminders"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="
                        data-[state=unchecked]:bg-white/10
                        data-[state=checked]:bg-indigo-500/50
                        transition-all duration-300
                        data-[state=checked]:shadow-[0_0_12px_rgba(99,102,241,0.5)]
                        border border-white/10
                      "
                    />
                  )}
                />
              </div>

              <div className="flex items-center justify-between">
                <label
                  htmlFor="dueDateAlerts"
                  className="text-sm font-medium"
                >
                  Due date alerts
                </label>

                <Controller
                  control={control}
                  name="dueDateAlert"
                  render={({ field }) => (
                    <Switch
                      id="dueDateAlerts"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="
                        data-[state=unchecked]:bg-white/10
                        data-[state=checked]:bg-indigo-500/50
                        transition-all duration-300
                        data-[state=checked]:shadow-[0_0_12px_rgba(99,102,241,0.5)]
                        border border-white/10
                      "
                    />
                  )}
                />
              </div>
            </fieldset>

            <footer className="flex justify-end">
              <Button
                type="submit"
                disabled={isSaving}
                className="hover:bg-gray-700 cursor-pointer"
              >
                {isSaving ? (<Loader2 className="animate-spin" />) : (<Save />)}
              </Button>
            </footer>
          </form>
        </CardContent>
      </Card>
    </article>
  )
}