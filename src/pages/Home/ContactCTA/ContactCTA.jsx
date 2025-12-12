import { BsCartPlus, BsCartPlusFill } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";

const ContactCTA = () => {
  return (
    <section
      className="relative py-24 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://i.ibb.co.com/ZpG86bp0/pngtree-object-name-abstract-pastel-color-gradient-with-soft-wavy-shapes-for-picture-image-16670377.png')", 
      }}
    >

      <div
        className="absolute inset-0 bg-white/0 backdrop-blur-sm"
        aria-hidden
      ></div>

      <div className="relative max-w-5xl mx-auto px-6">

        <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl p-12 text-center">

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-snug">
            Still have questions about Asset<span className="text-primary">Verse</span>?
          </h2>

          <p className="mt-4 text-gray-700 text-lg max-w-2xl mx-auto">
            Our support team is here to help with onboarding, pricing, or workflow setup.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">

            <a
            href="/contact"
            className="btn btn-primary px-8 py-6 text-lg rounded 
               transition-transform duration-200 hover:scale-105 active:scale-95"
            >
           <span className="flex items-center gap-2">
            Contact Sales <BsCartPlusFill size={22}/>
            </span>
            </a>

            <a
            href="/demo"
            className="btn btn-outline px-8 py-6 text-lg rounded hover:border-[#4FAE33] hover:text-[#4FAE34] transition-transform duration-200 hover:scale-105 active:scale-95"
            >
            <span className="flex items-center gap-2">
            Request Demo <FaArrowRight />
            </span>
            </a>

</div>


          <p className="mt-6 text-gray-700 text-sm">
            Need immediate help? <span className="font-semibold underline hover:text-primary">support@assetverse.com</span>
          </p>

        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
