import { FaEnvelopeOpenText } from "react-icons/fa";
import Swal from "sweetalert2";

const Newsletter = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    // const email = e.target.email.value;

    // future API call placeholder
    // await axios.post("/newsletter", { email });

    Swal.fire({
      icon: "success",
      title: "Subscribed Successfully 🎉",
      text: "Thank you for subscribing to AssetVerse Newsletter!",
      confirmButtonColor: "#22c55e",
      timer: 2000,
      showConfirmButton: false,
    });

    e.target.reset();
  };

  return (
    <section className="w-full bg-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-7">

        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT CONTENT */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <FaEnvelopeOpenText className="text-primary text-3xl" />
              <span className="uppercase text-sm tracking-widest text-primary font-semibold">
                Newsletter
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Stay Updated with AssetVerse
            </h2>

            <p className="text-gray-600 mt-4 max-w-lg">
              Get product updates, HR insights, and best practices to manage
              company assets efficiently.
            </p>

            <ul className="mt-6 space-y-2 text-gray-700">
              <li>✅ Feature updates & releases</li>
              <li>✅ HR & asset management insights</li>
              <li>✅ Productivity tips for teams</li>
            </ul>
          </div>

          {/* RIGHT FORM */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Subscribe Now
            </h3>

            <p className="text-sm text-gray-600 mb-6">
              Join professionals using AssetVerse.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Enter your work email"
                className="input input-bordered w-full"
                required
              />

              <button
                type="submit"
                className="
                  btn bg-primary text-white w-full
                  transition-transform duration-200
                  hover:scale-105 active:scale-95
                "
              >
                Subscribe
              </button>
            </form>

            <p className="text-sm text-gray-500 mt-4 text-center">
              No spam. Unsubscribe anytime.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Newsletter;
