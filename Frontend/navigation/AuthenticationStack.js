// navigation/AuthenticationStack.js

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/authentication/WelcomeScreen";
import LoginScreen from "../screens/authentication/LoginScreen";
import RegistrationScreen from "../screens/authentication/RegistrationScreen";
import VerifyScreen from "../screens/authentication/VerifyScreen";

const Stack = createNativeStackNavigator();

const AuthenticationStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false, // fără header
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegistrationScreen} />
      <Stack.Screen name="Verify" component={VerifyScreen} />
    </Stack.Navigator>
  );
};

export default AuthenticationStack;
