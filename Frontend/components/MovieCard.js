import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie, width = 140 }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("MovieDetails", { id: movie.id });
  };

  return (
    <TouchableOpacity
      style={[styles.card, { width }]}
      onPress={() => navigation.navigate("MovieDetails", { id: movie.id })}
    >
      <Image
        source={{
          uri: movie.poster_path
            ? `${IMAGE_BASE_URL}${movie.poster_path}`
            : "https://via.placeholder.com/300x450?text=No+Image",
        }}
        style={[styles.poster, { height: width * 1.5 }]}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {movie.title}
        </Text>
        <Text style={styles.subText}>
          {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    width: 140,
  },
  poster: {
    width: "100%",
    height: 210,
    borderRadius: 12,
  },
  info: {
    marginTop: 5,
  },
  title: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  subText: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 2,
  },
});

export default MovieCard;
