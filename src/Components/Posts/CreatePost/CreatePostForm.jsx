import { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

import PrimaryButton from "../../PrimaryButton/PrimaryButton";
import CustomTextInput from "../../CustomTextInput/CustomTextInput";

import { windowDimensions } from "../../../services";

import PropTypes from "prop-types";

import * as Location from "expo-location";

const initialState = {
  name: "",
  location: "",
};

export default function CreatePostForm({ navigateTo, photo }) {
  const [state, setState] = useState(initialState);
  // const [hasPermission, setHasPermission] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Camera.requestPermissionsAsync();
  //     await MediaLibrary.requestPermissionsAsync();

  //     setHasPermission(status === "granted");
  //   })();
  // }, []);

  // console.log("Фото которое приходит в форму из CreatePostScreen", photo);

  const dimensions = windowDimensions();
  const { name, location } = state;
  const { form, iconContainer } = styles;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      // console.log("status", status);
      if (status !== "granted") {
        return console.log("Permission to access location was denied");
      }
    })();
  }, []);

  const takeLocation = async () => {
    try {
      const getPhotoLocation = await Location.getCurrentPositionAsync();

      console.log("Location ----->", getPhotoLocation);
    } catch (error) {
      console.log("error", error);
    }
  };

  const sendPhoto = () => {
    // if (name.trim() === "") {
    //   return alert(`Email is required`);
    // }else if(location.trim() === ""){
    // return alert(`Location is required`)
    //   }
    takeLocation();
    navigateTo.navigate("DefaultScreenPosts", { photo });
  };

  // if (hasPermission === false) {
  //   return alert("No access to camera");
  // }

  return (
    <View
      style={{
        ...form,
        // paddingBottom: isShowKeyboard ? 32 : 65,
        width: dimensions,
      }}
    >
      <CustomTextInput
        isPrimaryInput={false}
        onChangeText={(value) => {
          setState((prevState) => ({ ...prevState, name: value }));
        }}
        value={name}
        placeholder="Name..."
      />

      <View>
        <CustomTextInput
          paddingLeft={28}
          isPrimaryInput={false}
          onChangeText={(value) => {
            setState((prevState) => ({ ...prevState, location: value }));
          }}
          value={location}
          placeholder="Location..."
          marginBottom={32}
        />
        <View style={iconContainer}>
          <EvilIcons name="location" size={24} color="#BDBDBD" />
        </View>
      </View>

      <PrimaryButton text="Publish" onPress={sendPhoto} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {},
  iconContainer: { position: "absolute", left: 0, top: 16 },
});

CreatePostForm.propTypes = {
  navigateTo: PropTypes.object,
};
