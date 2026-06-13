import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { loginSchema } from "@/lib/schema/loginSchema"
import type { LoginValues } from "@/lib/schema/loginSchema"

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
import { useLogin } from "@/hooks/auth/useLogin"

const Spinner = () => (
  <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
)

export default function Login() {
  const navigate = useNavigate()

  const { mutate: signIn, isPending } = useLogin()

  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  })

  function onSubmit(data: LoginValues) {
    setServerError(null)

    signIn(data, {
      onSuccess: () => navigate("/dashboard"),
      onError: (error) => setServerError(error.message),
    })
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">

      {/* BACKGROUND GLOW EFFECTS */}
      <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />

      <section
        aria-labelledby="login-title"
        className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 lg:grid-cols-2 items-center px-6 py-12 gap-12"
      >

        {/* ================= LEFT HERO ================= */}
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

        {/* ================= RIGHT LOGIN ================= */}
        <section className="flex items-center justify-center">

          <Card className="w-full max-w-md rounded-3xl border-0 bg-white/10 backdrop-blur-xl shadow-2xl">

            {/* ERROR */}
            {serverError && (
              <div className="mx-6 mt-6 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-300">
                {serverError}
              </div>
            )}

            {/* HEADER */}
            <CardHeader className="text-center space-y-3">
              <div className="mx-auto flex text-2xl h-14 w-14 items-center justify-center rounded-full bg-white text-black font-bold">
                N
              </div>

              <CardTitle
                id="login-title"
                className="text-3xl font-bold text-white/80"
              >
                Welcome Back
              </CardTitle>

              <p className="text-sm text-white/60">
                Sign in to continue your workspace
              </p>
            </CardHeader>

            {/* FORM */}
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* EMAIL */}
                <fieldset className="space-y-2">
                  <Label htmlFor="email" 
                    className={`text-white/80 ${errors.email ? "text-red-500" : ""}`}
                  >
                    Email
                  </Label>

                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    {...register("email")}
                    disabled={isPending}
                    className={`h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40
                      ${errors.email ? "border-red-500 focus-visible:ring-red-500"
                      : "border-input"}`}
                  />

                  {errors.email && (
                    <p className="text-sm text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </fieldset>

                {/* PASSWORD */}
                <fieldset className="space-y-2">
                  <Label htmlFor="password" 
                    className={`text-white/80 ${errors.password ? "text-red-500" : ""}`}>
                    Password
                  </Label>

                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      {...register("password")}
                      disabled={isPending}
                      className={`h-12 pr-10 bg-white/5 border-white/10 text-white placeholder:text-white/40
                        ${errors.password ? "border-red-500 focus-visible:ring-red-500"
                        : "border-input"}`}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute text-white right-3 top-1/2 -translate-y-1/2 text-white/60"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {errors.password && (
                    <p className="text-sm text-red-400">
                      {errors.password.message}
                    </p>
                  )}
                </fieldset>

                {/* BUTTON */}
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-12 cursor-pointer rounded-xl bg-black/70 text-white font-semibold hover:scale-[1.02] transition"
                >
                  {isPending ? (
                    <span className="flex items-center gap-2">
                      <Spinner />
                      Logging in...
                    </span>
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>
            </CardContent>

            {/* FOOTER */}
            <CardFooter className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 justify-center pb-6">
              <p className="text-sm text-white/60">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-white font-medium hover:underline"
                >
                  Create one
                </Link>
              </p>
            </CardFooter>
          </Card>
        </section>
      </section>
    </main>
  )
}