import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import global from "../../styles/global";
import * as WebBrowser from "expo-web-browser";
import { ProfileContext } from "../../store/profileContext";
import { AuthContext } from "../../store/authContext";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons'; 
import light from "../../styles/profile/light/socialTab";
import dark from "../../styles/profile/dark/socialTab";
import { SocialLinks } from "social-links";
const SocialProfileTabArtist = (props) => {
  const profileCTX = useContext(ProfileContext);
  const authCTX = useContext(AuthContext);
  const styles = authCTX.mode === "light" ? light : dark;
  const socialLinks = new SocialLinks();
  function dataList() {
    const array = [];
    
    for (const x in profileCTX.social) {
      const profile = socialLinks.detectProfile(profileCTX.social[x].url);
      const profileID = socialLinks.getProfileId(profile, profileCTX.social[x].url);
      const item = (
        <TouchableOpacity
          key={x}
          style={styles.socialContainer}
          onPress={() => {
            openWebPage(profileCTX.social[x].url);
          }}
        >
          <View style={{ marginRight: "0%" }}>
            <Text style={styles.socialText}>@{profileID}</Text>
          </View>
          <FontAwesome5 name={x} size={40} color={"white"} />
        </TouchableOpacity>
      );
      array.push(item);
    }
    if (array.length == 0) {
      return (
        <View style={{ alignItems: "center", flexDirection: "column" }}>
          <Ionicons
            name="md-alert-circle-outline"
            size={60}
            color={global.color.primaryColors.adjacent}
          />
          <Text
            style={{
              fontSize: 22,
              fontFamily: "Rubik-Regular",
              color: global.color.primaryColors.adjacent,
            }}
          >
            No Linked Socials
          </Text>
        </View>
      );
    }
    return array;
  }
  async function openWebPage(uri) {
    if (uri) {
      await WebBrowser.openBrowserAsync(uri);
    }
  }
  return (
    <ScrollView contentContainerStyle={styles.list}>{dataList()}</ScrollView>
  );
};

export default SocialProfileTabArtist;
