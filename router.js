import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LoginScreen, RegistrationScreen, Home } from "./src/Screens";

export const useRoute = (isAuth) => {
  const Stack = createNativeStackNavigator();

  if (isAuth) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="Registration" component={RegistrationScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};
