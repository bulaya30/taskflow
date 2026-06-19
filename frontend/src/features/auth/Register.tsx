import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  registerSchema,
  type RegisterValues,
} from "@/lib/schema/registerSchema"

import { useRegister } from "@/hooks/auth/useRegister"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"

import { Eye, EyeOff, CheckCircle2 } from "lucide-react"

const Spinner = () => (
  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
)

export default function Register() {
  const navigate = useNavigate()

  const { mutate: signUp, isPending } = useRegister()

  const [serverError, setServerError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
  })

  function onSubmit(data: RegisterValues) {
    setServerError(null)

    signUp(data, {
      onSuccess: () => navigate("/dashboard"),
      onError: (error) => setServerError(error.message),
    })
  }

  const inputClass = `h-12 bg-white/5 text-white placeholder:text-white/40
                      focus-visible:ring-green-200
                      ${isPending ? "cursor-wait" : "" }`

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
      
      <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="absolute top-20 right-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
      <section
        aria-labelledby="login-title"
        className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 lg:grid-cols-2 items-center px-6 py-12 gap-12"
      >
        
        <aside className="hidden lg:flex flex-col justify-center space-y-10">

          <header className="space-y-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-black font-bold text-xl">
              ✓
            </div>

            <div className="space-y-4">
              <h1 className="text-6xl font-black leading-tight tracking-tight">
                TaskFlow
              </h1>

              <p className="text-lg text-white/70 max-w-md">
                Manage your tasks, track deadlines, and stay productive with a modern workflow system.
              </p>
            </div>
          </header>

          <section className="space-y-4">
            {[
              "Smart task organization",
              "Deadline reminders",
              "Priority-based workflow",
            ].map((feature) => (
              <article key={feature} className="flex items-center gap-3 text-white/70">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <p>{feature}</p>
              </article>
            ))}
          </section>
        </aside>
        
        <section className="flex items-center justify-center">
          <Card className="w-full max-w-md rounded-3xl border-0 bg-white/10 backdrop-blur-xl shadow-2xl">

            
            {serverError && (
              <div className="text-center bg-red-300 py-4">
                <p className="text-sm text-red-600">{serverError}</p>
              </div>
            )}

            
            <CardHeader className="text-center space-y-3">
              <div className="mx-auto flex h-14 w-14 text-2xl items-center justify-center rounded-full bg-white text-black font-bold">
                N
              </div>
              <CardTitle
                id="register-title"
                className="text-3xl font-bold text-white/80"
              >
                Create Account
              </CardTitle>

              <p className="text-sm text-white/60">
                Join TaskFlow and start managing tasks
              </p>
            </CardHeader>

            
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">

                
                <fieldset className="space-y-2">
                  <Label htmlFor="name"
                    className={`text-white/80 ${errors.name ? "text-red-500" : ""}`}
                  >Full Name</Label>

                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    {...register("name")}
                    aria-invalid={!!errors.name}
                    className={`${inputClass} ${errors.name ? "border-red-500 focus-visible:ring-red-500"
                      : "border-input"}`}
                    disabled={isPending}
                  />

                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                  )}
                </fieldset>

                <fieldset className="space-y-2">
                  <Label htmlFor="email"
                    className={`text-white/80 ${errors.email ? "text-red-500" : ""}`}
                  >Email Address</Label>

                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    {...register("email")}
                    aria-invalid={!!errors.email}
                    className={`${inputClass} ${errors.email ? "border-red-500 focus-visible:ring-red-500"
                      : "border-input"}`}
                    disabled={isPending}
                  />

                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </fieldset>

                <fieldset className="space-y-2">
                  <Label htmlFor="password"
                    className={`text-white/80 ${errors.password ? "text-red-500" : ""}`}
                  >Password</Label>

                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      {...register("password")}
                      aria-invalid={!!errors.password}
                      className={`${inputClass} ${errors.password ? "border-red-500 focus-visible:ring-red-500"
                      : "border-input"}`}
                      disabled={isPending}
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute text-white right-2 top-1/2 -translate-y-1/2"
                      disabled={isPending}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={20} />}
                    </Button>
                  </div>

                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                  )}
                </fieldset>

                <fieldset className="space-y-2">
                  <Label htmlFor="confirmPassword"
                    className={`text-white/80 ${errors.confirmPassword ? "text-red-500" : ""}`}
                  >Confirm Password</Label>

                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      {...register("confirmPassword")}
                      aria-invalid={!!errors.confirmPassword}
                      className={`${inputClass} ${errors.confirmPassword ? "border-red-500 focus-visible:ring-red-500"
                      : "border-input"}`}
                      disabled={isPending}
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowConfirmPassword((p) => !p)}
                      className="absolute  text-white right-2 top-1/2 -translate-y-1/2"
                      disabled={isPending}
                    >
                      {showConfirmPassword ? <EyeOff /> : <Eye />}
                    </Button>
                  </div>

                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </fieldset>

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-12 cursor-pointer rounded-xl bg-black/70 text-white font-semibold hover:scale-[1.02] transition"
                >
                  {isPending ? (
                    <span className="flex items-center gap-2">
                      <Spinner />
                      Registering...
                    </span>
                  ) : (
                    "Register"
                  )}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 justify-center pb-6">
              <p className=" text-white text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500 hover:underline hover:font-semibold">
                  Login
                </Link>
              </p>
            </CardFooter>

          </Card>
        </section>
      </section>
    </main>
  )
}