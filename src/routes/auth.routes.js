import express from "express"
import { check, login, logout, register } from "../controllers/auth.controller.js"
import isLoggedIn from "../../middleware/auth.middleware.js"

const authRoutes = express.Router()

authRoutes.post("/register", register)

authRoutes.post("/login", login)

authRoutes.get("/logout", isLoggedIn ,logout)

authRoutes.get("/check", check)

export default authRoutes