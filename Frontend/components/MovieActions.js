import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import useMovieActions from "../hooks/useMovieActions";

const MovieActions = ({ userId, tmdbId, title }) => {
  const {
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
  } = useMovieActions(userId, tmdbId, title);

  if (loading) return null; // sau un loader simpatic dacă vrei

  const renderStars = () =>
    [...Array(10)].map((_, i) => (
      <TouchableOpacity key={i} onPress={() => rateMovie(i + 1)}>
        <FontAwesome
          name={i < userRating ? "star" : "star-o"}
          size={22}
          color="#FFD700"
          style={styles.star}
        />
      </TouchableOpacity>
    ));

  return (
    <View testID="movie-actions" style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={toggleFav}>
          <FontAwesome name="heart" size={16} color="#fff" />
          <Text style={styles.text}>
            {isFavorite ? "Added to Favorites" : "Add to Favorite"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={toggleWatch}>
          <FontAwesome name="plus" size={16} color="#fff" />
          <Text style={styles.text}>
            {isInWatchList ? "In Watchlist" : "Watchlist"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={toggleSeen}>
          <FontAwesome name="check" size={16} color="#fff" />
          <Text style={styles.text}>
            {isWatched ? "Watched" : "Mark as Watched"}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.ratingLabel}>How would you rate this movie?</Text>
      <View style={styles.starsRow}>{renderStars()}</View>

      {userRating > 0 && (
        <TouchableOpacity onPress={clearRating}>
          <Text style={styles.clearRating}>✕ Clear rating</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#5c0000",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  text: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 6,
  },
  ratingLabel: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 8,
  },
  starsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  star: {
    marginHorizontal: 3,
  },
  clearRating: {
    color: "#999",
    fontSize: 14,
    marginTop: 10,
    textDecorationLine: "underline",
  },
});

export default MovieActions;
