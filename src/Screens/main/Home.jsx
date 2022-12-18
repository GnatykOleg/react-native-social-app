import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { ProfileScreen, PostsScreen, CreatePostsScreen } from "../index";

import { MaterialCommunityIcons, AntDesign, Feather } from "@expo/vector-icons";

export default function Home() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#fff",
        tabBarActiveBackgroundColor: "#FF6C00",
        headerShown: false,
        tabBarItemStyle: {
          // borderRadius: 100,
          // paddingBottom: 20,
        },
      }}
    >
      <Tab.Screen
        options={{
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
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="plus" size={size} color={color} />
          ),
        }}
        name="Create"
        component={CreatePostsScreen}
      />
      <Tab.Screen
        options={{
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
