import { View, Image, Text, StyleSheet } from "react-native";

import { EvilIcons } from "@expo/vector-icons";

import { windowDimensions } from "../../services";

export default function Post() {
  const dimensions = windowDimensions();

  const {
    posts,
    post,
    image,
    imageTitle,
    comments,
    commentsText,
    location,
    locationText,
    description,
    imageContainer,
  } = styles;

  return (
    <View style={{ ...posts, width: dimensions }}>
      {/* POST */}
      <View style={post}>
        <Image
          style={image}
          height={240}
          width="100%"
          source={require("../../../assets/Images/gallery-image.jpg")}
        />

        <Text style={imageTitle}>The Forest</Text>

        <View style={description}>
          <View style={comments}>
            <EvilIcons name="comment" size={24} color="#BDBDBD" />
            <Text style={commentsText}>25</Text>
          </View>

          <View style={location}>
            <EvilIcons name="location" size={24} color="#BDBDBD" />
            <Text style={locationText}>Ivano-Frankivs'k Region, Ukraine</Text>
          </View>
        </View>
      </View>
      {/* POST */}
    </View>
  );
}

const styles = StyleSheet.create({
  posts: {},

  post: {
    // marginBottom: 32,

    backgroundColor: "#E8E8E8",
  },

  image: {
    resizeMode: "cover",
    borderRadius: 8,
  },

  description: {
    flexDirection: "row",
    justifyContent: "space-between",
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
