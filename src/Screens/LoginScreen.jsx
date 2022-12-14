import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

import { useState, useCallback, useEffect } from "react";

import * as Font from "expo-font";

import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function LoginScreen() {
  // STATE

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [appIsReady, setAppIsReady] = useState(false);
  const [onInput, setOnInput] = useState(false);
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  // VARIABLES

  const { title, bg, form, input, button, buttonText, link, showPassword } =
    styles;

  const { password, email } = state;

  const onInputBackgroundColor = onInput ? "#FFFFFF" : "#F6F6F6";
  const onInputBorderColor = onInput ? "#FF6C00" : "#E8E8E8";

  // LIFE CYCLES

  //// For loading Fonts

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
          "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
          add: require("../../assets/fonts/icomoon.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  //// For window dimensions

  useEffect(() => {
    const event = Dimensions.addEventListener("change", ({ window }) => {
      const currentWidth = window.width - 16 * 2;
      setDimensions(currentWidth);
      // setDimensionsHeight(window.height - 16);
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

  // FUNCTIONS

  const onFormSubmit = () => {
    console.log("state", state);
    setState(initialState);
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const onInputFocus = () => {
    // setIsShowKeyboard(true);
    setOnInput(true);
  };

  const onInputBlur = () => {
    // setIsShowKeyboard(false);
    setOnInput(false);
  };

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  //  APPLICATION RENDER

  if (!appIsReady) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={bg}>
        <View
          onLayout={onLayoutRootView}
          style={{
            ...form,

            marginBottom: isShowKeyboard ? 32 : 111,
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
                <Text style={buttonText}>Enter</Text>
              </TouchableOpacity>
              <Text style={link}>Don't have an account? Register</Text>
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
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
