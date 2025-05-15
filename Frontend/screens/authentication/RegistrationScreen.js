import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { registerUser } from "../../api/authApi";
import { useNavigation } from "@react-navigation/native";

const fieldLabels = {
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email Address",
  password: "Password",
  confirmPassword: "Confirm Password",
};

const RegistrationScreen = () => {
  const navigation = useNavigation();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: null })); // clear error on change
  };

  const handleSubmit = async () => {
    setErrors({}); // clear old errors

    try {
      await registerUser(form);
      alert("Registration successful! Please log in to your account.");
      navigation.navigate("Login");
    } catch (error) {
      const data = error?.response?.data;

      if (typeof data === "object" && data !== null) {
        setErrors(data);
      } else {
        setErrors({ general: "Something went wrong. Please try again." });
      }

      console.error("Register error:", data);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/main-background.jpg")}
      style={styles.background}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.card}>
            <Text style={styles.title}>Sign Up</Text>

            {errors.general && (
              <Text style={styles.generalError}>{errors.general}</Text>
            )}

            {Object.keys(fieldLabels).map((field) => (
              <View key={field} style={{ marginBottom: 12 }}>
                <Text style={styles.label}>{fieldLabels[field]}</Text>
                <TextInput
                  style={[
                    styles.input,
                    errors[field] && { borderColor: "#ff4d4d", borderWidth: 1 },
                  ]}
                  placeholder={fieldLabels[field]}
                  secureTextEntry={field.toLowerCase().includes("password")}
                  autoCapitalize="none"
                  value={form[field]}
                  onChangeText={(text) => handleChange(field, text)}
                />
                {errors[field] && (
                  <Text style={styles.error}>{errors[field]}</Text>
                )}
              </View>
            ))}

            <TouchableOpacity
              testID="submit-button"
              style={styles.button}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={{ marginTop: 15 }}
            >
              <Text style={styles.link}>
                Already have an account?{" "}
                <Text style={{ textDecorationLine: "underline" }}>Log In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 40,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  error: {
    color: "#ff4d4d",
    fontSize: 12,
    marginTop: 4,
  },
  generalError: {
    color: "#ff4d4d",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
});

export default RegistrationScreen;
