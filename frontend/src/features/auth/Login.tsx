import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "@/lib/schema/loginSchema";
import type { LoginValues } from "@/lib/schema/loginSchema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";

import { Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { useLogin } from "@/hooks/auth/useLogin";

const Spinner = () => (
  <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
);

export default function Login() {
  const navigate = useNavigate();

  const { mutate: signIn, isPending } = useLogin();

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  function onSubmit(data: LoginValues) {
    setServerError(null);

    signIn(data, {
      onSuccess: () => navigate("/dashboard"),
      onError: (error) => setServerError(error.message),
    });
  }

   const inputClass = `
    h-10
    bg-white/5
    border-white/10
    text-white
    placeholder:text-white/40
    focus-visible:ring-green-200
    ${isPending ? "cursor-wait" : ""}
  `;

  const features = [
    "Smart task organization",
    "Deadline reminders",
    "Priority-based workflow",
  ];

  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-indigo-950
        text-white
      "
    >
      <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />

      <section
        aria-labelledby="login-page-title"
        className="
          relative
          mx-auto
          grid
          min-h-screen
          max-w-7xl
          grid-cols-1
          lg:grid-cols-2
          items-center
          gap-12
          px-6
          py-12
        "
      >
        {/* Left content */}
        <aside
          aria-labelledby="login-page-title"
          className="hidden lg:flex flex-col justify-center space-y-10"
        >
          <header className="space-y-6">
            <div
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-white/70
                text-green-800
                text-xl
                font-bold
              "
            >
              ✓
            </div>

            <div className="space-y-4">
              <h1
                id="login-page-title"
                className="text-6xl font-black tracking-tight"
              >
                TaskFlow
              </h1>

              <p className="max-w-md text-lg text-white/70">
                Manage your tasks, track deadlines, and stay productive with a
                modern workflow system.
              </p>
            </div>
          </header>

          <section aria-labelledby="features-title">
            <h2 id="features-title" className="sr-only">
              TaskFlow Features
            </h2>

            <ul className="space-y-4">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-white/70"
                >
                  <CheckCircle2
                    className="h-5 w-5 text-green-400"
                    aria-hidden="true"
                  />

                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>
        </aside>

        <article className="flex items-center justify-center">
          <Card
            className="
              w-full
              max-w-md
              rounded-3xl
              border-0
              bg-white/10
              backdrop-blur-xl
              shadow-2xl
            "
          >
            {serverError && (
              <div
                role="alert"
                className="
                  mx-6
                  mt-6
                  rounded-xl
                  border
                  border-red-500/20
                  bg-red-500/10
                  px-4
                  py-3
                  text-sm
                  text-red-300
                "
              >
                {serverError}
              </div>
            )}

            <CardHeader className="space-y-3 text-center">
              <div
                className="
                  mx-auto
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  text-2xl
                  font-bold
                  text-black
                "
              >
                N
              </div>

              <h2 className="text-3xl font-bold text-white">
                Welcome Back
              </h2>

              <p className="text-sm text-white/60">
                Sign in to manage your tasks and stay productive.
              </p>
            </CardHeader>

            <CardContent>
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="space-y-6"
              >
                <fieldset className="space-y-2">
                  <Label
                    htmlFor="email"
                    className={
                      errors.email ? "text-red-500" : "text-white/80"
                    }
                  >
                    Email
                  </Label>

                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    {...register("email")}
                    disabled={isPending}
                    aria-invalid={!!errors.email}
                    className={inputClass}
                  />

                  {errors.email && (
                    <p className="text-sm text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </fieldset>

                <fieldset className="space-y-2">
                  <Label
                    htmlFor="password"
                    className={
                      errors.password ? "text-red-500" : "text-white/80"
                    }
                  >
                    Password
                  </Label>

                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      {...register("password")}
                      disabled={isPending}
                      aria-invalid={!!errors.password}
                      className={`${inputClass} pr-10`}
                    />

                    <button
                      type="button"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        text-white/60
                      "
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

                <Button
                  type="submit"
                  disabled={isPending}
                  className="
                    h-10
                    w-full
                    cursor-pointer
                    rounded-xl
                    bg-black/70
                    font-semibold
                    text-white
                    transition
                    hover:scale-[1.02]
                  "
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

            <CardFooter
              className="
                justify-center
                bg-gradient-to-br
                from-slate-950
                via-slate-900
                to-indigo-950
                pb-6
              "
            >
              <p className="text-sm text-white/60">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-white hover:underline"
                >
                  Create one
                </Link>
              </p>
            </CardFooter>
          </Card>
        </article>
      </section>
    </main>
  );
}

