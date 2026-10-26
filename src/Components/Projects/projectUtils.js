/**
 * Utility helper to ensure project image paths are safely resolved in any deployment.
 * Statically falls back to a default asset if missing or broken.
 * 
 * @param {string} src - Raw path from dataset
 * @returns {string} Web-accessible image path
 */
export const resolveImagePath = (src) => {
  if (!src) return '/assets/images/default.jpg';
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  let clean = src.replace(/^public\/?/, '/');
  if (!clean.startsWith('/')) clean = `/${clean}`;
  return clean;
};
