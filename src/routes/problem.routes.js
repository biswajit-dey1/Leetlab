import express from "express"
import { authMiddleware } from "../middleware/auth.middlewares.js"
import { createProblem } from "../controllers/problem.controller.js"

const problemRoutes = express.Router()

problemRoutes.post('/create-problem',authMiddleware,createProblem)

export default problemRoutes