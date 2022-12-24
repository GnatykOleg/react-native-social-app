import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

import { EvilIcons } from "@expo/vector-icons";

import PropTypes from "prop-types";

export default function CommentsAndLocationBlock({
  navigation,
  photo,
  id,
  coordinations,
}) {
  const { comments, commentsText, location, locationText, description } =
    styles;

  return (
    <View style={description}>
      <TouchableOpacity
        style={comments}
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

      <TouchableOpacity
        style={location}
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
    justifyContent: "space-between",
  },

  comments: {
    flexDirection: "row",
    alignItems: "center",
  },

  commentsText: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,

    color: "#BDBDBD",
  },

  location: {
    flexDirection: "row",
    alignItems: "center",
  },

  locationText: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    textDecorationLine: "underline",

    color: "#212121",
  },
});

CommentsAndLocationBlock.propTypes = {
  id: PropTypes.string,
  photo: PropTypes.string,
  navigation: PropTypes.object,
  coordinations: PropTypes.object,
};
