import { useForm } from "react-hook-form";
import { Link } from "react-router";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data:", data);
  };

  return (
    <div className="w-full bg-white border border-base-300 rounded-2xl shadow-sm p-8">

      <h2 className="text-3xl font-extrabold text-center mb-2">
        Welcome Back
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Login to continue to AssetVerse
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* email */}
        <div>
          <label className="label">
            <span className="label-text font-medium">Email</span>
          </label>
          <input
            type="email"
            className="input input-bordered w-full"
            {...register("email", {
              required: "Email is required",
            })}
          />
          {errors.email && (
            <p className="text-error text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* password */}
        <div>
          <label className="label">
            <span className="label-text font-medium">Password</span>
          </label>
          <input
            type="password"
            className="input input-bordered w-full"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <p className="text-error text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="text-right">
          <Link
            to="/forgot-password"
            className="text-sm text-primary font-medium hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full mt-4 rounded-full
                     transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          Login
        </button>
      </form>

      <p className="text-center text-gray-600 mt-4 text-sm">
        Don’t have an account?{" "}
        <Link to="/register" className="text-primary font-medium">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
