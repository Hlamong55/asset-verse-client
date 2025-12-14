import { useState } from "react";
import { Link } from "react-router";
import { FaCubes, FaBars, FaTimes } from "react-icons/fa";
import Logo from "../../../components/Logo/Logo";

  const Navbar = () => {
  const [open, setOpen] = useState(false);

  const NAV_LINKS = [
    { to: "/", label: "Home" },
    { to: "/login", label: "Login" },
    { to: "/join-employee", label: "Join as Employee" },
    { to: "/register", label: "Join as HR Manager" },
  ];
  const hoverColorClass = "hover:text-primary";

  return (
    <div className="w-full bg-base-200 shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          <Logo></Logo>

          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            <ul className="flex items-center gap-4 ">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className={`px-2 py-1 rounded-md transition-colors duration-150 ${hoverColorClass} hover:underline`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* responsive */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setOpen((s) => !s)}
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex npm install react-icons justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {open ? (
                <FaTimes className="h-4 w-4" />
              ) : (
                <FaBars className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Dropdown menu */}
        <div
          className={`lg:hidden absolute left-50 right-0  transition-all duration-200 transform origin-top ${
            open ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
          }`}
          
        >
          <div className=" mx-2 bg-base-100 border border-base-300 rounded-md shadow-md overflow-hidden">
            <ul className="flex flex-col">
              {NAV_LINKS.map((l) => (
                <li key={l.to} className="border-b border-base-200 last:border-b-0">
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={`block px-4 py-2 text-base ${hoverColorClass} transition-colors duration-150`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
