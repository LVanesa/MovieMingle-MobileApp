// hooks/useMovieActions.js
import { useEffect, useState, useCallback } from "react";
import {
  toggleFavorite,
  checkFavoriteStatus,
  toggleWatchList,
  checkWatchListStatus,
  toggleWatched,
  checkWatchedStatus,
  submitRating,
  removeRating,
  getUserRating,
} from "../api/movieApi";

const useMovieActions = (userId, tmdbId, title) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInWatchList, setIsInWatchList] = useState(false);
  const [isWatched, setIsWatched] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchStatuses = useCallback(async () => {
    try {
      const [fav, watch, watched, rating] = await Promise.all([
        checkFavoriteStatus(userId, tmdbId),
        checkWatchListStatus(userId, tmdbId),
        checkWatchedStatus(userId, tmdbId),
        getUserRating(userId, tmdbId),
      ]);
      setIsFavorite(fav);
      setIsInWatchList(watch);
      setIsWatched(watched);
      setUserRating(rating);
    } catch (err) {
      console.error("Error loading statuses:", err);
    } finally {
      setLoading(false);
    }
  }, [userId, tmdbId]);

  useEffect(() => {
    fetchStatuses();
  }, [fetchStatuses]);

  const toggleFav = async () => {
    await toggleFavorite(userId, tmdbId, title, isFavorite);
    setIsFavorite((prev) => !prev);
  };

  const toggleWatch = async () => {
    await toggleWatchList(userId, tmdbId, title, isInWatchList);
    setIsInWatchList((prev) => !prev);
  };

  const toggleSeen = async () => {
    await toggleWatched(userId, tmdbId, title, isWatched);
    setIsWatched((prev) => !prev);
    if (!isWatched) setIsInWatchList(false); // if marked as watched, remove from watchlist
  };

  const rateMovie = async (stars) => {
    setUserRating(stars);
    await submitRating(userId, tmdbId, stars);
  };

  const clearRating = async () => {
    await removeRating(userId, tmdbId);
    setUserRating(0);
  };

  return {
    isFavorite,
    isInWatchList,
    isWatched,
    userRating,
    loading,
    toggleFav,
    toggleWatch,
    toggleSeen,
    rateMovie,
    clearRating,
  };
};

export default useMovieActions;
