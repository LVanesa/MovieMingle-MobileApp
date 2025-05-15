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

const { width } = Dimensions.get("window");

// Componenta UserMovieCarousel pentru filmele utilizatorului
const UserMovieCarousel = ({ title, movies, onPressMovie }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <FlatList
        horizontal
        data={movies}
        keyExtractor={(item) => item.tmdbId.toString()} // Utilizam tmdbId ca identificator
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            testID={`movie-item-${item.tmdbId}`}
            onPress={() => onPressMovie(item)}
          >
            <View style={styles.card}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.posterLink}`, // Afisam posterul corect
                }}
                style={styles.image}
              />
              <View style={styles.overlay}>
                <Text style={styles.title}>{item.seriesTitle}</Text>
                <Text style={styles.info}>
                  {item.runtime ? `${item.runtime} min` : "?"}{" "}
                  {/* Folosim durata direct din backend */}
                </Text>
                <Text style={styles.info}>
                  Directed by: {item.director || "Unknown"}{" "}
                  {/* Folosim directorul din backend */}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
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

export default UserMovieCarousel;
