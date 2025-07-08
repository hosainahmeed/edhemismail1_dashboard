import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import Dashboard from "../components/layout/main/Dashboard";
import Login from "../features/auth/ui/Login";
import ForgetPassword from "../features/auth/ui/ForgetPassword";
import Verification from "../features/auth/ui/Verification";
import ResetPassword from "../features/auth/ui/ResetPassword";

export const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Login />,
  },
  {
    path: "/auth/forgot-password",
    element: <ForgetPassword />,
  },
  {
    path: "/auth/varification",
    element: <Verification />,
  },
  {
    path: "/auth/reset-password",
    element: <ResetPassword />,
  },
]);
