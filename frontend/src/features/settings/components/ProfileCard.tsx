import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { User } from "@/interfaces/user"
import useAuthStore from "@/store/authStore"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { useUpdateUser } from "@/hooks/user/useUpdateUser"

import { Save, Loader2 } from "lucide-react"

import {
  profileSchema,
  type ProfileFormValues,
} from "@/lib/schema/profileSchema"


export default function ProfileCard() {
  const user : User | null = useAuthStore((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "norbert@example.com",
    },
  })

  const updareProfile = useUpdateUser()
  const isLoading = updareProfile.isPending

  const onSubmit = async (data: ProfileFormValues) => {
    const payload = {
      id: user?.id ?? "",
      ...data
    }
    updareProfile.mutate(payload, {
      onSuccess: (res) => {
        console.log("success", res)
      }
    })

  }
    const inputClass = `h-12 bg-white/5 text-white placeholder:text-white/40
                      focus-visible:ring-green-200`

  return (
    <article>
      <Card
        className={`
          shadow-sm hover:shadow-md transition duration-300 space-y-1 
          hover:bg-black/30 bg-white/10 backdrop-blur-xl shadow-2xl
          border border-transparent hover:border-black/200 rounded-md
          text-white`
        }
      >
        <CardHeader>
          <header>
            <CardTitle>Profile</CardTitle>
            <p className="text-sm text-muted-foreground">
              Update your personal information.
            </p>
          </header>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            aria-label="Profile settings form"
          >
            <fieldset className="space-y-4">
              <legend className="sr-only">
                Profile Information
              </legend>

              {/* FIRST NAME */}
              <div className="space-y-1">
                <Label htmlFor="fname"
                  className={`text-white/80 mb-4 ${errors.firstName ? "text-red-500" : ""}`}
                >
                  First Name
                </Label>

                <Input
                  id="fname"
                  {...register("firstName")}
                  aria-invalid={!!errors.firstName}
                  aria-describedby={
                    errors.firstName ? "name-error" : undefined
                  }
                  className={`${inputClass} ${errors.firstName ? "border-red-500 focus-visible:ring-red-500"
                      : "border-input"}`}
                />

                {errors.firstName && (
                  <p
                    id="name-error"
                    className="text-sm text-red-500"
                  >
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              {/* LAST NAME */}
              <div className="space-y-1">
                <Label htmlFor="lname"
                  className={`text-white/80 mb-4  ${errors.lastName ? "text-red-500" : ""}`}
                >
                  Last Name
                </Label>

                <Input
                  id="lname"
                  {...register("lastName")}
                  aria-invalid={!!errors.lastName}
                  aria-describedby={
                    errors.lastName ? "name-error" : undefined
                  }
                  className={`${inputClass} ${errors.lastName ? "border-red-500 focus-visible:ring-red-500"
                      : "border-input"}`}
                />

                {errors.lastName && (
                  <p
                    id="name-error"
                    className="text-sm text-red-500"
                  >
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              {/* EMAIL */}
              <div className="space-y-1">
                <Label htmlFor="email"
                  className={`text-white/80 mb-4  ${errors.email ? "text-red-500" : ""}`}
                >
                  Email Address
                </Label>

                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  aria-invalid={!!errors.email}
                  aria-describedby={
                    errors.email ? "email-error" : undefined
                  }
                  className={`${inputClass} ${errors.email ? "border-red-500 focus-visible:ring-red-500"
                      : "border-input"}`}
                />

                {errors.email && (
                  <p
                    id="email-error"
                    className="text-sm text-red-500"
                  >
                    {errors.email.message}
                  </p>
                )}
              </div>
            </fieldset>

            <footer className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="sm:w-auto cursor-pointer hover:bg-gray-700"
              >
                {isLoading
                  ? (<Loader2 className="w-2 h-2 animate-spin"/>)
                  : (<Save size={20} className="w-4 h-4 hover:text-white"/>)
                }
              </Button>
            </footer>
          </form>
        </CardContent>
      </Card>
    </article>
  )
}