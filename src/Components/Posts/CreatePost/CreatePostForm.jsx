import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

import { useSelector, useDispatch } from "react-redux";

import { createPost } from "../../../redux/posts/postsOperations";

import { getAuthSelector } from "../../../redux/auth/authSelectors";

import PrimaryButton from "../../NativeComponents/PrimaryButton/PrimaryButton";
import CustomTextInput from "../../NativeComponents/CustomTextInput/CustomTextInput";
import { EvilIcons } from "@expo/vector-icons";

import { windowDimensions } from "../../../services";

import PropTypes from "prop-types";

import * as Location from "expo-location";

const initialState = {
  name: null,
  location: null,
};

export default function CreatePostForm({ navigation, photo, changePhoto }) {
  const [state, setState] = useState(initialState);

  const dimensions = windowDimensions();

  const dispatch = useDispatch();

  const { name, location } = state;
  const { form, iconContainer } = styles;

  const { userId, nickname, email, avatar } = useSelector(getAuthSelector);

  const isDataBgColor = name ? "#FF6C00" : "#F6F6F6";
  const isDataTextColor = name ? "#FFF" : "#BDBDBD";

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
      return coords;
    } catch (error) {
      console.log("error", error);
    }
  };

  const coordinations = takeLocation();

  const sendPhoto = () => {
    if (!name) {
      return alert(`Name is required`);
    } else if (!photo) {
      return alert(`Photo is required`);
    } else {
      setState(initialState);

      changePhoto;

      dispatch(
        createPost({
          photo,
          nickname,
          email,
          userId,
          name,
          coords: coordinations,
          avatar,
        })
      );

      navigation.navigate("Posts");
      changePhoto();
    }
  };

  return (
    <View
      style={{
        ...form,
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

      <PrimaryButton
        bgColor={isDataBgColor}
        textColor={isDataTextColor}
        text="Publish"
        onPress={sendPhoto}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {},
  iconContainer: { position: "absolute", left: 0, top: 16 },
});

CreatePostForm.propTypes = {
  navigation: PropTypes.object,
  changePhoto: PropTypes.func,
};
