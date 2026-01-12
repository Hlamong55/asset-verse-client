import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import CompleteProfileModal from "../../../components/GoogleLoginModal/CompleteProfileModal";


const Login = () => {
  const { signInUser, googleLogin, user, setUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [showProfileModal, setShowProfileModal] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  /* EMAIL / PASSWORD LOGIN */
  const onSubmit = async (data) => {
    try {
      await signInUser(data.email, data.password);

      const tokenRes = await axiosSecure.post("/jwt", {
        email: data.email,
      });
      localStorage.setItem("access-token", tokenRes.data.token);

      const userRes = await axiosSecure.get(`/users/${data.email}`);
      const role = userRes.data.role;

      Swal.fire({
        icon: "success",
        title: "Login Successful 🎉",
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate(
          role === "hr"
            ? "/dashboard/hr/asset-list"
            : "/dashboard/employee/assets"
        );
      }, 1500);
    } catch (err) {
      console.error(err);
      Swal.fire("Login Failed", "Invalid email or password", "error");
    }
  };

  /* ================= GOOGLE LOGIN ================= */
  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      const googleUser = result.user;

      // save or check user in DB
      const res = await axiosSecure.post("/users", {
        name: googleUser.displayName,
        email: googleUser.email,
        profileImage: googleUser.photoURL,
      });

      setUser(googleUser);

      if (!res.data.profileComplete) {
        setShowProfileModal(true); // 🔥 modal open
      } else {
        navigate(
          res.data.role === "hr"
            ? "/dashboard/hr/asset-list"
            : "/dashboard/employee/assets"
        );
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Google login failed", "error");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h2 className="text-3xl font-extrabold">Welcome Back</h2>
        <p className="text-gray-600 text-sm">
          Login to continue to AssetVerse
        </p>

        {/* EMAIL */}
        <div>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="input input-bordered w-full"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-error text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
            })}
            className="input input-bordered w-full"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-error text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* LOGIN BUTTON */}
        <button
          type="submit"
          className="btn btn-primary w-full mt-2
                     transition-transform duration-200
                     hover:scale-105 active:scale-95"
        >
          Login
        </button>

        {/* REGISTER LINKS */}
        <p className="text-sm text-center text-gray-600">
          New here? Join as{" "}
          <Link
            to="/user-register"
            className="text-primary font-semibold hover:underline"
          >
            Employee
          </Link>{" "}
          or{" "}
          <Link
            to="/hr-register"
            className="text-primary font-semibold hover:underline"
          >
            HR Manager
          </Link>
        </p>

        {/* GOOGLE LOGIN */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full flex gap-2 mt-2 transition-transform duration-200
                     hover:scale-105 active:scale-95 rounded shadow"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5"
          />
          Continue with Google
        </button>

        {/* DEMO BUTTONS */}
        <div className="flex gap-5 mt-12">
          <button
            type="button"
            onClick={() => {
              setValue("email", "hilltech@gmail.com");
              setValue("password", "12345hill@");
            }}
            className="w-full bg-gray-300 hover:bg-gray-600 hover:text-white
                       font-semibold py-3 rounded-lg hover:scale-105 transition"
          >
            🚀 Use Demo HR
          </button>

          <button
            type="button"
            onClick={() => {
              setValue("email", "tazing@user1.com");
              setValue("password", "tazing@user1");
            }}
            className="w-full bg-gray-300 hover:bg-gray-600 hover:text-white
                       font-semibold py-3 rounded-lg hover:scale-105 transition"
          >
            🚀 Use Demo Employee
          </button>
        </div>
      </form>

      {/* COMPLETE PROFILE MODAL */}
      {showProfileModal && user && (
        <CompleteProfileModal
          user={user}
          onClose={() => setShowProfileModal(false)}
        />
      )}
    </>
  );
};

export default Login;
