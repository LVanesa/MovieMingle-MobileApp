// HomeScreen.performance.test.js
import React from "react";
import { render, waitFor, screen } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/main/HomeScreen";
import { AuthContext } from "../store/auth-context";

// 1. Create a mock performance object if react-native-performance isn't available
const performance = {
  now: () => {
    if (typeof global.performance !== "undefined" && global.performance.now) {
      return global.performance.now();
    }
    return Date.now();
  },
};

// 2. Setup navigation mock
const Stack = createNativeStackNavigator();

const MockHomeScreen = () => (
  <AuthContext.Provider value={{ user: { id: 1 } }}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </AuthContext.Provider>
);

// 3. Mock API responses
jest.mock("../api/movieApi", () => ({
  fetchPopularMovies: jest.fn(),
  fetchTopRatedMovies: jest.fn(),
  fetchUserRecommendations: jest.fn(),
}));

describe("HomeScreen Performance Tests", () => {
  beforeEach(() => {
    // Reset mocks and set default implementations
    require("../api/movieApi").fetchPopularMovies.mockImplementation(() =>
      Promise.resolve([{ id: 1, title: "Test Movie" }])
    );
    require("../api/movieApi").fetchTopRatedMovies.mockImplementation(() =>
      Promise.resolve([{ id: 2, title: "Top Movie" }])
    );
    require("../api/movieApi").fetchUserRecommendations.mockImplementation(() =>
      Promise.resolve([{ tmdbId: 3, title: "Recommended" }])
    );
  });

  // Test 1: Initial render performance
  it("renders initial UI under 200ms", () => {
    const start = performance.now();
    render(<MockHomeScreen />);
    const duration = performance.now() - start;

    console.log(`[PERF] Initial render: ${duration}ms`);
    expect(duration).toBeLessThan(200);
  });

  // Test 2: Full content load performance
  it("loads all content under 1000ms", async () => {
    const start = performance.now();
    render(<MockHomeScreen />);

    await waitFor(
      () => {
        expect(screen.queryByText("Loading movies...")).toBeNull();
        expect(screen.getByText("Recommended for You")).toBeTruthy();
      },
      { timeout: 2000 }
    );

    const duration = performance.now() - start;
    console.log(`[PERF] Full load: ${duration}ms`);
    expect(duration).toBeLessThan(1000);
  });

  // Test 3: Large dataset performance
  it("handles large dataset under 1500ms", async () => {
    // Override with large dataset
    require("../api/movieApi").fetchPopularMovies.mockImplementation(() =>
      Promise.resolve(
        Array(500)
          .fill()
          .map((_, i) => ({ id: i, title: `Movie ${i}` }))
      )
    );

    const start = performance.now();
    render(<MockHomeScreen />);

    await waitFor(
      () => {
        expect(screen.queryByText("Loading movies...")).toBeNull();
      },
      { timeout: 3000 }
    );

    const duration = performance.now() - start;
    console.log(`[PERF] Large dataset load: ${duration}ms`);
    expect(duration).toBeLessThan(1500);
  });
});
