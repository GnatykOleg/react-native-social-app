import { useState } from "react";

import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import {
  CreatePostForm,
  CustomCamera,
  CreatePostPhoto,
} from "../../Components";

import { keyboardShow } from "../../services";

export default function CreatePostsScreen({ navigation }) {
  const [photo, setPhoto] = useState(null);
  const [snap, setSnap] = useState(null);
  const [showCamera, setShowCamera] = useState(true);

  const isShowKeyboard = keyboardShow();

  const { container, cameraWrapper } = styles;

  const changePhoto = () => {
    setShowCamera(true);
    setPhoto(null);
  };

  const takePhoto = async () => {
    try {
      const { uri } = await snap.takePictureAsync();
      setShowCamera(false);
      setPhoto(uri);
    } catch (error) {
      console.log("error --->", error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={container}>
        <View style={cameraWrapper}>
          {!isShowKeyboard && (
            <>
              <CreatePostPhoto photo={photo} onPress={changePhoto} />
              <CustomCamera
                setSnap={setSnap}
                takePhoto={takePhoto}
                showCamera={showCamera}
              />
            </>
          )}
        </View>
        <CreatePostForm
          navigation={navigation}
          photo={photo}
          changePhoto={changePhoto}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: 32,

    alignItems: "center",

    backgroundColor: "#fff",
  },

  cameraWrapper: {
    marginBottom: 32,
  },
});
