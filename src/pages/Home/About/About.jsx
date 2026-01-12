// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaBoxes, FaInbox, FaChartPie, FaUsers } from "react-icons/fa";

const FEATURES = [
  {
    id: "inventory",
    icon: <FaBoxes className="w-6 h-6" aria-hidden />,
    title: "Centralized Inventory",
    desc: "Keep all assets in one place—track status, location, and ownership in real time.",
  },
  {
    id: "workflow",
    icon: <FaInbox className="w-6 h-6" aria-hidden />,
    title: "Automated Request Workflow",
    desc: "Employees request assets; HR approves or assigns—reduces paperwork and errors.",
  },
  {
    id: "analytics",
    icon: <FaChartPie className="w-6 h-6" aria-hidden />,
    title: "Asset Analytics",
    desc: "Visualize usage, request trends and return rates to make data-driven decisions.",
  },
  {
    id: "multicompany",
    icon: <FaUsers className="w-6 h-6" aria-hidden />,
    title: "Multi-Company Support",
    desc: "Employees can affiliate with multiple companies—ideal for contractors & agencies.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, when: "beforeChildren" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const About = () => {
  return (
    <section className="bg-blue-50 py-12">
      <div className="max-w-7xl mx-auto p-6">
        <div className="md:grid md:grid-cols-2 items-center">
       
          <div className="mb-8 md:mb-0">
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-gray-800">
              Why choose Asset<span className="text-primary">Verse</span>?
            </h2>
            <p className="mt-4 text-gray-800 max-w-xl">
              A single platform to track, assign and manage corporate assets
              with full visibility. Reduce loss, automate approvals, and get
              actionable insights to optimize asset usage across teams and
              companies.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link to="/login" className="inline-block">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="btn btn-primary py-5 text-lg"
                >
                  <span className="flex items-center gap-2">
                    Explore Features
                  </span>
                </motion.button>
              </Link>

              <Link to="/support" className="inline-block">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="btn btn-outline py-5 text-lg hover:border-[#4FAE33] hover:text-[#4FAE33]"
                >
                  <span className="flex items-center gap-2">
                    Contact Sales
                  </span>
                </motion.button>
              </Link>
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {FEATURES.map((f) => (
              <motion.article
                variants={itemVariants}
                key={f.id}
                className="p-5 bg-base-100 border border-base-200 rounded-lg shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-1"
                aria-labelledby={`feat-${f.id}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-none rounded-md bg-base-200 p-3 text-[#2563eb]">
                    
                    {f.icon}
                  </div>
                  <div className="min-w-0">
                    <h3
                      id={`feat-${f.id}`}
                      className="text-lg font-semibold text-gray-900"
                    >
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
