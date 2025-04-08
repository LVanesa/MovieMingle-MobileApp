import React, { useEffect, useState, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthenticationStack from "./AuthenticationStack";
import AuthenticatedStack from "./AuthenticatedStack";
import { AuthContext } from "../store/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import linking from "./linking";

const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        if (storedToken) {
          authCtx.authenticate(storedToken); // 🔐 actualizăm contextul
        }
      } catch (error) {
        console.error("Eroare la verificarea tokenului:", error);
      } finally {
        setIsLoading(false); // 🌀 Oprim loading-ul oricum
      }
    };

    checkToken();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <NavigationContainer linking={linking}>
      {authCtx.isAuthenticated ? (
        <AuthenticatedStack />
      ) : (
        <AuthenticationStack />
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#000", // să rămână pe tema întunecată
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AppNavigator;
