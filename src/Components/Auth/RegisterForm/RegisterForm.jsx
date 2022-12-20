import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { PrimaryButton, PrimaryLink, CustomTextInput } from "../../index";

import { windowDimensions, keyboardShow } from "../../../services";

import AvatarUpload from "./AvatarUpload";

import PropTypes from "prop-types";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegisterForm({ navigateTo }) {
  const [state, setState] = useState(initialState);

  const dimensions = windowDimensions();
  const isShowKeyboard = keyboardShow();

  const { title, form, showPassword, showPasswordText } = styles;
  const { login, password, email } = state;

  const onFormSubmit = () => {
    // if (login.trim() === "") {
    //   return alert(`Login is required`);
    // } else if (email.trim() === "") {
    //   return alert(`Email is required`);
    // } else if (password.trim() === "") {
    //   return alert(`Password is required`);
    // } else {
    console.log("state", state);
    navigateTo.navigate("Home");
    setState(initialState);
    // }
  };

  return (
    <>
      <AvatarUpload />
      <View
        style={{
          ...form,

          paddingBottom: isShowKeyboard ? 32 : 65,

          width: dimensions,
        }}
      >
        <Text style={title}>Registration</Text>

        <CustomTextInput
          onChangeText={(value) => {
            setState((prevState) => ({ ...prevState, login: value }));
          }}
          value={login}
          placeholder="Login"
        />

        <CustomTextInput
          onChangeText={(value) => {
            setState((prevState) => ({ ...prevState, email: value }));
          }}
          value={email}
          placeholder="E-mail address"
        />

        <View style={{ marginBottom: isShowKeyboard ? 0 : 43 }}>
          <CustomTextInput
            onChangeText={(value) => {
              setState((prevState) => ({ ...prevState, password: value }));
            }}
            value={password}
            placeholder="Password"
            marginBottom={0}
          />

          <TouchableOpacity onPress={() => {}} style={showPassword}>
            <Text style={showPasswordText}>Show</Text>
          </TouchableOpacity>
        </View>

        {!isShowKeyboard && (
          <>
            <PrimaryButton onPress={onFormSubmit} text="Sign Up" />
            <PrimaryLink
              onPress={() => navigateTo.navigate("Login")}
              text="Already have an account? Login"
            />
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 32,
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontSize: 30,
    textAlign: "center",
    letterSpacing: 0.01,

    color: "#212121",
  },

  form: {},

  showPassword: {
    position: "absolute",

    right: 16,
    top: 16,
  },

  showPasswordText: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",

    fontsSize: 16,

    color: "#1B4371",
  },
});

RegisterForm.propTypes = {
  navigateTo: PropTypes.object,
};
