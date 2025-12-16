import { Outlet } from "react-router";
import Navbar from "../pages/Shared/Navbar/Navbar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
