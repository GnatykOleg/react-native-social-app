import { TouchableOpacity, Text, StyleSheet } from "react-native";

import PropTypes from "prop-types";

export default function PrimaryLink({ onPress, text }) {
  const { link, linkText } = styles;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={link}>
      <Text style={linkText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  link: {
    marginTop: 16,
  },

  linkText: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    textAlign: "center",

    color: "#1B4371",
  },
});

PrimaryLink.propTypes = {
  onPress: PropTypes.func,
  text: PropTypes.string,
};
