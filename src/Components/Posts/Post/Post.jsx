import { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";

import { windowDimensions } from "../../../services";
// Проптипы описать

export default function Post({ routeParams, navigateTo }) {
  const [photos, setPhotos] = useState([]);
  const dimensions = windowDimensions();

  // console.log("Фото приходи в ПОСТ компонент", routeParams);
  // console.log("Массив фото в компоненте Пост", photos);

  const {
    posts,
    post,
    // image,
    imageTitle,
    comments,
    commentsText,
    location,
    locationText,
    description,
  } = styles;

  useEffect(() => {
    if (routeParams) {
      setPhotos((prevState) => [...prevState, routeParams]);
    }
  }, [routeParams]);

  return (
    <View style={{ ...posts, width: dimensions }}>
      <FlatList
        data={photos}
        key={(item, index) => {
          index.toString();
        }}
        renderItem={({ item }) => {
          return (
            <View style={post}>
              <Image
                style={{ height: 240, borderRadius: 8 }}
                source={{ uri: item.photo }}
              />

              <Text style={imageTitle}>The Forest</Text>

              <View style={description}>
                <TouchableOpacity
                  style={comments}
                  onPress={() => navigateTo.navigate("Comments")}
                >
                  <EvilIcons name="comment" size={24} color="#BDBDBD" />
                  <Text style={commentsText}>25</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={location}
                  onPress={() => navigateTo.navigate("Map")}
                >
                  <EvilIcons name="location" size={24} color="#BDBDBD" />
                  <Text style={locationText}>
                    Ivano-Frankivs'k Region, Ukraine
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  posts: {
    paddingBottom: 82,
  },

  post: {
    marginBottom: 32,

    backgroundColor: "#E8E8E8",
  },

  // image: {
  //   width: 240,
  //   borderRadius: 8,
  // },

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

// Проптипы описать
