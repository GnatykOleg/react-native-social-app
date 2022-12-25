import { Text, StyleSheet, View, Image, FlatList } from "react-native";

import { windowDimensions, keyboardShow } from "../../../services";

// Proptypes

export default function Comments({ data }) {
  const dimensions = windowDimensions();
  const {
    commentTextContainer,
    commentText,
    commentDate,
    wrapper,
    image,
    user,
    text,
  } = styles;
  return (
    <FlatList
      style={{ maxHeight: 300 }}
      data={data}
      key={(item, index) => {
        index.toString();
      }}
      renderItem={({ item }) => {
        return (
          <>
            <View style={{ ...wrapper, width: dimensions }}>
              <View style={user}>
                <Image style={image} source={{ uri: item.avatar }} />
                <Text style={text}>{item.nickname}</Text>
              </View>
              <View style={commentTextContainer}>
                <Text style={commentText}>{item.comment}</Text>
                <Text style={commentDate}>{item.dateCreate}</Text>
              </View>
            </View>
          </>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontSize: 16,

    color: "#212121",
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 28,
    height: 28,
    borderRadius: 50,
    marginRight: 5,
  },
  wrapper: {
    marginBottom: 24,
  },

  commentTextContainer: {
    justifyContent: "space-between",
    paddingBottom: 16,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 6,

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
