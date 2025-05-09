import express from "express"
import { authMiddleware, checkAdmin } from "../middleware/auth.middlewares.js"
import { createProblem, getAllProblems, getProblemById, updateProblem } from "../controllers/problem.controller.js"

const problemRoutes = express.Router()

problemRoutes.post('/create-problem',authMiddleware,checkAdmin,createProblem)

problemRoutes.get("/get-all-problems", authMiddleware, getAllProblems)

problemRoutes.get("/get-problem/:id", authMiddleware, getProblemById)

problemRoutes.put("/update-problem/:id",authMiddleware,checkAdmin,updateProblem)
export default problemRoutes