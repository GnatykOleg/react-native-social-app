import { View, Image, Text, StyleSheet, FlatList } from "react-native";

import { windowDimensions } from "../../../services";

import UserInfo from "./UserInfo";
import CommentsAndLocationBlock from "./CommentsAndLocationBlock";

import PropTypes from "prop-types";

export default function Post({ navigation, data }) {
  const dimensions = windowDimensions();

  const { posts, post, imageTitle } = styles;

  return (
    <View style={{ ...posts, width: dimensions }}>
      <FlatList
        data={data}
        key={(item, index) => {
          index.toString();
        }}
        renderItem={({ item }) => {
          return (
            <>
              <UserInfo nickname={item.nickname} userAvatar={item.avatar} />
              <View style={post}>
                <Image
                  style={{ height: 240, borderRadius: 8 }}
                  source={{ uri: item.photoLink }}
                />

                <Text style={imageTitle}>{item.name}</Text>
                <CommentsAndLocationBlock
                  navigation={navigation}
                  photo={item.photoLink}
                  id={item.docID}
                  coordinations={item.coordinations}
                />
              </View>
            </>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  posts: {},

  post: {
    marginBottom: 32,
  },

  imageTitle: {
    marginTop: 8,
    marginBottom: 8,
    justifyContent: "flex-start",
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontSize: 16,

    color: "#212121",
  },
});

Post.propTypes = {
  data: PropTypes.array,
};
