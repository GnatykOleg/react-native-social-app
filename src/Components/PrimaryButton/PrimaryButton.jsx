import { TouchableOpacity, StyleSheet, Text } from "react-native";

import PropTypes from "prop-types";

export default function PrimaryButton({ onPress, text }) {
  const { button, buttonText } = styles;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={button}>
      <Text style={buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",

    height: 51,

    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },

  buttonText: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,

    textAlign: "center",

    color: "#FFFFFF",
  },
});

PrimaryButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
