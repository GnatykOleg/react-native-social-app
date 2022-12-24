import { TouchableOpacity, StyleSheet, Text } from "react-native";

import PropTypes from "prop-types";

export default function PrimaryButton({ onPress, text, bgColor, textColor }) {
  const { button, buttonText } = styles;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{ ...button, backgroundColor: bgColor }}
    >
      <Text style={{ ...buttonText, color: textColor }}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",

    height: 51,

    borderRadius: 100,
  },

  buttonText: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,

    textAlign: "center",
  },
});

PrimaryButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
};
