import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import RippleButton from './ui/RippleButton';
import { logo } from '../data/data.js';



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
    <header className="sticky top-0 z-40 w-full py-3 sm:py-4 px-3 sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-center">
        {/* Floating Navbar Pill (Watermelon UI navigation-5 style) */}
        <div className="flex h-16 w-full max-w-5xl lg:max-w-6xl items-center justify-between gap-2 sm:gap-4 rounded-xl border border-neutral-800 bg-neutral-950/85 backdrop-blur-xl px-3 sm:px-6 shadow-xl shadow-black/30">
          
          {/* Logo Section */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 pl-1 sm:pl-2">
            <Link to="/" onClick={closeDrawer} className="flex items-center gap-2 group">
              <div className="text-amber-500 flex h-6 w-6  items-center justify-center transition-transform group-hover:scale-110">
                <img className='rounded-md' src={logo.src}/>
              </div>
              <span className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight font-serif text-orange-500 hover:text-orange-400 transition-colors whitespace-nowrap">
                Geo Gems
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Tabs (navigation-5 rounded pill bar) */}
          <div className="hidden lg:flex items-center gap-2 bg-neutral-900/60 p-[4px] rounded-xl border border-neutral-800/80">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `rounded-xl px-6 py-1.5 text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/60'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/gallery"
              className={({ isActive }) =>
                `rounded-xl px-6 py-1.5 text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/60'
                }`
              }
            >
              Gallery
            </NavLink>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `rounded-xl px-6 py-1.5 text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/60'
                }`
              }
            >
              Projects
            </NavLink>
          </div>

          {/* Search Bar (Pill style input) */}
         
<div className="relative flex-1 md:flex-initial w-auto sm:w-44 md:w-52 lg:w-64 max-w-xs md:max-w-none mx-1 sm:mx-2">
  <input
    type="text"
    placeholder="Search..."
    value={searchQuery}
    onChange={handleSearch}
    className="w-full rounded-xl bg-neutral-900/90 px-3 py-2 pl-9 text-xs sm:text-sm text-neutral-100 placeholder-neutral-500 border border-neutral-800 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all"
  />

  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 absolute top-1/2 left-3 -translate-y-1/2 text-neutral-400 pointer-events-none"
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


          {/* Action Section (Desktop: Creator button & Social Icons) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Desktop Navigation for medium screens (between md and lg) */}
            <div className="hidden md:flex lg:hidden items-center gap-1">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-amber-500 text-neutral-950 font-bold'
                      : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/60'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/gallery"
                className={({ isActive }) =>
                  `rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-amber-500 text-neutral-950 font-bold'
                      : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/60'
                  }`
                }
              >
                Gallery
              </NavLink>
              <NavLink
                to="/projects"
                className={({ isActive }) =>
                  `rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-amber-500 text-neutral-950 font-bold'
                      : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/60'
                  }`
                }
              >
                Projects
              </NavLink>
            </div>

            {/* Social Icons (GitHub, Facebook) */}
            <div className="hidden md:flex items-center gap-1">
              <a
                href="https://github.com/Mo-Jawad/Dhaincha-Friends"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2 text-neutral-400 hover:text-white hover:bg-neutral-800/80 transition-colors"
                aria-label="GitHub Repository"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4.5 h-4.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>

              <a
                href="https://www.facebook.com/share/19yk8TMPPz/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2 text-neutral-400 hover:text-white hover:bg-neutral-800/80 transition-colors"
                aria-label="Facebook Profile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4.5 h-4.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
            </div>

            {/* About Creator (Desktop only - strictly hidden in front in mobile view) */}
            <div className="hidden md:flex items-center">
              <RippleButton
                onClick={scrollToFooter}
                className="rounded-full bg-yellow-500 hover:bg-yellow-400 px-4 sm:px-5 py-2 font-bold text-xs sm:text-sm text-neutral-950 transition-all shadow-md shadow-yellow-500/10 whitespace-nowrap cursor-pointer active:scale-95"
                rippleColor="rgba(0, 0, 0, 0.2)"
              >
                About Creator
              </RippleButton>
            </div>

            {/* Mobile Sheet Trigger (navigation-5 rounded-full icon button) */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open mobile navigation menu"
              className="md:hidden rounded-full p-2 text-neutral-300 hover:text-white hover:bg-neutral-800/80 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 shrink-0 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sheet / Drawer UI (navigation-5 style with backdrop blur) */}
      <div
        className={`fixed inset-0 z-50 bg-black/75 backdrop-blur-2xl transition-opacity duration-300 md:hidden ${
          isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      <aside
        className={`fixed top-0 right-0 bottom-0 z-50 w-[300px] sm:w-[340px] max-w-[85vw] bg-neutral-950/95 backdrop-blur-2xl border-l border-neutral-800 shadow-2xl flex flex-col justify-between p-6 transform transition-transform duration-300 ease-in-out md:hidden ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Drawer"
      >
        {/* Drawer Header */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <div className="text-amber-500 flex h-7 w-7 items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 fill-current text-amber-500"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white font-serif">
                Geo Gems
              </span>
            </div>
            <button
              onClick={closeDrawer}
              aria-label="Close navigation drawer"
              className="rounded-full p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links (Pill Style) */}
          <div className="flex flex-col gap-3 py-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Menu
            </span>
            <NavLink
              to="/"
              end
              onClick={closeDrawer}
              className={({ isActive }) =>
                `rounded-xl backdrop-blur-lg px-4 py-2.5 text-sm font-medium transition-colors flex items-center justify-between ${
                  isActive
                    ? 'bg-amber-300 text-neutral-950 font-bold shadow-sm'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
                }`
              }
            >
              <span>Home</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </NavLink>

            <NavLink
              to="/gallery"
              onClick={closeDrawer}
              className={({ isActive }) =>
                `rounded-xl px-4 py-2.5 text-sm font-medium transition-colors flex items-center justify-between ${
                  isActive
                    ? 'bg-amber-300 text-neutral-950 font-bold shadow-sm'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
                }`
              }
            >
              <span>Gallery</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </NavLink>

            <NavLink
              to="/projects"
              onClick={closeDrawer}
              className={({ isActive }) =>
                `rounded-xl px-4 py-2.5 text-sm font-medium transition-colors flex items-center justify-between ${
                  isActive
                    ? 'bg-amber-300 text-neutral-950 font-bold shadow-sm'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
                }`
              }
            >
              <span>Projects</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </NavLink>

            {/* Social Links inside drawer */}
            <div className="pt-4 border-t border-neutral-800 flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Connect
              </span>
              <a
                href="https://github.com/Mo-Jawad/Dhaincha-Friends"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeDrawer}
                className="flex items-center gap-3 rounded-full px-4 py-2 text-sm text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors"
              >
                <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </a>

              <a
                href="https://www.facebook.com/share/19yk8TMPPz/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeDrawer}
                className="flex items-center gap-3 rounded-full px-4 py-2 text-sm text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors"
              >
                <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
                <span>Facebook</span>
              </a>
            </div>
          </div>
        </div>

        {/* Drawer Bottom CTA (About Creator) */}
        <div className="mt-auto flex flex-col gap-3 pt-4 border-t border-neutral-800">
          <RippleButton
            onClick={() => {
              closeDrawer();
              scrollToFooter();
            }}
            className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 py-3 font-bold text-sm text-neutral-950 transition-all shadow-lg shadow-amber-500/20 backdrop-blur-md border border-amber-300/30 cursor-pointer active:scale-95"
            rippleColor="rgba(0, 0, 0, 0.25)"
          >
            About Creator
          </RippleButton>
          <p className="text-center text-[11px] text-neutral-500">
            Geo Gems 56 • University of Dhaka
          </p>
        </div>
      </aside>
    </header>
  );
};

export default Header;