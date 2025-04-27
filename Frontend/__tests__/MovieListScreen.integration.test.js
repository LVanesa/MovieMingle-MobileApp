import { render, act, fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../store/auth-context";
import MovieListScreen from "../screens/main/MovieListScreen";
import { ActivityIndicator } from "react-native";

// Mock useNavigation
const mockNavigate = jest.fn();
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

// Mock API
jest.mock("../api/movieApi", () => ({
  fetchWatchedMovies: jest.fn(() => Promise.resolve([])),
  fetchWatchlistMovies: jest.fn(() => Promise.resolve([])),
  fetchFavouritesMovies: jest.fn(() => Promise.resolve([])),
  fetchRatedMovies: jest.fn(() => Promise.resolve([])),
}));

describe("MovieListScreen Tests", () => {
  const Wrapper = ({ children }) => (
    <AuthContext.Provider value={{ user: { id: 1 } }}>
      <NavigationContainer>{children}</NavigationContainer>
    </AuthContext.Provider>
  );

  beforeEach(() => {
    const movieApi = require("../api/movieApi");
    movieApi.fetchWatchedMovies.mockResolvedValue([]);
    movieApi.fetchWatchlistMovies.mockResolvedValue([]);
    movieApi.fetchFavouritesMovies.mockResolvedValue([]);
    movieApi.fetchRatedMovies.mockResolvedValue([]);
  });

  it("shows loading spinner while fetching movies", async () => {
    const { getByTestId } = render(<MovieListScreen />, { wrapper: Wrapper });
    expect(getByTestId("loading-spinner")).toBeTruthy();
  });

  it("renders empty state messages correctly", async () => {
    const { findByText } = render(<MovieListScreen />, { wrapper: Wrapper });

    expect(
      await findByText("You haven't watched any movies yet! 🎥")
    ).toBeTruthy();
    expect(await findByText("Your Watchlist is empty! 📽️")).toBeTruthy();
    expect(
      await findByText("You don't have any favorite movies yet! ❤️")
    ).toBeTruthy();
    expect(
      await findByText("You haven't rated any movies yet! ⭐")
    ).toBeTruthy();
  });

  it("renders carousels if there are movies", async () => {
    const movieApi = require("../api/movieApi");

    movieApi.fetchWatchedMovies.mockResolvedValueOnce([
      { tmdbId: 1, seriesTitle: "Watched Movie", posterLink: "/watched.jpg" },
    ]);
    movieApi.fetchWatchlistMovies.mockResolvedValueOnce([
      {
        tmdbId: 2,
        seriesTitle: "Watchlist Movie",
        posterLink: "/watchlist.jpg",
      },
    ]);
    movieApi.fetchFavouritesMovies.mockResolvedValueOnce([
      { tmdbId: 3, seriesTitle: "Favorite Movie", posterLink: "/favorite.jpg" },
    ]);
    movieApi.fetchRatedMovies.mockResolvedValueOnce([
      { tmdbId: 4, seriesTitle: "Rated Movie", posterLink: "/rated.jpg" },
    ]);

    const { findByText } = render(<MovieListScreen />, { wrapper: Wrapper });

    expect(await findByText("Your Watched Movies")).toBeTruthy();
    expect(await findByText("Your Watchlist")).toBeTruthy();
    expect(await findByText("Your Favourite Movies")).toBeTruthy();
    expect(await findByText("Your Rated Movies")).toBeTruthy();
  });

  it("navigates to MovieDetails when pressing on a movie", async () => {
    const movieApi = require("../api/movieApi");

    movieApi.fetchWatchedMovies.mockResolvedValueOnce([
      { tmdbId: 1, seriesTitle: "Test Movie", posterLink: "/test.jpg" },
    ]);

    const { findByTestId } = render(<MovieListScreen />, { wrapper: Wrapper });

    const movieItem = await findByTestId("movie-item-1");

    act(() => {
      fireEvent.press(movieItem);
    });

    expect(mockNavigate).toHaveBeenCalledWith("MovieDetails", { id: 1 });
  });
});
