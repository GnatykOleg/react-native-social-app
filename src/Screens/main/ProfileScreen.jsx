import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
} from "react-native";

import { useSelector } from "react-redux";
import { getAuthSelector } from "../../redux/auth/authSelectors";

import { useDispatch } from "react-redux";

import { handleSignOut } from "../../redux/auth/authOperations";

import { MaterialIcons } from "@expo/vector-icons";

import { Background, Post } from "../../Components";

import AvatarUpload from "../../Components/Auth/RegisterForm/AvatarUpload";

export default function ProfileScreen({ route, navigation }) {
  const dispatch = useDispatch();

  const { nickname } = useSelector(getAuthSelector);

  return (
    <Background>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.wrapper}>
          <AvatarUpload />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => dispatch(handleSignOut())}
          >
            <MaterialIcons name="logout" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <Text style={styles.login}>{nickname}</Text>
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

  login: {
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",

    fontSize: 30,

    color: "#212121",
  },
});
