import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getAllPosts } from "../../redux/posts/postsOperations";
import { getPostsSelector } from "../../redux/posts/postsSelectors";

import { useIsFocused } from "@react-navigation/native";

import { View, StyleSheet } from "react-native";

import { Post, Loader } from "../../Components";
export default function DefaultScreenPosts({ navigation }) {
  const dispatch = useDispatch();

  const { allPosts, loading } = useSelector(getPostsSelector);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      dispatch(getAllPosts());
    }
  }, [dispatch, isFocused]);

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <Post navigation={navigation} data={allPosts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 32,
    alignItems: "center",
  },
});
