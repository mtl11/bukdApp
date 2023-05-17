import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from "react-native";
import global from "../../styles/global";
import * as WebBrowser from "expo-web-browser";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons'; 
import { SocialLinks } from "social-links";



const SocialProfileTabArtist = (props) => {

  const socialLinks = new SocialLinks();
  function dataList() {
    const array = [];
    for (const x in props.socials) {
      const profile = socialLinks.detectProfile(props.socials[x].url);
      const profileID = socialLinks.getProfileId(profile, props.socials[x].url);
      const item = (
        <TouchableOpacity
          key={x}
          style={styles.socialContainer}
          onPress={() => {
            openWebPage(props.socials[x].url);
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

const styles = StyleSheet.create({
  list: {
    alignItems: "center",
    paddingVertical: "5%",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    width: "90%",
    marginBottom: "5%",
    padding: 10,
    paddingHorizontal: "5%",
    backgroundColor: global.color.primaryColors.main,
  },
  socialLogo: {
    height: 40,
    width: 40,
  },
  socialText: {
    fontFamily: "Rubik-Regular",
    fontSize: 18,
    color: global.color.primaryColors.text,
  },
});

export default SocialProfileTabArtist;
