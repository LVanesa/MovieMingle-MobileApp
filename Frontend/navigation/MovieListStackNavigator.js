import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieListScreen from "../screens/main/MovieListScreen";
import MovieDetailsScreen from "../screens/MovieDetailsScreen";

const Stack = createNativeStackNavigator();

const MovieListStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MovieList"
        component={MovieListScreen}
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

export default MovieListStackNavigator;
