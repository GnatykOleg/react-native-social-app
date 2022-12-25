import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  Button,
} from "react-native";

import { handleSignOut, uploadAvatar } from "../../redux/auth/authOperations";
import { getAuthSelector } from "../../redux/auth/authSelectors";
import { getUserPosts } from "../../redux/posts/postsOperations";
import { getPostsSelector } from "../../redux/posts/postsSelectors";
import { useIsFocused } from "@react-navigation/native";
import { Background, Avatar, Post, CustomCamera } from "../../Components";

import { MaterialIcons } from "@expo/vector-icons";

export default function ProfileScreen({ navigation }) {
  const [snap, setSnap] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [addPhoto, setAddPhoto] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const { nickname, userId, avatar } = useSelector(getAuthSelector);
  const [userAvatar, setUserAvatar] = useState(avatar);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const defaultAvatar =
    "https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg";

  const { userPosts } = useSelector(getPostsSelector);

  const { wrapper, iconContainer, login } = styles;

  const takePhoto = async () => {
    try {
      const { uri } = await snap.takePictureAsync();
      setShowCamera(false);

      setConfirm(true);
      setUserAvatar(uri);
    } catch (error) {
      console.log("error --->", error.message);
    }
  };

  const addPhotoOnPress = () => {
    setShowCamera(true);
    setAddPhoto(false);
    setConfirm(false);
  };

  const deletePhotoOnPress = () => {
    setShowCamera(false);
    setAddPhoto(true);
    setConfirm(false);
    setUserAvatar(null);
  };

  const setDefaultAvatar = () => {
    dispatch(uploadAvatar(defaultAvatar));
    setUserAvatar(defaultAvatar);
    setConfirm(false);
    setAddPhoto(false);
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(getUserPosts(userId));
    }
  }, [dispatch, isFocused, userId]);

  return (
    <Background>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={wrapper}>
          <Avatar
            setDefaultAvatar={setDefaultAvatar}
            photo={userAvatar}
            addPhoto={addPhoto}
            addPhotoOnPress={addPhotoOnPress}
            deletePhotoOnPress={deletePhotoOnPress}
          />
          {confirm && (
            <View style={{ marginBottom: 20 }}>
              <Button
                color="#FF6C00"
                onPress={() => {
                  dispatch(uploadAvatar(userAvatar));
                  setConfirm(false);
                }}
                title="Please Confirm Change Avatar"
              />
            </View>
          )}
          <CustomCamera
            isAvatarUploadPhoto={true}
            setSnap={setSnap}
            takePhoto={takePhoto}
            showCamera={showCamera}
          />
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
    paddingTop: 70,

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
