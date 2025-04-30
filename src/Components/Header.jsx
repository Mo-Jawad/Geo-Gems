import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({scrollToFooter, searchQuery, handleSearch}) => {

  

  return (
    <header className="bg-gray-900 text-white shadow-lg w-full">
      <div className=" flex items-center justify-between p-2 px-8 w-full">
        {/* Logo on the left */}
        <div className="flex items-center">
          {/* <img
            src="https://placehold.co/50x50" // Replace with your logo URL
            alt="Logo"
            className="h-10 w-10 rounded-full"
          /> */}
          <Link to="/">
          <span className="ml-2 tracking-widest text-[48px] font-bold font-serif text-orange-500">Geo Gems</span>
          </Link>
        </div>

        {/* Search bar in the center */}
        <div className="flex-grow mx-8 max-w-lg relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-4 py-2 pl-10 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
          />
          {/* Search icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* GitHub link on the right */}
        <div className="flex min-w-1/5 justify-around">

            <button onClick={scrollToFooter} className='p-2 cursor-pointer bg-yellow-500 rounded-md transition-colors hover:text-white hover:border-amber-400 animate-bounce hover:bg-gray-900 border-2 mr-3 text-black font-bold duration-300'>About Creator</button>

          <a
            href="https://github.com/Mo-Jawad/Dhaincha-Friends"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center mr-4 text-white hover:text-amber-300 transition-colors duration-300"
          >
            <div className='flex-col'>

              <div className='w-full items-center flex justify-center'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            </div>
            <span className="ml-2 font-semibold">GitHub</span>
            </div>
          </a>
          

          
          <a
  href="https://www.facebook.com/share/19yk8TMPPz/"  
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center text-white  hover:text-amber-300 transition-colors duration-300"
>
<div className='flex-col '>

  <div className='w-full items-center flex justify-center '>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    
    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
  </svg> </div>
  <span className="ml-2 font-semibold">Facebook</span>
  </div>
</a> 

        </div>
      </div>
    </header>
  );
};

export default Header;