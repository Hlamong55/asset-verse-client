import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const FAQ_DATA = [
  {
    q: "What is AssetVerse and how does it help companies?",
    a: "AssetVerse allows HR & IT teams to track, assign, and manage corporate assets with full visibility. It reduces asset loss, automates workflows, and improves accountability."
  },
  {
    q: "Can employees request assets from multiple companies?",
    a: "Yes. AssetVerse supports multi-company affiliation. Employees can request assets from different HR teams and get approved independently."
  },
  {
    q: "Does AssetVerse support returnable and non-returnable asset types?",
    a: "Absolutely. HR can add assets as Returnable or Non-returnable. Employees can return items through the system and HR verifies the condition."
  },
  {
    q: "Is payment and package upgrade secure?",
    a: "Yes. All payments are handled securely with Stripe. Package limits update instantly after successful payment."
  },
  {
    q: "Can small companies use AssetVerse?",
    a: "Definitely. The Basic plan includes features ideal for small teams and startups. Upgrades are seamless as your team grows."
  },
  {
    q: "Does AssetVerse generate analytics for HR managers?",
    a: "Yes. HR gets analytics on asset usage, request trends, and inventory performance to help optimize resource allocation."
  }
];

  const FAQ = () => {
  const [open, setOpen] = useState(null);

  const toggle = (i) => {
    setOpen(open === i ? null : i);
  };

  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-secondary">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-extrabold">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-gray-600 max-w-xl mx-auto">
            Answers to the most common questions about using AssetVerse.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_DATA.map((item, i) => (
            <div
              key={i}
              className="border border-primary rounded-xl bg-white"
            >
              <button
                onClick={() => toggle(i)}
                className={`
                  w-full px-5 py-4 flex items-center justify-between
                  transition-all duration-300 rounded-xl
                  ${open === i 
                    ? "bg-[#eef5ff]"
                    : "hover:bg-base-200"}`}
            >
    
                <span className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                  {item.q}
                </span>

                <span
                  className={`text-gray-700 transition-transform duration-300 ${
                    open === i ? "rotate-180" : ""
                  }`}
                >
                  <FaChevronDown size={20} />
                </span>
              </button>

              <div
                className={`px-5 overflow-hidden transition-all duration-300 ${
                  open === i ? "max-h-40 py-2.5" : "max-h-0"
                }`}
              >
                <p className="text-gray-800 text-sm md:text-base leading-relaxed">
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
