import React from 'react'

import { useAuthStore } from '../store/useAuthStore'
import { Loader } from "lucide-react";

import { Navigate, Outlet } from 'react-router-dom';
function AdminRoute() {

    const { authUser } = useAuthStore()


    if (!authUser || authUser.role !== "ADMIN") {

        return <Navigate to="/" />;
    }

    return <Outlet />
}

export default AdminRoute