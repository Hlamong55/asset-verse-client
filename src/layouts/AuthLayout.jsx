import Logo from "../components/Logo/Logo";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto flex bg-base-100">

      {/* LEFT: Auth Form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Logo */}
        <div className="px-6 py-6">
          <Logo />
        </div>

        {/* Form Area */}
        <div className="flex flex-1 items-center justify-center px-6">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>

      {/* RIGHT: Full Background Section */}
      <div
        className="hidden lg:flex w-1/2 relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.ibb.co.com/7xhP86FG/A-vibrant-dynamic-illustration-of-a-comprehensive-B2-B-lead-generation-funnel-showcasing-the-1024x585.webp')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Text Content */}
        <div className="relative z-10 flex items-center justify-center w-full px-12 text-white">
          <div>
            <h2 className="text-4xl font-extrabold leading-tight">
              Smart Asset <br /> Management Starts Here
            </h2>

            <p className="mt-4 text-white/90 max-w-md">
              AssetVerse helps HR teams track, assign, and manage company assets
              with complete visibility and control.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AuthLayout;
