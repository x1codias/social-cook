import { Router } from 'express'
import {
  login,
  logout,
  register,
  verifyToken,
} from '../controllers/auth.controller'

const authRoutes = Router()

authRoutes.post('/register', register)
authRoutes.post('/logout', verifyToken, logout)
authRoutes.post('/login', login)

export default authRoutes
