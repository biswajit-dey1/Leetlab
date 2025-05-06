import express from "express"
import { authMiddleware } from "../middleware/auth.middlewares.js"

const problemRoutes = express.Router()

// problemRoutes.post('/create-problem',authMiddleware,)