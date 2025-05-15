import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import GenreScroll from "../../components/GenreScroll";
import {
  fetchMoviesBySearch,
  fetchMoviesByGenre,
  fetchPopularMovies,
} from "../../api/movieApi";
import MovieCard from "../../components/MovieCard";

const GENRES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 3 - 20;

const SearchScreen = () => {
  const [query, setQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getMovies = async (newPage = 1, append = false) => {
    setLoading(true);
    try {
      let results = [];
      if (query) {
        results = await fetchMoviesBySearch(query, newPage);
      } else if (selectedGenres.length > 0) {
        const genreString = selectedGenres.join(",");
        results = await fetchMoviesByGenre(genreString, newPage);
      } else {
        results = await fetchPopularMovies();
      }

      if (append) {
        setMovies((prev) => [...prev, ...results]);
      } else {
        setMovies(results);
      }
    } catch (e) {
      console.error("Eroare la fetch:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1);
    getMovies(1, false);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    getMovies(nextPage, true);
  };

  const toggleGenre = (id) => {
    setQuery("");
    setPage(1);
    if (selectedGenres.includes(id)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== id));
    } else {
      setSelectedGenres([...selectedGenres, id]);
    }
  };

  useEffect(() => {
    if (query || selectedGenres.length) {
      getMovies(1, false);
    } else {
      getMovies(); // popular
    }
  }, [query, selectedGenres]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎬 Movie Explorer</Text>
      <Text style={styles.subtitle}>
        Find the perfect movie to match your mood 🍿
      </Text>

      <TextInput
        placeholder="Search for movies..."
        placeholderTextColor="#999"
        value={query}
        onChangeText={(text) => setQuery(text)}
        style={styles.searchBar}
        returnKeyType="search"
        onSubmitEditing={handleSearch}
      />

      <GenreScroll
        genres={GENRES}
        selectedGenres={selectedGenres}
        onToggleGenre={toggleGenre}
      />

      {loading && page === 1 ? (
        <ActivityIndicator
          testID="loading-indicator"
          size="large"
          color="#fff"
          style={{ marginTop: 50 }}
        />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieCard movie={item} width={CARD_WIDTH} />
          )}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "space-between",
            paddingHorizontal: 10,
          }}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            !loading && (
              <Text style={styles.emptyText}>
                No movies found. Try searching for something else 🎥
              </Text>
            )
          }
          ListFooterComponent={
            query && !loading && movies.length > 0 ? (
              <TouchableOpacity
                style={styles.loadMoreBtn}
                onPress={handleLoadMore}
              >
                <Text style={styles.loadMoreText}>Load More</Text>
              </TouchableOpacity>
            ) : null
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
    paddingTop: 80,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginHorizontal: 20,
    marginBottom: 5,
  },
  subtitle: {
    color: "#ccc",
    fontSize: 14,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  searchBar: {
    backgroundColor: "#222",
    color: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  loadMoreBtn: {
    marginVertical: 20,
    alignSelf: "center",
    backgroundColor: "#5c0000",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  loadMoreText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  emptyText: {
    color: "#aaa",
    fontSize: 14,
    textAlign: "center",
    marginTop: 30,
  },
});

export default SearchScreen;
