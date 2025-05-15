import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitFor,
} from "@testing-library/react-native";
import MovieDetailsScreen from "../screens/MovieDetailsScreen";
import { AuthContext } from "../store/auth-context";

jest.mock("../components/LandingMovie", () => {
  const { Text } = require("react-native");
  return ({ movie }) => <Text>{movie?.title ?? "No Movie"}</Text>;
});

jest.mock("../components/MovieCastCarousel", () => {
  const { Text } = require("react-native");
  return () => <Text>Cast Carousel</Text>;
});

jest.mock("../components/MovieCarousel", () => {
  const { Text } = require("react-native");
  return ({ title }) => <Text>{title}</Text>;
});

jest.mock("../components/Trailer", () => {
  const { Text } = require("react-native");
  return () => <Text>Trailer</Text>;
});

jest.mock("../components/MovieActions", () => {
  const { Text } = require("react-native");
  return ({ title }) => <Text>{title}</Text>;
});

jest.mock("../api/movieApi", () => ({
  fetchMovieDetails: jest.fn(),
  fetchCast: jest.fn(),
  fetchRecommendations: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate,
      push: mockNavigate,
    }),
  };
});

describe("MovieDetailsScreen", () => {
  const mockUser = { id: "user123" };
  const mockMovie = {
    id: 123,
    title: "Test Movie",
    trailerPath: "test_path",
    overview: "Test overview",
  };
  const mockCast = [{ id: 1, name: "Actor 1" }];
  const mockRecommended = [{ id: 456, title: "Recommended Movie" }];

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock pentru AuthContext
    jest.spyOn(React, "useContext").mockImplementation((ctx) => {
      if (ctx === AuthContext) {
        return { user: mockUser };
      }
      return {};
    });
  });

  it("should display loading indicator while fetching data", () => {
    require("../api/movieApi").fetchMovieDetails.mockImplementation(
      () => new Promise(() => {})
    );

    render(<MovieDetailsScreen route={{ params: { id: 123 } }} />);
    expect(screen.getByTestId("loading-indicator")).toBeTruthy();
  });

  it("should handle API errors gracefully", async () => {
    require("../api/movieApi").fetchMovieDetails.mockRejectedValue(
      new Error("API Error")
    );

    render(<MovieDetailsScreen route={{ params: { id: 123 } }} />);

    await waitFor(() => {
      expect(screen.queryByTestId("loading-indicator")).toBeNull();
    });
  });

  it("should refetch data when movie ID changes", async () => {
    const fetchMock =
      require("../api/movieApi").fetchMovieDetails.mockResolvedValue({});

    const { rerender } = render(
      <MovieDetailsScreen route={{ params: { id: 123 } }} />
    );

    rerender(<MovieDetailsScreen route={{ params: { id: 456 } }} />);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });
  });
});
