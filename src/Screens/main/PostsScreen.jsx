import { View, Text, StyleSheet } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { Header, Post, UserInfo } from "../../Components";

export default function PostsScreen() {
  const { container, title } = styles;

  return (
    <>
      <Header>
        <Text style={title}>Publications</Text>
        <MaterialIcons name="logout" size={24} color="#BDBDBD" />
      </Header>

      <View style={container}>
        <UserInfo />
        <Post />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 32,

    alignItems: "center",
  },
});
