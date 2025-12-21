import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import HRRegister from "../pages/Auth/Register/HRRegister";
import EmployeeRegister from "../pages/Auth/Register/EmployeeRegister";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRouter";
import AssetList from "../pages/Dashboard/HRDashboard/AssetList";
import AddAsset from "../pages/Dashboard/HRDashboard/AddAsset";
import AllRequest from "../pages/Dashboard/HRDashboard/AllRequest";
import EmployeeList from "../pages/Dashboard/HRDashboard/EmployeeList";
import HRProfile from "../pages/Dashboard/HRDashboard/HRProfile";
import MyAssets from "../pages/Dashboard/EmployeeDashboard/MyAssets";
import RequestAsset from "../pages/Dashboard/EmployeeDashboard/RequestAsset";
import MyTeam from "../pages/Dashboard/EmployeeDashboard/MyTeam";
import EmployeeProfile from "../pages/Dashboard/EmployeeDashboard/EmployeeProfile";
import UpgradePackage from "../pages/Dashboard/HRDashboard/UpgradePackage";
import PaymentSuccess from "../pages/Dashboard/HRDashboard/Payment/PaymentSuccess";
import PaymentHistory from "../pages/Dashboard/HRDashboard/Payment/PaymentHistory";
import About from "../pages/About/About";
import Support from "../pages/Home/Support/Support";
import ErrorPage from "../pages/ErrorPage/ErrorPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
        {
          index: true,
          element: <Home></Home>
        },
        {
          path: "about",
          element: <About></About>
        },
        {
          path: "support",
          element: <Support></Support>
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

      // hr dashboard
      {
        path: "hr/asset-list",
        element: <AssetList></AssetList>
      },
      {
        path: "hr/add-asset",
        element: <AddAsset></AddAsset>
      },
      {
        path: "hr/requests",
        element: <AllRequest></AllRequest>
      },
      {
        path: "hr/emply-list",
        element: <EmployeeList></EmployeeList>
      },
      {
        path: "hr/profile",
        element: <HRProfile></HRProfile>
      },
      {
        path: "hr/upgrade-package",
        element: <UpgradePackage></UpgradePackage>
      },
      {
        path: "hr/payment-success",
        element: <PaymentSuccess></PaymentSuccess>
      },
      {
        path: "hr/payment-history",
        element: <PaymentHistory></PaymentHistory>
      },


      // employee dashboard
      {
        path: "employee/assets",
        element: <MyAssets></MyAssets>
      },
      {
        path: "employee/request",
        element: <RequestAsset></RequestAsset>
      },
      {
        path: "employee/team",
        element: <MyTeam></MyTeam>
      },
      {
        path: "employee/profile",
        element: <EmployeeProfile></EmployeeProfile>
      }
    ]
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>
  }
]);