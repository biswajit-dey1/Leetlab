import jwt from "jsonwebtoken"
import { db } from "../src/libs/db.js";

const isLoggedIn = async (req, res, next) => {

    try {

        const { token } = req.cookies


        if (!token) {
            res.status(404)
                .json({
                    "message": "Unauthorized: Token not provided. Please logedIn ",
                    "success": false
                })
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)


        const user = await db.user.findUnique({
            where: {
                id: decodedToken.id
            }
        })




        if (!user) {
            res.status(401).json({
                status: false,
                message: "Unauthorized access",
            });
        }

        const refreshToken = jwt.sign({ id: user.id },
            process.env.JWT_SECRET, {
            expiresIn: "7D"
        }
        )

        res.cookie("token", refreshToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
            maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
        })

        req.user = user

        next()

    } catch (error) {
        console.error("Error verifying token:", error);
        res.status(400)
            .json({
                "message": "Internal server error",
                "success": false
            })
    }
}



export const checkAdmin = async (req, res, next) => {

    try {
        const userId = req.user.id

        const user = await db.user.findUnique({
            where: {
                id: userId
            },
            select: {
                role: true
            }
        })

        if (!user && user.role !== "ADMIN") {

            return res.status(403).json({
                message: "Access denied - Admins only"
            })
        }

        next()
    } catch (error) {
        console.error("Error checking admin role:", error);
        res.status(500).json({ message: "Error checking admin role" });

    }

}


export default isLoggedIn