import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { LoginScreen, RegistrationScreen } from "./src/Screens";

export default function App() {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ImageBackground
          style={styles.image}
          source={require("./assets/Images/bg.jpg")}
        >
          <RegistrationScreen />
          {/* <LoginScreen /> */}
        </ImageBackground>
      </TouchableWithoutFeedback>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    // alignItems: "center",
  },
});
