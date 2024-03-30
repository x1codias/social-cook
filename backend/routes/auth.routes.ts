import { Router } from 'express'
import {
  login,
  logout,
  register,
} from '../controllers/auth.controller'

const authRoutes = Router()

authRoutes.post('/register', register)
authRoutes.post('/logout', logout)
authRoutes.post('/login', login)

export default authRoutes
