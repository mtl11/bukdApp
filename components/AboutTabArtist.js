import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const AboutTabArtist = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.infoContainerRow,{marginTop: "0%"}]}>
        <Ionicons name="location-outline" size={24} color="#757575" />
        <Text style={styles.infoText}>Tucson, AZ</Text>
      </View>
      <View style={styles.infoContainerRow}>
        <Ionicons name="musical-notes-outline" size={24} color="#757575" />
        <Text style={styles.infoText}>DJ | House</Text>
      </View>
      <View style={styles.infoContainerRow}>
        <FontAwesome name="comment-o" size={24} color="#757575" />
        <Text style={styles.infoText}>
          Tucson local attending UA'23 specializing in bringing a different
          energy to bars and clubs in the area.
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // justifyContent: "space-around",
    flexDirection: "column",
    flex: 1,
    margin: "8%",
  },
  infoContainerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: "4%",
    marginRight:"2.5%"
  },
  infoText: { fontFamily: "Rubik-Regular", fontSize: 16, padding: "3%" },
});

export default AboutTabArtist;
