import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LandingMovie from "../components/LandingMovie";
import MovieCastCarousel from "../components/MovieCastCarousel";
import MovieCarousel from "../components/MovieCarousel";
import Trailer from "../components/Trailer";
import MovieActions from "../components/MovieActions";
import {
  fetchMovieDetails,
  fetchCast,
  fetchRecommendations,
} from "../api/movieApi";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";

const MovieDetailsScreen = ({ route }) => {
  const { id } = route.params;
  const navigation = useNavigation();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        const [movieData, castData, recData] = await Promise.all([
          fetchMovieDetails(id),
          fetchCast(id),
          fetchRecommendations(id),
        ]);
        setMovie(movieData);
        setCast(castData);
        setRecommended(recData);
      } catch (err) {
        console.error("Error fetching movie details:", err);
      } finally {
        setLoading(false);
      }
    };

    loadMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator
          testID="loading-indicator"
          size="large"
          color="#5c0000"
        />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <LandingMovie movie={movie} />
      <MovieActions userId={user?.id} tmdbId={movie?.id} title={movie?.title} />

      <MovieCastCarousel cast={cast} />
      <Trailer trailerPath={movie?.trailerPath} />
      <MovieCarousel
        title="You may also like"
        movies={recommended}
        onPressMovie={(movie) =>
          navigation.push("MovieDetails", { id: movie.id })
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
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});

export default MovieDetailsScreen;
