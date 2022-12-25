import { useState } from "react";
import { useDispatch } from "react-redux";

import { uploadAvatar } from "../../redux/auth/authOperations";

import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from "react-native";

import {
  Background,
  RegisterForm,
  Avatar,
  CustomCamera,
} from "../../Components";

export default function RegistrationScreen({ navigation }) {
  const [snap, setSnap] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [addPhoto, setAddPhoto] = useState(true);
  const [userAvatar, setUserAvatar] = useState(null);

  const dispatch = useDispatch();

  const defaultAvatar =
    "https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg";

  const takePhoto = async () => {
    try {
      const { uri } = await snap.takePictureAsync();
      setShowCamera(false);
      setUserAvatar(uri);
    } catch (error) {
      console.log("error --->", error.message);
    }
  };

  const addPhotoOnPress = () => {
    setShowCamera(true);
    setAddPhoto(false);
  };

  const deletePhotoOnPress = () => {
    setShowCamera(false);
    setAddPhoto(true);

    setUserAvatar(null);
  };

  const setDefaultAvatar = () => {
    dispatch(uploadAvatar(defaultAvatar));
    setUserAvatar(defaultAvatar);
    setAddPhoto(false);
  };

  return (
    <Background>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.wrapper}>
          <Avatar
            isRegistationScreen={true}
            setDefaultAvatar={setDefaultAvatar}
            photo={userAvatar}
            addPhoto={addPhoto}
            addPhotoOnPress={addPhotoOnPress}
            deletePhotoOnPress={deletePhotoOnPress}
          />
          <CustomCamera
            isAvatarUploadPhoto={true}
            setSnap={setSnap}
            takePhoto={takePhoto}
            showCamera={showCamera}
          />
          <RegisterForm navigation={navigation} photo={userAvatar} />
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
