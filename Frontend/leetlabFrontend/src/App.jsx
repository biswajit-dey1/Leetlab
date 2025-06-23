import { useState } from 'react'
import HomePage from './page/HomePage'
import SignUpPage from './page/SignUpPage'

import { Toaster } from "react-hot-toast"

import { Routes, Route, Navigate } from 'react-router-dom'

import { useAuthStore } from "./store/useAuthStore"

import LoginPage from './page/LoginPage'
import Layout from './layout/layout'
import AdminRoute from './components/AdminRoute'

import AddProblem from './page/AddProblem'



function App() {


  const { authUser } = useAuthStore()

  return (
    <>

      <div flex flex-col items-center justify-start>
        <Toaster />
        <Routes>

          <Route path="/" element={<Layout />}>
            <Route
              index
              element={authUser ? <HomePage /> : <Navigate to={"/login"} />}

            />

          </Route>
          <Route
            path="/" element={authUser ? <HomePage /> : <Navigate to={"/signup"} />}
          />

          <Route
            path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to={"/login"} />}
          />

          <Route

            path='/login'
            element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
          />

          <Route
          element={<AdminRoute/>}
          >
            <Route
            path='/add-problem'
            element={authUser ? <AddProblem/> : <Navigate to={"/"}/>}
            />

          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
