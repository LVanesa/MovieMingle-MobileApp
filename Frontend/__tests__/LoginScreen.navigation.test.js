import { render, fireEvent, act } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/authentication/LoginScreen";
import { Text } from "react-native";

const Stack = createStackNavigator();
const RegisterScreen = () => <Text>Register Screen</Text>;

test("navigheaza la RegisterScreen cand se apasa pe link", async () => {
  const { getByText, findByText } = render(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  await act(async () => {
    fireEvent.press(getByText(/Register!/i));
  });

  expect(await findByText("Register Screen")).toBeTruthy();
});
