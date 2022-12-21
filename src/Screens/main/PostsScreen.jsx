import { StyleSheet, TouchableOpacity } from "react-native";

import { MapScreen, CommentsScreen, DefaultScreenPosts } from "../../Screens";

import {
  MaterialCommunityIcons,
  AntDesign,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function PostsScreen() {
  const NestedStack = createNativeStackNavigator();
  return (
    <NestedStack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <NestedStack.Screen
        name="DefaultScreenPosts"
        component={DefaultScreenPosts}
        options={{
          title: "Publications",
          headerRight: () => (
            <TouchableOpacity style={{ paddingRight: 10 }} onPress={() => {}}>
              <MaterialIcons name="logout" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="view-gallery"
              size={size}
              color={color}
            />
          ),
        }}
      ></NestedStack.Screen>
      <NestedStack.Screen
        name="Map"
        component={MapScreen}
        options={{ headerShown: true }}
      ></NestedStack.Screen>
      <NestedStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{ headerShown: true }}
      ></NestedStack.Screen>
    </NestedStack.Navigator>
  );
}

const styles = StyleSheet.create({});
