import { FaEnvelope, FaLifeRing, FaHeadset, FaBug } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const Support = () => {
  return (
    <div className="min-h-screen bg-gray-200 py-20 px-8">
      <div className="max-w-7xl mx-auto space-y-20">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl font-extrabold">Support & Assistance</h2>
          <p className="mt-4 text-gray-700">
            Need help with AssetVerse? Our support team is here to assist you
            with any questions, issues, or feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="text-primary text-2xl">
                <FaLifeRing />
              </div>
              <div>
                <h4 className="text-xl font-semibold">General Support</h4>
                <p className="text-gray-600 mt-1">
                  Questions about features, account usage, or general guidance
                  on how AssetVerse works.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-primary text-2xl">
                <FaBug />
              </div>
              <div>
                <h4 className="text-xl font-semibold">Report a Problem</h4>
                <p className="text-gray-600 mt-1">
                  Found a bug or something not working as expected? Let us know
                  so we can fix it quickly.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-primary text-2xl">
                <FaHeadset />
              </div>
              <div>
                <h4 className="text-xl font-semibold">Priority Assistance</h4>
                <p className="text-gray-600 mt-1">
                  HR managers on paid plans receive faster response and priority
                  support.
                </p>
              </div>
            </div>

            <div className="bg-base-100 rounded-xl p-6 shadow">
              <p className="font-medium">📧 Email us directly:</p>
              <p className="text-primary font-semibold mt-1">
                support@assetverse.com
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Support hours: Mon – Fri, 9:00 AM – 6:00 PM
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-base-100 rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-6">Contact Support</h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();

                Swal.fire({
                  icon: "success",
                  title: "Request Sent!",
                  text: "Our support team will contact you shortly.",
                  timer: 2000,
                  showConfirmButton: false,
                });

                e.target.reset();
              }}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full"
                required
              />

              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full"
                required
              />

              <select className="select select-bordered w-full">
                <option>General Inquiry</option>
                <option>Technical Issue</option>
                <option>Billing / Subscription</option>
                <option>Feedback</option>
              </select>

              <textarea
                rows="4"
                placeholder="Describe your issue or message..."
                className="textarea textarea-bordered w-full"
                required
              />

              <button className="btn btn-primary w-full hover:scale-105 transition">
                Submit Request
              </button>
            </form>

            <p className="text-sm text-gray-500 mt-4">
              We typically respond within 24 hours.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-base-100 rounded-xl p-6 shadow hover:shadow-lg transition">
            <h4 className="font-semibold text-lg">Getting Started</h4>
            <p className="text-gray-600 mt-2">
              Learn how to register, request assets, and manage your dashboard.
            </p>
          </div>

          <div className="bg-base-100 rounded-xl p-6 shadow hover:shadow-lg transition">
            <h4 className="font-semibold text-lg">HR Management</h4>
            <p className="text-gray-600 mt-2">
              Understand asset approvals, employee limits, and subscription
              upgrades.
            </p>
          </div>

          <div className="bg-base-100 rounded-xl p-6 shadow hover:shadow-lg transition">
            <h4 className="font-semibold text-lg">Security & Privacy</h4>
            <p className="text-gray-600 mt-2">
              Learn how we protect company data and employee information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
