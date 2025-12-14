import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const PackagesSection = () => {
  const axiosSecure = useAxiosSecure();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure.get("/packages")
      .then(res => {
        setPackages(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <section className="py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-secondary mb-1">
            Packages
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Simple & Scalable Pricing
          </h2>
          <p className="mt-3 text-gray-700 max-w-2xl mx-auto">
            Choose a plan that fits your company size. Upgrade anytime as your team grows.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((plan) => (
            <div
              key={plan._id}
              className="
                relative rounded-2xl border border-base-300 bg-white p-8
                shadow-sm transition-all duration-200
                hover:-translate-y-1 hover:shadow-lg
              "
            >
              <h3 className="text-2xl font-bold text-center text-gray-900">
                {plan.name}
              </h3>

              {/* Price */}
              <p className="mt-4 text-center text-4xl font-extrabold text-[#2563eb]">
                ${plan.price}
                <span className="text-lg text-gray-500 font-medium"> /month</span>
              </p>

              <p className="mt-1 text-center text-gray-600">
                Up to <span className="font-semibold">{plan.employeeLimit}</span> employees
              </p>

              <div className="my-6 border-t border-base-200"></div>

              <ul className="space-y-3 text-gray-700">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#4FAE33]"></span>
                    {feature}
                  </li>
                ))}
              </ul>


              <button
                className="
                  btn btn-primary w-full mt-8 rounded-full text-lg
                  transition-transform duration-200
                  hover:scale-105 active:scale-95
                "
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PackagesSection;
