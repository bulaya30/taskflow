import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: string
  firstName: string
  lastName: string
  email: string
}

type Theme = "light" | "dark" | "system";

type AuthState = {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  theme: Theme

  login: (user: User, token: string) => void
  logout: () => void
  setToken: (token: string) => void
  setTheme: (theme: Theme) => void
  setUser: (user: User) => void
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      theme: 'system',

      login: (user, token) =>
        set({ user, token, isAuthenticated: true }),

      logout: () =>
        set({ user: null, token: null, isAuthenticated: false, theme: 'system' }),

      setToken: (token) => set({ token }),

      setUser: (user) => set({ user }),
      setTheme: (theme) => set({theme})
    }),
    {
      name: "auth-storage",
    }
  )
)

export default useAuthStore;