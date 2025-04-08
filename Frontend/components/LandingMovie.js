import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import { getBackdropUrl } from "../utils/imageUtils";

const { width } = Dimensions.get("window");
const radius = 20;
const strokeWidth = 4;
const circumference = 2 * Math.PI * radius;

const LandingMovie = ({ movie }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    const rating = movie?.vote_average || 0;
    const percentage = rating / 10;
    progressAnim.setValue(0);
    Animated.timing(progressAnim, {
      toValue: percentage,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [movie]);

  if (!movie) return null;

  const strokeDashoffset = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <Image
        source={{ uri: getBackdropUrl(movie.backdrop_path) }}
        style={styles.cover}
      />

      <View style={styles.details}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.info}>
          {movie.release_date?.split("-")[0] || "Unknown"} |{" "}
          {movie.runtime ? formatRuntime(movie.runtime) : "N/A"} | Directed by:{" "}
          {movie.directors?.map((d) => d.name).join(", ") || "N/A"}
        </Text>

        <View style={styles.row}>
          <View style={styles.ratingWrapper}>
            <Svg height={48} width={48}>
              <Circle
                stroke="#222"
                fill="transparent"
                cx={24}
                cy={24}
                r={radius}
                strokeWidth={strokeWidth}
              />
              <AnimatedCircle
                stroke={getRatingColor(movie.vote_average)}
                fill="transparent"
                cx={24}
                cy={24}
                r={radius}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </Svg>
            <Text style={styles.ratingText}>
              {movie.vote_average?.toFixed(2) || "N/A"}
            </Text>
          </View>

          <View style={styles.genreWrapper}>
            {movie.genres?.map((g) => (
              <View key={g.id} style={styles.genre}>
                <Text style={styles.genreText}>{g.name}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.description} numberOfLines={12}>
          {movie.overview || "No description available."}
        </Text>
      </View>
    </Animated.View>
  );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const formatRuntime = (mins) => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h ${m}min`;
};

const getRatingColor = (rating) => {
  if (rating >= 7.5) return "#1db954";
  if (rating >= 5) return "#e09f3e";
  return "#ff4d4d";
};

const styles = StyleSheet.create({
  cover: {
    width: width,
    height: 250,
    resizeMode: "cover",
  },
  details: {
    backgroundColor: "#000",
    padding: 16,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  info: {
    color: "#ccc",
    fontSize: 12,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  ratingWrapper: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginRight: 10,
  },
  ratingText: {
    position: "absolute",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
  genreWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 6,
    columnGap: 8,
    alignItems: "center",
    flexShrink: 1,
  },
  genre: {
    backgroundColor: "#5c0000",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  genreText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  description: {
    color: "#ddd",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
  button: {
    backgroundColor: "#5c0000",
    marginTop: 10,
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

export default LandingMovie;
