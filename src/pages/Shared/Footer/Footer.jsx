import React from "react";
import { Link } from "react-router";
import Logo from "../../../components/Logo/Logo";
import { TfiEmail } from "react-icons/tfi";
import { TbWorldPlus } from "react-icons/tb";

const Footer = () => {
  return (
    <div>
      <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-8 md:pl-28">
        <nav>
          <h6 className="footer-title">Services</h6>
          <Link className="hover:underline hover:text-[#4FAE33] ">
            Branding
          </Link>
          <Link className="hover:underline hover:text-[#4FAE33]">
            HR Data & Reporting
          </Link>
          <Link className="hover:underline hover:text-[#4FAE33]">
            Marketing
          </Link>
          <Link className="hover:underline hover:text-[#4FAE33]">
            Advertisement
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">Resources</h6>
          <Link className="hover:underline hover:text-[#4FAE33]">
            Content Library
          </Link>
          <Link className="hover:underline hover:text-[#4FAE33]">
            HR Glossary
          </Link>
          <Link className="hover:underline hover:text-[#4FAE33]">Blog</Link>
          <Link className="hover:underline hover:text-[#4FAE33]">
            Webinar Library
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <Link className="hover:underline hover:text-[#4FAE33]">About us</Link>
          <Link className="hover:underline hover:text-[#4FAE33]">Contact</Link>
          <Link className="hover:underline hover:text-[#4FAE33]">Jobs</Link>
          <Link className="hover:underline hover:text-[#4FAE33]">
            Press kit
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <Link className="hover:underline hover:text-[#4FAE33]">
            Terms of use
          </Link>
          <Link className="hover:underline hover:text-[#4FAE33]">Security</Link>
          <Link className="hover:underline hover:text-[#4FAE33]">
            Privacy policy
          </Link>
          <Link className="hover:underline hover:text-[#4FAE33]">
            Cookie policy
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">Contact</h6>
          <Link className="hover:underline hover:text-[#4FAE33]">
            <span className="flex items-center gap-2">
              <TfiEmail size={20} /> support@assetverse.com
            </span>
          </Link>
          <Link className="hover:underline hover:text-[#4FAE33] mt-2">
            <span className="flex items-center gap-2">
              <TbWorldPlus size={22} /> (+880) 1818470577
            </span>
          </Link>
          <Link className="hover:underline hover:text-[#4FAE33]"></Link>
        </nav>
      </footer>
      <footer className="bg-base-200 text-base-content border-t border-base-300 px-10 py-4">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full">
          <div className="flex items-center gap-2">
           <span>
             <Logo />
             <p className="text-xs text-gray-600">Copyright © {new Date().getFullYear()} - All right reserved by AssetVerse Ltd</p>
           </span>
          </div>

      
          <div className="flex gap-5 mb-2.5 md:mb-0">
        
            <a href="#" aria-label="Facebook">
              <img
                src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg"
                className="w-6 h-6 hover:opacity-80"
                style={{
                  filter:
                    "invert(35%) sepia(79%) saturate(2855%) hue-rotate(201deg) brightness(93%) contrast(102%)",
                }}
              />
            </a>

            <a href="#" aria-label="X">
              <img
                src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg"
                className="w-6 h-6  hover:opacity-80"
              />
            </a>

            <a href="#" aria-label="LinkedIn">
              <img
                src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg"
                className="w-6 h-6 hover:opacity-80"
                style={{
                  filter:
                    "invert(37%) sepia(89%) saturate(1468%) hue-rotate(183deg) brightness(92%) contrast(102%)",
                }}
              />
            </a>

            <a href="#" aria-label="YouTube">
              <img
                src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/youtube.svg"
                className="w-6 h-6 hover:opacity-80"
                style={{
                  filter:
                    "invert(23%) sepia(100%) saturate(7482%) hue-rotate(356deg) brightness(94%) contrast(115%)",
                }}
              />
            </a>

            <a href="#" aria-label="Pinterest">
              <img
                src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/pinterest.svg"
                className="w-6 h-6 hover:opacity-80"
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
      </footer>
    </div>
  );
};

export default Footer;
