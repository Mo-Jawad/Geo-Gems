import React, { useState } from 'react';
import { FiArrowUpRight, FiEye, FiUser } from 'react-icons/fi';
import RippleButton from '../ui/RippleButton';
import { resolveImagePath } from './projectUtils';

/**
 * ProjectGridCard Component
 * 
 * Renders an individual project card in the Grid view.
 * Features prominent sequential numbering, clean image preview with hover zoom,
 * geological meta info, and custom RippleButton action triggers.
 * 
 * @param {Object} props
 * @param {Object} props.project - The project data object
 * @param {number} props.index - Sequential index (0-based)
 * @param {Function} props.onPreview - Callback to trigger modal preview
 */
const ProjectGridCard = ({ project, index, onPreview }) => {
  const [imgSrc, setImgSrc] = useState(resolveImagePath(project.src));
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc('/assets/images/default.jpg');
    }
  };

  const handleLaunch = (e) => {
    e.stopPropagation();
    if (project.url) {
      window.open(project.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <article
      className="group relative flex flex-col justify-between rounded-2xl bg-neutral-900/85 border border-neutral-800/90 shadow-xl shadow-black/30 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-950/20"
      aria-labelledby={`project-title-${index}`}
    >
      {/* Top Banner & Image Preview Container */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-950">
        <img
          src={imgSrc}
          alt={project.title}
          loading="lazy"
          onError={handleImageError}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Subtle Dark Gradient Overlay for Contrast */}
        <div 
          aria-hidden="true" 
          className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent pointer-events-none" 
        />

        
        
        {/* Category Chip (Top Right) */}
        {project.category && (
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-neutral-950/80 backdrop-blur-md border border-neutral-700/60 text-[11px] font-medium text-yellow-200/90 shadow-md">
            {project.category}
          </div>
        )}

        {/* Quick Preview Hover Trigger */}
        <button
          type="button"
          onClick={() => onPreview(project, index)}
          aria-label={`Preview details for ${project.title}`}
          className="absolute inset-0 flex items-center justify-center bg-neutral-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900/90 border border-emerald-400/40 text-emerald-300 text-xs font-semibold shadow-lg">
            <FiEye className="w-3.5 h-3.5 text-yellow-300" />
            Quick Preview
          </span>
        </button>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between">
        <div>
          
          {/* Project Title */}
          <h2
            id={`project-title-${index}`}
            className="text-lg sm:text-xl font-bold text-white group-hover:text-yellow-300 transition-colors duration-200 leading-snug font-serif"
          >
            {project.title}
          </h2>

          {/* Project Description */}
          <p className="mt-2.5 text-xs sm:text-sm text-neutral-300/90 leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Creator(s) Display */}
          {project.creator && (
            <div className="mt-3 flex items-center gap-1.5 text-xs text-neutral-400">
              <FiUser className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="text-neutral-500 text-[11px] font-medium">By:</span>
              <span className="text-emerald-300 font-medium truncate">
                {Array.isArray(project.creator) ? project.creator.join(', ') : project.creator}
              </span>
            </div>
          )}
        </div>

        {/* Card Footer: Domain pill & RippleButtons */}
        <div className="mt-6 pt-4 border-t border-neutral-800/80 flex flex-col gap-3">
          

          {/* Action Buttons: Both using RippleButton */}
          <div className="grid grid-cols-2 gap-2">
            {/* Secondary: Preview details */}
            <RippleButton
              type="button"
              onClick={() => onPreview(project, index)}
              className="w-full rounded-xl bg-neutral-800/80 hover:bg-neutral-800 text-neutral-200 hover:text-white px-3 py-2 text-xs font-semibold border border-neutral-700/60 transition-colors"
              rippleColor="rgba(255, 255, 255, 0.2)"
            >
              <FiEye className="w-3.5 h-3.5 text-neutral-300" />
              <span>Details</span>
            </RippleButton>

            {/* Primary: Launch Simulation (Light green to yellow minimal styling) */}
            <RippleButton
              type="button"
              onClick={handleLaunch}
              className="w-full rounded-xl bg-gradient-to-r hover:bg-green-400 bg-yellow-500  text-neutral-950 font-bold px-3 py-2 text-xs transition-all shadow-md shadow-emerald-500/10 cursor-pointer"
              rippleColor="rgba(0, 0, 0, 0.25)"
            >
              <span>Launch</span>
              <FiArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </RippleButton>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectGridCard;
