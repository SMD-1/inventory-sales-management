import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/auth/Signup.jsx";
import Login from "./pages/auth/Login.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import OtpVerification from "./pages/auth/OtpVerification.jsx";
import CreateNewPassword from "./pages/auth/CreateNewPassword.jsx";
import AppLayout from "./layouts/AppLayout.jsx";
import Home from "./pages/home/Home.jsx";
import Product from "./pages/product/Product.jsx";
import Invoice from "./pages/invoice/Invoice.jsx";
import Statistics from "./pages/statistics/Statistics.jsx";
import Settings from "./pages/settings/Settings.jsx";
import AddProduct from "./pages/product/AddProduct.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "product",
        element: <Product />,
      },
      {
        path: "product/add",
        element: <AddProduct />,
      },
      {
        path: "invoice",
        element: <Invoice />,
      },
      {
        path: "statistics",
        element: <Statistics />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/otp-verification",
    element: <OtpVerification />,
  },
  {
    path: "/create-new-password",
    element: <CreateNewPassword />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
