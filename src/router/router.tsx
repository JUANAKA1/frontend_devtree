import { createBrowserRouter, Navigate } from "react-router";
import { Login } from "../auth/pages/Login";
import { Register } from "../auth/pages/Register";
import { AuthLayout } from "../auth/layout/AuthLayout";
import AppLayout from "../Devtree/layout/AppLayout";
import { Profile } from "../Devtree/pages/Profile";
import { LinkTree } from "../Devtree/pages/LinkTree";
import { Handle } from "../Devtree/pages/Handle";

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <LinkTree />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/:handle",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Handle />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/auth/login" />,
  },
]);
