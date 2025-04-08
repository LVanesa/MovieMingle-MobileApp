export const getPosterUrl = (path) =>
  path
    ? `https://image.tmdb.org/t/p/w500${path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

export const getBackdropUrl = (path) =>
  path
    ? `https://image.tmdb.org/t/p/original${path}`
    : "https://via.placeholder.com/800x450?text=No+Backdrop";

export const getProfileUrl = (path) =>
  path
    ? `https://image.tmdb.org/t/p/w185${path}`
    : "https://via.placeholder.com/150x225?text=No+Image";
