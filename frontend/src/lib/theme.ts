import type { ThemeType } from "@/interfaces/setting"

const THEME_KEY = "taskflow-theme"

export function getStoredTheme(): ThemeType {
  return (localStorage.getItem(THEME_KEY) as ThemeType) || "default"
}

export function setStoredTheme(theme: ThemeType) {
  localStorage.setItem(THEME_KEY, theme)
}

export function applyTheme(theme: ThemeType) {
  const root = document.documentElement

  root.classList.remove("light", "dark")

  if (theme === "dark") {
    root.classList.add("dark")
  }

  // system = default Tailwind behavior
}