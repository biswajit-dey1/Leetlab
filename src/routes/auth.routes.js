import express from "express"
import { login, logout, register } from "../controllers/auth.controller.js"
import { authMiddleware } from "../middleware/auth.middlewares.js"



const authRoutes = express.Router()

authRoutes.post("/register", register)

authRoutes.post("/login", login)

authRoutes.get('/logout',authMiddleware,logout)



export default authRoutes