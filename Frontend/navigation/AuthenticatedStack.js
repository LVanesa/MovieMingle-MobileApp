import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeStackNavigator from "./HomeStackNavigator";
import SearchScreen from "../screens/main/SearchScreen";
import ProfileScreen from "../screens/main/ProfileScreen";
import MovieListStackNavigator from "./MovieListStackNavigator";
import LogoutButton from "../components/LogoutButton";
import SearchStackNavigator from "./SearchStackNavigator";

const Tab = createBottomTabNavigator();

const AuthenticatedStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true, // 👈 activează header-ul
        headerStyle: {
          backgroundColor: "#000",
        },
        headerTitleStyle: {
          color: "#fff",
        },
        headerTintColor: "#fff",
        headerRight: () => <LogoutButton />, // 👈 adaugă butonul

        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#aaa",
        tabBarStyle: {
          backgroundColor: "#000",
          borderTopColor: "#333",
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = "home-outline";
              break;
            case "Search":
              iconName = "search-outline";
              break;
            case "Profile":
              iconName = "person-outline";
              break;
            case "MovieList":
              iconName = "list-outline";
              break;
            default:
              iconName = "ellipse-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        options={{ headerShown: false }}
        component={HomeStackNavigator}
      />
      <Tab.Screen
        name="Search"
        options={{ headerShown: false }}
        component={SearchStackNavigator}
      />
      <Tab.Screen
        name="MovieList"
        options={{ headerShown: false }}
        component={MovieListStackNavigator}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default AuthenticatedStack;
