import React, { useEffect, useState, useCallback } from 'react';
import { 
  FiX, 
  FiArrowUpRight, 
  FiExternalLink, 
  FiLayers, 
  FiCheckCircle, 
  FiChevronLeft, 
  FiChevronRight,
  FiCompass,
  FiUser
} from 'react-icons/fi';
import RippleButton from '../ui/RippleButton';
import { resolveImagePath } from './projectUtils';

/**
 * ProjectModal Component
 * 
 * Provides an accessible, responsive two-column modal for in-depth project inspection.
 * - Left side: Project image with surrounding left/right navigation buttons to cycle through projects
 * - Right side: Comprehensive details, category, key concept tags, and simulation launch CTA
 * - Includes keyboard support (ArrowLeft, ArrowRight, Escape) and scroll lock
 * 
 * @param {Object} props
 * @param {Object|null} props.project - The currently selected project data
 * @param {number} props.index - Sequential index of selected project (0-based)
 * @param {number} props.total - Total project count
 * @param {boolean} props.isOpen - Whether modal is visible
 * @param {Function} props.onClose - Modal close handler
 * @param {Function} props.onNext - Navigate to next project
 * @param {Function} props.onPrev - Navigate to previous project
 */
const ProjectModal = ({ 
  project, 
  isOpen, 
  onClose,
  onNext,
  onPrev
}) => {
  const [imgSrc, setImgSrc] = useState('/assets/images/default.jpg');
  const [imageLoaded, setImageLoaded] = useState(false);

  // Synchronize image path when project changes
  useEffect(() => {
    if (project?.src) {
      setImageLoaded(false);
      setImgSrc(resolveImagePath(project.src));
    }
  }, [project]);

  // Safe navigation handlers
  const handleNext = useCallback((e) => {
    if (e) e.stopPropagation();
    if (onNext) onNext();
  }, [onNext]);

  const handlePrev = useCallback((e) => {
    if (e) e.stopPropagation();
    if (onPrev) onPrev();
  }, [onPrev]);

  // Lock background scrolling and bind keyboard controls (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !project) return null;


  const handleLaunch = () => {
    if (project.url) {
      window.open(project.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Content Container: Wide 2-Column Presentation */}
      <div className="relative w-full lg:max-w-7xl rounded-3xl bg-neutral-950 border border-neutral-800 shadow-2xl shadow-black/90 overflow-hidden z-10 my-auto flex flex-col max-h-[92vh] transform transition-all duration-300 animate-slide-in-right">
        
        {/* Top Header Bar: Sequence meta, category badge, and close button */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-3.5 border-b border-neutral-800/80 bg-neutral-900/40 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            
            

            {project.category && (
              <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/25 text-yellow-300 text-xs font-medium">
                {project.category}
              </span>
            )}

            
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-full p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Content: Split Two-Column Layout */}
        <div className="flex flex-col lg:flex-row items-stretch justify-center items-center flex-1 overflow-y-auto">
          
          {/* ================= LEFT SIDE: Image & Navigation Controls ================= */}
          <div className="lg:w-1/2 flex flex-col justify-between p-5 sm:p-7 bg-neutral-900/25 border-b lg:border-b-0 lg:border-r border-neutral-800/80">
            <div>
              {/* Surrounding Navigation Wrapper for Left/Right Cycling */}
              <div className="relative flex items-center justify-center w-full my-auto">
                
                {/* Left Navigation Button around the image */}
                <RippleButton
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous Project (Left Arrow)"
                  title="Previous project (←)"
                  className="absolute left-2 sm:left-3 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-neutral-950/85 hover:bg-neutral-900 border border-neutral-700/80 hover:border-emerald-400 text-neutral-300 hover:text-emerald-300 shadow-xl shadow-black/70 flex items-center justify-center transition-all cursor-pointer active:scale-90"
                  rippleColor="rgba(52, 211, 153, 0.4)"
                >
                  <FiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </RippleButton>

                {/* Main Preview Image Container */}
                <div className="relative w-full min-h-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/9] rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-xl group">
                  <img
                    src={imgSrc}
                    alt={project.title}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => {
                      setImgSrc('/assets/images/default.jpg');
                      setImageLoaded(true);
                    }}
                    className={`w-full h-full object-cover transition-all duration-300 ${
                      imageLoaded ? 'opacity-100 scale-100' : 'opacity-70 scale-95'
                    }`}
                  />

                  {/* Gradient shade for bottom contrast */}
                  <div 
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" 
                  />

                  <div className="absolute bottom-3 left-4 text-xs font-medium text-neutral-300 drop-shadow-md">
                    Simulation Model Preview
                  </div>
                </div>

                {/* Right Navigation Button around the image */}
                <RippleButton
                  type="button"
                  onClick={handleNext}
                  aria-label="Next Project (Right Arrow)"
                  title="Next project (→)"
                  className="absolute right-2 sm:right-3 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-neutral-950/85 hover:bg-neutral-900 border border-neutral-700/80 hover:border-yellow-400 text-neutral-300 hover:text-yellow-300 shadow-xl shadow-black/70 flex items-center justify-center transition-all cursor-pointer active:scale-90"
                  rippleColor="rgba(250, 204, 21, 0.4)"
                >
                  <FiChevronRight className="w-5 h-5  sm:w-6 sm:h-6" />
                </RippleButton>
              </div>

              
              
            </div>

            {/* Quick Domain Pill at bottom of left panel */}
            <div className="pt-4 mt-4 border-t border-neutral-800/60 hidden sm:flex items-center justify-between text-xs text-neutral-400">
              <span className="flex items-center gap-1.5">
                <FiCompass className="w-3.5 h-3.5 text-emerald-400" />
                <span>Earth-Science Interactive Lab</span>
              </span>
              
            </div>
          </div>

          {/* ================= RIGHT SIDE: Details, Meta & Actions ================= */}
          <div className="lg:w-1/2 flex flex-col justify-between p-5 sm:p-7">
            <div className="space-y-4">
              
              {/* Category chip for mobile */}
              {project.category && (
                <div className="sm:hidden">
                  <span className="px-2.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/25 text-yellow-300 text-xs font-medium">
                    {project.category}
                  </span>
                </div>
              )}

              

              {/* Title */}
              <h2
                id="modal-project-title"
                className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white font-serif tracking-wide leading-snug"
              >
                {project.title}
              </h2>

              {/* Detailed Description */}
              <p className="text-xs sm:text-lg text-neutral-300 leading-relaxed font-sans">
                {project.description}
              </p>

              {/* Creator(s) Info */}
              {project.creator && (
                <div className="flex items-center gap-2 pt-1 pb-1">
                  <span className="text-xs text-neutral-400 font-medium">Developed by:</span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {(Array.isArray(project.creator) ? project.creator : [project.creator]).map((name, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold shadow-sm"
                      >
                        <FiUser className="w-3.5 h-3.5 text-emerald-400" />
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlights & Concept Pills */}
              <div className="grid grid-cols-1 gap-2.5 p-3.5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 text-md">
                <div className="flex items-center gap-2 text-neutral-300">
                  <FiCheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Full Interactive Controls</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <FiLayers className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span>Geological Batch 56 Academic Resource</span>
                </div>
              </div>

              {/* Netlify URL indicator */}
              <div className="pt-1">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-emerald-300 transition-colors font-mono truncate max-w-full"
                >
                  <FiExternalLink className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                  <span className="truncate">{project.url}</span>
                </a>
              </div>
            </div>

            {/* Modal Bottom Actions using RippleButton */}
            <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-end gap-3">
              <RippleButton
                type="button"
                onClick={onClose}
                className="rounded-xl px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 transition-colors cursor-pointer"
                rippleColor="rgba(255, 255, 255, 0.2)"
              >
                Close
              </RippleButton>

              <RippleButton
                type="button"
                onClick={handleLaunch}
                className="rounded-xl px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-bold text-neutral-950 bg-green-400  ease-in-out duration-300 hover:bg-yellow-300 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                rippleColor="rgba(0, 0, 0, 0.25)"
              >
                <span>Launch Live Simulation</span>
                <FiArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </RippleButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
