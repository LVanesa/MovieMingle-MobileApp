import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from "@testing-library/react-native";
import RegistrationScreen from "../screens/authentication/RegistrationScreen";
import { registerUser } from "../api/authApi";

jest.mock("../api/authApi", () => ({
  registerUser: jest.fn(),
}));

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

jest.mock("../assets/images/main-background.jpg", () => "test-background");

describe("RegistrationScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all form fields", () => {
    render(<RegistrationScreen />);
    expect(screen.getByPlaceholderText("First Name")).toBeTruthy();
    expect(screen.getByPlaceholderText("Last Name")).toBeTruthy();
    expect(screen.getByPlaceholderText("Email Address")).toBeTruthy();
    expect(screen.getByPlaceholderText("Password")).toBeTruthy();
    expect(screen.getByPlaceholderText("Confirm Password")).toBeTruthy();
  });

  it("shows errors for invalid inputs", async () => {
    registerUser.mockRejectedValueOnce({
      response: {
        data: {
          firstName: "Invalid first name",
          email: "Invalid email format",
        },
      },
    });

    render(<RegistrationScreen />);

    fireEvent.press(screen.getByTestId("submit-button"));

    expect(await screen.findByText("Invalid first name")).toBeTruthy();
    expect(await screen.findByText("Invalid email format")).toBeTruthy();
  });

  it("should handle server error with malformed response", async () => {
    registerUser.mockRejectedValueOnce({
      response: { data: "Unexpected server error" },
    });

    render(<RegistrationScreen />);

    fireEvent.changeText(screen.getByPlaceholderText("First Name"), "Test");
    fireEvent.press(screen.getByTestId("submit-button"));

    const errorMessage = await screen.findByText(/Something went wrong/i);
    expect(errorMessage).toBeTruthy();
  });

  describe("handleChange function", () => {
    it("updates input value when typing", async () => {
      render(<RegistrationScreen />);

      const firstNameInput = screen.getByPlaceholderText("First Name");
      fireEvent.changeText(firstNameInput, "New Name");

      expect(firstNameInput.props.value).toBe("New Name");
    });
  });
});
