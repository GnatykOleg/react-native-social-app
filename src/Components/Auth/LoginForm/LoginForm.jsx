import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { windowDimensions, keyboardShow } from "../../../services";

import PrimaryButton from "../../PrimaryButton/PrimaryButton";
import PrimaryLink from "../../PrimaryLink/PrimaryLink";
import CustomTextInput from "../../CustomTextInput/CustomTextInput";

import { handleSignIn, handleSignUp } from "../../../redux/auth/authOperations";

import { isEmail, isEmpty } from "validator";

import PropTypes from "prop-types";

const initialState = {
  email: "",
  password: "",
};

export default function LoginForm({ navigateTo }) {
  const [state, setState] = useState(initialState);

  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const { password, email } = state;

  const dimensions = windowDimensions();
  const isShowKeyboard = keyboardShow();

  const dispatch = useDispatch();

  const { title, form, showPassword, showPasswordText } = styles;
  const passwordText = secureTextEntry ? "Show" : "Hide";

  const onFormSubmit = () => {
    if (!isEmail(email)) {
      return alert("Please type a valid email, example : nickname@mail.com");
    } else if (isEmpty(password)) {
      return alert("Please type a password");
    } else {
      dispatch(handleSignIn({ email, password }));

      // navigateTo.navigate("Home");
      setState(initialState);
    }
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
          secureTextEntry={secureTextEntry}
        />

        <TouchableOpacity
          onPress={() => {
            setSecureTextEntry((state) => !state);
          }}
          style={showPassword}
        >
          <Text style={showPasswordText}>{passwordText}</Text>
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
