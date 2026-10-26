import React, { useState } from 'react';
import { FiArrowUpRight, FiEye, FiExternalLink, FiUser } from 'react-icons/fi';
import RippleButton from '../ui/RippleButton';
import { resolveImagePath } from './projectUtils';

/**
 * ProjectListCard Component
 * 
 * Renders an individual project card in the List view.
 * Emphasizes sequential progression with an integrated sequence timeline connector,
 * horizontal presentation, comprehensive description, and RippleButton CTAs.
 * 
 * @param {Object} props
 * @param {Object} props.project - The project data object
 * @param {number} props.index - Sequential index (0-based)
 * @param {number} props.total - Total number of projects in the list
 * @param {Function} props.onPreview - Callback to trigger modal preview
 */
const ProjectListCard = ({ project, index, total, onPreview }) => {
  const [imgSrc, setImgSrc] = useState(resolveImagePath(project.src));
  const [hasError, setHasError] = useState(false);

  // Sequential 2-digit format
  const sequenceNum = String(index + 1).padStart(2, '0');
  const isLast = index === total - 1;

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
    <div className="relative flex items-stretch gap-4 sm:gap-6 group">
      {/* Sequential Timeline Indicator on the Left (Desktop & Tablet) */}
      <div className="hidden sm:flex flex-col items-center shrink-0 w-12 pt-2">
        {/* Sequence Node Circle */}
        <div className="flex items-center justify-center w-11 h-11 rounded-full bg-neutral-900 border-2 border-emerald-400/50 text-emerald-300 shadow-md shadow-emerald-950/40 font-mono font-bold text-sm group-hover:border-yellow-400 group-hover:text-yellow-300 transition-colors">
          {sequenceNum}
        </div>

        {/* Vertical Connecting Line to subsequent item */}
        {!isLast && (
          <div className="w-0.5 flex-1 bg-gradient-to-b from-emerald-500/40 via-neutral-800 to-neutral-800 my-2 rounded-full" />
        )}
      </div>

      {/* Main List Item Container */}
      <article
        className="flex-1 flex flex-col md:flex-row items-stretch rounded-2xl bg-neutral-900/85 border border-neutral-800/90 shadow-xl shadow-black/30 overflow-hidden mb-6 transition-all duration-300 hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-950/20"
        aria-labelledby={`project-list-title-${index}`}
      >
        {/* Thumbnail Preview Column */}
        <div className="relative w-full md:w-72 lg:w-80 shrink-0 aspect-[16/10] md:aspect-auto overflow-hidden bg-neutral-950">
          <img
            src={imgSrc}
            alt={project.title}
            loading="lazy"
            onError={handleImageError}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />

          {/* Dark Overlay Fade */}
          <div 
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-neutral-950 via-transparent to-transparent pointer-events-none" 
          />

          
          

          {/* Quick Preview Hover Trigger */}
          <button
            type="button"
            onClick={() => onPreview(project, index)}
            aria-label={`Preview details for ${project.title}`}
            className="absolute inset-0 flex items-center justify-center bg-neutral-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900/90 border border-emerald-400/40 text-emerald-300 text-xs font-semibold shadow-lg">
              <FiEye className="w-3.5 h-3.5 text-yellow-300" />
              Quick View
            </span>
          </button>
        </div>

        {/* Content Column */}
        <div className="flex flex-col justify-between flex-1 p-5 sm:p-6">
          <div>
            {/* Meta Tags: Category & Creator Chip */}
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              {project.category && (
                <span className="px-2.5 py-0.5 rounded-md bg-yellow-500/10 border border-yellow-500/25 text-yellow-300 text-xs font-medium">
                  {project.category}
                </span>
              )}

              {/* Creator(s) Chip */}
              {project.creator && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-medium">
                  <FiUser className="w-3 h-3 text-emerald-400" />
                  <span>By: {Array.isArray(project.creator) ? project.creator.join(', ') : project.creator}</span>
                </span>
              )}
            </div>

            {/* Project Title */}
            <h2
              id={`project-list-title-${index}`}
              className="text-lg sm:text-xl md:text-2xl font-bold text-white group-hover:text-yellow-300 transition-colors duration-200 font-serif leading-snug"
            >
              {project.title}
            </h2>

            {/* Project Description */}
            <p className="mt-2.5 text-xs sm:text-sm text-neutral-300/90 leading-relaxed max-w-3xl">
              {project.description}
            </p>
          </div>

          {/* Action Row & External Link Info */}
          <div className="mt-5 pt-4 border-t border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Link Preview Pill */}
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-emerald-300 transition-colors truncate max-w-xs font-mono"
            >
              <FiExternalLink className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
              <span className="truncate">{project.url.replace(/^https?:\/\//, '')}</span>
            </a>

            {/* Action Buttons using RippleButton */}
            <div className="flex items-center gap-2.5">
              {/* Secondary: Details */}
              <RippleButton
                type="button"
                onClick={() => onPreview(project, index)}
                className="rounded-xl bg-neutral-800/80 hover:bg-neutral-800 text-neutral-200 hover:text-white px-4 py-2 text-xs font-semibold border border-neutral-700/60 transition-colors"
                rippleColor="rgba(255, 255, 255, 0.2)"
              >
                <FiEye className="w-3.5 h-3.5 text-neutral-300" />
                <span>Details</span>
              </RippleButton>

              {/* Primary: Launch Simulation */}
              <RippleButton
                type="button"
                onClick={handleLaunch}
                className="rounded-xl bg-green-400   hover:bg-yellow-400 text-neutral-950 font-bold px-4 py-2 text-xs transition-all ease-in-out duration-300 shadow-md shadow-emerald-500/10 cursor-pointer"
                rippleColor="rgba(0, 0, 0, 0.25)"
              >
                <span>Launch Simulation</span>
                <FiArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </RippleButton>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ProjectListCard;
