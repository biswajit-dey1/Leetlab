import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from 'cors';
import authRoutes from "./routes/auth.routes.js"
import problemRoutes from "./routes/problem.routes.js"
dotenv.config()

const app = express()


const port = process.env.PORT || 8080
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    exposedHeaders: ['Set-Cookie', '*']
}));


app.get('/', (req,res) =>{
    res.send("Hello Guys welcome to leetlab 🔥")
})

app.use("/api/v1/auth",authRoutes)

app.use("/api/v1/problem",problemRoutes)

app.listen(port, () =>{
    console.log(`App is listening on ${port}`);
    
})