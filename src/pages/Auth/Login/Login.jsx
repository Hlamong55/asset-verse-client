import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Login = () => {
  const { signInUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,           // ✅ ADD THIS
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await signInUser(data.email, data.password);

      const res = await axiosSecure.post("/jwt", {
        email: data.email,
      });
      localStorage.setItem("access-token", res.data.token);

      const userRes = await axiosSecure.get(`/users/${data.email}`);
      const role = userRes.data.role;

      Swal.fire({
        icon: "success",
        title: "Login Successful 🎉",
        text: "Welcome back to AssetVerse!!",
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => {
        if (role === "hr") {
          navigate("/dashboard/hr/asset-list");
        } else {
          navigate("/dashboard/employee/assets");
        }
      }, 1500);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid email or password",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-3xl font-extrabold">Welcome Back</h2>
      <p className="text-gray-600 text-sm">
        Login to continue to AssetVerse
      </p>

      {/* email */}
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

      {/* password */}
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

      <button
        type="submit"
        className="btn btn-primary w-full mt-2
                   transition-transform duration-200
                   hover:scale-105 active:scale-95"
      >
        Login
      </button>

      <p className="text-sm text-center text-gray-600">
        New here? Join as{" "}
        <Link
          to="/user-register"
          className="text-primary font-semibold hover:text-green-700 hover:underline"
        >
          Employee
        </Link>{" "}
        or{" "}
        <Link
          to="/hr-register"
          className="text-primary font-semibold hover:text-green-700 hover:underline"
        >
          HR Manager
        </Link>
      </p>

      {/* 🔥 PREFILL BUTTONS */}
      <div className="flex gap-5">
        <button
          type="button"
          onClick={() => {
            setValue("email", "hilltech@gmail.com");
            setValue("password", "12345hill@");
          }}
          className="w-full mt-6 bg-gray-300 hover:bg-gray-600 hover:text-white
                     font-semibold py-2 rounded-lg hover:scale-105 transition"
        >
          🚀 Use HR Account <br />
          <span className="text-xs">(Click Here to Prefill)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setValue("email", "tazing@user1.com");
            setValue("password", "tazing@user1");
          }}
          className="w-full mt-6 bg-gray-300 hover:bg-gray-600 hover:text-white
                     font-semibold py-2 rounded-lg hover:scale-105 transition"
        >
          🚀 Use Employee Account <br />
          <span className="text-xs">(Click Here to Prefill)</span>
        </button>
      </div>
    </form>
  );
};

export default Login;
