import { View, Text, StyleSheet, Image } from "react-native";

import { windowDimensions } from "../../../services";
import PropTypes from "prop-types";

export default function UserInfo({ nickname }) {
  const dimensions = windowDimensions();
  const { user, avatar, name } = styles;

  return (
    <View style={{ ...user, width: dimensions }}>
      <Image
        style={avatar}
        source={require("../../../../assets/Images/avatar.png")}
      />
      <Text style={name}>{nickname}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  user: {
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    marginRight: 8,
    width: 35,
    height: 35,

    borderRadius: 50,
  },
  name: {
    fontFamily: "Roboto-Bold",
    fontStyle: "normal",
    fontSize: 13,

    color: "#212121",
  },

  title: {
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontSize: 17,

    color: "#212121",
  },
});

UserInfo.propTypes = {
  nickname: PropTypes.string.isRequired,
};
