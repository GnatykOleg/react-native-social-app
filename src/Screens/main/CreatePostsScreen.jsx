import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { useState } from "react";

import { windowDimensions } from "../../services";
import { Header, PrimaryButton, CustomTextInput } from "../../Components";

import { AntDesign, Entypo, EvilIcons } from "@expo/vector-icons";

const initialState = {
  name: "",
  location: "",
};

export default function PostsScreen() {
  const [state, setState] = useState(initialState);

  const dimensions = windowDimensions();

  const { name, location } = state;

  const {
    container,
    title,
    camera,
    iconContainer,
    cameraTitle,
    cameraWrapper,
    form,
  } = styles;

  return (
    <>
      <Header>
        <AntDesign name="arrowleft" size={24} color="rgba(33, 33, 33, 0.8)" />
        <Text style={title}>Create a post</Text>
      </Header>

      <View style={container}>
        <View style={cameraWrapper}>
          <View style={{ ...camera, width: dimensions }}>
            <TouchableOpacity
              onPress={() => {}}
              activeOpacity={0.8}
              style={iconContainer}
            >
              <Entypo name="camera" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
          <Text style={cameraTitle}>Upload photo</Text>
        </View>

        <View style={{ ...form, width: dimensions }}>
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
            <View
              style={{
                position: "absolute",
                left: 0,
                top: 16,
              }}
            >
              <EvilIcons name="location" size={24} color="#BDBDBD" />
            </View>
          </View>

          <PrimaryButton text="Publish" onPress={() => {}} />
        </View>
      </View>
    </>
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
    // alignItems: "center",
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
    marginBottom: 32,

    fontFamily: "Roboto-Regular",
    fontStyle: "normal",

    fontSize: 16,

    color: "#BDBDBD",
  },

  iconContainer: {
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#fff",
    width: 60,
    height: 60,
    borderRadius: 50,
  },

  form: {},
});
