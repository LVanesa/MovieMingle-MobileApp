import { render, fireEvent, act } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/authentication/LoginScreen";
import { Alert } from "react-native";

// Mock Alert
jest.spyOn(Alert, "alert").mockImplementation(() => {});

// Mock API
jest.mock("../api/authApi", () => ({
  loginUser: jest.fn(() => Promise.resolve({ data: { token: "fake-token" } })),
}));

// Mock context
jest.mock("../store/auth-context", () => ({
  AuthContext: {
    Consumer: ({ children }) => children({ authenticate: jest.fn() }),
  },
}));

test("afiseaza mesaj de eroare la credentiale incorecte", async () => {
  const mockLoginUser = require("../api/authApi").loginUser;
  mockLoginUser.mockRejectedValueOnce({
    response: { data: { error: "Invalid credentials" } },
  });

  const { getByTestId, findByText, queryByText, debug } = render(
    <NavigationContainer>
      <LoginScreen />
    </NavigationContainer>
  );

  await act(async () => {
    fireEvent.changeText(getByTestId("emailInput"), "valid@example.com");
    fireEvent.changeText(getByTestId("passwordInput"), "validpassword");
  });

  expect(getByTestId("emailInput").props.value).toBe("valid@example.com");
  expect(getByTestId("passwordInput").props.value).toBe("validpassword");

  await act(async () => {
    fireEvent.press(getByTestId("loginButton"));
  });

  expect(queryByText("Email is required")).toBeNull();
  expect(queryByText("Password is required")).toBeNull();

  const errorMessage = await findByText("Invalid credentials");
  expect(errorMessage).toBeTruthy();
});
