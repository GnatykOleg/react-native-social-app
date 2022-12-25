import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import PropTypes from "prop-types";

export default function CommentsForms({ onChangeText, value, onPress }) {
  const { inputContainer, input, iconContainer } = styles;
  return (
    <View style={inputContainer}>
      <TextInput
        onChangeText={onChangeText}
        value={value}
        placeholder="Comment..."
        style={input}
        selectionColor="#FF6C00"
      />
      <TouchableOpacity
        activeOpacity={0.8}
        style={iconContainer}
        onPress={onPress}
      >
        <AntDesign name="arrowup" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    position: "relative",

    height: 50,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    paddingLeft: 16,
  },
  inputContainer: {},

  iconContainer: {
    position: "absolute",
    top: 8,
    right: 8,

    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 50,
  },
});

CommentsForms.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};
