import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { View, Text, StyleSheet } from "react-native";

import PrimaryButton from "../../NativeComponents/PrimaryButton/PrimaryButton";
import PrimaryLink from "../../NativeComponents/PrimaryLink/PrimaryLink";
import CustomTextInput from "../../NativeComponents/CustomTextInput/CustomTextInput";
import ShowHidePassord from "../../NativeComponents/ShowHidePassord/ShowHidePassord";
import { windowDimensions, keyboardShow } from "../../../services";

import { handleSignUp } from "../../../redux/auth/authOperations";

import PropTypes from "prop-types";

import { isEmpty, isEmail } from "validator";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegisterForm({ navigation, photo }) {
  const [state, setState] = useState(initialState);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const dispatch = useDispatch();
  const dimensions = windowDimensions();
  const isShowKeyboard = keyboardShow();

  const { title, form } = styles;
  const { login, password, email } = state;

  const isNotEmptyFiled = login && password && email;
  const isDataBgColor = isNotEmptyFiled ? "#FF6C00" : "#F6F6F6";
  const isDataTextColor = isNotEmptyFiled ? "#FFF" : "#BDBDBD";

  const onFormSubmit = () => {
    if (isEmpty(login)) {
      return alert("Please type a login");
    } else if (!isEmail(email)) {
      return alert("Please type a valid email. Example : nickname@mail.com");
    } else if (isEmpty(password)) {
      return alert("Please type a password");
    } else {
      dispatch(handleSignUp({ email, password, login, photo }));

      setState(initialState);
    }
  };

  return (
    <>
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
            secureTextEntry={secureTextEntry}
          />
          <ShowHidePassord
            secureTextEntry={secureTextEntry}
            onPress={() => {
              setSecureTextEntry((state) => !state);
            }}
          />
        </View>

        {!isShowKeyboard && (
          <>
            <PrimaryButton
              bgColor={isDataBgColor}
              textColor={isDataTextColor}
              onPress={onFormSubmit}
              text="Sign Up"
            />
            <PrimaryLink
              onPress={() => navigation.navigate("Login")}
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
});

RegisterForm.propTypes = {
  navigation: PropTypes.object,
};
