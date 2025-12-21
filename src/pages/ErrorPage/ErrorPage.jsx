// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaArrowLeft, FaGhost } from "react-icons/fa";

const NotFound = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center
     bg-linear-to-br from-[#0f172a] via-[#020617] to-black
      px-4 overflow-hidden relative"
    >
      <div className="absolute w-96 h-96 bg-primary/20 blur-[120px] rounded-full -top-20 -left-20" />
      <div className="absolute w-96 h-96 bg-purple-500/20 blur-[120px] rounded-full bottom-0 right-0" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 bg-base-100/10 backdrop-blur-xl border border-white/10
                   shadow-2xl rounded-3xl p-8 md:p-12 max-w-xl w-full text-center"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex justify-center mb-6"
        >
          <div
            className="w-24 h-24 flex items-center justify-center rounded-full bg-primary/20 text-primary text-5xl shadow-lg"
          >
            <FaGhost />
          </div>
        </motion.div>

        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-7xl md:text-8xl font-extrabold bg-linear-to-r
                     from-primary via-purple-400 to-pink-500
                     text-transparent bg-clip-text"
        >
          404
        </motion.h1>

        <h2 className="text-2xl md:text-3xl font-bold mt-4 text-white">
          You're Lost in Space 🚀
        </h2>

        <p className="text-gray-300 mt-4 leading-relaxed">
          The page you're trying to reach doesn't exist, or it might have
          drifted into another galaxy.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/"
              className="btn btn-primary px-6 rounded-xl text-lg flex items-center gap-2"
            >
              <FaArrowLeft />
              Back to Home
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/support"
              className="btn btn-outline btn-primary px-6 rounded-xl text-lg"
            >
              Contact Support
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
