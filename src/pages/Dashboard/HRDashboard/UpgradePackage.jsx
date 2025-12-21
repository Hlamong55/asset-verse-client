import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { FaCheckCircle, FaCrown } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpgradePackage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: packages = [], isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/packages");
      return res.data;
    },
  });

  const { data: profile = {} } = useQuery({
    queryKey: ["hr-profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const handleUpgrade = async (packageId) => {
  const result = await Swal.fire({
    title: "Upgrade plan?",
    text: "You will be redirected to payment page",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes",
  });

  if (!result.isConfirmed) return;

  try {
    const res = await axiosSecure.post("/create-checkout-session", {
      packageId,
    });
    window.location.assign(res.data.url);
  } catch (err) {
    console.log(err);
    Swal.fire("Error", "Payment failed", "error");
  }
  };

    if (isLoading) {
    return <div className="text-center font-semibold py-40">Loading packages...</div>;
    }

  return (
    <div className="space-y-10 bg-base-200 py-10 px-5">
      <div className="text-center max-w-3xl mx-auto">
        <div className="flex justify-center mb-3">
          <FaCrown className="text-4xl text-primary" />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold">
          Upgrade Your Plan
        </h2>
        <p className="text-gray-600 mt-3">
          Upgrade your subscription to increase employee limits and unlock
          premium features.
        </p>
      </div>

      {/* cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((plan, index) => {
          const isCurrent =
            plan.name?.toLowerCase() ===
            profile?.subscription?.toLowerCase();

          return (
            <motion.div
              key={plan._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className={`relative rounded-2xl p-8 border-2
                ${
                  isCurrent
                    ? "border-primary bg-primary/10"
                    : "border-base-300 bg-blue-100"
                }
                shadow-sm transition-all duration-200
                hover:-translate-y-1 hover:shadow-lg
              `}
            >
    
              {isCurrent && (
                <span className="absolute -top-3 right-4 badge badge-primary">
                  Running
                </span>
              )}

              <h3 className="text-3xl font-bold text-center text-gray-900">
                {plan.name}
              </h3>

              <div className="border mt-3"></div>

              {/* price */}
              <p className="mt-5 text-center text-4xl font-extrabold text-primary">
                ${plan.price}
                <span className="text-lg text-gray-700 font-medium">
                  {" "}
                  /month
                </span>
              </p>

              <p className="mt-2 text-center text-gray-700">
                Up to{" "}
                <span className="font-bold">{plan.employeeLimit}</span>{" "}
                employees
              </p>

              <div className="my-6 border"></div>

              <ul className="space-y-3 text-gray-700">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <FaCheckCircle className="text-primary text-lg" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                disabled={isCurrent}
                onClick={() => !isCurrent && handleUpgrade(plan._id)}
                className={`
                  btn w-full mt-8 rounded-2xl text-lg
                  transition-transform duration-200
                  ${
                    isCurrent
                      ? "btn-disabled text-gray-800"
                      : "btn-primary hover:scale-105 active:scale-95"
                  }
                `}
              >
                {isCurrent ? "Current Plan" : "Upgrade Plan"}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default UpgradePackage;
