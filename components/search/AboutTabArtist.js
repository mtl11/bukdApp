import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import global from "../../styles/global.js";
import { FontAwesome5 } from "@expo/vector-icons";

const AboutTabArtist = (props) => {
  return (
    <ScrollView style={styles.container} >
      <View style={[styles.infoContainerRow, { marginTop: "0%" }]}>
        <Ionicons
          name="location-outline"
          size={24}
          color={global.color.primaryColors.main}
        />
        <Text style={styles.infoText}>{props.about.location}</Text>
      </View>
      {props.basicInfo.profileType == "performer" ? (
        <View style={styles.infoContainerRow}>
          <Ionicons
            name="musical-notes-outline"
            size={24}
            color={global.color.primaryColors.main}
          />
          <Text style={styles.infoText}>
            {props.about.category} | {props.about.genre}
          </Text>
        </View>
      ) : (
        <View style={styles.infoContainerRow}>
          <FontAwesome5
            name="building"
            size={24}
            color={global.color.primaryColors.main}
          />
          <Text style={styles.infoText}>{props.about.category}</Text>
        </View>
      )}
      <View style={styles.infoContainerRow}>
        <FontAwesome
          name="comment-o"
          size={24}
          color={global.color.primaryColors.main}
        />
        <Text style={styles.infoText}>{props.about.bio}</Text>
      </View>
      {props.basicInfo.profileType == "performer" ? (
        <View></View>
      ) : (
        <View style={styles.infoContainerRow}>
          <FontAwesome5
            name="plug"
            size={24}
            color={global.color.primaryColors.main}
          />
          <Text style={styles.infoText}>{props.about.equipment}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: "10%"
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
