import React from 'react';

/**
 * ProjectsHeader Component
 * 
 * Displays the page title, comprehensive description explaining what the project page is,
 * and an active curriculum module counter with minimal light green and soft yellow accents.
 * 
 * @param {Object} props
 * @param {number} props.totalProjects - Total count of sequential projects available
 */
const ProjectsHeader = () => {
  return (
    <header className="relative w-full mb-10 pb-8 border-b border-neutral-800/80">
      {/* Subtle background ambient light glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-to-r from-emerald-500/10 via-yellow-400/10 to-transparent blur-3xl rounded-full"
      />

      <div className="relative max-w-7xl mx-auto flex gap-3 flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-full">
          {/* Breadcrumb / Category Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-500/25 mb-4 shadow-sm shadow-emerald-950/40">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-emerald-300 ">
              Geo Gems Batch 56 • Innovation Lab
            </span>
          </div>

          {/* Page Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-serif mt-3">
            Geological &amp; Web{' '}
            <span className="bg-gradient-to-r from-emerald-300 via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>

          {/* Explanation of what the project page is */}
          <p className="mt-4 text-sm sm:text-xl w-full text-neutral-300 leading-relaxed font-sans">
            Welcome to the <strong className="text-neutral-100 font-semibold">Geo Gems 56 Project Showcase</strong>. 
            This space features interactive digital simulators, geological modeling applications, 
            and computational earth science tools built by students of the 
            <span className="text-yellow-300/90 font-medium"> Department of Geology, University of Dhaka</span>. 
            Each project module is engineered to simplify complex geological dynamics—from fluvial 
            sedimentation physics to Himalayan collisional tectonics and automated borehole litholog generation—through 
            engaging, hands-on visual experiences.
          </p>
        </div>

        
      </div>
    </header>
  );
};

export default ProjectsHeader;
