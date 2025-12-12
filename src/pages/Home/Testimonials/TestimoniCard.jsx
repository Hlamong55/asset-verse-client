import React from "react";
import { FaStar, FaCheckCircle } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const TestimoniCard = ({ review }) => {
  if (!review) return null;

  const initials = review.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="
        p-6 rounded-xl 
        bg-white/90 backdrop-blur 
        shadow-[0_8px_20px_rgba(0,0,0,0.06)] 
        border border-base-200
        hover:shadow-[0_10px_26px_rgba(0,0,0,0.1)]
        transition-all duration-300
      "
    >
      <div className="flex items-start gap-4">

        <div className="relative">
          {review.avatar ? (
            <img
              src={review.avatar}
              alt={review.name}
              className="w-16 h-9 rounded-full object-cover border border-gray-200"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-[#2563eb]/10 flex items-center justify-center text-lg font-semibold text-[#2563eb]">
              {initials}
            </div>
          )}

          <FaCheckCircle className="absolute -bottom-1.5 -right-1 text-[#2563eb] bg-white rounded-full text-lg" />
        </div>

        <div className="min-w-0">
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900 text-base">
              {review.name}
            </span>
            <span className="text-sm text-gray-500">{review.role}</span>
          </div>

          <p className="mt-3 text-gray-700 text-sm leading-relaxed  h-20 overflow-hidden">
            “{review.quote}”
          </p>

          <div className="mt-3 flex items-center gap-1">
            {Array.from({ length: review.rating }).map((_, i) => (
              <FaStar key={i} className="text-yellow-400 w-4 h-4" />
            ))}
            {Array.from({ length: 5 - review.rating }).map((_, i) => (
              <FaStar key={i + 20} className="text-gray-300 w-4 h-4" />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimoniCard;
