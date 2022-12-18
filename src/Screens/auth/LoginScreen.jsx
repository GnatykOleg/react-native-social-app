import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  Button,
} from "react-native";

import { useState, useEffect } from "react";

import { Background } from "../../Components";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation: { navigate } }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [onInput, setOnInput] = useState(false);
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  // VARIABLES
  const {
    title,
    bg,
    form,
    input,
    button,
    buttonText,
    link,
    linkText,
    showPassword,
  } = styles;
  const { password, email } = state;
  const onInputBackgroundColor = onInput ? "#FFFFFF" : "#F6F6F6";
  const onInputBorderColor = onInput ? "#FF6C00" : "#E8E8E8";

  // FUNCTIONS

  const onFormSubmit = () => {
    // if (email.trim() === "") {
    //   return alert(`Email is required`);
    // } else if (password.trim() === "") {
    //   return alert(`Password is required`);
    // } else {
    console.log("state", state);
    navigate("Home");
    setState(initialState);
    // }
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const onInputFocus = () => {
    setOnInput(true);
  };

  const onInputBlur = () => {
    setOnInput(false);
  };

  //// For window dimensions
  useEffect(() => {
    const event = Dimensions.addEventListener("change", ({ window }) => {
      const currentWidth = window.width - 16 * 2;
      setDimensions(currentWidth);
    });
    return () => {
      event.remove();
    };
  }, []);

  //// For keyboard show/hide
  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener("keyboardDidShow", () => {
      setIsShowKeyboard(true);
    });
    const keyboardDidHide = Keyboard.addListener("keyboardDidHide", () => {
      setIsShowKeyboard(false);
    });

    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, []);

  return (
    <Background>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View style={bg}>
          <View
            style={{
              ...form,

              marginBottom: isShowKeyboard ? 32 : 65,
              width: dimensions,
            }}
          >
            <View style={{ marginBottom: 32 }}>
              <Text style={title}>Login </Text>
            </View>

            <View style={{ marginBottom: 16 }}>
              <TextInput
                onChangeText={(value) => {
                  setState((prevState) => ({ ...prevState, email: value }));
                }}
                value={email}
                placeholder="E-mail address"
                style={{
                  ...input,

                  backgroundColor: onInputBackgroundColor,
                  borderColor: onInputBorderColor,
                }}
                onFocus={onInputFocus}
                onBlur={onInputBlur}
                selectionColor="#FF6C00"
                keyboardType="email-address"
                activeUnderlineColor="green"
              />
            </View>

            <View style={{ marginBottom: isShowKeyboard ? 0 : 43 }}>
              <TextInput
                onChangeText={(value) => {
                  setState((prevState) => ({ ...prevState, password: value }));
                }}
                value={password}
                placeholder="Password"
                secureTextEntry={true}
                style={{
                  ...input,
                  backgroundColor: onInputBackgroundColor,
                  borderColor: onInputBorderColor,
                }}
                onFocus={onInputFocus}
                onBlur={onInputBlur}
                selectionColor="#FF6C00"
                activeUnderlineColor="red"
              />

              <Text style={showPassword}>Show</Text>
            </View>
            {!isShowKeyboard && (
              <>
                <TouchableOpacity
                  onPress={onFormSubmit}
                  activeOpacity={0.7}
                  style={button}
                >
                  <Text style={buttonText}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigate("Registration")}
                  activeOpacity={0.7}
                  style={link}
                >
                  <Text style={linkText}>
                    Don't have an account? Registration
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Background>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontSize: 30,
    // lineHeight: 1.7,
    textAlign: "center",
    letterSpacing: 0.01,

    color: "#212121",
  },

  bg: {
    alignItems: "center",
    paddingTop: 32,

    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  form: {},

  input: {
    position: "relative",

    height: 50,

    padding: 16,
    padding: 13,

    borderWidth: 1,

    borderRadius: 8,

    fontFamily: "Roboto-Regular",
    fontStyle: "normal",

    fontSize: 16,
    // lineHeight: 1.9,

    color: "#212121",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },

  button: {
    justifyContent: "center",

    height: 51,

    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },

  buttonText: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",

    fontSize: 16,
    // lineHeight: 1.9,

    textAlign: "center",

    color: "#FFFFFF",
  },

  link: {
    marginTop: 16,
  },

  linkText: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",

    fontSize: 16,
    // lineHeight: 1.9,
    textAlign: "center",

    color: "#1B4371",
  },

  showPassword: {
    position: "absolute",

    right: 16,
    top: 16,

    fontfamily: "Roboto-Regular",
    fontstyle: "normal",

    fontsize: 16,
    // lineheight: 1.9,

    color: "#1B4371",
  },
});
