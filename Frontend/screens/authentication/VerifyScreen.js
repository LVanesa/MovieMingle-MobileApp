import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "../../api/axiosInstance";

const VerifyScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const token = route.params?.token;

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        await axios.get(`/auth/verify?token=${token}`);
        Alert.alert("Success", "Your account has been verified!");
        navigation.navigate("Login");
      } catch (err) {
        Alert.alert(
          "Error",
          "Verification failed. Token might be invalid or expired."
        );
        navigation.navigate("Login");
      }
    };

    if (token) verifyAccount();
  }, [token]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#fff" />
      <Text style={styles.text}>Verifying account...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    marginTop: 20,
    fontSize: 16,
  },
});

export default VerifyScreen;
