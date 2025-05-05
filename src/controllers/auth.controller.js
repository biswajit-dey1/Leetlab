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

        const token = jwt.sign({id:newUser.id},
            process.env.JWT_SECRET,{
                expiresIn:"7D"
            }
        )

        res.cookie("jwt", token,{
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV !== "development",
            maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
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

    const {email,password} = req.body

    try {

        
        
    } catch (error) {
        
    }



}

export const logout = async (req, res) => {

}

export const check = async (req, res) => {

}