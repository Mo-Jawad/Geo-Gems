import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = ({ scrollToFooter, searchQuery, handleSearch }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const closeDrawer = () => setIsDrawerOpen(false);

  // Close drawer on Escape key and prevent background scrolling when open
  useEffect(() => {
    if (!isDrawerOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeDrawer();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDrawerOpen]);

  return (
    <header className="bg-gray-900 text-white shadow-lg w-full sticky top-0 z-40">
      <div className="flex items-center justify-between p-3 px-4 sm:px-8 w-full gap-2 sm:gap-4">
        {/* Left: Logo and Desktop Navigation Tabs */}
        <div className="flex items-center gap-3 sm:gap-6 shrink-0">
          <Link to="/" onClick={closeDrawer}>
            <span className="tracking-widest text-xl sm:text-3xl md:text-4xl lg:text-[44px] font-bold font-serif text-orange-500 hover:text-orange-400 transition-colors whitespace-nowrap">
              Geo Gems
            </span>
          </Link>

          {/* Desktop Navigation Tabs (hidden on mobile) */}
          <nav className="hidden md:flex items-center space-x-1 sm:space-x-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-bold text-sm sm:text-base transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-gray-900 shadow'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/gallery"
              className={({ isActive }) =>
                `px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-bold text-sm sm:text-base transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-gray-900 shadow'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`
              }
            >
              Gallery
            </NavLink>
          </nav>
        </div>

        {/* Search bar: present in both desktop and mobile header */}
        <div className="relative flex-1 md:flex-initial md:w-56 lg:w-64 max-w-xs md:max-w-none mx-2 sm:mx-3">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-3 sm:px-4 py-1.5 sm:py-2 pl-8 sm:pl-10 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 text-xs sm:text-sm md:text-base"
          />
          {/* Search icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-5 sm:w-5 absolute top-1/2 left-2.5 sm:left-3 transform -translate-y-1/2 text-gray-400 pointer-events-none"
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

        {/* Desktop Actions: Creator button & Social Links (hidden on mobile) */}
        <div className="hidden md:flex items-center space-x-3 sm:space-x-4 shrink-0">
          <button
            onClick={scrollToFooter}
            className="p-1.5 sm:p-2 cursor-pointer bg-yellow-500 rounded-md transition-colors hover:text-white hover:border-amber-400 animate-bounce hover:bg-gray-900 border-2 text-black font-bold duration-300 text-xs sm:text-sm whitespace-nowrap"
          >
            About Creator
          </button>

          <a
            href="https://github.com/Mo-Jawad/Dhaincha-Friends"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-white hover:text-amber-300 transition-colors duration-300"
            aria-label="GitHub Repository"
          >
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="font-semibold text-xs">GitHub</span>
            </div>
          </a>

          <a
            href="https://www.facebook.com/share/19yk8TMPPz/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-white hover:text-amber-300 transition-colors duration-300"
            aria-label="Facebook Profile"
          >
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
              </svg>
              <span className="font-semibold text-xs">Facebook</span>
            </div>
          </a>
        </div>

        {/* Mobile: Glassmorphic Drawer Toggle Hamburger Button */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          aria-label="Open mobile navigation menu"
          className="md:hidden p-2 text-gray-200 hover:text-white bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-xl border border-white/15 hover:border-white/25 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 shrink-0 cursor-pointer shadow-sm active:scale-95"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Drawer Overlay with high and large backdrop blur */}
      <div
        className={`fixed inset-0 z-50 bg-black/75 backdrop-blur-2xl transition-opacity duration-300 md:hidden ${
          isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Mobile Glassmorphic Drawer Panel */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-50 w-72 sm:w-80 max-w-[85vw] bg-gray-950/80 backdrop-blur-2xl border-l border-white/15 shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out md:hidden ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Drawer"
      >
        {/* Drawer Header with Glassmorphic Close Button */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            
            <span className="text-xl font-bold font-serif text-green-500 tracking-wider">
              Menu
            </span>
          </div>
          <button
            onClick={closeDrawer}
            aria-label="Close navigation drawer"
            className="p-2 text-gray-300 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl transition-all cursor-pointer border border-white/15 hover:border-white/25 shadow-md active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer Body with Glassmorphic Button UI */}
        <div className="flex-1 p-4 sm:p-5 space-y-5 overflow-y-auto">
          {/* Navigation Section */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2 px-1">
              Navigation
            </span>
            <div className="space-y-2">
              <NavLink
                to="/"
                end
                onClick={closeDrawer}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 active:scale-[0.98] ${
                    isActive
                      ? 'bg-amber-500/25 text-amber-300 border border-amber-400/50 shadow-lg shadow-amber-500/15 backdrop-blur-md'
                      : 'bg-white/5 text-gray-200 hover:text-white hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-md shadow-sm'
                  }`
                }
              >
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Home</span>
              </NavLink>

              <NavLink
                to="/gallery"
                onClick={closeDrawer}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 active:scale-[0.98] ${
                    isActive
                      ? 'bg-amber-500/25 text-amber-300 border border-amber-400/50 shadow-lg shadow-amber-500/15 backdrop-blur-md'
                      : 'bg-white/5 text-gray-200 hover:text-white hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-md shadow-sm'
                  }`
                }
              >
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Gallery</span>
              </NavLink>
            </div>
          </div>

          {/* About Creator Glassmorphic Button */}
          <div className="pt-3 border-t border-white/10">
            <button
              onClick={() => {
                closeDrawer();
                scrollToFooter();
              }}
              className="w-full py-3 px-4 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 hover:text-yellow-200 rounded-xl font-bold text-sm transition-all duration-200 backdrop-blur-md border border-yellow-400/40 hover:border-yellow-400/60 shadow-lg shadow-yellow-500/10 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>About Creator</span>
            </button>
          </div>

          {/* Social Links Section with Glassmorphic Buttons */}
          <div className="pt-3 border-t border-white/10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2 px-1">
              Social Links
            </span>
            <div className="space-y-2">
              <a
                href="https://github.com/Mo-Jawad/Dhaincha-Friends"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeDrawer}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-200 hover:text-white bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 hover:border-white/20 shadow-sm transition-all duration-200 active:scale-[0.98]"
              >
                <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span className="font-semibold text-sm">GitHub</span>
              </a>

              <a
                href="https://www.facebook.com/share/19yk8TMPPz/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeDrawer}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-200 hover:text-white bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 hover:border-white/20 shadow-sm transition-all duration-200 active:scale-[0.98]"
              >
                <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
                <span className="font-semibold text-sm">Facebook</span>
              </a>
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-white/10 text-center text-xs text-gray-400">
          Geo Gems 56 • University of Dhaka
        </div>
      </aside>
    </header>
  );
};

export default Header;