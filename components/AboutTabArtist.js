import React, { useState, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import global from "../styles/global.js";
import { ProfileContext } from "../store/profileContext.js";
import { FontAwesome5 } from "@expo/vector-icons";

const AboutTabArtist = () => {
  const profileCTX = useContext(ProfileContext);
  return (
    <ScrollView style={styles.container} >
      <View style={[styles.infoContainerRow, { marginTop: "0%" }]}>
        <Ionicons
          name="location-outline"
          size={24}
          color={global.color.primaryColors.main}
        />
        <Text style={styles.infoText}>{profileCTX.about.location}</Text>
      </View>
      {profileCTX.basicInfo.profileType == "performer" ? (
        <View style={styles.infoContainerRow}>
          <Ionicons
            name="musical-notes-outline"
            size={24}
            color={global.color.primaryColors.main}
          />
          <Text style={styles.infoText}>
            {profileCTX.about.category} | {profileCTX.about.genre}
          </Text>
        </View>
      ) : (
        <View style={styles.infoContainerRow}>
          <FontAwesome5
            name="building"
            size={24}
            color={global.color.primaryColors.main}
          />
          <Text style={styles.infoText}>{profileCTX.about.category}</Text>
        </View>
      )}
      <View style={styles.infoContainerRow}>
        <FontAwesome
          name="comment-o"
          size={24}
          color={global.color.primaryColors.main}
        />
        <Text style={styles.infoText}>{profileCTX.about.bio}</Text>
      </View>
      {profileCTX.basicInfo.profileType == "performer" ? (
        <View></View>
      ) : (
        <View style={styles.infoContainerRow}>
          <FontAwesome5
            name="plug"
            size={24}
            color={global.color.primaryColors.main}
          />
          <Text style={styles.infoText}>{profileCTX.about.equipment}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // justifyContent: "space-evenly",
    // paddingTop: "10%",
    // paddingHorizontal: "10%",
    // padding: "10%",
    margin: "10%"
    // marginBottom: "10%"
    // marginHorizontal: "10%",
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
