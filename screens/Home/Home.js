import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import styles from "./style";

export default function Home({ setIsLogin }) {
  const [mapLat, setMapLat] = useState(-6.201935);
  const [mapLong, setMapLong] = useState(106.781525);

  const handleAuthLogout = () => {
    AsyncStorage.removeItem();
    setIsLogin(false);
  };

  return (
    <View style={styles.map}>
      <View style={styles.mapHeader}>
        <Text style={styles.mapHeaderTitle}>Map</Text>
        <Text style={styles.mapHeaderSubtitle}>
          Find a place you want to visit
        </Text>
      </View>
      <MapView
        style={styles.mapContent}
        initialRegion={{
          latitude: mapLat,
          longitude: mapLong,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{ latitude: mapLat, longitude: mapLong }}
          title="Location"
        />
      </MapView>
      <TouchableOpacity
        style={styles.mapButton}
        onPress={() => handleAuthLogout()}
      >
        <Text style={styles.mapButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
