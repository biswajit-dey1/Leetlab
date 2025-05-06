import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import { db } from "../libs/db.js"
import { UserRole } from "../generated/prisma/index.js";


export const register = async (req, res) => {
    const { email, password, name } = req.body

    try {
        const existingUser = await db.user.findUnique({
            where: {
                email
            }
        })

        if (existingUser) {
            return res.status(400).json({
                error: "User already exists"
            })
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await db.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: UserRole.USER
            }
        })


        console.log(newUser);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
                role: newUser.role,
                image: newUser.image
            }
        })

    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            error: "Error creating user"
        })

    }


}

export const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await db.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            return res.status(401).json({
                error: "User not found"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                error: "Invalid credentials"
            })
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
            maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
        })

        res.status(200).json({
            success: true,
            message: "User Logged in successfully",
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                image: user.image
            }
        })


    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            error: "Error logging in user"
        })
    }
}





export const logout = async (req, res) => {

    try {
        const user = await db.user.findUnique({
            where: {
                id: req.user.id
            }
        })

        console.log(user);

        if (!user) {
            res.status(400).json({
                message: "User not found",
                succes: false,
            });
        }

        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
        })


        return res.status(200).json({
            message: "User logged out succesfully",
            success: true,
        });

    } catch (error) {
        res.status(500)
            .json({
                "message": "Internal server error while logging out",
                "succes": false

            })
    }



}

export const check = async (req, res) => {

}