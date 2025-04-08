import React, { useState, useContext } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Text,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native"; // Importăm useFocusEffect
import UserMovieCarousel from "../../components/UserMovieCarousel";
import { AuthContext } from "../../store/auth-context";
import {
  fetchWatchedMovies,
  fetchWatchlistMovies,
  fetchFavouritesMovies,
  fetchRatedMovies,
} from "../../api/movieApi";

const MovieListScreen = () => {
  const navigation = useNavigation();
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const [ratedMovies, setRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  // Funcția pentru a încărca filmele
  const loadUserMovies = async () => {
    try {
      if (user?.id) {
        const [watched, watchlist, favourites, rated] = await Promise.all([
          fetchWatchedMovies(user.id),
          fetchWatchlistMovies(user.id),
          fetchFavouritesMovies(user.id),
          fetchRatedMovies(user.id),
        ]);

        setWatchedMovies(watched);
        setWatchlistMovies(watchlist);
        setFavouriteMovies(favourites);
        setRatedMovies(rated);
      }
    } catch (error) {
      console.error("Error fetching user movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Folosim useFocusEffect pentru a reîncărca filmele atunci când ecranul devine activ
  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      loadUserMovies();
    }, [user])
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#5c0000" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Movies</Text>

      {/* Watched Movies */}
      <View style={styles.carouselContainer}>
        {watchedMovies.length === 0 ? (
          <>
            <Text style={styles.carouselTitle}>Your Watched Movies</Text>
            <Text style={styles.emptyText}>
              You haven't watched any movies yet! 🎥
            </Text>
          </>
        ) : (
          <UserMovieCarousel
            movies={watchedMovies}
            title={"Your Watched Movies"}
            onPressMovie={(movie) => {
              console.log("Pressed movie:", movie);
              navigation.navigate("MovieDetails", { id: movie.tmdbId });
            }}
          />
        )}
      </View>

      {/* Watchlist */}
      <View style={styles.carouselContainer}>
        {watchlistMovies.length === 0 ? (
          <>
            <Text style={styles.carouselTitle}>Your Watchlist</Text>
            <Text style={styles.emptyText}>Your Watchlist is empty! 📽️</Text>
          </>
        ) : (
          <UserMovieCarousel
            movies={watchlistMovies}
            title={"Your Watchlist"}
            onPressMovie={(movie) =>
              navigation.navigate("MovieDetails", { id: movie.tmdbId })
            }
          />
        )}
      </View>

      {/* Favourite Movies */}
      <View style={styles.carouselContainer}>
        {favouriteMovies.length === 0 ? (
          <>
            <Text style={styles.carouselTitle}>Your Favourite Movies</Text>
            <Text style={styles.emptyText}>
              You don't have any favorite movies yet! ❤️
            </Text>
          </>
        ) : (
          <UserMovieCarousel
            movies={favouriteMovies}
            title={"Your Favourite Movies"}
            onPressMovie={(movie) =>
              navigation.navigate("MovieDetails", { id: movie.tmdbId })
            }
          />
        )}
      </View>

      {/* Rated Movies */}
      <View style={styles.carouselContainer}>
        {ratedMovies.length === 0 ? (
          <>
            <Text style={styles.carouselTitle}>Your Rated Movies</Text>
            <Text style={styles.emptyText}>
              You haven't rated any movies yet! ⭐
            </Text>
          </>
        ) : (
          <UserMovieCarousel
            movies={ratedMovies}
            title={"Your Rated Movies"}
            onPressMovie={(movie) =>
              navigation.navigate("MovieDetails", { id: movie.tmdbId })
            }
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
    paddingTop: 60,
  },
  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 24,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  carouselContainer: {
    marginBottom: 20,
  },
  carouselTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 16,
    marginBottom: 10,
  },
  emptyText: {
    color: "#e09f3e",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 30,
  },
});

export default MovieListScreen;
