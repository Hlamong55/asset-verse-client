import Logo from "../components/Logo/Logo";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex">

      <div className="w-full lg:w-[42%] flex flex-col px-10">
        <div className="py-8">
          <Logo />
        </div>

        <div className="flex flex-1 items-center">
          <Outlet />
        </div>
      </div>

      <div className="hidden lg:flex w-[58%] bg-[#0f172a] text-white px-16">
        <div className="flex flex-col justify-center max-w-lg">
          <h2 className="text-4xl font-extrabold leading-tight">
            Smarter Asset Management <br /> for Modern Enterprises
          </h2>

          <p className="mt-4 text-white/80">
            Designed for HR teams to track, assign and manage assets with clarity and control.
          </p>

          <ul className="mt-6 space-y-3 text-white/90">
            <li>✔ Centralized asset inventory</li>
            <li>✔ Automated request & approval</li>
            <li>✔ Scalable for growing companies</li>
          </ul>
        </div>
      </div>

    </div>
  );
};


export default AuthLayout;
