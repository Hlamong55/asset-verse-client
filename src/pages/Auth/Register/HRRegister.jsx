import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const HRRegister = () => {
  const { registerUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await registerUser(data.email, data.password);

      const hrInfo = {
        name: data.name,
        email: data.email,
        role: "hr",
        companyName: data.companyName,
        companyLogo: data.companyLogo,
        dateOfBirth: data.dateOfBirth,
        packageLimit: 5,
        currentEmployees: 0,
        subscription: "basic",
        createdAt: new Date(),
      };

      await axiosSecure.post("/users", hrInfo);

      const res = await axiosSecure.post("/jwt", { email: data.email });
      localStorage.setItem("access-token", res.data.token);

      navigate("/dashboard/hr");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-3xl font-extrabold">Join as HR Manager</h2>

      <input {...register("name", { required: true })} className="input input-bordered w-full" placeholder="Full Name" />

      <input {...register("companyName", { required: true })} className="input input-bordered w-full" placeholder="Company Name" />

      <input {...register("companyLogo", { required: true })} className="input input-bordered w-full" placeholder="Company Logo URL" />

      <input {...register("email", { required: true })} className="input input-bordered w-full" placeholder="Work Email" />

      <input
    type="password"
    {...register("password", {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
    })}
    className="input input-bordered w-full"
    placeholder="Password"
  />

  {errors.password && (
    <p className="text-error text-sm mt-1">
      {errors.password.message}
    </p>
  )}
      

      <input type="date" {...register("dateOfBirth", { required: true })} className="input input-bordered w-full" />

      <button className="btn btn-primary w-full  transition-transform duration-200
           hover:scale-[1.04] active:scale-95">Register Company</button>

      <p className="text-center">
        Joining as <strong>Employee</strong>? <Link to="/user-register" className="text-primary font-medium hover:text-green-700 hover:underline">Register here</Link>
      </p>
    </form>
  );
};

export default HRRegister;
