import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import authRoutes from "./routes/auth.routes.js"
dotenv.config()

const app = express()


const port = process.env.PORT || 8080
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


app.get('/', (req,res) =>{
    res.send("Hello Guys welcome to leetlab 🔥")
})

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/problem",)

app.listen(port, () =>{
    console.log(`App is listening on ${port}`);
    
})