import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"

import {
  themeSchema,
  type ThemeFormValues,
} from "@/lib/schema/themeSchema"

import { useGetSettings } from "@/hooks/setting/useGetSettings"
import { useUpdateSetting } from "@/hooks/setting/useUpdateSetting"

import { Save, Loader2 } from "lucide-react"

import {
  applyTheme,
} from "@/lib/theme"
import useAuthStore from "@/store/authStore"
import Loader from "@/features/dashboard/components/Loader"

export default function ThemeCard() {
  const {
    data: settings,
    isLoading,
    isError,
  } = useGetSettings()

  const {mutate: updateSettingMutation, isPending} = useUpdateSetting()

  const appTheme = useAuthStore((state) => state.theme);
  const setTheme = useAuthStore((state) => state.setTheme);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm<ThemeFormValues>({
    resolver: zodResolver(themeSchema),
    defaultValues: {
      theme: appTheme,
    },
  })

  const currentTheme = watch("theme")

 
  useEffect(() => {
    if (!settings) return

    setValue("theme", settings.theme)

    setTheme(settings.theme)
    applyTheme(settings.theme)
  }, [settings, setValue])
  
  useEffect(() => {
    applyTheme(currentTheme)
  }, [currentTheme])

  const onSubmit = (data: ThemeFormValues) => {
    if (!settings?.id) return

    setTheme(data.theme)
    applyTheme(data.theme)

    updateSettingMutation({
      id: settings.id,
      data: {
        theme: data.theme,
      },
    })
  }

  if (isLoading) {
    return (
      <article>
        <Card
          className={`
            shadow-sm hover:shadow-md transition duration-300 space-y-1 
            hover:bg-black/30 bg-white/10 backdrop-blur-xl shadow-2xl
            border border-transparent hover:border-black/200 rounded-md
            text-white
        `}
        >
          <CardContent className="py-8 text-center">
            <Loader />
          </CardContent>
        </Card>
      </article>
    )
  }

  if (isError) {
    return (
      <article>
        <Card
          className={`
            shadow-sm hover:shadow-md transition duration-300 space-y-1 
            hover:bg-black/30 bg-white/10 backdrop-blur-xl shadow-2xl
            border border-transparent hover:border-black/200 rounded-md
            text-white
        `}
        >
          <CardContent className="py-8 text-center">
            Failed to load settings.
          </CardContent>
        </Card>
      </article>
    )
  }

  return (
    <article aria-labelledby="theme-title">
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
            <CardTitle id="theme-title">
              Appearance
            </CardTitle>

            <p className="text-sm text-muted-foreground">
              Choose how TaskFlow looks on your device.
            </p>
          </header>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <fieldset>
              <legend className="sr-only">
                Theme selection
              </legend>

              <RadioGroup
                value={currentTheme}
                onValueChange={(value) =>
                  setValue(
                    "theme",
                    value as ThemeFormValues["theme"]
                  )
                }
                className="space-y-3"
              >

                <label className="flex items-center justify-between rounded-md border p-3 cursor-pointer transition hover:bg-muted/30">
                  <span>Dark</span>

                  <RadioGroupItem value="dark" />
                </label>

                <label className="flex items-center justify-between rounded-md border p-3 cursor-pointer transition hover:bg-muted/30">
                  <span>default</span>

                  <RadioGroupItem value="default" />
                </label>
              </RadioGroup>
            </fieldset>

            <footer className="flex justify-end">
              <Button
                type="submit"
                className="cursor-pointer hover:bg-gray-700"
                disabled={
                  isSubmitting ||isPending
                }
              >
                {isPending
                  ? (<Loader2 className="animate-spin"/>)
                  : (<Save className=""/>)}
              </Button>
            </footer>
          </form>
        </CardContent>
      </Card>
    </article>
  )
}