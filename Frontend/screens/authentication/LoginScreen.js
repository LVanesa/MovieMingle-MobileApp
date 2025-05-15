import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { loginUser } from "../../api/authApi";
import { AuthContext } from "../../store/auth-context";
import InputField from "../../components/InputField";
//import { useGoogleAuth } from "./GoogleAuth";

const LoginScreen = () => {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  //const { promptAsync } = useGoogleAuth();

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: null, general: null }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.password.trim()) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleLogin = async () => {
    setErrors({}); // Clear all errors before validation

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await loginUser(form);
      const token = response.data.token;
      authCtx.authenticate(token);
      Alert.alert("Success", "You're now logged in!");
    } catch (error) {
      const errorMsg =
        error?.response?.data?.error ||
        "Login failed. Please check your credentials.";
      setErrors({ general: errorMsg }); // Clear field errors, only show general error
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
            <Text style={styles.title}>Login</Text>

            {errors.general && (
              <Text testID="errorMessage" style={styles.generalError}>
                {errors.general}
              </Text>
            )}

            <InputField
              testID="emailInput"
              accessibilityLabel="Email input"
              label="Email"
              value={form.email}
              onChange={(text) => handleChange("email", text)}
              placeholder="Enter your email"
              keyboardType="email-address"
              error={errors.email}
            />

            <InputField
              testID="passwordInput"
              accessibilityLabel="Password input"
              label="Password"
              value={form.password}
              onChange={(text) => handleChange("password", text)}
              placeholder="Enter your password"
              secureTextEntry
              error={errors.password}
            />

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.linkUnderline}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={handleLogin}
              testID="loginButton"
              accessibilityLabel="Login button"
            >
              <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>

            {/* <View style={styles.separator}>
              <View style={styles.line} />
              <Text style={styles.separatorText}>OR</Text>
              <View style={styles.line} />
            </View>

            <TouchableOpacity
              style={styles.googleButton}
              onPress={() => promptAsync()}
            >
              <Text style={styles.googleText}>Login with Google</Text>
            </TouchableOpacity>
 */}

            <TouchableOpacity
              onPress={() => navigation.navigate("Register")}
              style={{ marginTop: 15 }}
            >
              <Text style={styles.link}>
                Don’t have an account?{" "}
                <Text style={styles.linkUnderline}>Register!</Text>
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
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  link: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  linkUnderline: {
    textDecorationLine: "underline",
    fontWeight: "bold",
    color: "#fff",
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
  separator: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  separatorText: {
    color: "#fff",
    marginHorizontal: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  googleButton: {
    backgroundColor: "#4285F4",
    borderRadius: 40,
    paddingVertical: 12,
    alignItems: "center",
  },
  googleText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  generalError: {
    color: "#FF6B6B",
    textAlign: "center",
    marginBottom: 12,
  },
});

export default LoginScreen;
