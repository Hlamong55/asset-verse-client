import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaCheckCircle, FaCrown } from "react-icons/fa";

// const cardVariants = {
//   hidden: { opacity: 0, y: 40 },
//   show: (i) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: i * 0.15, duration: 0.6 },
//   }),
// };

const UpgradePackage = () => {
  const axiosSecure = useAxiosSecure();

  const { data: packages = [], isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/packages");
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-40">Loading packages...</div>;
  }

  return (
    <div className="space-y-10 bg-base-200 py-8 px-5">
      {/* header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="flex justify-center mb-3">
          <FaCrown className="text-4xl text-primary" />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold">
          Upgrade Your Plan
        </h2>
        <p className="text-gray-600 mt-3">
          Unlock higher employee limits, better analytics and premium support
          for your organization.
        </p>
      </div>

      {/* cards */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((plan) => (
            <div
              key={plan._id}
              className="
                relative rounded-2xl border border-base-300 bg-blue-100 p-8
                shadow-sm transition-all duration-200
                hover:-translate-y-1 hover:shadow-lg mb-5
              "
            >
              <h3 className="text-3xl font-bold text-center text-gray-900">
                {plan.name}
              </h3>

              <div className="border mt-1"></div>

              {/* Price */}
              <p className="mt-4 text-center text-4xl font-extrabold text-[#2563eb]">
                ${plan.price}
                <span className="text-lg text-gray-700 font-medium"> /month</span>
              </p>

              <p className="mt-1 text-center text-gray-700">
                Up to <span className="font-bold">{plan.employeeLimit}</span> employees
              </p>

              <div className="my-5 border"></div>

              <ul className="space-y-3 text-gray-700">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <FaCheckCircle className="text-primary bg-white rounded-full text-lg" />
                    {feature}
                  </li>
                ))}
              </ul>


              <button
                className="
                  btn btn-primary w-full mt-8 rounded-2xl text-lg
                  transition-transform duration-200
                  hover:scale-105 active:scale-95
                "
              >
                Upgrade Plan
              </button>
            </div>
          ))}
        </div>
    </div>
  );
};

export default UpgradePackage;
