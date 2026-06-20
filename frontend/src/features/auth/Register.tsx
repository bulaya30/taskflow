import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  registerSchema,
  type RegisterValues,
} from "@/lib/schema/registerSchema";

import { useRegister } from "@/hooks/auth/useRegister";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";

import {
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";

const Spinner = () => (
  <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
);

export default function Register() {
  const navigate = useNavigate();

  const { mutate: signUp, isPending } = useRegister();

  const [serverError, setServerError] =
    useState<string | null>(null);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
  });

  function onSubmit(data: RegisterValues) {
    setServerError(null);

    signUp(data, {
      onSuccess: () => navigate("/dashboard"),
      onError: (error) => setServerError(error.message),
    });
  }

  const features = [
    "Smart task organization",
    "Deadline reminders",
    "Priority-based workflow",
  ];

  const inputClass = `
    h-10
    bg-white/5
    border-white/10
    text-white
    placeholder:text-white/40
    focus-visible:ring-green-200
    ${isPending ? "cursor-wait" : ""}
  `;

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
        aria-labelledby="register-page-title"
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
        <aside
          aria-labelledby="register-page-title"
          className="
            hidden
            lg:flex
            flex-col
            justify-center
            space-y-10
          "
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
                id="register-page-title"
                className="
                  text-6xl
                  font-black
                  tracking-tight
                "
              >
                TaskFlow
              </h1>

              <p className="max-w-md text-lg text-white/70">
                Manage your tasks, track deadlines,
                and stay productive with a modern
                workflow system.
              </p>
            </div>
          </header>

          <section aria-labelledby="feature-title">
            <h2
              id="feature-title"
              className="sr-only"
            >
              TaskFlow Features
            </h2>

            <ul className="space-y-4">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="
                    flex
                    items-center
                    gap-3
                    text-white/70
                  "
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

        <article className="flex justify-center">
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
                  text-center
                "
              >
                <p className="text-sm text-red-300">
                  {serverError}
                </p>
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

              <h2
                id="register-title"
                className="
                  text-3xl
                  font-bold
                  text-white
                "
              >
                Create Account
              </h2>

              <p className="text-sm text-white/60">
                Join TaskFlow and start managing
                your tasks.
              </p>
            </CardHeader>

            <CardContent>
              <form
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <fieldset className="space-y-2">
                  <Label htmlFor="name">
                    Full Name
                  </Label>

                  <Input
                    id="name"
                    placeholder="John Doe"
                    {...register("name")}
                    aria-invalid={!!errors.name}
                    disabled={isPending}
                    className={inputClass}
                  />

                  {errors.name && (
                    <p className="text-sm text-red-400">
                      {errors.name.message}
                    </p>
                  )}
                </fieldset>

                <fieldset className="space-y-2">
                  <Label htmlFor="email">
                    Email Address
                  </Label>

                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    {...register("email")}
                    aria-invalid={!!errors.email}
                    disabled={isPending}
                    className={inputClass}
                  />

                  {errors.email && (
                    <p className="text-sm text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </fieldset>

                <fieldset className="space-y-2">
                  <Label htmlFor="password">
                    Password
                  </Label>

                  <div className="relative">
                    <Input
                      id="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Enter password"
                      {...register("password")}
                      aria-invalid={!!errors.password}
                      disabled={isPending}
                      className={`${inputClass} pr-10`}
                    />

                    <button
                      type="button"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                      className="
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        text-white/60
                      "
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  {errors.password && (
                    <p className="text-sm text-red-400">
                      {errors.password.message}
                    </p>
                  )}
                </fieldset>

                <fieldset className="space-y-2">
                  <Label htmlFor="confirmPassword">
                    Confirm Password
                  </Label>

                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Confirm password"
                      {...register("confirmPassword")}
                      aria-invalid={
                        !!errors.confirmPassword
                      }
                      disabled={isPending}
                      className={`${inputClass} pr-10`}
                    />

                    <button
                      type="button"
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                      onClick={() =>
                        setShowConfirmPassword(
                          (prev) => !prev
                        )
                      }
                      className="
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        text-white/60
                      "
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  {errors.confirmPassword && (
                    <p className="text-sm text-red-400">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </fieldset>

                <Button
                  type="submit"
                  disabled={isPending}
                  className="
                    h-12
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
                      Registering...
                    </span>
                  ) : (
                    "Create Account"
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
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="
                    font-medium
                    text-white
                    hover:underline
                  "
                >
                  Login
                </Link>
              </p>
            </CardFooter>
          </Card>
        </article>
      </section>
    </main>
  );
}
