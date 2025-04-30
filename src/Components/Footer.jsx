import React from 'react';
import { FaFacebook, FaGithub, FaInstagram } from 'react-icons/fa'; // Import icons

const Footer = ({footerRef}) => {
    
  return (
    <footer ref={footerRef} className="bg-gray-900 text-white py-8 w-full px-8">
      <div className="w-full  flex flex-col md:flex-row items-center justify-between px-4">
        {/* Left: Photo */}
        <a href="https://www.facebook.com/share/15qoZMzH3d/" target='_blank'>
        <figure className="flex items-center mb-4 md:mb-0">
          <img
            src="public\assets\images\footer_jawad.jpg" // Replace with your photo URL
            alt="Creator"
            className="h-40 w-70  rounded-md transition-normal hover:scale-105 hover:origin-bottom hover:-rotate-6 duration-300 object-cover hover:shadow-green-300 shadow-md"
          />
        </figure>
        </a>
        
        {/* Center: Description */}
        <div className="text-center mb-4 md:mb-0">
          <a href="https://www.facebook.com/share/15qoZMzH3d/" target='_blank'><p className="text-3xl pb-2 font-bold">MD Jawad</p></a>
          <p className="text-gray-400 font-bold italic text-2xl">Hello, I am Jawad, A student of Dhaka University. <br /> A passionate developer building awesome things.</p>
        </div>

        {/* Right: Social Media Handles */}
        <div className="flex-col ">
            <h2 className='text-center pb-3 font-bold'>Social Media </h2>
            <div className='flex space-x-6'>
          <a
            href="https://github.com/Mo-Jawad"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <FaGithub className="h-8 w-8" />
          </a>
          <a
            href="https://facebook.com/MdJawadOfficial"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <FaFacebook className="h-8 w-8" />
          </a>
          <a
            href="https://www.instagram.com/jawad.ahmad10"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <FaInstagram className="h-8 w-8" />
          </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
