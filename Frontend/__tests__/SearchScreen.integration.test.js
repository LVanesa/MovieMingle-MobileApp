import { render, fireEvent, waitFor } from "@testing-library/react-native";
import SearchScreen from "../screens/main/SearchScreen";
import {
  fetchMoviesBySearch,
  fetchMoviesByGenre,
  fetchPopularMovies,
} from "../api/movieApi";
import { act } from "react-test-renderer";

// Mock useNavigation pentru MovieCard
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

// Mock API
jest.mock("../api/movieApi", () => ({
  fetchMoviesBySearch: jest.fn(() =>
    Promise.resolve({
      data: [
        {
          id: 1,
          title: "Test Movie",
          poster_path: "/test.jpg",
          vote_average: 7.5,
        },
      ],
    })
  ),
  fetchMoviesByGenre: jest.fn(() =>
    Promise.resolve({
      data: [
        {
          id: 1,
          title: "Genre Movie",
          poster_path: "/genre.jpg",
          vote_average: 8.0,
        },
      ],
    })
  ),
  fetchPopularMovies: jest.fn(() =>
    Promise.resolve({
      data: [
        {
          id: 1,
          title: "Popular Movie",
          poster_path: "/popular.jpg",
          vote_average: 7.0,
        },
      ],
    })
  ),
}));

describe("SearchScreen Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders title, subtitle, and search bar", () => {
    const { getByPlaceholderText, getByText } = render(<SearchScreen />);
    expect(getByText("🎬 Movie Explorer")).toBeTruthy();
    expect(
      getByText("Find the perfect movie to match your mood 🍿")
    ).toBeTruthy();
    expect(getByPlaceholderText("Search for movies...")).toBeTruthy();
  });

  it("shows loading spinner during fetch", async () => {
    fetchPopularMovies.mockReturnValue(new Promise(() => {}));

    const { getByTestId } = render(<SearchScreen />);

    await waitFor(() => {
      expect(getByTestId("loading-indicator")).toBeTruthy();
    });
  });

  it("searches movies when typing in search bar and pressing submit", async () => {
    fetchMoviesBySearch.mockResolvedValueOnce({
      data: [
        {
          id: 1,
          title: "Test Movie",
          poster_path: "/test.jpg",
          vote_average: 7.5,
        },
      ],
    });

    const { getByPlaceholderText, findByText } = render(<SearchScreen />);
    const searchInput = getByPlaceholderText("Search for movies...");

    fireEvent.changeText(searchInput, "Avengers");
    fireEvent(searchInput, "submitEditing");

    await waitFor(() => {
      expect(fetchMoviesBySearch).toHaveBeenCalledWith("Avengers", 1);
      expect(findByText("Test Movie")).toBeTruthy();
    });
  });

  it("displays empty message when no movies found", async () => {
    fetchMoviesBySearch.mockResolvedValueOnce({
      data: [],
    });

    const { getByPlaceholderText, findByText } = render(<SearchScreen />);

    const searchInput = getByPlaceholderText("Search for movies...");
    fireEvent.changeText(searchInput, "qwertyuiop");
    fireEvent.press(searchInput, "submitEditing");

    const emptyMessage = await findByText(
      "No movies found. Try searching for something else 🎥"
    );
    expect(emptyMessage).toBeTruthy();
  });

  it("filters movies by genre when selecting a genre", async () => {
    fetchMoviesByGenre.mockResolvedValueOnce([{ id: 1, title: "Genre Movie" }]);

    const { getByText, findByText } = render(<SearchScreen />);

    const genreButton = getByText("Action");
    fireEvent.press(genreButton);

    expect(fetchMoviesByGenre).toHaveBeenCalled();

    expect(await findByText("Genre Movie")).toBeTruthy();
  });
});
