import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

import { EvilIcons, AntDesign } from "@expo/vector-icons";

import PropTypes from "prop-types";

export default function CommentsAndLocationBlock({
  navigation,
  photo,
  id,
  coordinations,
}) {
  const {
    commentsText,

    locationText,
    description,

    likesText,
    iconContainer,
  } = styles;

  return (
    <View style={description}>
      <TouchableOpacity
        style={{ ...iconContainer, marginRight: 24 }}
        onPress={() =>
          navigation.navigate("Comments", {
            image: photo,
            postId: id,
          })
        }
      >
        <EvilIcons name="comment" size={24} color="#BDBDBD" />
        <Text style={commentsText}>Comments</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={{ ...iconContainer, minWidth: 50 }}
        onPress={() => {}}
      >
        <AntDesign name="like2" size={20} color="#BDBDBD" />
        <Text style={likesText}>Likes</Text>
      </TouchableOpacity> */}

      <TouchableOpacity
        style={{ ...iconContainer, marginLeft: "auto" }}
        onPress={() => navigation.navigate("Map", { coords: coordinations })}
      >
        <EvilIcons name="location" size={24} color="#BDBDBD" />
        <Text style={locationText}>Location</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  description: {
    flexDirection: "row",
  },

  iconContainer: {
    flexDirection: "row",
    alignItems: "center",

    justifyContent: "space-between",
  },

  commentsText: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,

    color: "#BDBDBD",
  },

  locationText: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    textDecorationLine: "underline",

    color: "#212121",
  },

  likesText: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,

    color: "#BDBDBD",
  },
});

CommentsAndLocationBlock.propTypes = {
  id: PropTypes.string,
  photo: PropTypes.string,
  navigation: PropTypes.object,
  coordinations: PropTypes.object,
};
