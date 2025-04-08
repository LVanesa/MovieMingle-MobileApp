import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/main/HomeScreen";
import MovieDetailsScreen from "../screens/MovieDetailsScreen";

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false, headerBackTitleVisible: false }}
      />
      <Stack.Screen
        name="MovieDetails"
        component={MovieDetailsScreen}
        options={{
          title: "Movie Details",
          headerShown: true,
          headerTitle: "",
          headerBackTitleVisible: false,
          headerStyle: { backgroundColor: "#000" },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
