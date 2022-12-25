import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";

import { Entypo, AntDesign } from "@expo/vector-icons";

import PropTypes from "prop-types";

export default function Avatar({
  setDefaultAvatar,
  addPhoto,
  photo,
  addPhotoOnPress,
  deletePhotoOnPress,
  isRegistationScreen = false,
}) {
  const { avatar, deleteCross, addCross } = styles;

  return (
    <>
      {addPhoto && (
        <>
          <View style={avatar}>
            <TouchableOpacity onPress={addPhotoOnPress} style={addCross}>
              <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
            </TouchableOpacity>
          </View>
          {!isRegistationScreen && (
            <View style={{ marginBottom: 5 }}>
              <Button onPress={setDefaultAvatar} title="Set Default Avatar" />
            </View>
          )}
        </>
      )}

      {photo && (
        <View style={avatar}>
          <Image
            style={{ width: 120, height: 120, borderRadius: 16 }}
            source={{ uri: photo }}
          />

          <TouchableOpacity onPress={deletePhotoOnPress} style={deleteCross}>
            <Entypo name="cross" size={15} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  avatar: {
    position: "absolute",
    top: -60,

    width: 120,
    height: 120,

    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },

  avatarAddIcon: {},

  addCross: {
    position: "absolute",
    bottom: 14,
    right: -12.5,
  },

  deleteCross: {
    position: "absolute",
    bottom: 14,
    right: -12.5,

    width: 25,
    height: 25,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#E8E8E8",
    borderRadius: 50,
  },
});

Avatar.propTypes = {
  setDefaultAvatar: PropTypes.func,
  addPhoto: PropTypes.bool,
  photo: PropTypes.string,
  addPhotoOnPress: PropTypes.func,
  deletePhotoOnPress: PropTypes.func,
  isRegistationScreen: PropTypes.bool,
};
