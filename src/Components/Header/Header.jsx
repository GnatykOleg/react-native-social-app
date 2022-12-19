import { StyleSheet, View } from "react-native";
import { windowDimensions } from "../../services";

import PropTypes from "prop-types";

export default function Header({ children }) {
  const dimensions = windowDimensions();
  const { header, headerContent } = styles;

  return (
    <View style={header}>
      <View style={{ ...headerContent, width: dimensions }}>{children}</View>
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
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

Header.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};
