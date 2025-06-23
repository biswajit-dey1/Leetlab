import { create } from "zustand";

import { axiosInstance } from "../lib/axios";

import toast from "react-hot-toast"


export const usePromblemStore = create((set) => ({

    problems: [],
    problem: null,
    solvedProblems: [],
    isProblemsLoading: false,
    isProblemLoading: false,

    getAllProblems: async () => {
        try {
            set({ isProblemsLoading: true });

            const res = await axiosInstance.get("/problem/get-all-problems");

            set({problems:res.data.problems})

            toast.success(res.data.message)


        } catch (error) {

          console.log("Error getting all problems", error);
          toast.error("Error in getting problems");
          
        } finally {
           set({isProblemsLoading:false})
        }

    }
}

))