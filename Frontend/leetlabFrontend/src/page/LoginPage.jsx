import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from 'react-router-dom'
import {
    Code,
    Eye,
    EyeOff,
    Loader2,
    Lock,
    Mail,
} from "lucide-react";

import { z } from "zod";

import { useAuthStore } from '../store/useAuthStore';

const LoginSchema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be atleast of 6 characters"),

})

function LoginPage() {

    const { isLoggingIn, login } = useAuthStore()

    const [showPassword, setShowPassword] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(LoginSchema)
    })

 const onSubmit = async (data) =>{
 
  try {
    await login(data)
    console.log("Login data" , data)
  } catch (error) {
     console.error("Signup failed" , error)
  }
 }
    return (
       
        <>
           <div className='h-screen w-screen flex '>


        <div className=" w-1/2 h-full flex flex-col justify-center items-center p-6 sm:p-12">

          <div className="w-full max-w-md space-y-8">
            {/* Logo */}


            <div className="text-center mb-8">


              <div className="flex flex-col items-center gap-2 group">

                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">

                  <Code className="w-6 h-6 text-primary" />

                </div>


                <h1 className="text-2xl font-bold mt-2">Welcome </h1>
                <p className="text-base-content/60">Sign Up to your account</p>

              </div>


            </div>




          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            <div className="form-control w-sm">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  {...register("email")}
                  className={`input input-bordered w-full pl-10 ${
                    errors.email ? "input-error" : ""
                  }`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>


              <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                 
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`input input-bordered w-full pl-10 ${
                    errors.password ? "input-error" : ""
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                 onClick={() => setShowPassword(!showPassword)}
                >
                 {showPassword ? (
                  <EyeOff   className="h-5 w-5 text-base-content/40"/>
                  ) : (
                  <Eye className="h-5 w-5 text-base-content/40"/>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>


        <button type="submit" className="btn btn-primary w-full">
          {
            isLoggingIn ? (
             <>
               <Loader2 className="h-5 w-5 animate-spin" />
                  Logging...
                </>
            ) : (
              "Login "
            )
          }
        </button>

          </form>

        </div>






        <div className="w-1/2 h-full bg-red-200">Right</div>
      </div>
    
        
        </>

    )
}

export default LoginPage