// components/MovieCarousel.js
import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { getPosterUrl } from "../utils/imageUtils";

const { width } = Dimensions.get("window");

const MovieCarousel = ({ title, movies, onPressMovie }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <FlatList
        horizontal
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPressMovie(item)}>
            <View style={styles.card}>
              <Image
                source={{ uri: getPosterUrl(item.poster_path) }}
                style={styles.image}
              />
              <View style={styles.overlay}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.info}>
                  {item.release_date?.split("-")[0] || "N/A"} |{" "}
                  {item.runtime ? formatRuntime(item.runtime) : "?"}
                </Text>
                <Text style={styles.info}>
                  Directed by:{" "}
                  {item.directors?.map((d) => d.name).join(", ") || "N/A"}
                </Text>
                <Text style={styles.info}>
                  Genres: {item.genres?.map((g) => g.name).join(", ") || "N/A"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const formatRuntime = (mins) => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h ${m}min`;
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 16,
    marginBottom: 10,
  },
  card: {
    width: width * 0.45,
    marginRight: 16,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  image: {
    width: "100%",
    height: width * 0.65,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 10,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  info: {
    color: "#ccc",
    fontSize: 12,
    marginTop: 2,
  },
});

export default MovieCarousel;
