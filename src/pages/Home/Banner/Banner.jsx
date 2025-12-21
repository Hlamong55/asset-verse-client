// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaArrowRight, FaChartBar, FaCheckCircle, FaClipboardList, FaCogs, FaMoneyBillWave, FaStar } from "react-icons/fa";
import { Link } from "react-router";

const Banner = () => {
  const overlayColor = "rgba(255,255,255,0.30)";
  const overlayBlur = "8px";

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, when: "beforeChildren" },
    },
  };

  const itemUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundImage: `url(https://i.ibb.co.com/XkxsFRtP/A-vibrant-dynamic-illustration-of-a-comprehensive-B2-B-lead-generation-funnel-showcasing-the-1024x585.webp})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: overlayColor,
          backdropFilter: `blur(${overlayBlur})`,
          WebkitBackdropFilter: `blur(${overlayBlur})`,
        }}
      />

      <svg
        aria-hidden
        className="pointer-events-none absolute -right-28 -top-28 w-130 h-100 opacity-20"
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="300" cy="300" r="200" fill="#2563eb" />
        <circle cx="420" cy="180" r="120" fill="#4FAE33" />
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-14 ">
        <div className="min-h-90 flex items-center justify-center">
          <motion.div
            className="w-full max-w-2xl text-center"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.h1
              variants={itemUp}
              className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-800"
            >
              Smart & Secure{" "} <br />
              <span className="text-primary">Asset Management</span>{" "}
              <span> <br />for Modern Companies</span>
            </motion.h1>

            <motion.p
              variants={itemUp}
              className="mt-4 text-gray-800 font-medium text-base md:text-lg max-w-3xl mx-auto"
            >
              AssetVerse helps HR teams track, assign, and manage company assets
              with complete visibility and zero hassle. Automate workflows,
              reduce loss, and get real-time insights.
            </motion.p>

            <motion.div
              variants={itemUp}
              className="mt-7 flex flex-col sm:flex-row sm:justify-center gap-4"
            >
              <Link to="/hr-register" className="inline-block">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="btn btn-primary py-6 text-lg"
                >
                  <span className="flex items-center gap-2">
                    Sign Up for Free <FaArrowRight />
                  </span>
                </motion.button>
              </Link>

              <Link to="/user-register" className="inline-block">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="btn btn-outline py-6 text-lg hover:border-[#4FAE33] hover:text-[#4FAE33]"
                >
                  <span className="flex items-center gap-2">
                    Request Demo <FaArrowRight />
                  </span>
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              variants={itemUp}
              className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 justify-center"
            >
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-md border-2 text-white">
                  <FaChartBar className="w-6 h-6" />
                </div>
                <span className="mt-2 text-sm font-semibold text-black">
                  HR Insights & Reporting
                </span>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-md border-2 text-white">
                  <FaClipboardList className="w-6 h-6" />
                </div>
                <span className="mt-2 text-sm font-semibold text-black">
                  Asset & Assignment Tracking
                </span>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-md border-2  text-white">
                  <FaCogs className="w-6 h-6" />
                </div>
                <span className="mt-2 text-sm font-semibold text-black">
                  Asset Lifecycle Management
                </span>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-md border-2  text-white">
                  <FaStar className="w-6 h-6" />
                </div>
                <span className="mt-2 text-sm font-semibold text-black">
                  Employee Experience
                </span>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-md border-2  text-white">
                  <FaCheckCircle className="w-6 h-6" />
                </div>
                <span className="mt-2 text-sm font-semibold text-black">
                  Request & Approval Workflow
                </span>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-md border-2  text-white">
                  <FaMoneyBillWave className="w-6 h-6" />
                </div>
                <span className="mt-2 text-sm font-semibold text-black">
                  Asset Cost & Budget Tracking
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
