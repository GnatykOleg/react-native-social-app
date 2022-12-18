import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { useState, useEffect } from "react";

import { MaterialIcons, EvilIcons } from "@expo/vector-icons";

export default function PostsScreen() {
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  const {
    container,
    user,
    avatar,
    name,
    email,
    header,
    title,
    headerContent,
    gallery,
    galleryItem,
    main,
    image,
    imageTitle,
    comments,
    commentsText,
    location,
    locationText,
    descriptionFlexContainer,
    imageContainer,
  } = styles;

  //// For window dimensions
  useEffect(() => {
    const event = Dimensions.addEventListener("change", ({ window }) => {
      const currentWidth = window.width - 16 * 2;
      setDimensions(currentWidth);
    });
    return () => {
      event.remove();
    };
  }, []);

  return (
    <View style={container}>
      {/* HEADER */}
      <View style={header}>
        <View style={{ ...headerContent, width: dimensions }}>
          <Text style={title}>Publications</Text>
          <MaterialIcons name="logout" size={24} color="#BDBDBD" />
        </View>
      </View>

      <View style={main}>
        {/* USER */}
        <View style={{ ...user, width: dimensions }}>
          <Image
            style={avatar}
            source={require("../../../assets/Images/avatar.png")}
          />

          <View>
            <Text style={name}>Natali Romanova</Text>
            <Text style={email}>email@example.com</Text>
          </View>
        </View>

        {/* GALLERY */}

        <View style={{ ...gallery, width: dimensions }}>
          {/* GALLERY ITEM */}
          <View style={galleryItem}>
            <View style={imageContainer}>
              <Image
                style={image}
                source={require("../../../assets/Images/gallery-image.jpg")}
              />
            </View>

            <Text style={imageTitle}>The Forest</Text>

            <View style={descriptionFlexContainer}>
              <View style={comments}>
                <EvilIcons name="comment" size={24} color="#BDBDBD" />
                <Text style={commentsText}>25</Text>
              </View>

              <View style={location}>
                <EvilIcons name="location" size={24} color="#BDBDBD" />
                <Text style={locationText}>
                  Ivano-Frankivs'k Region, Ukraine
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* GALLERY */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    alignItems: "center",
    marginBottom: 32,
    height: 88,

    paddingTop: 55,

    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
  },

  headerContent: {
    flexDirection: "row",

    justifyContent: "space-between",
  },

  main: {
    alignItems: "center",
  },
  user: {
    marginBottom: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    marginRight: 8,
    width: 60,
    height: 60,

    borderRadius: 16,
  },
  name: {
    fontFamily: "Roboto-Bold",
    fontStyle: "normal",

    fontSize: 13,
    // lineheight: 1.5,

    color: "#212121",
  },
  email: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 11,
    // lineheight: 1.3,

    color: "rgba(33, 33, 33, 0.8)",
  },

  title: {
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",

    fontSize: 17,
    // lineHeight: 1.3,

    color: "#212121",
  },

  gallery: {},

  galleryItem: {
    marginBottom: 32,
    backgroundColor: "#E8E8E8",
  },

  imageContainer: { alignItems: "center" },

  image: {
    // resizeMode: "cover",
  },

  imageTitle: {
    marginTop: 8,
    marginBottom: 8,
    justifyContent: "flex-start",
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",

    fontSize: 16,
    // lineHeight: 1.9,

    color: "#212121",
  },

  comments: {
    flexDirection: "row",
  },

  commentsText: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",

    fontSize: 16,
    // lineHeight: 1.9,

    color: "#BDBDBD",
  },

  location: {
    flexDirection: "row",
  },

  locationText: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",

    fontSize: 16,
    // lineHeight: 1.9,

    textDecorationLine: "underline",

    color: "#212121",
  },

  descriptionFlexContainer: {
    // backgroundColor: "red",
    flexDirection: "row",

    justifyContent: "space-between",
  },
});
