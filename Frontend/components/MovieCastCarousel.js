import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { getProfileUrl } from "../utils/imageUtils";

const { width } = Dimensions.get("window");

const MovieCastCarousel = ({ cast }) => {
  if (!cast || cast.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MOVIE CAST</Text>
      <FlatList
        data={cast}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          return (
            <View style={styles.card}>
              <Image
                source={{ uri: getProfileUrl(item.profile_path) }}
                style={styles.image}
              />
              <View style={styles.textContainer}>
                <Text style={styles.name} numberOfLines={1}>
                  {item.name || "Unknown"}
                </Text>
                <Text style={styles.character} numberOfLines={1}>
                  {item.character || "N/A"}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginBottom: 8,
  },
  list: {
    paddingLeft: 16,
  },
  card: {
    marginRight: 12,
    width: 100,
    alignItems: "center",
  },
  image: {
    width: 90,
    height: 130,
    borderRadius: 8,
    resizeMode: "cover",
  },
  textContainer: {
    marginTop: 6,
    alignItems: "center",
  },
  name: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  character: {
    color: "#aaa",
    fontSize: 11,
  },
});

export default MovieCastCarousel;
