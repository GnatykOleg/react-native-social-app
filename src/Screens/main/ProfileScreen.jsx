import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
} from "react-native";

import { handleSignOut } from "../../redux/auth/authOperations";
import { getAuthSelector } from "../../redux/auth/authSelectors";
import { getUserPosts } from "../../redux/posts/postsOperations";
import { getPostsSelector } from "../../redux/posts/postsSelectors";
import { useIsFocused } from "@react-navigation/native";
import { Background, AvatarUpload, Post } from "../../Components";

import { MaterialIcons } from "@expo/vector-icons";

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { nickname, userId } = useSelector(getAuthSelector);
  const { userPosts } = useSelector(getPostsSelector);

  const { wrapper, iconContainer, login } = styles;

  useEffect(() => {
    if (isFocused) {
      dispatch(getUserPosts(userId));
    }
  }, [dispatch, isFocused, userId]);

  return (
    <Background>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={wrapper}>
          <AvatarUpload />
          <TouchableOpacity
            style={iconContainer}
            onPress={() => dispatch(handleSignOut())}
          >
            <MaterialIcons name="logout" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <Text style={login}>{nickname}</Text>
          <Post data={userPosts} navigation={navigation} />
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
    paddingBottom: 80,
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
    marginBottom: 16,
  },
});
