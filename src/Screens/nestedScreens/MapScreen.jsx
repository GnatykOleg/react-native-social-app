import { Text, StyleSheet, View } from "react-native";

import MapView, { Marker } from "react-native-maps";

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 50.450001,
          longitude: 30.523333,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <Marker
          coordinate={{ latitude: 50.450001, longitude: 30.523333 }}
          //   title="Поставить тайтл"
          //   image={require("../../../assets/Images/gallery-image.jpg")}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
