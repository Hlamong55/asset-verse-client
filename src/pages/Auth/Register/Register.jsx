import { useForm, useWatch } from "react-hook-form";
import { Link } from "react-router";

const Register = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

   const role = useWatch({
    control,
    name: "role",
  });

  const onSubmit = (data) => {
    console.log("Register Data:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="w-full max-w-md bg-white border border-base-300 rounded-2xl shadow-sm p-8">

        <h2 className="text-3xl font-extrabold text-center mb-2">
          Create Account
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Join AssetVerse as HR Manager or Employee
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* name */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Full Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-error text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* email */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-error text-sm mt-1">{errors.email.message}</p>
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
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-error text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* happy birthday */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Date of Birth</span>
            </label>
            <input
              type="date"
              className="input input-bordered w-full"
              {...register("dateOfBirth", {
                required: "Date of birth is required",
              })}
            />
          </div>

          {/* choose role */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Register As</span>
            </label>
            <select
              className="select select-bordered w-full"
              {...register("role", { required: true })}
            >
              <option value="">Select Role</option>
              <option value="employee">Employee</option>
              <option value="hr">HR Manager</option>
            </select>
          </div>

          {/* for hr/admin */}
          {role === "hr" && (
            <>
              <div>
                <label className="label">
                  <span className="label-text font-medium">Company Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  {...register("companyName", {
                    required: "Company name is required",
                  })}
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Company Logo URL
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="ImgBB / Cloudinary URL"
                  {...register("companyLogo", {
                    required: "Company logo is required",
                  })}
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="btn btn-primary w-full mt-4 rounded-full
                       transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
