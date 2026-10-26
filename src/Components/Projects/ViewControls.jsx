import React from 'react';
import { FiGrid, FiList } from 'react-icons/fi';
import RippleButton from '../ui/RippleButton';

/**
 * ViewControls Component
 * 
 * Provides view toggling between 'grid' and 'list' layout using the custom RippleButton
 * component with clear icons and minimal light green and yellow accents.
 * 
 * @param {Object} props
 * @param {'grid' | 'list'} props.viewMode - Current active layout mode
 * @param {Function} props.setViewMode - State setter for layout mode
 * @param {number} props.filteredCount - Number of items currently shown
 * @param {number} props.totalCount - Total number of projects in dataset
 */
const ViewControls = ({ viewMode, setViewMode, filteredCount, totalCount }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-neutral-900/60 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-neutral-800/80">
      {/* Sequential info & status badge */}
      <div className="flex items-center gap-2.5 text-xs sm:text-sm">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-neutral-300 font-medium">
          total projects:
        </span>
        <span className="px-2 py-0.5 rounded-md bg-neutral-800 text-yellow-300 font-semibold text-xs border border-neutral-700/60">
          {filteredCount} of {totalCount} {filteredCount === 1 ? 'Project' : 'Projects'}
        </span>
      </div>

      {/* View Switcher: List and Grid with Icons using RippleButton */}
      <div 
        role="group" 
        aria-label="Layout view options"
        className="flex items-center gap-1.5 p-1 hidden sm:block bg-neutral-950/80 rounded-xl border border-neutral-800"
      >
        {/* Grid View Option */}
        <RippleButton
          type="button"
          onClick={() => setViewMode('grid')}
          aria-pressed={viewMode === 'grid'}
          title="Switch to Grid View"
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
            viewMode === 'grid'
              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-400/40 shadow-sm shadow-emerald-500/15'
              : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50 border border-transparent'
          }`}
          rippleColor="rgba(52, 211, 153, 0.35)"
        >
          <FiGrid className={`w-4 h-4 ${viewMode === 'grid' ? 'text-emerald-400' : 'text-neutral-400'}`} />
          <span>Grid View</span>
        </RippleButton>

        {/* List View Option */}
        <RippleButton
          type="button"
          onClick={() => setViewMode('list')}
          aria-pressed={viewMode === 'list'}
          title="Switch to List View"
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
            viewMode === 'list'
              ? 'bg-yellow-500/15 text-yellow-300 border border-yellow-400/40 shadow-sm shadow-yellow-500/15'
              : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50 border border-transparent'
          }`}
          rippleColor="rgba(250, 204, 21, 0.35)"
        >
          <FiList className={`w-4 h-4 ${viewMode === 'list' ? 'text-yellow-400' : 'text-neutral-400'}`} />
          <span>List View</span>
        </RippleButton>
      </div>
    </div>
  );
};

export default ViewControls;
