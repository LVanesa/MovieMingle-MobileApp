import React from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";

const GenreScroll = ({ genres, selectedGenres, onToggleGenre }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {genres.map((genre) => (
          <TouchableOpacity
            key={genre.id}
            style={[
              styles.genreButton,
              selectedGenres.includes(genre.id) && styles.selected,
            ]}
            onPress={() => onToggleGenre(genre.id)}
          >
            <Text style={styles.genreText}>{genre.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  genreButton: {
    backgroundColor: "#330000",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  selected: {
    backgroundColor: "#005500",
  },
  genreText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default GenreScroll;
