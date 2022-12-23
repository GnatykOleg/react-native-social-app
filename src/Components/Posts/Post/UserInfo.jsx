import { View, Text, StyleSheet, Image } from "react-native";

import { useSelector } from "react-redux";

import { getAuthSelector } from "../../../redux/auth/authSelectors";

import { windowDimensions } from "../../../services";

export default function UserInfo() {
  const dimensions = windowDimensions();
  const { user, avatar, name, email } = styles;

  const userInfo = useSelector(getAuthSelector);

  return (
    <View style={{ ...user, width: dimensions }}>
      <Image
        style={avatar}
        source={require("../../../../assets/Images/avatar.png")}
      />

      <View>
        <Text style={name}>{userInfo.nickname}</Text>
        <Text style={email}>{userInfo.email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  user: {
    marginBottom: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    marginRight: 8,
    width: 60,
    height: 60,

    borderRadius: 16,
  },
  name: {
    fontFamily: "Roboto-Bold",
    fontStyle: "normal",
    fontSize: 13,

    color: "#212121",
  },
  email: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 11,

    color: "rgba(33, 33, 33, 0.8)",
  },

  title: {
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontSize: 17,

    color: "#212121",
  },
});
