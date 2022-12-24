import { TouchableOpacity, Text, StyleSheet } from "react-native";

import PropTypes from "prop-types";

export default function ShowHidePassord({ onPress, secureTextEntry }) {
  const { showPassword, showPasswordText } = styles;

  const passwordText = secureTextEntry ? "Show" : "Hide";

  return (
    <TouchableOpacity onPress={onPress} style={showPassword}>
      <Text style={showPasswordText}>{passwordText}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  showPassword: {
    position: "absolute",

    right: 16,
    top: 16,
  },
  showPasswordText: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",

    fontsSize: 16,

    color: "#1B4371",
  },
});

ShowHidePassord.propTypes = {
  secureTextEntry: PropTypes.bool,
  onPress: PropTypes.func,
};
