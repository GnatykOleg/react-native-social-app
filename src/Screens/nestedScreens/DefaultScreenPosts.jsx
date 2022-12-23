import { View, StyleSheet } from "react-native";

import { Post, UserInfo } from "../../Components";

export default function DefaultScreenPosts({ navigation }) {
  return (
    <>
      <View style={styles.container}>
        <UserInfo />
        <Post navigateTo={navigation} />
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
