import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { projectImg } from '../../data/data';
import RippleButton from '../ui/RippleButton';
import ProjectsHeader from './ProjectsHeader';
import ViewControls from './ViewControls';
import ProjectGridCard from './ProjectGridCard';
import ProjectListCard from './ProjectListCard';
import ProjectModal from './ProjectModal';
import { FiSearch } from 'react-icons/fi';

/**
 * Projects Component
 * 
 * Main container for the "Projects" page showcasing interactive geological web simulators
 * built by Geo Gems Batch 56.
 * 
 * Features:
 * - Data consumption from projectImg array in data.js
 * - Sequential ordering and visual progression indicators
 * - Grid and List view switching with icons powered by RippleButton
 * - Minimal, elegant color theme with subtle light green and soft yellow accents
 * - Responsive layout, accessibility support, and interactive preview modal
 * 
 * @param {Object} props
 * @param {string} props.searchQuery - Global search query passed from Header
 */
const Projects = ({ searchQuery = '' }) => {
  // View mode preference stored in localStorage with fallback to 'grid'
  const [viewMode, setViewMode] = useState(() => {
    try {
      return localStorage.getItem('geogems_projects_view_mode') || 'grid';
    } catch {
      return 'grid';
    }
  });

  // Modal inspection state
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Synchronize view mode preference
  useEffect(() => {
    try {
      localStorage.setItem('geogems_projects_view_mode', viewMode);
    } catch (e) {
      console.warn('Could not persist view mode to localStorage', e);
    }
  }, [viewMode]);

  // Filter projects sequentially based on search query
  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return projectImg;

    return projectImg.filter((item) => {
      const matchTitle = item.title?.toLowerCase().includes(query);
      const matchDesc = item.description?.toLowerCase().includes(query);
      const matchCat = item.category?.toLowerCase().includes(query);
      const matchCreator = Array.isArray(item.creator)
        ? item.creator.some((c) => c.toLowerCase().includes(query))
        : typeof item.creator === 'string' && item.creator.toLowerCase().includes(query);
      return matchTitle || matchDesc || matchCat || matchCreator;
    });
  }, [searchQuery]);

  // Open inspection modal
  const handleOpenPreview = (project, index) => {
    setSelectedProject(project);
    setSelectedProjectIndex(index);
    setIsModalOpen(true);
  };

  // Close inspection modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedProject(null);
    }, 250);
  };

  // Navigate to next project in sequential order inside modal
  const handleNextProject = useCallback(() => {
    if (filteredProjects.length === 0) return;
    setSelectedProjectIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % filteredProjects.length;
      setSelectedProject(filteredProjects[nextIndex]);
      return nextIndex;
    });
  }, [filteredProjects]);

  // Navigate to previous project in sequential order inside modal
  const handlePrevProject = useCallback(() => {
    if (filteredProjects.length === 0) return;
    setSelectedProjectIndex((prevIndex) => {
      const prev = (prevIndex - 1 + filteredProjects.length) % filteredProjects.length;
      setSelectedProject(filteredProjects[prev]);
      return prev;
    });
  }, [filteredProjects]);

  return (
    <main className="min-h-screen w-full bg-neutral-950 py-8 sm:py-12 px-3 sm:px-6 md:px-8 text-neutral-100 selection:bg-emerald-500/30 selection:text-emerald-200">
      <div className="max-w-7xl mx-auto">
        {/* Title, context, and what the page actually is */}
        <ProjectsHeader totalProjects={projectImg.length} />

        {/* View Switcher Controls (List vs Grid with Icons using RippleButton) */}
        <ViewControls
          viewMode={viewMode}
          setViewMode={setViewMode}
          filteredCount={filteredProjects.length}
          totalCount={projectImg.length}
        />

        {/* Project Content Section */}
        {filteredProjects.length > 0 ? (
          viewMode === 'grid' ? (
            /* Grid View: 1 col on mobile, 2 cols on tablet, 3 cols on desktop */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProjects.map((project, index) => (
                <ProjectGridCard
                  key={project.id || project.title || index}
                  project={project}
                  index={index}
                  onPreview={handleOpenPreview}
                />
              ))}
            </div>
          ) : (
            /* List View: Horizontal sequential flow with timeline marker */
            <div className="flex flex-col">
              {filteredProjects.map((project, index) => (
                <ProjectListCard
                  key={project.id || project.title || index}
                  project={project}
                  index={index}
                  total={filteredProjects.length}
                  onPreview={handleOpenPreview}
                />
              ))}
            </div>
          )
        ) : (
          /* Empty Search State with Reset Action */
          <div className="max-w-md mx-auto text-center py-16 px-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 my-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <FiSearch className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white font-serif">
              No matching simulations found
            </h3>
            <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
              We couldn&apos;t find any project matching &ldquo;<span className="text-yellow-300 font-semibold">{searchQuery}</span>&rdquo;.
              Try adjusting your query or resetting the search bar.
            </p>
          </div>
        )}

        {/* Interactive Inspection Modal */}
        <ProjectModal
          project={selectedProject}
          index={selectedProjectIndex}
          total={filteredProjects.length}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onNext={handleNextProject}
          onPrev={handlePrevProject}
        />
      </div>
    </main>
  );
};

export default Projects;
