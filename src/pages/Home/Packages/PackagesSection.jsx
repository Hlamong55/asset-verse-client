import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router";

const PackagesSection = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  // fetch packages
  useEffect(() => {
    axiosSecure
      .get("/packages")
      .then((res) => {
        setPackages(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [axiosSecure]);

  // fetch user role
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/${user.email}`)
        .then((res) => setRole(res.data?.role))
        .catch(() => setRole(null));
    }
  }, [user, axiosSecure]);

  const handleChoosePlan = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (role === "hr") {
      navigate("/dashboard/hr/upgrade-package");
    } else {
      navigate("/dashboard/employee/assets");
    }
  };

  /* ---------------- Skeleton Loading ---------------- */
  if (loading || authLoading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl bg-base-200 p-8 animate-pulse"
            >
              <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-300 rounded w-1/3 mx-auto mb-3"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto mb-6"></div>

              <div className="space-y-3">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
              </div>

              <div className="h-10 bg-gray-300 rounded mt-8"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
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
                relative rounded-2xl border border-base-300 bg-blue-100 p-8
                shadow-sm transition-all duration-200
                hover:-translate-y-1 hover:shadow-lg
              "
            >
              <h3 className="text-3xl font-bold text-center text-gray-900">
                {plan.name}
              </h3>

              <div className="border mt-2"></div>

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
                onClick={handleChoosePlan}
                className="
                  btn btn-primary w-full mt-8 rounded-2xl text-lg
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
