import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
import LoginScreen from "../screens/authentication/LoginScreen";
import React from "react";

test("renders login screen correctly", () => {
  const tree = render(
    <NavigationContainer>
      <LoginScreen />
    </NavigationContainer>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
