import React, { useState, useContext } from "react";
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
import global from "../styles/global.js";
import { ProfileContext } from "../store/profileContext.js";

const AboutTabArtist = () => {
  const profileCTX = useContext(ProfileContext);
  return (
    <View style={styles.container}>
      <View style={[styles.infoContainerRow, { marginTop: "0%" }]}>
        <Ionicons
          name="location-outline"
          size={24}
          color={global.color.primaryColors.main}
        />
        <Text style={styles.infoText}>{profileCTX.about.location}</Text>
      </View>
      <View style={styles.infoContainerRow}>
        <Ionicons
          name="musical-notes-outline"
          size={24}
          color={global.color.primaryColors.main}
        />
        <Text style={styles.infoText}>{profileCTX.about.category} | {profileCTX.about.genre}</Text>
      </View>
      <View style={styles.infoContainerRow}>
        <FontAwesome
          name="comment-o"
          size={24}
          color={global.color.primaryColors.main}
        />
        <Text style={styles.infoText}>
          {profileCTX.about.bio}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    margin: "10%",
  },
  infoContainerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: "8%",
    marginRight: "5%",
  },
  infoText: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    padding: "3%",
    color: global.color.primaryColors.text,
  },
});

export default AboutTabArtist;
