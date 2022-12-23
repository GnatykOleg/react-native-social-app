import { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

import { useSelector } from "react-redux";

import { getAuthSelector } from "../../redux/auth/authSelectors";

import { windowDimensions, keyboardShow } from "../../services";

import { firestore } from "../../firebase/config";
import {
  doc,
  setDoc,
  updateDoc,
  getDocs,
  getDoc,
  collection,
  addDoc,
} from "firebase/firestore";

export default function CommentsScreen({ route }) {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { image, postId } = route.params;
  const { userId, nickname } = useSelector(getAuthSelector);

  const createComment = async () => {
    try {
      const docRef = doc(firestore, "posts", postId);
      // const docSnap = await getDoc(docRef);

      await addDoc(collection(docRef, "comments"), {
        comment,
        nickname,
      });

      setComment("");
    } catch (error) {
      console.log("error", error);
    }
  };

  const getAllComments = async () => {
    try {
      const docRef = doc(firestore, "posts", postId);

      const commentsRef = await collection(docRef, "comments");

      const querySnapshot = await getDocs(commentsRef);

      const postsFromServer = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));

      setAllComments(postsFromServer);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getAllComments();
  }, []);

  const dimensions = windowDimensions();
  const isShowKeyboard = keyboardShow();

  return (
    <View
      style={{ ...styles.container, paddingBottom: isShowKeyboard ? 32 : 16 }}
    >
      <View style={{ width: dimensions }}>
        {/*  */}
        {/*  */}
        {/* Image  */}
        <Image
          source={{ uri: image }}
          style={{ height: 240, marginBottom: 32, borderRadius: 8 }}
        />
        {/*  */}
        {/*  */}
        {/* Comment */}

        {/*  */}
        <FlatList
          data={allComments}
          key={(item, index) => {
            index.toString();
          }}
          renderItem={({ item }) => {
            return (
              <>
                <View
                  style={{
                    width: dimensions,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 24,
                  }}
                >
                  <Image
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 50,
                      // marginRight: 16
                    }}
                    source={require("../../../assets/Images/avatar.png")}
                  />
                  <View style={styles.commentTextContainer}>
                    <Text style={styles.commentText}>{item.comment}</Text>
                    <Text style={styles.commentDate}>
                      09 июня, 2020 | 09:14
                    </Text>
                  </View>
                </View>
              </>
            );
          }}
        />

        {/*  */}
        {/*  */}

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={(text) => setComment(text)}
            value={comment}
            placeholder="Comment..."
            style={styles.input}
            selectionColor="#FF6C00"
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.iconContainer}
            onPress={createComment}
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
    paddingTop: 32,
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

  commentTextContainer: {
    width: 299,
    paddingBottom: 16,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 6,
    minHeight: 103,
    backgroundColor: "rgba(0, 0, 0, 0.03);",
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
