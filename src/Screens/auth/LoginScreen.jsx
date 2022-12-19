import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from "react-native";

import { useState, useEffect } from "react";

import { Background, LoginForm } from "../../Components";

export default function LoginScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(null);

  const keyboardHide = () => {
    console.log("Click on Touchable");
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener("keyboardDidShow", () => {
      setIsShowKeyboard(true);
    });
    const keyboardDidHide = Keyboard.addListener("keyboardDidHide", () => {
      setIsShowKeyboard(false);
    });

    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, []);

  return (
    <Background>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.wrapper}>
          <LoginForm isShowKeyboard={isShowKeyboard} navigateTo={navigation} />
        </View>
      </TouchableWithoutFeedback>
    </Background>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    paddingTop: 32,

    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
});
