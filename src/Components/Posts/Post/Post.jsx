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

import { firestore } from "../../../firebase/config";
import { collection, getDocs } from "firebase/firestore";

import { windowDimensions } from "../../../services";
// Проптипы описать

export default function Post({ navigateTo }) {
  const [photos, setPhotos] = useState([]);
  const dimensions = windowDimensions();

  // console.log("Фото приходи в ПОСТ компонент", routeParams);
  // console.log("Массив фото в компоненте Пост", photos);

  const {
    posts,
    post,

    imageTitle,
    comments,
    commentsText,
    location,
    locationText,
    description,
  } = styles;

  // const getAllPosts = async () => {
  //   try {
  //     const docRef = collection(firestore, "posts");

  //     const docSnap = await getDocs(docRef);

  //     const postsFromServer = docSnap.docs.map((doc) => ({
  //       ...doc.data(),
  //       docID: doc.id,
  //     }));
  //     setPhotos(postsFromServer);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  const getAllPosts = async () => {
    try {
      const docRef = collection(firestore, "posts");

      const querySnapshot = await getDocs(docRef);

      const postsFromServer = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        docID: doc.id,
      }));

      setPhotos(postsFromServer);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

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
                source={{ uri: item.photoLink }}
              />

              <Text style={imageTitle}>{item.name}</Text>

              <View style={description}>
                <TouchableOpacity
                  style={comments}
                  onPress={() =>
                    navigateTo.navigate("Comments", {
                      image: item.photoLink,
                      postId: item.docID,
                    })
                  }
                >
                  <EvilIcons name="comment" size={24} color="#BDBDBD" />
                  <Text style={commentsText}>Comments</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={location}
                  onPress={() =>
                    navigateTo.navigate("Map", { coords: item.coordinations })
                  }
                >
                  <EvilIcons name="location" size={24} color="#BDBDBD" />
                  <Text style={locationText}>Location</Text>
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

    // backgroundColor: "#E8E8E8",
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
