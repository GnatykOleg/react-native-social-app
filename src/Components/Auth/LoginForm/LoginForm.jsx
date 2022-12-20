import { useState, useEffect } from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { windowDimensions, keyboardShow } from "../../../services";

import { PrimaryButton, PrimaryLink, CustomTextInput } from "../../index";

import PropTypes from "prop-types";

const initialState = {
  email: "",
  password: "",
};

export default function LoginForm({ navigateTo }) {
  const [state, setState] = useState(initialState);

  const { password, email } = state;

  const dimensions = windowDimensions();
  const isShowKeyboard = keyboardShow();

  const { title, form, showPassword, showPasswordText } = styles;

  const onFormSubmit = () => {
    // if (email.trim() === "") {
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
    <View
      style={{
        ...form,

        paddingBottom: isShowKeyboard ? 32 : 65,
        width: dimensions,
      }}
    >
      <Text style={title}>Login </Text>

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

        <TouchableOpacity style={showPassword}>
          <Text style={showPasswordText}>Show</Text>
        </TouchableOpacity>
      </View>
      {!isShowKeyboard && (
        <>
          <PrimaryButton onPress={onFormSubmit} text="Sign In" />
          <PrimaryLink
            onPress={() => navigateTo.navigate("Registration")}
            text="Don't have an account? Registration"
          />
        </>
      )}
    </View>
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

LoginForm.propTypes = {
  navigateTo: PropTypes.object,
};
