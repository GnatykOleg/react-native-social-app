import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { Background, Post } from "../../Components";

import AvatarUpload from "../../Components/Auth/RegisterForm/AvatarUpload";

export default function ProfileScreen({ route, navigation }) {
  return (
    <Background>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.wrapper}>
          <AvatarUpload />
          <TouchableOpacity style={styles.iconContainer} onPress={() => {}}>
            <MaterialIcons name="logout" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <Post routeParams={route.params} navigateTo={navigation} />
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

  iconContainer: {
    position: "absolute",
    right: 16,
    top: 22,
  },
});
