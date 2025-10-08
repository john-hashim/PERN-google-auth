import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'AI Chatbot Backend Server is running!' })
})

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

export default app
