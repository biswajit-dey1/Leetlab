import { create } from "zustand"
import toast from "react-hot-toast"
import { axiosInstance } from "../lib/axios";



export const useAuthStore = create((set) => ({
    authUser: null,
    isSigninUp: false,
    isLoggingIn: false,
    isCheckingAuth: false,

    signup: async (data) => {
        set({ isSigninUp: true });

        try {

            const res = await axiosInstance.post("/auth/register", data)

            set({ authUser: res.data.user });

            toast.success(res.data.message)
        } catch (error) {
            console.log("Error signing up", error);
            toast.error("Error signing up")
        } finally {
            set({ isSigninUp: false })
        }
    },

    login: async (data) => {

        set({ isLoggingIn: true })

        try {
            const res = await axiosInstance.post("/auth/login", data)

            set({ authUser: res.data.user })

            toast.success(res.data.message)
        } catch (error) {
            console.log("Error logging in", error);
            toast.error("Error logging in");
        } finally {
            set({ isLoggingIn: false})
        }
        
    }
}))

