import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieDetailsScreen from "../screens/MovieDetailsScreen";
import SearchScreen from "../screens/main/SearchScreen";

const Stack = createNativeStackNavigator();

const SearchStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
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

export default SearchStackNavigator;
