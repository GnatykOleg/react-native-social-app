import { View, StyleSheet } from "react-native";

import { Background } from "../../Components";

export default function ProfileScreen() {
  return (
    <Background>
      <View style={styles.wrapper}></View>
    </Background>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    paddingTop: 92,

    backgroundColor: "#FFFFFF",

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
});
