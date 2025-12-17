import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import {
  FaBox,
  FaPlus,
  FaUsers,
  FaClipboardList,
  FaUserCircle,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";
import Logo from "../components/Logo/Logo";
import useAuth from "../hooks/useAuth";


const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();

  const isHR = user?.role === "hr";

  const hrMenu = [
    { to: "/dashboard/hr/asset-list", label: "Asset List", icon: <FaBox /> },
    { to: "/dashboard/hr/add-asset", label: "Add Asset", icon: <FaPlus /> },
    { to: "/dashboard/hr/requests", label: "All Requests", icon: <FaClipboardList /> },
    { to: "/dashboard/hr/emply-list", label: "Employee List", icon: <FaUsers /> },
    { to: "/dashboard/hr/profile", label: "Profile", icon: <FaUserCircle /> },
  ];

  const employeeMenu = [
    { to: "/dashboard/employee/assets", label: "My Assets", icon: <FaBox /> },
    { to: "/dashboard/employee/team", label: "My Team", icon: <FaUsers /> },
    { to: "/dashboard/employee/request", label: "Request Asset", icon: <FaClipboardList /> },
    { to: "/dashboard/employee/profile", label: "Profile", icon: <FaUserCircle /> },
  ];

  const menu = isHR ? hrMenu : employeeMenu;

  const handleLogout = async () => {
    await logOutUser();
    navigate("/login");
  }

  const renderMenu = (closeOnClick = false) =>
    menu.map((item) => (
      <li key={item.to}>
        <NavLink
          to={item.to}
          onClick={() => closeOnClick && setOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md transition font-medium ${
              isActive
                ? "bg-primary text-white"
                : "hover:bg-primary"
            }`
          }
        >
          <span className="text-lg">{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      </li>
    ));

  return (
    <div className="min-h-screen flex bg-base-300">
      <aside className="hidden md:flex md:flex-col w-64 bg-base-100 border-r border-base-300">
        <div className="p-5 border-b">
          <Logo />
        </div>

        <ul className="menu px-4 py-4 space-y-1">
          {renderMenu()}
        </ul>

        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="btn bg-red-500 text-white flex items-center gap-2 w-full px-3 py-2 rounded-md hover:bg-red-700 transition-transform duration-300 hover:scale-105"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>

      {/* mobile Responsive */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/40">
          <aside className="w-64 h-full bg-base-100">
            <div className="flex items-center justify-between p-4 border-b">
              <Logo />
              <button onClick={() => setOpen(false)}>
                <FaTimes className="text-xl" />
              </button>
            </div>

            <ul className="menu px-4 py-4 space-y-1">
              {renderMenu(true)}
              <button
            onClick={handleLogout}
            className="btn mt-4 bg-red-500 text-white flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-700 transition-transform duration-300 hover:scale-105"
          >
            <FaSignOutAlt />
            Logout
          </button>
            </ul>

          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <div className="md:hidden flex items-center gap-3 p-4 bg-base-100 border-b">
          <button onClick={() => setOpen(true)}>
            <FaBars className="text-xl" />
          </button>
          <span className="font-bold">Dashboard</span>
        </div>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
