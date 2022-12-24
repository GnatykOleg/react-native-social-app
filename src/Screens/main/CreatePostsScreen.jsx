import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

import { CreatePostForm } from "../../Components";

import { Camera, CameraType } from "expo-camera";

import { windowDimensions, keyboardShow } from "../../services";
export default function PostsScreen({ navigation }) {
  const [photo, setPhoto] = useState(false);
  const [snap, setSnap] = useState(null);
  const [showCamera, setShowCamera] = useState(true);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const dimensions = windowDimensions();
  const isShowKeyboard = keyboardShow();
  const {
    camera,
    container,
    iconContainerCamera,
    iconContainerSwap,
    cameraTitle,
    cameraWrapper,
    photoContainer,
  } = styles;

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
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

  const isPhoto = photo && (
    <>
      <View style={{ ...photoContainer, width: dimensions }}>
        <Image source={{ uri: photo }} style={{ height: 240 }} />
      </View>
      <TouchableOpacity
        onPress={() => {
          setShowCamera(true);
          setPhoto(false);
        }}
      >
        <Text style={cameraTitle}>
          {photo && <Text style={cameraTitle}>Change photo</Text>}
        </Text>
      </TouchableOpacity>
    </>
  );

  const isCamera = showCamera && (
    <Camera
      pictureSize=""
      type={type}
      ref={setSnap}
      style={{ ...camera, width: dimensions }}
    >
      <TouchableOpacity
        onPress={takePhoto}
        activeOpacity={0.8}
        style={iconContainerCamera}
      >
        <Entypo name="camera" size={24} color="#BDBDBD" />
      </TouchableOpacity>
      <TouchableOpacity style={iconContainerSwap} onPress={toggleCameraType}>
        <MaterialIcons name="compare-arrows" size={30} color="#BDBDBD" />
      </TouchableOpacity>
    </Camera>
  );

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center", marginBottom: 40, fontSize: 35 }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={container}>
        <View style={cameraWrapper}>
          {!isShowKeyboard && (
            <>
              {isPhoto}
              {isCamera}
            </>
          )}
        </View>
        <CreatePostForm navigation={navigation} photo={photo} />
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

  title: {
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontSize: 17,

    color: "#212121",
  },

  cameraWrapper: {
    marginBottom: 32,
  },

  camera: {
    justifyContent: "center",
    alignItems: "center",

    height: 240,

    borderRadius: 8,

    backgroundColor: "#E8E8E8",
  },

  cameraTitle: {
    marginTop: 8,

    fontFamily: "Roboto-Regular",
    fontStyle: "normal",

    fontSize: 16,

    color: "#BDBDBD",
  },

  iconContainerCamera: {
    zIndex: 999,
    justifyContent: "center",
    alignItems: "center",

    width: 60,
    height: 60,
    borderRadius: 50,
  },

  iconContainerSwap: {
    position: "absolute",
    bottom: -20,
    right: -20,

    width: 60,
    height: 60,
    borderRadius: 50,
  },

  photoContainer: {},
});
