import { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

import { windowDimensions, keyboardShow } from "../../services";

export default function CommentsScreen() {
  const [comment, setComment] = useState("");

  const dimensions = windowDimensions();

  return (
    <View style={styles.container}>
      <View style={{ width: dimensions }}>
        {/*  */}
        {/*  */}
        {/* Image  */}
        <View
          style={{ height: 240, backgroundColor: "red", marginBottom: 32 }}
        ></View>
        {/*  */}
        {/*  */}
        {/* Comment */}
        <View style={styles.commentContainer}>
          <View style={styles.avatar}>
            <Image
              style={{ width: 28, height: 28, borderRadius: 50 }}
              source={require("../../../assets/Images/avatar.png")}
            />
          </View>
          <Text style={styles.commentText}>
            Really love your most recent photo. I’ve been trying to capture the
            same thing for a few months and would love some tips!
          </Text>
          <Text style={styles.commentDate}>09 июня, 2020 | 09:14</Text>
        </View>
        {/*  */}
        {/*  */}
        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={(text) => setComment(text)}
            value={comment}
            placeholder="comment"
            style={styles.input}
            selectionColor="#FF6C00"
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.iconContainer}
            onPress={() => {}}
          >
            <AntDesign name="arrowup" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  input: {
    position: "relative",

    height: 50,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    paddingLeft: 16,
  },
  inputContainer: {},

  iconContainer: {
    position: "absolute",
    top: 8,
    right: 8,

    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 50,
  },
  avatar: {},

  commentContainer: {
    borderWidth: 1,
    borderColor: "green",
    // flexDirection: "row",
    maxWidth: 299,
  },
  commentText: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",

    fontSize: 13,

    color: "#212121",
  },

  commentDate: {
    marginTop: 8,
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",

    fontSize: 10,

    color: "#BDBDBD",
  },
});
