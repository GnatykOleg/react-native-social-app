import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from "react-native";

import { Background, LoginForm } from "../../Components";

export default function LoginScreen({ navigation }) {
  return (
    <Background>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.wrapper}>
          <LoginForm navigation={navigation} />
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
