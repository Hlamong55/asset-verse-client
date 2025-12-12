// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FaCogs,
  FaChartLine,
  FaUsers,
  FaClipboardCheck,
  FaShieldAlt,
  FaRecycle,
} from "react-icons/fa";

const FEATURES = [
  {
    id: 1,
    title: "Smart Asset Tracking",
    desc: "Monitor and manage all company assets in real time with complete visibility.",
    Icon: FaCogs,
  },
  {
    id: 2,
    title: "Automated Assignment Workflow",
    desc: "Streamline employee requests and HR approvals with automated workflows.",
    Icon: FaClipboardCheck,
  },
  {
    id: 3,
    title: "Real-Time Insights",
    desc: "Visual dashboards reveal asset usage, trends, and operational bottlenecks.",
    Icon: FaChartLine,
  },
  {
    id: 4,
    title: "Multi-Company Support",
    desc: "Employees can affiliate with multiple companies seamlessly and securely.",
    Icon: FaUsers,
  },
  {
    id: 5,
    title: "Lifecycle Management",
    desc: "Track assignment, usage, return, and condition in one unified system.",
    Icon: FaRecycle,
  },
  {
    id: 6,
    title: "Security & Role Control",
    desc: "Role-based access ensures secure HR control over all company assets.",
    Icon: FaShieldAlt,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, when: "beforeChildren" },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

  const Feature = () => {
  return (
    <section className="bg-blue-100 py-10">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Powerful Features for Modern HR Teams
          </h2>
          <p className="mt-3 text-gray-800">
            Everything you need to manage assets efficiently across your organization.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6"
        >
          {FEATURES.map((f) => {
            const Icon = f.Icon;
            return (
              <motion.div
                key={f.id}
                variants={item}
                whileHover={{ y: -6 }}
                className="p-6 bg-white border border-base-200 rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-green-50 text-[#4FAE33] shadow-sm mb-4">
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Feature;
