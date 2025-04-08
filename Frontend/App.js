import React from "react";
import { StatusBar } from "expo-status-bar";
import AuthContextProvider from "./store/auth-context";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  return (
    <AuthContextProvider>
      <StatusBar style="light" />
      <AppNavigator />
    </AuthContextProvider>
  );
}
