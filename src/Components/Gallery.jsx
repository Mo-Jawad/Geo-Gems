import React, { useState, useEffect, useCallback } from 'react';
import { galleryImages } from '../data/galleryData';

const Gallery = ({ searchQuery = '' }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Filter gallery items by search query if provided
  const filteredImages = galleryImages.filter((item) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
    );
  });

  const openModal = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsOpen(true);
      });
    });
  };

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      setSelectedImage(null);
    }, 300);
  }, []);

  const handlePrev = useCallback((e) => {
    if (e) e.stopPropagation();
    if (filteredImages.length === 0) return;
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + filteredImages.length) % filteredImages.length;
      setSelectedImage(filteredImages[newIndex]);
      return newIndex;
    });
  }, [filteredImages]);

  const handleNext = useCallback((e) => {
    if (e) e.stopPropagation();
    if (filteredImages.length === 0) return;
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % filteredImages.length;
      setSelectedImage(filteredImages[newIndex]);
      return newIndex;
    });
  }, [filteredImages]);

  // Handle keyboard events (Escape to close, Left/Right arrows to navigate) and lock body scroll
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal();
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
  }, [selectedImage, closeModal, handlePrev, handleNext]);

  return (
    <div className="min-h-screen w-full bg-gray-700 py-6 sm:py-10 px-3 sm:px-6 md:px-8">
      {/* Header section */}
      <div className="max-w-7xl mx-auto mb-8 sm:mb-10 pb-5 sm:pb-6 border-b border-gray-600/70 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-8 bg-amber-500 rounded-full inline-block"></span>
            <span className="text-amber-400 font-bold uppercase tracking-wider text-xs sm:text-sm">
              Geo Gems Batch 56
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white font-serif tracking-wide">
            Moments Gallery
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
            Cherished field work adventures, cultural performances, honoring ceremonies, and memorable batch memories.
          </p>
        </div>

        {/* <div className="self-start md:self-end bg-gray-800/80 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-600/50 text-xs sm:text-sm text-gray-300 shrink-0">
          Showing <span className="text-amber-400 font-bold">{filteredImages.length}</span> {filteredImages.length === 1 ? 'photo' : 'photos'}
        </div> */}
      </div>

      {/* Gallery Grid */}
      {filteredImages.length > 0 ? (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              onClick={() => openModal(image, index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openModal(image, index);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Open modal for ${image.title}`}
              className="group relative cursor-pointer overflow-hidden rounded-xl bg-gray-800 border-2 border-gray-600/60 shadow-lg hover:shadow-2xl hover:shadow-amber-500/25 hover:border-amber-400 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              {/* Picture with rounded-xl */}
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl bg-gray-900">
                <img
                  src={image.src}
                  alt={image.title}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-xl transition-all duration-500 ease-out group-hover:scale-105"
                />

                {/* Hover Overlay: subtle bottom fade showing ONLY the title in small size */}
                <div className="absolute inset-x-0 bottom-0 rounded-b-xl bg-gradient-to-t from-black/80 via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 pt-6 pb-2.5 flex items-end justify-center pointer-events-none">
                  <p className="text-white text-xs sm:text-sm font-medium text-center line-clamp-2 drop-shadow-md">
                    {image.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-md mx-auto text-center py-16 sm:py-20 px-6 bg-gray-800/60 rounded-xl border border-gray-600">
          <svg
            className="w-14 h-14 sm:w-16 sm:h-16 mx-auto text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">No matching photos found</h3>
          <p className="text-gray-300 text-xs sm:text-sm">
            We couldn't find any photos matching "{searchQuery}".
          </p>
        </div>
      )}

      {/* Modal Format with smooth transition & responsive layout */}
      {selectedImage && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-sm transition-all duration-300 ease-out ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-image-title"
        >
          <div
            className={`relative w-full max-w-5xl bg-gray-900 border-2 border-amber-500/40 rounded-2xl shadow-2xl overflow-y-auto lg:overflow-hidden flex flex-col lg:flex-row max-h-[94vh] sm:max-h-[90vh] transform transition-all duration-300 ease-out ${
              isOpen
                ? 'opacity-100 scale-100 translate-y-0'
                : 'opacity-0 scale-95 translate-y-4'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              aria-label="Close modal"
              className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-30 p-1.5 sm:p-2 text-gray-300 hover:text-white bg-gray-800/90 hover:bg-gray-700 rounded-full transition-colors cursor-pointer border border-gray-600 shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Picture in Modal with rounded-xl */}
            <div className="relative lg:w-3/5 w-full bg-black/70 flex items-center justify-center p-3 sm:p-6 min-h-[200px] sm:min-h-[280px] lg:min-h-[500px] shrink-0">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-h-[36vh] sm:max-h-[48vh] lg:max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-gray-800 transition-opacity duration-200"
              />

              {/* Prev Arrow Button */}
              <button
                onClick={handlePrev}
                aria-label="Previous photo"
                className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-amber-500 text-white hover:text-gray-900 transition-colors cursor-pointer border border-white/20 shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next Arrow Button */}
              <button
                onClick={handleNext}
                aria-label="Next photo"
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-amber-500 text-white hover:text-gray-900 transition-colors cursor-pointer border border-white/20 shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Description & Details with Proper Layouting */}
            <div className="lg:w-2/5 w-full p-5 sm:p-7 md:p-8 flex flex-col justify-between bg-gray-900 border-t lg:border-t-0 lg:border-l border-gray-800 overflow-y-auto">
              <div>
                {/* Category & Date */}
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/30 rounded-full">
                    {selectedImage.category}
                  </span>
                  {/* {selectedImage.date && (
                    <span className="text-[11px] sm:text-xs text-gray-400 font-medium">
                      • {selectedImage.date}
                    </span>
                  )} */}
                </div>

                {/* Title */}
                <h2
                  id="modal-image-title"
                  className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-white tracking-wide leading-snug"
                >
                  {selectedImage.title}
                </h2>

                <div className="w-12 sm:w-16 h-1 bg-amber-500 rounded-full my-3 sm:my-4"></div>

                {/* Description */}
                <div className="space-y-1.5 sm:space-y-2">
                  <h4 className="text-[11px] sm:text-xs uppercase font-bold tracking-wider text-gray-400">
                    Description
                  </h4>
                  <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed font-sans">
                    {selectedImage.description}
                  </p>
                </div>
              </div>

              {/* Navigation Controls & Counter */}
              <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-gray-800">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2 sm:mb-3">
                  <span>Photo {currentIndex + 1} of {filteredImages.length}</span>
                  <span className="hidden sm:inline">Use ← → arrow keys</span>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <button
                    onClick={handlePrev}
                    className="flex-1 py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-semibold text-xs sm:text-sm transition-colors border border-gray-700 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    &larr; Prev
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex-1 py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold text-xs sm:text-sm transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    Next &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
