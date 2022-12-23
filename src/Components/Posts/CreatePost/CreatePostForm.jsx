import { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

import { useSelector } from "react-redux";
import { getAuthSelector } from "../../../redux/auth/authSelectors";

import PrimaryButton from "../../PrimaryButton/PrimaryButton";
import CustomTextInput from "../../CustomTextInput/CustomTextInput";

import { windowDimensions } from "../../../services";
import { firestore, storage } from "../../../firebase/config";
import { collection, addDoc, getDoc } from "firebase/firestore";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import PropTypes from "prop-types";

import * as Location from "expo-location";

const initialState = {
  name: null,
  location: null,
};

export default function CreatePostForm({ navigateTo, photo }) {
  const [state, setState] = useState(initialState);

  const dimensions = windowDimensions();
  const { name, location } = state;
  const { form, iconContainer } = styles;

  const { userId, nickname, email } = useSelector(getAuthSelector);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        return console.log("Permission to access location was denied");
      }
    })();
  }, []);

  const takeLocation = async () => {
    try {
      const { coords } = await Location.getCurrentPositionAsync();
      console.log("Location ----->", coords);
      return coords;
    } catch (error) {
      console.log("error", error);
    }
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);

    const file = await response.blob();

    const uniquePostId = Date.now().toString();

    const storageRef = ref(storage, `postImage/${uniquePostId}`);

    const upload = await uploadBytes(storageRef, file);

    console.log("upload", upload);

    const processedPhoto = await getDownloadURL(
      ref(storage, `postImage/${uniquePostId}`)
    );

    return processedPhoto;
  };

  const uploadToDataBase = async () => {
    const photoLink = await uploadPhotoToServer();
    const coordinations = await takeLocation();
    try {
      const docRef = await addDoc(collection(firestore, "posts"), {
        photoLink,
        name,
        coordinations,
        userId,
        nickname,
        email,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const sendPhoto = () => {
    // if (name.trim() === "") {
    //   return alert(`Email is required`);
    // }else if(location.trim() === ""){
    // return alert(`Location is required`)
    //   }
    // takeLocation();
    // uploadPhotoToServer();
    uploadToDataBase();
    navigateTo.navigate("DefaultScreenPosts");
  };

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
