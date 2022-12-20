import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  LoginScreen,
  RegistrationScreen,
  Home,
  MapScreen,
  CommentsScreen,
} from "./src/Screens";

export const useRoute = (isAuth) => {
  const Stack = createNativeStackNavigator();

  // if (!isAuth) {
  //   return <Home />;
  // }

  return (
    <Stack.Navigator
      initialRouteName="Registration"
      screenOptions={{
        headerShown: false,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};
