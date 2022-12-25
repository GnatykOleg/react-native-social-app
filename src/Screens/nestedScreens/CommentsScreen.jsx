import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { StyleSheet, View, Image } from "react-native";

import { getAuthSelector } from "../../redux/auth/authSelectors";
import {
  createComment,
  getPostComments,
} from "../../redux/posts/postsOperations";

import { getPostsSelector } from "../../redux/posts/postsSelectors";

import { windowDimensions, keyboardShow } from "../../services";

import { CommentsForm, Comments, Loader } from "../../Components";

export default function CommentsScreen({ route }) {
  const [comment, setComment] = useState("");

  const { image, postId } = route.params;
  const { nickname, avatar } = useSelector(getAuthSelector);

  const { postComments, loading } = useSelector(getPostsSelector);

  const dispatch = useDispatch();
  const dimensions = windowDimensions();
  const isShowKeyboard = keyboardShow();

  const addComment = () => {
    dispatch(createComment({ nickname, postId, comment, avatar }));
    setComment("");
  };

  useEffect(() => {
    dispatch(getPostComments({ postId }));
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <View
      style={{ ...styles.container, paddingBottom: isShowKeyboard ? 32 : 16 }}
    >
      <View style={{ width: dimensions }}>
        <Image
          source={{ uri: image }}
          style={{ height: 240, marginBottom: 32, borderRadius: 8 }}
        />

        <Comments data={postComments} />
        <CommentsForm
          onChangeText={(text) => setComment(text)}
          value={comment}
          onPress={addComment}
        />
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
});
