import { useState } from "react";
import { TextInput, StyleSheet } from "react-native";

import PropTypes from "prop-types";

export default function CustomTextInput({
  onChangeText,
  value,
  placeholder,
  marginBottom = 16,
  isPrimaryInput = true,
  paddingLeft = 16,
}) {
  const [onInput, setOnInput] = useState(false);

  const { primaryInput, secondaryInput } = styles;

  const onFocusBlurPrimaryTextInputStyles = {
    backgroundColor: onInput ? "#FFFFFF" : "#F6F6F6",
    borderColor: onInput ? "#FF6C00" : "#E8E8E8",
  };

  const onFocusBlurSecondaryTextInputStyles = {
    backgroundColor: "transparent",
    borderBottomColor: onInput ? "#FF6C00" : "#E8E8E8",
  };

  const isPrimaryInputStyles = isPrimaryInput
    ? {
        ...primaryInput,
        ...onFocusBlurPrimaryTextInputStyles,
        marginBottom,
        paddingLeft,
      }
    : {
        ...secondaryInput,
        ...onFocusBlurSecondaryTextInputStyles,
        marginBottom,
        paddingLeft,
      };

  return (
    <TextInput
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      style={isPrimaryInputStyles}
      onFocus={() => setOnInput(true)}
      onBlur={() => setOnInput(false)}
      selectionColor="#FF6C00"
    />
  );
}

const styles = StyleSheet.create({
  primaryInput: {
    position: "relative",

    height: 50,

    borderWidth: 1,

    borderRadius: 8,

    fontFamily: "Roboto-Regular",
    fontStyle: "normal",

    fontSize: 16,

    color: "#212121",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },

  secondaryInput: {
    position: "relative",

    height: 50,

    borderBottomWidth: 1,

    fontFamily: "Roboto-Regular",

    fontStyle: "normal",

    fontSize: 16,

    color: "#212121",
  },
});

CustomTextInput.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  marginBottom: PropTypes.number,
  isPrimaryInput: PropTypes.bool,
};
