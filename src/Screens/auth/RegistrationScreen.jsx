import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from "react-native";

import { Background, RegisterForm } from "../../Components";

export default function RegistrationScreen({ navigation }) {
  return (
    <Background>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.wrapper}>
          <RegisterForm navigation={navigation} />
        </View>
      </TouchableWithoutFeedback>
    </Background>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    paddingTop: 92,

    backgroundColor: "#FFFFFF",

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
});
