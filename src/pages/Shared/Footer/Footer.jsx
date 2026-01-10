import React from "react";
import { Link } from "react-router";
import Logo from "../../../components/Logo/Logo";
import { TfiEmail } from "react-icons/tfi";
import { TbWorldPlus } from "react-icons/tb";
import { MdLocationOn, MdAccessTime } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content w-full">
      {/* TOP GRID */}
      <div className="w-full px-8 lg:px-28 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* LOGO + DESC */}
        <div>
          <Logo />
          <p className="text-sm font-medium text-gray-700 mt-3 leading-relaxed">
            AssetVerse is a smart and secure asset management platform designed to
            streamline tracking, assignments, and workflow automation.
          </p>
        </div>

        {/* COMPANY */}
        <div className="md:text-center">
          <h6 className="footer-title mb-3">Company</h6>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-[#4FAE33] hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#4FAE33] hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/support" className="hover:text-[#4FAE33] hover:underline">Support</Link>
            </li>
            <li>
              <Link className="hover:text-[#4FAE33] hover:underline">HR Registration</Link>
            </li>
          </ul>
        </div>

        {/* LEGAL */}
        {/* <div>
          <h6 className="footer-title mb-3">Legal</h6>
          <ul className="space-y-2 text-sm">
            <li>
              <Link className="hover:text-[#4FAE33] hover:underline">Terms of Use</Link>
            </li>
            <li>
              <Link className="hover:text-[#4FAE33] hover:underline">Security</Link>
            </li>
            <li>
              <Link className="hover:text-[#4FAE33] hover:underline">Privacy Policy</Link>
            </li>
            <li>
              <Link className="hover:text-[#4FAE33] hover:underline">Cookie Policy</Link>
            </li>
          </ul>
        </div> */}

        {/* CONTACT */}
        <div>
          <h6 className="footer-title mb-3">Contact</h6>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center gap-2 hover:text-[#4FAE33] hover:underline">
              <TfiEmail size={18} />
              <span>bijoymarma55@gmail.com</span>
            </li>
            <li className="flex items-center gap-2 hover:text-[#4FAE33] hover:underline">
              <TbWorldPlus size={18} />
              <span>+8801818470577</span>
            </li>
            <li className="flex items-center gap-2 hover:text-[#4FAE33] hover:underline">
              <MdLocationOn size={18} />
              <span>Chattogram, Bangladesh</span>
            </li>
            <li className="flex items-center gap-2 hover:text-[#4FAE33] hover:underline">
              <MdAccessTime size={18} />
              <span>GMT +6 (Local Time)</span>
            </li>
          </ul>
        </div>

        {/* FOLLOW US */}
        <div>
          <h6 className="footer-title mb-4">Follow Us</h6>
          <div className="grid grid-cols-3 gap-4">
            <a href="#" aria-label="Facebook">
              <img
                src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg"
                className="w-7 h-7 hover:opacity-80"
                style={{
                  filter:
                    "invert(35%) sepia(79%) saturate(2855%) hue-rotate(201deg) brightness(93%) contrast(102%)",
                }}
              />
            </a>

            <a href="#" aria-label="X">
              <img
                src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg"
                className="w-7 h-7 hover:opacity-80"
              />
            </a>

            <a href="#" aria-label="LinkedIn">
           <img
                src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg"
                className="w-7 h-7 hover:opacity-80"
                style={{
                  filter:
                    "invert(37%) sepia(89%) saturate(1468%) hue-rotate(183deg) brightness(92%) contrast(102%)",
                }}
              />
            </a>

            <a href="#" aria-label="YouTube">
            <img
                src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/youtube.svg"
                className="w-7 h-7 hover:opacity-80"
                style={{
                  filter:
                    "invert(23%) sepia(100%) saturate(7482%) hue-rotate(356deg) brightness(94%) contrast(115%)",
                }}
              />
            </a>

            <a href="#" aria-label="Pinterest">
             <img
                src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/pinterest.svg"
                className="w-7 h-7 hover:opacity-80"
                style={{
                  filter:
                    "invert(33%) sepia(93%) saturate(2860%) hue-rotate(350deg) brightness(96%) contrast(101%)",
                }}
              />
            </a>

            <a href="#" aria-label="Instagram">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                className="w-7 h-7 hover:opacity-80"
              />
            </a>
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-gray-400 w-full"></div>

      {/* COPYRIGHT */}
      <div className="text-center py-5">
        © {new Date().getFullYear()} AssetVerse Ltd. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;




// import React from "react";
// import { Link } from "react-router";
// import Logo from "../../../components/Logo/Logo";
// import { TfiEmail } from "react-icons/tfi";
// import { TbWorldPlus } from "react-icons/tb";

// const Footer = () => {
//   return (
//     <div>
//       <footer className="footer sm:footer-horizontal bg-base-200 border-t border-gray-400 text-base-content p-8 md:pl-40">
//         <nav>
//           <h6 className="footer-title">Services</h6>
//           <Link className="hover:underline hover:text-[#4FAE33] ">
//             Branding
//           </Link>
//           <Link className="hover:underline hover:text-[#4FAE33]">
//             HR Data & Reporting
//           </Link>
//           <Link className="hover:underline hover:text-[#4FAE33]">
//             Marketing
//           </Link>
//           <Link className="hover:underline hover:text-[#4FAE33]">
//             Advertisement
//           </Link>
//         </nav>
//         <nav>
//           <h6 className="footer-title">Resources</h6>
//           <Link className="hover:underline hover:text-[#4FAE33]">
//             Content Library
//           </Link>
//           <Link className="hover:underline hover:text-[#4FAE33]">
//             HR Glossary
//           </Link>
//           <Link className="hover:underline hover:text-[#4FAE33]">Blog</Link>
//           <Link className="hover:underline hover:text-[#4FAE33]">
//             Webinar Library
//           </Link>
//         </nav>
//         <nav>
//           <h6 className="footer-title">Company</h6>
//           <Link to="/about" className="hover:underline hover:text-[#4FAE33]">About us</Link>
//           <Link to="/support"  className="hover:underline hover:text-[#4FAE33]">Contact</Link>
//           <Link className="hover:underline hover:text-[#4FAE33]">Jobs</Link>
//           <Link className="hover:underline hover:text-[#4FAE33]">
//             Press kit
//           </Link>
//         </nav>
//         <nav>
//           <h6 className="footer-title">Legal</h6>
//           <Link className="hover:underline hover:text-[#4FAE33]">
//             Terms of use
//           </Link>
//           <Link className="hover:underline hover:text-[#4FAE33]">Security</Link>
//           <Link className="hover:underline hover:text-[#4FAE33]">
//             Privacy policy
//           </Link>
//           <Link className="hover:underline hover:text-[#4FAE33]">
//             Cookie policy
//           </Link>
//         </nav>
//         <nav>
//           <h6 className="footer-title">Contact</h6>
//           <Link className="hover:underline hover:text-[#4FAE33]">
//             <span className="flex items-center gap-2">
//               <TfiEmail size={20} /> support@assetverse.com
//             </span>
//           </Link>
//           <Link className="hover:underline hover:text-[#4FAE33] mt-2">
//             <span className="flex items-center gap-2">
//               <TbWorldPlus size={22} /> (+880) 1818470577
//             </span>
//           </Link>
//           <Link className="hover:underline hover:text-[#4FAE33]"></Link>
//         </nav>
//       </footer>
//       <footer className="bg-base-200 text-base-content border-t border-gray-400 shadow-2xl px-20 py-4">
//         <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full">
//           <div className="flex items-center gap-2">
//            <span>
//              <Logo />
//              <p className="text-xs mt-1.5 text-gray-700">Copyright © {new Date().getFullYear()} - All right reserved by AssetVerse Ltd</p>
//            </span>
//           </div>

//           <div className="flex gap-5 mb-2.5 md:mb-0">

//             <a href="#" aria-label="Facebook">
//               <img
//                 src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg"
//                 className="w-6 h-6 hover:opacity-80"
//                 style={{
//                   filter:
//                     "invert(35%) sepia(79%) saturate(2855%) hue-rotate(201deg) brightness(93%) contrast(102%)",
//                 }}
//               />
//             </a>

//             <a href="#" aria-label="X">
//               <img
//                 src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg"
//                 className="w-6 h-6  hover:opacity-80"
//               />
//             </a>

//             <a href="#" aria-label="LinkedIn">
//               <img
//                 src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg"
//                 className="w-6 h-6 hover:opacity-80"
//                 style={{
//                   filter:
//                     "invert(37%) sepia(89%) saturate(1468%) hue-rotate(183deg) brightness(92%) contrast(102%)",
//                 }}
//               />
//             </a>

//             <a href="#" aria-label="YouTube">
//               <img
//                 src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/youtube.svg"
//                 className="w-6 h-6 hover:opacity-80"
//                 style={{
//                   filter:
//                     "invert(23%) sepia(100%) saturate(7482%) hue-rotate(356deg) brightness(94%) contrast(115%)",
//                 }}
//               />
//             </a>

//             <a href="#" aria-label="Pinterest">
//               <img
//                 src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/pinterest.svg"
//                 className="w-6 h-6 hover:opacity-80"
//                 style={{
//                   filter:
//                     "invert(33%) sepia(93%) saturate(2860%) hue-rotate(350deg) brightness(96%) contrast(101%)",
//                 }}
//               />
//             </a>

//             <a href="#" aria-label="Instagram">
//               <img
//                 src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
//                 className="w-7 h-7 hover:opacity-80"
//               />
//             </a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Footer;
