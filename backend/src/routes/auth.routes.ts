// src/routes/auth.routes.ts
import express from 'express'
import * as authController from '../controllers/auth.controller.js'
import * as authMiddleware from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/google/signin', authController.googleSignIn)

router.get('/token-check', authMiddleware.authenticateToken, authController.tokenCheck)

export default router
