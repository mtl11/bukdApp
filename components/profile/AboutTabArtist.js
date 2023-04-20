import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import global from "../../styles/global.js";
import { ProfileContext } from "../../store/profileContext.js";
import { FontAwesome5 } from "@expo/vector-icons";
import dark from "../../styles/profile/dark/aboutTab.js"
import light from "../../styles/profile/light/aboutTab.js"
import { AuthContext } from "../../store/authContext.js";

const AboutTabArtist = () => {
  const authCTX = useContext(AuthContext);
  const styles = authCTX.mode === "light" ? light : dark;

  const profileCTX = useContext(ProfileContext);
  return (
    <ScrollView style={styles.container} >
      <View style={[styles.infoContainerRow, { marginTop: "0%" }]}>
        <Ionicons
          name="location-outline"
          size={24}
          color={styles.iconColor}
        />
        <Text style={styles.infoText}>{profileCTX.about.location}</Text>
      </View>
      {profileCTX.basicInfo.profileType == "performer" ? (
        <View style={styles.infoContainerRow}>
          <Ionicons
            name="musical-notes-outline"
            size={24}
            color={styles.iconColor}
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
            color={styles.iconColor}
          />
          <Text style={styles.infoText}>{profileCTX.about.category}</Text>
        </View>
      )}
      <View style={styles.infoContainerRow}>
        <FontAwesome
          name="comment-o"
          size={24}
          color={styles.iconColor}
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
            color={styles.iconColor}
          />
          <Text style={styles.infoText}>{profileCTX.about.equipment}</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default AboutTabArtist;
