import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { FaBars } from "react-icons/fa";
import Logo from "../../../components/Logo/Logo";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Navbar = () => {
  const { user, logOutUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [dbUser, setDbUser] = useState(null);

  useEffect(() => {
    if (!user?.email) {
      // setDbUser(null);
      return;
    }

    axiosSecure
      .get(`/users/${user.email}`)
      .then((res) => setDbUser(res.data))
      .catch(() => setDbUser(null));
  }, [user?.email, axiosSecure]);

  const handleLogout = async () => {
    await logOutUser();
    localStorage.removeItem("access-token");
  };

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 font-medium transition-all duration-200
     ${
       isActive
         ? "text-primary underline underline-offset-4"
         : "hover:text-primary hover:underline underline-offset-4"
     }`;

  return (
    <header className="sticky top-0 z-50 bg-gray-100 border-b shadow-xl">
      <nav className="max-w-7xl mx-auto py-2 px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <div className="flex items-center gap-3">
            {/* hamburger */}
            <div className="lg:hidden dropdown">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <FaBars className="text-xl" />
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded box w-48"
              >
                <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
                <li><NavLink to="/about" className={navLinkClass}>About</NavLink></li>
                <li><NavLink to="/support" className={navLinkClass}>Support</NavLink></li>
                <Link
                  to="/login"
                  className="btn btn-sm btn-outline btn-primary hover:scale-105 transition"
                >
                  Login
                </Link>
              </ul>
            </div>

            <Logo />
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
            <NavLink to="/support" className={navLinkClass}>Support</NavLink>
          </div>

          <div className="flex items-center gap-3">

            {!user && (
              <div className="hidden lg:flex items-center gap-3">

                <Link
                  to="/login"
                  className="btn btn-outline btn-primary hover:scale-105 transition"
                >
                  Login
                </Link>
                
                <Link
                  to="/hr-register"
                  className="btn btn-primary hover:scale-105 transition"
                >
                  Join as HR
                </Link>
                <Link
                  to="/user-register"
                  className="btn btn-primary hover:scale-105 transition"
                >
                  Join as Employee
                </Link>
              </div>
            )}

            {user && dbUser && (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost avatar">
                  <div className="w-14 h-14 rounded-full  ring ring-primary ring-offset-2">
                    <img
                      src={
                        dbUser.profileImage ||
                        dbUser.companyLogo ||
                        "https://i.ibb.co/9m9PpJk/avatar.png"
                      }
                      alt="profile"
                    />
                  </div>
                </label>

                <ul
                  tabIndex={0}
                  className="menu dropdown-content mt-3 p-3 shadow-lg bg-base-100 rounded-xl w-56 space-y-1"
                >
                  {dbUser.role === "employee" && (
                    <>
                      <li><NavLink to="/dashboard/employee" className={navLinkClass}>My Assets</NavLink></li>
                      <li><NavLink to="/dashboard/employee/team" className={navLinkClass}>My Team</NavLink></li>
                      <li><NavLink to="/dashboard/employee/request" className={navLinkClass}>Request Asset</NavLink></li>
                      <li><NavLink to="/dashboard/profile" className={navLinkClass}>Profile</NavLink></li>
                    </>
                  )}

                  {dbUser.role === "hr" && (
                    <>
                      <li><NavLink to="/dashboard/hr/asset-list" className={navLinkClass}>Asset List</NavLink></li>
                      <li><NavLink to="/dashboard/hr/add-asset" className={navLinkClass}>Add Asset</NavLink></li>
                      <li><NavLink to="/dashboard/hr/requests" className={navLinkClass}>All Requests</NavLink></li>
                      <li><NavLink to="/dashboard/hr/emply-list" className={navLinkClass}>Employee List</NavLink></li>
                      <li><NavLink to="/dashboard/hr/profile" className={navLinkClass}>Profile</NavLink></li>
                    </>
                  )}

                  <li className="border-t pt-2">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left text-error hover:bg-error/10 px-3 py-2 rounded-md"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}

          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
