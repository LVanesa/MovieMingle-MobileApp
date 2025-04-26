import React from "react";
import { StatusBar } from "expo-status-bar";
import AuthContextProvider from "./store/auth-context";
import AppNavigator from "./navigation/AppNavigator";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "#5c0000",
        backgroundColor: "#1e1e1e",
        borderRadius: 10,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "600",
        color: "#fff",
      }}
      text2Style={{
        fontSize: 14,
        color: "#ccc",
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: "#ff0033",
        backgroundColor: "#1e1e1e",
        borderRadius: 10,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "600",
        color: "#fff",
      }}
      text2Style={{
        fontSize: 14,
        color: "#ccc",
      }}
    />
  ),
};

export default function App() {
  return (
    <AuthContextProvider>
      <StatusBar style="light" />
      <AppNavigator />
      <Toast config={toastConfig} />
    </AuthContextProvider>
  );
}
