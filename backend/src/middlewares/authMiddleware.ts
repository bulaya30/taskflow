import jwt from "jsonwebtoken"
import { Request, Response, NextFunction, RequestHandler } from "express"

export function authMiddleware(required = true): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      if (!required) return next()

      res.status(401).json({ message: "Authorization header missing" })
      return
    }

    const token = authHeader.split(" ")[1]

    if (!token) {
      if (!required) return next()

      res.status(401).json({ message: "Token missing" })
      return
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as {
        id: string
        email?: string
      }

      req.user = {
        id: decoded.id,
        ...(decoded.email ? { email: decoded.email } : {}),      
      }

      next()
    } catch (err) {
      if (!required) return next()

      res.status(401).json({ message: "Invalid or expired token" })
      return
    }
  }
}