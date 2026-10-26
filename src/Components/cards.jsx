import React, { useState, useEffect, useCallback, useMemo } from 'react';
import RippleButton from './ui/RippleButton';

const Cards = ({ filteredUsers = [] }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('right');
  const [isOpen, setIsOpen] = useState(false);

  // Sort cards by the "roll" field in ascending order, placing items with missing roll at the end
  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      const rollA = a?.roll != null && !isNaN(Number(a.roll)) ? Number(a.roll) : Infinity;
      const rollB = b?.roll != null && !isNaN(Number(b.roll)) ? Number(b.roll) : Infinity;

      if (rollA !== rollB) {
        return rollA - rollB;
      }
      return (a.id || 0) - (b.id || 0);
    });
  }, [filteredUsers]);

  const openModal = (student, index) => {
    setSelectedStudent(student);
    const resolvedIndex =
      index !== undefined && index >= 0
        ? index
        : sortedUsers.findIndex((u) => u.id === student?.id);
    setCurrentIndex(resolvedIndex >= 0 ? resolvedIndex : 0);
    setSlideDirection('right');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsOpen(true);
      });
    });
  };

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      setSelectedStudent(null);
    }, 300);
  }, []);

  const handlePrev = useCallback((e) => {
    if (e) e.stopPropagation();
    if (!sortedUsers || sortedUsers.length === 0) return;
    setSlideDirection('left');
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + sortedUsers.length) % sortedUsers.length;
      setSelectedStudent(sortedUsers[newIndex]);
      return newIndex;
    });
  }, [sortedUsers]);

  const handleNext = useCallback((e) => {
    if (e) e.stopPropagation();
    if (!sortedUsers || sortedUsers.length === 0) return;
    setSlideDirection('right');
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % sortedUsers.length;
      setSelectedStudent(sortedUsers[newIndex]);
      return newIndex;
    });
  }, [sortedUsers]);

  // Handle Escape key, Left/Right arrow keys, and lock body scroll when modal is open
  useEffect(() => {
    if (!selectedStudent) return;

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
  }, [selectedStudent, closeModal, handlePrev, handleNext]);

  const getImageUrl = (img) => {
    if (!img) return '/assets/images/default.jpg';
    if (img.startsWith('/')) return img;
    return '/' + img.replace(/^\.?\//, '');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Student Cards Grid with Uniform Heights & Responsive Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7 items-stretch">
        {sortedUsers.map((dhaicha, index) => (
          <div
            key={dhaicha.id}
            onClick={() => openModal(dhaicha, index)}
            className="h-full w-full bg-neutral-900/60 backdrop-blur-xl border border-white/10 hover:border-amber-400/40 rounded-2xl p-4 shadow-xl shadow-black/30 hover:shadow-2xl hover:shadow-amber-500/15 transition-all duration-300 flex flex-col justify-between group cursor-pointer overflow-hidden transform hover:-translate-y-1"
          >
            {/* Top Photo (Strict 1:1 Aspect Ratio on Every Card) */}
            <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-neutral-950/70 border border-white/5 shrink-0">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out rounded-xl"
                src={getImageUrl(dhaicha.image)}
                alt={dhaicha.Name || 'Student'}
                loading="lazy"
              />

              {/* Glassmorphic Student Roll / Role Badge */}
              <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-black/60 backdrop-blur-md rounded-full border border-white/15 shadow-sm">
                {dhaicha?.roll != null ? `Roll ${dhaicha.roll}` : 'Student'}
              </span>

              {/* Glassmorphic Blood Group Badge */}
              {dhaicha?.bloodGroup && (
                <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 text-[11px] font-bold tracking-wider text-emerald-300 bg-black/60 backdrop-blur-md rounded-full border border-white/15 shadow-sm">
                  {dhaicha.bloodGroup}
                </span>
              )}
            </div>

            {/* Name and Details with Standardized Heights for Uniform Alignment */}
            <div className="pt-4 flex flex-col justify-between flex-1">
              <div>
                {/* Standardized 2-line Name Container for Equal Alignment */}
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-amber-400 transition-colors tracking-wide leading-tight line-clamp-2 h-12 flex items-center">
                  {dhaicha.Name}
                </h3>

                {/* Hometown row with standardized height */}
                <div className="h-5 mt-1 flex items-center">
                  {dhaicha.hometown ? (
                    <p className="text-xs text-neutral-400 flex items-center gap-1.5 truncate">
                      <svg
                        className="w-3.5 h-3.5 text-amber-400 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="truncate">{dhaicha.hometown}</span>
                    </p>
                  ) : (
                    <span className="text-xs text-neutral-600 italic">Dhaka University</span>
                  )}
                </div>

                {/* Glassmorphic Quick Academic GPA Chips (fixed height row) */}
                <div className="flex items-center gap-2 mt-3 h-7">
                  {dhaicha?.HSC != null ? (
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-white/[0.06] border border-white/10 text-neutral-300 backdrop-blur-xs">
                      HSC: {dhaicha.HSC === 5 ? '5.00' : dhaicha.HSC}
                    </span>
                  ) : (
                    <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-white/[0.03] border border-white/5 text-neutral-500">
                      HSC: —
                    </span>
                  )}

                  {dhaicha?.SSC != null ? (
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-white/[0.06] border border-white/10 text-neutral-300 backdrop-blur-xs">
                      SSC: {dhaicha.SSC === 5 ? '5.00' : dhaicha.SSC}
                    </span>
                  ) : (
                    <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-white/[0.03] border border-white/5 text-neutral-500">
                      SSC: —
                    </span>
                  )}
                </div>
              </div>

              {/* Glassmorphic RippleButton (Consistently Pinned to Bottom) */}
              <RippleButton
                onClick={(e) => {
                  e.stopPropagation();
                  openModal(dhaicha, index);
                }}
                className="w-full mt-4 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 shadow-md shadow-amber-500/20 backdrop-blur-md border border-amber-300/30 transition-all cursor-pointer"
                rippleColor="rgba(0, 0, 0, 0.25)"
              >
                <span>View Details</span>
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </RippleButton>
            </div>
          </div>
        ))}
      </div>

      {/* Glassmorphic Modal Dialog Format with Proper Layout */}
      {selectedStudent && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-2xl transition-all duration-300 ease-out ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="student-modal-title"
        >
          <div
            className={`relative w-full max-w-5xl lg:max-w-6xl bg-neutral-950/85 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-2xl overflow-y-auto lg:overflow-hidden flex flex-col md:flex-row max-h-[95vh] sm:max-h-[92vh] transform transition-all duration-300 ease-out ${
              isOpen
                ? 'opacity-100 scale-100 translate-y-0'
                : 'opacity-0 scale-95 translate-y-4'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Side: Larger 1:1 Aspect Ratio Image with Navigation Arrows */}
            <div className="md:w-1/2 w-full bg-black/40 backdrop-blur-md flex items-center justify-center p-6 sm:p-8 lg:p-10 shrink-0">
              <div className="relative aspect-square w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] max-w-full">
                <figure className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/15 group">
                  <div className="w-full h-full overflow-hidden">
                    <img
                      key={selectedStudent.id}
                      src={getImageUrl(selectedStudent.image)}
                      alt={selectedStudent.Name || 'Student'}
                      className={`w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105 ${
                        slideDirection === 'left' ? 'animate-slide-in-left' : 'animate-slide-in-right'
                      }`}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-3.5 left-3.5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300 bg-black/60 backdrop-blur-md rounded-full border border-white/20 shadow-md pointer-events-none">
                    Student Details
                  </span>

                  {/* Student Counter Badge */}
                  {sortedUsers.length > 1 && (
                    <span className="absolute top-3.5 right-3.5 px-3 py-1 text-xs font-semibold text-neutral-300 bg-black/60 backdrop-blur-md rounded-full border border-white/20 shadow-md pointer-events-none">
                      {currentIndex + 1} / {sortedUsers.length}
                    </span>
                  )}
                </figure>

                {/* Left & Right Arrow Buttons on Image Container Both Sides */}
                {sortedUsers.length > 1 && (
                  <>
                    {/* Left Arrow Button */}
                    <RippleButton
                      onClick={handlePrev}
                      aria-label="Previous student"
                      className="absolute left-2 sm:-left-4 md:-left-5 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 md:p-3 text-white hover:text-amber-300 bg-black/70 hover:bg-black/90 backdrop-blur-xl rounded-full border border-white/25 hover:border-amber-400/60 shadow-xl hover:shadow-amber-500/25 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400"
                      rippleColor="rgba(251, 191, 36, 0.4)"
                    >
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                      </svg>
                    </RippleButton>

                    {/* Right Arrow Button */}
                    <RippleButton
                      onClick={handleNext}
                      aria-label="Next student"
                      className="absolute right-2 sm:-right-4 md:-right-5 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 md:p-3 text-white hover:text-amber-300 bg-black/70 hover:bg-black/90 backdrop-blur-xl rounded-full border border-white/25 hover:border-amber-400/60 shadow-xl hover:shadow-amber-500/25 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400"
                      rippleColor="rgba(251, 191, 36, 0.4)"
                    >
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </RippleButton>
                  </>
                )}
              </div>
            </div>

            {/* Right Side: Details Box with Properly Placed Close Button Header */}
            <div className="md:w-1/2 w-full p-6 sm:p-8 flex flex-col justify-between bg-neutral-900/60 backdrop-blur-xl border-t md:border-t-0 md:border-l border-white/10 overflow-y-auto">
              <div>
                {/* Header Row with Title Badge and Properly Aligned Close Button */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400"></span>
                    <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
                      Student Profile
                    </span>
                  </div>
                  <RippleButton
                    onClick={closeModal}
                    aria-label="Close modal"
                    className="p-2 text-neutral-300 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all cursor-pointer border border-white/15 shadow-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                    rippleColor="rgba(255, 255, 255, 0.25)"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </RippleButton>
                </div>

                {/* Details Box (Glassmorphic Container with Amber Rim) */}
                <div
                  key={selectedStudent.id}
                  className={`w-full rounded-2xl p-6 sm:p-7 text-orange-400 border border-amber-400/40 bg-white/[0.03] backdrop-blur-xl shadow-xl font-mono space-y-4 text-start ${
                    slideDirection === 'left' ? 'animate-slide-in-left' : 'animate-slide-in-right'
                  }`}
                >
                  <h2 id="student-modal-title" className="text-2xl sm:text-3xl font-bold text-orange-400 tracking-wide leading-snug">
                    Name : <span className="text-white">{selectedStudent.Name}</span>
                  </h2>

                  <h4 className="text-base sm:text-lg text-neutral-200">
                    Home Town : <span className="text-white font-semibold">{selectedStudent.hometown}</span>
                  </h4>

                  {selectedStudent?.roll != null && (
                    <p className="text-base sm:text-lg text-neutral-200">
                      Roll : <span className="text-amber-400 font-bold">{selectedStudent.roll}</span>
                    </p>
                  )}

                  {selectedStudent?.SSC != null && (
                    <p className="text-base sm:text-lg text-neutral-200">
                      SSC-GPA : <span className="text-amber-400 font-bold">{selectedStudent.SSC === 5 ? '5.00' : selectedStudent.SSC}</span>
                    </p>
                  )}

                  {selectedStudent?.HSC != null && (
                    <p className="text-base sm:text-lg text-neutral-200">
                      HSC-GPA : <span className="text-amber-400 font-bold">{selectedStudent.HSC === 5 ? '5.00' : selectedStudent.HSC}</span>
                    </p>
                  )}

                  {selectedStudent?.bloodGroup != null && (
                    <div className="text-base sm:text-lg text-green-400 font-bold">
                      Blood Group : <span className="text-emerald-300">{selectedStudent.bloodGroup}</span>
                    </div>
                  )}

                  {selectedStudent?.behavior != null && selectedStudent.behavior.length > 0 && (
                    <div className="pt-3 text-green-400 font-normal font-serif border-t border-white/10">
                      <div className="text-lg sm:text-xl text-yellow-300 font-bold mb-2">
                        diagnostic property:
                      </div>
                      <ul className="space-y-1.5 text-sm sm:text-base">
                        {selectedStudent.behavior.map((behave, index) => (
                          <li key={index} className="pl-4 text-green-300 list-disc list-inside">
                            {behave}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Bottom Close Action with Glassmorphic RippleButton */}
              <div className="pt-6 mt-6 border-t border-white/10 flex justify-end">
                <RippleButton
                  onClick={closeModal}
                  className="px-8 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/15 shadow-md backdrop-blur-md transition-all cursor-pointer"
                  rippleColor="rgba(255, 255, 255, 0.3)"
                >
                  Close
                </RippleButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cards;