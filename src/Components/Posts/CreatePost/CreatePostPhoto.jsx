import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import PropTypes from "prop-types";

import { windowDimensions } from "../../../services";

export default function CreatePostPhoto({ photo, onPress }) {
  const dimensions = windowDimensions();

  console.log("CreatePostPhoto photo", photo);
  const { changePhotoText, photoContainer } = styles;

  return (
    photo && (
      <>
        <View style={{ ...photoContainer, width: dimensions }}>
          <Image source={{ uri: photo }} style={{ height: 240 }} />
        </View>
        <TouchableOpacity onPress={onPress}>
          {photo && <Text style={changePhotoText}>Change photo</Text>}
        </TouchableOpacity>
      </>
    )
  );
}

const styles = StyleSheet.create({
  changePhotoText: {
    marginTop: 8,

    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,

    color: "#BDBDBD",
  },

  photoContainer: {},
});

CreatePostPhoto.propTypes = {
  onPress: PropTypes.func.isRequired,
};
