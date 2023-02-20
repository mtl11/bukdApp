import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Linking,
} from "react-native";
import global from "../styles/global";
import * as WebBrowser from "expo-web-browser";
import { InAppBrowser } from "react-native-inappbrowser-reborn";

const SocialProfileTabArtist = (props) => {
  const [opened, setOpened] = useState(false);
  async function openWebPage(uri) {
    if (uri) {
      await WebBrowser.openBrowserAsync(uri);
    }
  }
  return (
    <ScrollView contentContainerStyle={styles.list}>
      <TouchableOpacity style={[styles.socialContainer, { marginTop: 0 }]}>
        <View style={{ marginRight: "0%" }}>
          <Text style={styles.socialText}>Spotify</Text>
        </View>
        <Image
          source={require("../assets/spotify.png")}
          style={styles.socialLogo}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.socialContainer}
        onPress={() => {
          openWebPage("https://www.facebook.com/apple");
        }}
      >
        <View style={{ marginRight: "0%" }}>
          <Text style={styles.socialText}>Facebook</Text>
        </View>
        <Image
          source={require("../assets/facebook.png")}
          style={styles.socialLogo}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.socialContainer}
        onPress={() => {
          openWebPage("https://www.instagram.com/apple");
        }}
      >
        <View style={{ marginRight: "0%" }}>
          <Text style={styles.socialText}>Instagram</Text>
        </View>
        <Image
          source={require("../assets/insta.png")}
          style={styles.socialLogo}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.socialContainer}
        onPress={() => {
          openWebPage("https://soundcloud.com/liluzivert");
        }}
      >
        <View style={{ marginRight: "0%" }}>
          <Text style={styles.socialText}>Soundcloud</Text>
        </View>
        <Image
          source={require("../assets/soundcloud.png")}
          style={styles.socialLogo}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialContainer}>
        <View style={{ marginRight: "0%" }}>
          <Text style={styles.socialText}>TikTok</Text>
        </View>
        <Image
          source={require("../assets/tiktok.png")}
          style={styles.socialLogo}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialContainer}>
        <View style={{ marginRight: "0%" }}>
          <Text style={styles.socialText}>YouTube</Text>
        </View>
        <Image
          source={require("../assets/youtube.png")}
          style={styles.socialLogo}
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  list: {
    alignItems: "center",
    paddingVertical: "10%",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    width: "80%",
    marginTop: "5%",
    padding: 10,
    paddingHorizontal: "5%",
    backgroundColor: global.color.primaryColors.adjacent,
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
