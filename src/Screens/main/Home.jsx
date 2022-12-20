import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { TouchableOpacity } from "react-native";

import {
  MaterialCommunityIcons,
  AntDesign,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";

import { ProfileScreen, PostsScreen, CreatePostsScreen } from "../index";

export default function Home({ navigation }) {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#fff",
        tabBarActiveBackgroundColor: "#FF6C00",
        headerTitleAlign: "center",
        tabBarStyle: { height: 50 },
      }}
    >
      <Tab.Screen
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
        name="Posts"
        component={PostsScreen}
      />

      <Tab.Screen
        options={{
          title: "Create Post",
          headerLeft: () => (
            <TouchableOpacity
              style={{ paddingLeft: 10 }}
              onPress={() => navigation.goBack()}
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
