import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import { TouchableOpacity } from "react-native";

import { MaterialCommunityIcons, AntDesign, Feather } from "@expo/vector-icons";

import ProfileScreen from "./ProfileScreen";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";

export default function Home({ navigation }) {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#fff",
        tabBarActiveBackgroundColor: "#FF6C00",
        headerTitleAlign: "center",
      }}
    >
      <Tab.Screen
        options={({ route }) => ({
          headerShown: false,

          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="view-gallery"
              size={size}
              color={color}
            />
          ),
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";
            if (routeName === "Comments" || routeName === "Map") {
              return { display: "none" };
            }
            return { height: 50 };
          })(route),
        })}
        name="Posts"
        component={PostsScreen}
      />

      <Tab.Screen
        options={{
          tabBarStyle: { display: "none" },
          title: "Create Post",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{ paddingLeft: 10 }}
            >
              <AntDesign
                name="arrowleft"
                size={24}
                color="rgba(33, 33, 33, 0.8)"
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="plus" size={size} color={color} />
          ),
        }}
        name="Create"
        component={CreatePostsScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}
