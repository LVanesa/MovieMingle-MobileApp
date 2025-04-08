import React, { useEffect, useContext, useRef, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUserRecommendations,
} from "../../api/movieApi.js";
import LandingMovie from "../../components/LandingMovie";
import MovieCarousel from "../../components/MovieCarousel";
import { AuthContext } from "../../store/auth-context";
import UserMovieCarousel from "../../components/UserMovieCarousel.js";

const HomeScreen = () => {
  const [landingMovie, setLandingMovie] = useState(null);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [recommended, setRecommended] = useState([]);
  const { user } = useContext(AuthContext);

  const popularRef = useRef([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadData = async () => {
      const pop = await fetchPopularMovies();
      const top = await fetchTopRatedMovies();
      const rec = await fetchUserRecommendations(user.id);
      setPopular(pop);
      setTopRated(top);
      setRecommended(rec);
      popularRef.current = pop;

      if (pop.length > 0) {
        const random = pop[Math.floor(Math.random() * pop.length)];
        setLandingMovie(random);
      }

      setIsLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const pop = popularRef.current;
      if (!pop.length) return;
      const random = pop[Math.floor(Math.random() * pop.length)];
      setLandingMovie(random);
    }, 60000); // la 60 sec

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#5c0000" />
        <Text style={{ color: "#aaa", marginTop: 10 }}>Loading movies...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <LandingMovie
        movie={landingMovie}
        onPress={() =>
          navigation.navigate("MovieDetails", { id: landingMovie?.id })
        }
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("MovieDetails", { id: landingMovie?.id })
        }
      >
        <Text style={styles.buttonText}>▶ See More</Text>
      </TouchableOpacity>

      <MovieCarousel
        title="Most Popular Today"
        movies={popular}
        onPressMovie={(movie) =>
          navigation.navigate("MovieDetails", { id: movie.id })
        }
      />
      <MovieCarousel
        title="Top Rated Movies"
        movies={topRated}
        onPressMovie={(movie) =>
          navigation.navigate("MovieDetails", { id: movie.id })
        }
      />
      <UserMovieCarousel
        movies={recommended}
        title={"Recommended for You"}
        onPressMovie={(movie) =>
          navigation.navigate("MovieDetails", { id: movie.tmdbId })
        }
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  button: {
    backgroundColor: "#5c0000",
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});

export default HomeScreen;
