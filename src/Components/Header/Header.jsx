import { StyleSheet, View, Text } from "react-native";
import { windowDimensions } from "../../services";

import PropTypes from "prop-types";

export default function Header({ children, title, flexDirection }) {
  const dimensions = windowDimensions();
  const { header, headerContent, text } = styles;

  return (
    <View style={header}>
      <View
        style={{
          ...headerContent,
          width: dimensions,
          flexDirection: flexDirection,
        }}
      >
        <Text style={text}>{title}</Text>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",

    paddingTop: 40,
    paddingBottom: 11,

    backgroundColor: "#fff",

    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
  },

  headerContent: {
    justifyContent: "space-between",
  },

  text: {
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",

    fontSize: 17,

    color: "#212121",
  },
});

Header.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  flexDirection: PropTypes.string,
};
