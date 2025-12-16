import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import HRRegister from "../pages/Auth/Register/HRRegister";
import EmployeeRegister from "../pages/Auth/Register/EmployeeRegister";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRouter";
import HRDashboard from "../pages/Dashboard/HRDashboard/HRDashboard";
import EmployeeDB from "../pages/Dashboard/EmployeeDashboard/EmployeeDB";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
        {
            index: true,
            element: <Home></Home>
        }
    ]
  },
  {
    path: '/',
    element: <AuthLayout></AuthLayout>,
    children: [
        {
            path: "login",
            element: <Login></Login>
        },
        {
            path: "hr-register",
            element: <HRRegister></HRRegister>
        },
        {
          path:"user-register",
          element: <EmployeeRegister></EmployeeRegister>
        }
    ]
  },
  {
    path: "dashboard",
    element: <PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>,

    children: [
      {
        path: "hr",
        element: <HRDashboard></HRDashboard>
      },
      {
        path: "employee",
        element: <EmployeeDB></EmployeeDB>
      }
    ]
  }
]);