jest.mock("react-native-chart-kit", () => ({
  BarChart: () => null,
  LineChart: () => null,
  PieChart: () => null,
}));

jest.mock("react-native-toast-message", () => ({
  show: jest.fn(),
}));

import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import ProfileScreen from "../screens/main/ProfileScreen";
import {
  fetchDashboardData,
  fetchUserProfile,
  updateUserAvatar,
} from "../api/movieApi";

// Mock API calls
jest.mock("../api/movieApi", () => ({
  fetchDashboardData: jest.fn(),
  fetchUserProfile: jest.fn(),
  updateUserAvatar: jest.fn(),
}));

// Mock avatars
jest.mock("../assets/images/general_avatar.png", () => "general_avatar.png");
jest.mock("../assets/images/avatar1.jpg", () => "avatar1.jpg");

describe("ProfileScreen", () => {
  beforeEach(() => {
    fetchDashboardData.mockResolvedValue({
      totalMoviesWatched: 10,
      totalHoursWatched: 50,
      averageRating: 4.5,
      moviesPerMonth: { Jan: 3, Feb: 7 },
      genresWatched: { Action: 5, Comedy: 5 },
    });

    fetchUserProfile.mockResolvedValue({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      avatar: "avatar1.jpg",
    });

    updateUserAvatar.mockResolvedValue({});
  });

  it("should render loading indicator initially", async () => {
    const { findByTestId } = render(<ProfileScreen />);
    expect(await findByTestId("loading-indicator")).toBeTruthy();

    await waitFor(() => {
      expect(fetchDashboardData).toHaveBeenCalled();
    });
  });

  it("should render user info after loading", async () => {
    const { findByText } = render(<ProfileScreen />);

    expect(await findByText("First Name:")).toBeTruthy();
    expect(await findByText("John")).toBeTruthy();
    expect(await findByText("Last Name:")).toBeTruthy();
    expect(await findByText("Doe")).toBeTruthy();
    expect(await findByText("Email:")).toBeTruthy();
    expect(await findByText("john@example.com")).toBeTruthy();
  });

  it("should render dashboard charts", async () => {
    const { findByText } = render(<ProfileScreen />);

    expect(await findByText("Dashboard 📊")).toBeTruthy();
    expect(await findByText("User Stats 📈")).toBeTruthy();
    expect(await findByText("Monthly Activity 📅")).toBeTruthy();
    expect(await findByText("Genre Distribution 🎭")).toBeTruthy();
  });

  it("should open avatar modal when button is pressed", async () => {
    const { findByText, getByText } = render(<ProfileScreen />);

    const changeBtn = await findByText("Change Avatar");
    fireEvent.press(changeBtn);

    expect(getByText("Choose Your Avatar")).toBeTruthy();
  });
});
