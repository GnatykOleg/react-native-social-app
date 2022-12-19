import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

import { Entypo, AntDesign } from "@expo/vector-icons";

export default function AvatarUpload() {
  const { avatar, deleteCross, addCross } = styles;

  return (
    <View style={avatar}>
      <Image source={require("../../../../assets/Images/avatar.png")} />

      {/* Крест для удаления аватара*/}
      <TouchableOpacity onPress={() => {}} style={deleteCross}>
        <Entypo name="cross" size={15} color="#BDBDBD" />
      </TouchableOpacity>

      {/* Крест для добавления аватара */}
      {/* <TouchableOpacity onPress={()=>{}} style={addCross}>
        <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
      </TouchableOpacity> */}
    </View>
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
