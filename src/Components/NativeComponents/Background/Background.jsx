import {
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import PropTypes from "prop-types";

export default function Background({ children }) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground
        style={styles.image}
        source={require("../../../../assets/Images/bg.jpg")}
      >
        {children}
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    paddingTop: 200,
  },
});

Background.propTypes = {
  children: PropTypes.element,
};
