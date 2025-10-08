import type { Request, Response } from 'express'
import crypto from 'crypto'
import { prisma } from '../prisma/client.js'
import { OAuth2Client } from 'google-auth-library'

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const generateToken = (): string => {
  return crypto.randomBytes(32).toString('hex')
}

const createSession = async (userId: string) => {
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 7)

  const session = await prisma.session.create({
    data: {
      userId,
      token: generateToken(),
      expiresAt,
    },
  })
  return session
}

export const googleSignIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { credential } = req.body

    if (!credential) {
      res.status(400).json({ message: 'Google credential is required' })
      return
    }

    const clientId = process.env.GOOGLE_CLIENT_ID
    if (!clientId) {
      res.status(500).json({ message: 'Server configuration error' })
      return
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: clientId,
    })

    const payload = ticket.getPayload()

    if (!payload?.sub || !payload?.email) {
      res.status(400).json({ message: 'Invalid Google token' })
      return
    }

    let user = await prisma.user.findUnique({
      where: { email: payload.email },
    })

    const isNewUser = !user

    if (!user) {
      user = await prisma.user.create({
        data: {
          googleId: payload.sub,
          email: payload.email,
          name: payload.name ?? '',
          avatar: payload.picture ?? '',
        },
      })
    } else if (!user.googleId) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          googleId: payload.sub,
          avatar: user.avatar || payload.picture || '',
        },
      })
    }

    const session = await createSession(user.id)

    res.status(200).json({
      message: isNewUser ? 'Account created successfully' : 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      },
      token: session.token,
      isNewUser,
    })
  } catch (error) {
    console.error('Google sign-in error:', error)

    if (error instanceof Error && error.message.includes('Token used too late')) {
      res.status(401).json({ message: 'Google token has expired. Please try signing in again.' })
      return
    }

    res.status(500).json({ message: 'Error processing Google sign-in' })
  }
}

export const tokenCheck = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ data: 'auth success' })
}
