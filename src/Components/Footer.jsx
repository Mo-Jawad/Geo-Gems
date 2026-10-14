import React from 'react';
import { FaFacebook, FaGithub, FaInstagram } from 'react-icons/fa';

const Footer = ({ footerRef }) => {
  return (
    <footer ref={footerRef} className="bg-gray-900 text-white py-8 w-full px-4 sm:px-8 border-t border-gray-800">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 px-2 sm:px-4">
        {/* Left: Photo */}
        <a
          href="https://www.facebook.com/share/15qoZMzH3d/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center shrink-0"
        >
          <figure className="flex items-center">
            <img
              src="/assets/images/footer_jawad.jpg"
              alt="Creator MD Jawad"
              className="h-36 sm:h-40 w-60 sm:w-72 max-w-full rounded-md transition-transform hover:scale-105 hover:origin-bottom hover:-rotate-3 duration-300 object-cover hover:shadow-green-300 shadow-md"
            />
          </figure>
        </a>

        {/* Center: Description */}
        <div className="text-center max-w-xl px-2">
          <a
            href="https://www.facebook.com/share/15qoZMzH3d/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-2xl sm:text-3xl pb-2 font-bold hover:text-amber-400 transition-colors">
              MD Jawad
            </p>
          </a>
          <p className="text-gray-400 font-medium italic text-sm sm:text-base md:text-lg leading-relaxed">
            Hello, I am Jawad, A student of Dhaka University. <br className="hidden sm:inline" />
            A passionate developer building awesome things.
          </p>
        </div>

        {/* Right: Social Media Handles */}
        <div className="flex flex-col items-center shrink-0">
          <h2 className="text-center pb-3 font-bold text-sm sm:text-base text-gray-200">
            Social Media
          </h2>
          <div className="flex space-x-6">
            <a
              href="https://github.com/Mo-Jawad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
              aria-label="GitHub"
            >
              <FaGithub className="h-7 w-7 sm:h-8 sm:w-8" />
            </a>
            <a
              href="https://facebook.com/MdJawadOfficial"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
              aria-label="Facebook"
            >
              <FaFacebook className="h-7 w-7 sm:h-8 sm:w-8" />
            </a>
            <a
              href="https://www.instagram.com/jawad.ahmad10"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
              aria-label="Instagram"
            >
              <FaInstagram className="h-7 w-7 sm:h-8 sm:w-8" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
