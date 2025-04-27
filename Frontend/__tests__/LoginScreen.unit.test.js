import {
  render,
  fireEvent,
  screen,
  waitFor,
} from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/authentication/LoginScreen";
import { loginUser } from "../api/authApi";
import { AuthContext } from "../store/auth-context";

// Mock pentru API și AuthContext
jest.mock("../api/authApi", () => ({
  loginUser: jest.fn(),
}));

describe("LoginScreen", () => {
  const mockAuthenticate = jest.fn();
  const mockAuthContext = {
    authenticate: mockAuthenticate,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should allow user to enter email and password", async () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <NavigationContainer>
          <LoginScreen />
        </NavigationContainer>
      </AuthContext.Provider>
    );

    const emailInput = screen.getByTestId("emailInput");
    const passwordInput = screen.getByTestId("passwordInput");

    fireEvent.changeText(emailInput, "test@email.com");
    fireEvent.changeText(passwordInput, "password123");

    expect(emailInput.props.value).toBe("test@email.com");
    expect(passwordInput.props.value).toBe("password123");
  });

  it("should show validation errors for empty fields", async () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <NavigationContainer>
          <LoginScreen />
        </NavigationContainer>
      </AuthContext.Provider>
    );

    fireEvent.press(screen.getByTestId("loginButton"));

    await waitFor(() => {
      expect(screen.getByText("Email is required")).toBeTruthy();
      expect(screen.getByText("Password is required")).toBeTruthy();
    });
  });

  it("should show error message when login fails", async () => {
    loginUser.mockRejectedValueOnce({
      response: { data: { error: "Invalid credentials" } },
    });

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <NavigationContainer>
          <LoginScreen />
        </NavigationContainer>
      </AuthContext.Provider>
    );

    fireEvent.changeText(screen.getByTestId("emailInput"), "test@email.com");
    fireEvent.changeText(screen.getByTestId("passwordInput"), "password123");
    fireEvent.press(screen.getByTestId("loginButton"));

    await waitFor(() => {
      expect(screen.getByText("Invalid credentials")).toBeTruthy();
    });
  });

  it("should call authenticate on successful login", async () => {
    const mockToken = "test-token-123";
    loginUser.mockResolvedValueOnce({ data: { token: mockToken } });

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <NavigationContainer>
          <LoginScreen />
        </NavigationContainer>
      </AuthContext.Provider>
    );

    fireEvent.changeText(screen.getByTestId("emailInput"), "test@email.com");
    fireEvent.changeText(screen.getByTestId("passwordInput"), "password123");
    fireEvent.press(screen.getByTestId("loginButton"));

    await waitFor(() => {
      expect(mockAuthenticate).toHaveBeenCalledWith(mockToken);
    });
  });
});
