// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

  const Banner = () => {

     const overlayColor = "rgba(255,255,255,0.30)"; // white glassy overlay (use rgba for fine control)
  const overlayBlur = "8px"; // CSS blur amount for backdrop-filter

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12, when: "beforeChildren" } },
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
      {/* GLASSY OVERLAY */}
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
        className="pointer-events-none absolute -right-28 -top-28 w-[520px] h-[420px] opacity-20"
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="300" cy="300" r="200" fill="#2563eb" />
        <circle cx="420" cy="180" r="120" fill="#4FAE33" />
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 ">
        <div className="min-h-[360px] flex items-center justify-center">
          <motion.div
            className="w-full max-w-2xl text-center"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.h1
              variants={itemUp}
              className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900"
            >
              Smart & Secure{" "}
              <span className="text-[#2563eb]">Asset Management</span>{" "}
              <span className="text-[#4FAE33]">for Modern Companies</span>
            </motion.h1>

            <motion.p
              variants={itemUp}
              className="mt-4 text-gray-800 font-medium text-base md:text-lg max-w-3xl mx-auto"
            >
              AssetVerse helps HR teams track, assign, and manage company assets with
              complete visibility and zero hassle. Automate workflows, reduce loss,
              and get real-time insights.
            </motion.p>

            <motion.div
              variants={itemUp}
              className="mt-7 flex flex-col sm:flex-row sm:justify-center gap-4"
            >
              <Link to="/join-hr" className="inline-block">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="btn btn-primary py-6 text-lg"
                >
                  <span className="flex items-center gap-2">Sign Up for Free <FaArrowRight /></span>
                </motion.button>
              </Link>

              <Link to="/join-employee" className="inline-block">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="btn btn-outline py-6 text-lg hover:border-[#4FAE33] hover:text-[#4FAE33]"
                >
                  <span className="flex items-center gap-2">Request Demo <FaArrowRight /></span>
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              variants={itemUp}
              className="mt-6 flex flex-wrap gap-3 justify-center"
            >
              <span className="badge badge-soft badge-success">Asset Analytics</span>
              <span className="badge badge-soft badge-success">Inventory</span>
              <span className="badge badge-soft badge-success">Request Workflow</span>
              <span className="badge badge-soft badge-success">Return Tracking</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


export default Banner;
