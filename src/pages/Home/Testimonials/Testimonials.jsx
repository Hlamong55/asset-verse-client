// Testimonials.jsx
import React, { use } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import TestimoniCard from "./TestimoniCard";

const Testimonials = ({ testimonialsPromise }) => {
  const data = use(testimonialsPromise);

  if (!data || !data.testimonials) {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-500">
          No testimonials available.
        </div>
      </div>
    );
  }

  const { testimonials, stats, trust_logos } = data;

  return (
    <section className="py-24 bg-base-100">
      <div className="max-w-7xl mx-auto px-6 space-y-24">
        {/* heading text */}
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-[#2563eb]">
            Customer Experience
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2">
            What companies say about Asset
            <span className="text-primary">Verse</span>
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Built for HR, IT & Operations teams to track, assign and protect
            company assets at scale.
          </p>
        </div>

        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 my-14">
            {stats.map((s) => (
              <div
                key={s.id}
                className="flex flex-col items-center bg-blue-100 p-6 rounded-lg border border-base-200 shadow-sm"
              >
                <div className="text-2xl font-extrabold text-gray-900">
                  {s.value.toLocaleString()}
                  {s.id === "fulfillment" && "%"}
                </div>
                <div className="mt-2 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 16 },
            640: { slidesPerView: 1.2, spaceBetween: 18 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id} className="py-8">
              <div className="transform transition-all hover:scale-[1.02] duration-300">
                <TestimoniCard review={t} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {trust_logos && (
          <div className="mt-12 text-center">
            <p className="text-sm font-semibold text-[#2563eb] mb-4">
              Trusted by leading companies
            </p>

           <div className="overflow-hidden py-6 relative">
            <style>
            {`
            @keyframes smoothMarquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
            }`}
            </style>

            <div className="flex w-max whitespace-nowrap">
            <div
            className="
            flex gap-12
            animate-[smoothMarquee_18s_linear_infinite]"  
            >
            {trust_logos.map((src, idx) => (
            <img
            key={idx}
            src={src}
            className="w-28 h-10 object-contain opacity-80 hover:opacity-100 transition"
            />
            ))}
            </div>

            <div
            className="
            flex gap-10
            animate-[smoothMarquee_18s_linear_infinite]"   
            >
            {trust_logos.map((src, idx) => (
            <img
            key={'clone-' + idx}
            src={src}
            className="w-28 h-10 object-contain opacity-80 hover:opacity-100 transition"
            />
            ))}
            </div>
            </div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
