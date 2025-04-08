import axios from "./axiosInstance";

export const fetchPopularMovies = async () => {
  try {
    const response = await axios.get("/api/movies/popular");

    console.log("Popular movies:", response.data);
    return response.data;
  } catch (error) {
    console.error("Eroare la fetchPopularMovies:", error);
    throw error;
  }
};

export const fetchTopRatedMovies = async () => {
  try {
    const response = await axios.get("/api/movies/top-rated");
    return response.data;
  } catch (error) {
    console.error("Eroare la fetchTopRatedMovies:", error);
    throw error;
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(`/api/movies/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Eroare la fetchMovieDetails pentru id ${id}:`, error);
    throw error;
  }
};

export const fetchCast = async (id) => {
  try {
    const response = await axios.get(`/api/movies/${id}/movie-cast`);
    return response.data;
  } catch (error) {
    console.error(`Eroare la fetchCast pentru id ${id}:`, error);
    throw error;
  }
};

export const fetchRecommendations = async (id) => {
  try {
    const response = await axios.get(`/api/movies/${id}/recommendations`);
    return response.data;
  } catch (error) {
    console.error(`Eroare la fetchRecommendations pentru id ${id}:`, error);
    throw error;
  }
};

export const toggleFavorite = async (userId, tmdbId, title, isFavorite) => {
  if (isFavorite) {
    return axios.delete(`/api/movies/favourites/remove`, {
      params: { userId, tmdbId },
    });
  } else {
    return axios.post(`/api/movies/favourites/add`, {
      userId,
      tmdbId,
      title,
    });
  }
};

export const checkFavoriteStatus = async (userId, tmdbId) => {
  console.log("Calling checkFavoriteStatus with", userId, tmdbId);

  const res = await axios.get(`/api/movies/favourites/check`, {
    params: { userId, tmdbId },
  });
  return res.data;
};

export const toggleWatchList = async (userId, tmdbId, title, isInWatchList) => {
  if (isInWatchList) {
    return axios.delete(`/api/movies/watchlist/remove`, {
      params: { userId, tmdbId },
    });
  } else {
    return axios.post(`/api/movies/watchlist/add`, {
      userId,
      tmdbId,
      title,
    });
  }
};

export const checkWatchListStatus = async (userId, tmdbId) => {
  const res = await axios.get(`/api/movies/watchlist/check`, {
    params: { userId, tmdbId },
  });
  return res.data;
};

export const toggleWatched = async (userId, tmdbId, title, isWatched) => {
  if (isWatched) {
    return axios.delete(`/api/movies/watched/remove`, {
      params: { userId, tmdbId },
    });
  } else {
    return axios.post(`/api/movies/watched/add`, {
      userId,
      tmdbId,
      title,
    });
  }
};

export const checkWatchedStatus = async (userId, tmdbId) => {
  const res = await axios.get(`/api/movies/watched/check`, {
    params: { userId, tmdbId },
  });
  return res.data;
};

export const getUserRating = async (userId, tmdbId) => {
  const res = await axios.get(`/api/movies/ratings/user`, {
    params: { userId, movieId: tmdbId },
  });
  return res.data;
};

export const submitRating = async (userId, tmdbId, rating) => {
  return axios.post(`/api/movies/ratings/add`, null, {
    params: { userId, tmdbId, rating },
  });
};

export const removeRating = async (userId, tmdbId) => {
  return axios.delete(`/api/movies/ratings/remove`, {
    params: { userId, tmdbId },
  });
};

export const fetchWatchedMovies = async (userId) => {
  try {
    const response = await axios.get(`/api/mylists/watched?userId=${userId}`);
    console.log("Fetched watched movies:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching watched movies:", error);
    throw error;
  }
};

export const fetchWatchlistMovies = async (userId) => {
  try {
    const response = await axios.get(`/api/mylists/watchlist?userId=${userId}`);
    console.log("Fetched watchlist movies:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching watchlist movies:", error);
    throw error;
  }
};

export const fetchFavouritesMovies = async (userId) => {
  try {
    const response = await axios.get(
      `/api/mylists/favourites?userId=${userId}`
    );
    console.log("Fetched favourite movies:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching favourite movies:", error);
    throw error;
  }
};

export const fetchRatedMovies = async (userId) => {
  try {
    const response = await axios.get(`/api/mylists/rated?userId=${userId}`);
    console.log("Fetched rated movies:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching rated movies:", error);
    throw error;
  }
};

export const fetchUserRecommendations = async (userId) => {
  try {
    const response = await axios.get(`/api/recommendations`, {
      params: { userId },
    });
    console.log("Recomandări pentru user:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      `Eroare la fetchUserRecommendations pentru userId ${userId}:`,
      error
    );
    throw error;
  }
};

export const fetchMoviesBySearch = async (query, page = 1) => {
  const res = await axios.get("/api/movies/search", {
    params: { query, page },
  });
  return res.data;
};

export const fetchMoviesByGenre = async (genres, page = 1) => {
  const res = await axios.get("/api/movies/genres", {
    params: { genres, page },
  });
  return res.data;
};
