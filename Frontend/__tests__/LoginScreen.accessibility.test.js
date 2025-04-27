import { render, screen } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

import LoginScreen from "../screens/authentication/LoginScreen";

describe("LoginScreen Accessibility", () => {
  beforeEach(() => {
    render(
      <NavigationContainer>
        <LoginScreen />
      </NavigationContainer>
    );
  });

  test("has accessible form inputs", () => {
    expect(screen.getByLabelText("Email input")).toBeTruthy();
    expect(screen.getByLabelText("Password input")).toBeTruthy();
  });

  test("has accessible buttons", () => {
    expect(screen.getByLabelText("Login button")).toBeTruthy();
    expect(screen.getByText("Forgot Password?")).toBeTruthy();
  });

  test("has accessible registration link", () => {
    expect(screen.getByText(/have an account/i)).toBeTruthy();
  });
});
