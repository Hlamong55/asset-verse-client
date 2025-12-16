import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";


const EmployeeRegister = () => {
  const { registerUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await registerUser(data.email, data.password);

      const employeeInfo = {
        name: data.name,
        email: data.email,
        role: "employee",
        dateOfBirth: data.dateOfBirth,
        createdAt: new Date(),
      };

      await axiosSecure.post("/users", employeeInfo);
      const res = await axiosSecure.post("/jwt", { email: data.email });
      localStorage.setItem("access-token", res.data.token);

    Swal.fire({
      icon: "success",
      title: "Registration Successful 🎉",
      text: "Your employee account has been created successfully.",
      confirmButtonColor: "#2563eb",
      timer: 2000,
      showConfirmButton: false,
    });

      navigate("/dashboard/employee");
    } catch (err) {
      console.error(err);

    Swal.fire({
      icon: "error",
      title: "Registration Failed",
      text: err.message || "Something went wrong. Please try again.",
    });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-3xl font-extrabold">Join as Employee</h2>

      <input {...register("name", { required: true })} className="input input-bordered w-full" placeholder="Full Name" />
      <input {...register("email", { required: true })} className="input input-bordered w-full" placeholder="Email" />

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
           hover:scale-[1.04] active:scale-95">Register</button>

      <p className="text-center">
        Joining as <strong>HR</strong>? <Link to="/hr-register" className="text-primary font-medium hover:text-green-700 hover:underline">Register here</Link>
      </p>
    </form>
  );
};

export default EmployeeRegister;
