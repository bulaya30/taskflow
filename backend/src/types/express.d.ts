import type { User } from "../interfaces/user.js"

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
        email?: string
      }
    }
  }
}

export {}