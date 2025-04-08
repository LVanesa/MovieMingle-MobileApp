import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { WebView } from "react-native-webview";

const { width } = Dimensions.get("window");
const height = (width * 9) / 16; // raport 16:9

const Trailer = ({ trailerPath }) => {
  if (!trailerPath) {
    return (
      <View style={styles.noTrailerContainer}>
        <Text style={styles.noTrailerText}>No trailer available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Trailer</Text>
      <WebView
        style={styles.webview}
        javaScriptEnabled
        domStorageEnabled
        allowsFullscreenVideo
        source={{ uri: `https://www.youtube.com/embed/${trailerPath}` }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height,
    width: "100%",
    overflow: "hidden",
    borderRadius: 12,
    marginVertical: 20,
    marginBotton: 20,
  },
  webview: {
    flex: 1,
    borderRadius: 12,
  },
  noTrailerContainer: {
    height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
    borderRadius: 12,
    marginVertical: 20,
  },
  noTrailerText: {
    color: "#888",
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 16,
    marginBottom: 10,
  },
});

export default Trailer;
