import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode"; // ← AICI e fixul

export const AuthContext = createContext({
  token: null,
  isAuthenticated: false,
  user: null,
  authenticate: (token) => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);

  const authenticate = async (token) => {
    try {
      const decoded = jwtDecode(token); // ← scoți `.default`
      setAuthToken(token);
      setUser({ id: decoded.userId, email: decoded.sub });
      console.log("User ID:", decoded.userId);
      await AsyncStorage.setItem("token", token);
    } catch (error) {
      console.error("Error saving token to AsyncStorage:", error);
    }
  };

  const logout = async () => {
    try {
      setAuthToken(null);
      setUser(null);
      await AsyncStorage.removeItem("token");
    } catch (error) {
      console.error("Error removing token from AsyncStorage:", error);
    }
  };

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    user,
    authenticate,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
