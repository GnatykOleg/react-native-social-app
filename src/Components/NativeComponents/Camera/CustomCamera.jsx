import { useState } from "react";
import { Camera, CameraType } from "expo-camera";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { windowDimensions } from "../../../services";

import { Entypo, MaterialIcons } from "@expo/vector-icons";

import PropTypes from "prop-types";

export default function CustomCamera({
  setSnap,
  takePhoto,
  showCamera,
  isAvatarUploadPhoto = false,
}) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const dimensions = windowDimensions();

  const { camera, iconContainerCamera, iconContainerSwap } = styles;

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const avatarUploadStyles = {
    position: "absolute",
    top: -60,
    width: 120,
    height: 120,
  };

  const postUploadStyles = {
    height: 240,
    width: dimensions,
  };

  const stylesOfCamera = isAvatarUploadPhoto
    ? avatarUploadStyles
    : postUploadStyles;

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View>
        <Text style={{ textAlign: "center", marginBottom: 40, fontSize: 35 }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    showCamera && (
      <Camera
        pictureSize=""
        type={type}
        ref={setSnap}
        style={{
          ...camera,
          ...stylesOfCamera,
        }}
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
    )
  );
}

const styles = StyleSheet.create({
  camera: {
    justifyContent: "center",
    alignItems: "center",
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
});

CustomCamera.propTypes = {
  setSnap: PropTypes.func.isRequired,
  takePhoto: PropTypes.func.isRequired,
};
