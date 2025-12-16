import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../../../components/Logo/Logo";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dbUser, setDbUser] = useState(null);

  const { user, logOutUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}`).then((res) => {
        setDbUser(res.data);
      });
    }
  }, [user, axiosSecure]);

  const hoverClass = "hover:text-primary hover:underline";

  const publicLinks = [
    { to: "/", label: "Home" },
    { to: "/login", label: "Login" },
    { to: "/user-register", label: "Join as Employee" },
    { to: "/hr-register", label: "Join as HR Manager" },
  ];

  const employeeLinks = [
    { to: "/dashboard/employee", label: "My Assets" },
    { to: "/dashboard/employee/team", label: "My Team" },
    { to: "/dashboard/employee/request", label: "Request Asset" },
    { to: "/dashboard/profile", label: "Profile" },
  ];

  const hrLinks = [
    { to: "/dashboard/hr/asset-list", label: "Asset List" },
    { to: "/dashboard/hr/add-asset", label: "Add Asset" },
    { to: "/dashboard/hr/requests", label: "All Requests" },
    { to: "/dashboard/hr/emply-list", label: "Employee List" },
    { to: "/dashboard/hr/profile", label: "Profile" },
  ];

  const handleLogout = async () => {
    await logOutUser();
    localStorage.removeItem("access-token");
    setOpen(false);
  };

  const renderLinks = (links) =>
    links.map((l) => (
      <li key={l.to}>
        <NavLink
          to={l.to}
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            `block px-3 py-2 rounded-md transition ${
              isActive ? "text-primary font-medium" : hoverClass
            }`
          }
        >
          {l.label}
        </NavLink>
      </li>
    ));

  return (
    <header className="w-full bg-base-200 shadow">
      <nav className="max-w-7xl mx-auto px-4 lg:px-10">
        <div className="flex items-center justify-between h-16">
          <div className="shrink-0">
            <Logo />
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {!user && <ul className="flex gap-4">{renderLinks(publicLinks)}</ul>}

            {user && dbUser && (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src={
                        user.companyLogo ||
                        "https://i.ibb.co/9m9PpJk/avatar.png"
                      }
                      alt="avatar"
                    />
                  </div>
                </label>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                >
                  {dbUser.role === "hr"
                    ? renderLinks(hrLinks)
                    : renderLinks(employeeLinks)}

                  <li>
                    <button onClick={handleLogout} className="text-error">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* responsive */}
          <div className="lg:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-md focus:outline-none"
            >
              {open ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        <div
          className={`lg:hidden transition-all duration-200 overflow-hidden ${
            open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-base-100 border border-base-300 rounded-lg mt-2 p-3">
            {!user && <ul className="space-y-1">{renderLinks(publicLinks)}</ul>}

            {user && dbUser && (
              <ul className="space-y-1">
                {dbUser.role === "hr"
                  ? renderLinks(hrLinks)
                  : renderLinks(employeeLinks)}

                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-error"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
