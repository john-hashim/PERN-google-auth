// src/middleware/auth.middleware.ts
import type { Request, Response, NextFunction } from 'express'
import { prisma } from '../prisma/client.js'

declare global {
  namespace Express {
    interface Request {
      user?: any
      session?: any
    }
  }
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true },
    })

    if (!session || new Date() > session.expiresAt) {
      if (session) {
        await prisma.session.delete({ where: { id: session.id } })
      }
      return res.status(401).json({ message: 'Session expired or invalid' })
    }

    req.user = {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
    }
    req.session = session

    next()
  } catch (error) {
    console.error('Authentication error:', error)
    return res.status(500).json({ message: 'Authentication failed' })
  }
}
