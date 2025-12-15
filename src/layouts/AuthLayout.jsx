import { Outlet } from "react-router";
import Logo from "../components/Logo/Logo";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-[45%] flex flex-col px-6 lg:px-20 py-8">

        <div className="mb-12 mt-4">
          <Logo className="scale-150" />
        </div>

        <div className="flex-1 flex items-center">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>


      <div className="hidden w-[55%] lg:flex items-center justify-center bg-linear-to-br from-[#0f172a] to-[#020617] text-white px-14">

        <div className="max-w-xl -ml-10">
          <h2 className="text-4xl font-extrabold leading-tight">
            Smarter Asset Management
            <br /> for Modern Enterprises
          </h2>

          <p className="mt-4 text-gray-300 text-lg">
            Designed for HR teams to track, assign and manage assets with clarity and control.
          </p>

          <ul className="mt-6 space-y-3 text-gray-200 text-base">
            <li>✓ Centralized asset inventory</li>
            <li>✓ Automated request & approval</li>
            <li>✓ Scalable for growing companies</li>
            <li>✓ Best B2B HR & Asset Management Web Application</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
