import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FaBuilding,
  FaCogs,
  FaStar,
  FaRocket,
  FaShieldAlt,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";

const tabs = [
  {
    id: "about",
    label: "About Us",
    icon: <FaBuilding />,
    content: (
      <>
        <h3 className="text-2xl font-bold mb-4">
          Enterprise Asset Management, Simplified
        </h3>

        <p className="text-gray-600 leading-relaxed mb-4">
          AssetVerse is a modern, cloud-based asset management platform built to
          streamline how organizations track, assign, and monitor company
          assets. From hardware to office resources, AssetVerse ensures every
          asset is accounted for, accessible, and secure.
        </p>

        <p className="text-gray-600 leading-relaxed">
          Designed for both HR managers and employees, AssetVerse eliminates
          manual tracking, reduces operational overhead, and brings transparency
          into daily asset usage across organizations of any size.
        </p>
      </>
    ),
  },

  {
    id: "how",
    label: "How It Works",
    icon: <FaCogs />,
    content: (
      <>
        <h3 className="text-2xl font-bold mb-4">
          A Structured Workflow for Growing Teams
        </h3>

        <div className="space-y-4 text-gray-600">
          <div className="flex gap-3">
            <FaUsers className="text-primary mt-1" />
            <p>
              <strong>HR Managers</strong> onboard their company, add assets,
              define limits, and manage employee access through a centralized
              dashboard.
            </p>
          </div>

          <div className="flex gap-3">
            <FaCogs className="text-primary mt-1" />
            <p>
              <strong>Employees</strong> request assets they need for work,
              track request status, and view assigned assets in real time.
            </p>
          </div>

          <div className="flex gap-3">
            <FaChartLine className="text-primary mt-1" />
            <p>
              <strong>Automated approvals</strong>, inventory updates, and
              analytics ensure accuracy without manual intervention.
            </p>
          </div>
        </div>
      </>
    ),
  },

  {
    id: "why",
    label: "Why Choose Us",
    icon: <FaStar />,
    content: (
      <>
        <h3 className="text-2xl font-bold mb-4">
          Built for Performance, Security & Scale
        </h3>

        <ul className="space-y-3 text-gray-600">
          <li className="flex gap-3">
            <FaShieldAlt className="text-primary mt-1" />
            <span>
              Role-based access control ensuring secure operations
            </span>
          </li>

          <li className="flex gap-3">
            <FaChartLine className="text-primary mt-1" />
            <span>
              Real-time insights into asset usage, requests, and trends
            </span>
          </li>

          <li className="flex gap-3">
            <FaUsers className="text-primary mt-1" />
            <span>
              Designed for HR teams, employees, and enterprise workflows
            </span>
          </li>

          <li className="flex gap-3">
            <FaStar className="text-primary mt-1" />
            <span>
              Clean UI, scalable backend, and modern tech stack
            </span>
          </li>
        </ul>
      </>
    ),
  },

  {
    id: "vision",
    label: "Our Vision",
    icon: <FaRocket />,
    content: (
      <>
        <h3 className="text-2xl font-bold mb-4">
          Shaping the Future of Workplace Operations
        </h3>

        <p className="text-gray-600 leading-relaxed mb-4">
          Our vision is to replace fragmented tools and spreadsheets with a
          single intelligent system that empowers organizations to operate
          efficiently, transparently, and confidently.
        </p>

        <p className="text-gray-600 leading-relaxed">
          AssetVerse aims to become the standard platform for enterprise asset
          lifecycle management — integrating automation, analytics, and human-
          centered design to support modern workplaces worldwide.
        </p>
      </>
    ),
  },
];

const About = () => {
  const [activeTab, setActiveTab] = useState("about");
  const currentTab = tabs.find((t) => t.id === activeTab);

  return (
    <div className="bg-gray-200 min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto space-y-14">

        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold">About Asset<span className="text-primary">Verse</span></h2>
          <p className="mt-4 text-gray-700">
            A professional asset management solution designed for modern
            organizations.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-5 py-3 rounded-xl font-medium
                  transition-all duration-300
                  ${
                    isActive
                      ? "bg-primary text-white shadow-md scale-105"
                      : "bg-base-100 text-gray-700 hover:bg-primary/10 hover:text-primary"
                  }
                `}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-base-100 rounded-2xl p-8 shadow-lg max-w-5xl mx-auto"
        >
          {currentTab?.content}
        </motion.div>
      </div>
    </div>
  );
};

export default About;
