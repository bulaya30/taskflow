
type Theme = "light" | "dark" | "system"

const THEME_KEY = "taskflow-theme"

export function getStoredTheme(): Theme {
  return (localStorage.getItem(THEME_KEY) as Theme) || "system"
}

export function setStoredTheme(theme: Theme) {
  localStorage.setItem(THEME_KEY, theme)
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement

  root.classList.remove("light", "dark")

  if (theme === "dark") {
    root.classList.add("dark")
  }

  // system = default Tailwind behavior
}