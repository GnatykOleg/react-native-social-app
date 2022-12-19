import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AntDesign, Entypo, EvilIcons } from "@expo/vector-icons";

import {
  Header,
  PrimaryButton,
  CustomTextInput,
  Photo,
} from "../../Components";

import { windowDimensions } from "../../services";

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

    form,
  } = styles;

  return (
    <>
      <Header>
        <AntDesign name="arrowleft" size={24} color="rgba(33, 33, 33, 0.8)" />
        <Text style={title}>Create a post</Text>
      </Header>

      <View style={container}>
        <Photo />

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

  form: {},
});
