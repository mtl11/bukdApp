import React, { useStat, useContext } from "react";
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
import { ProfileContext } from "../store/profileContext";
const SocialProfileTabArtist = (props) => {
  const profileCTX = useContext(ProfileContext);
  function getImageLink(x) {
    if (x == "soundcloud") return require("../assets/soundcloud.png");
    if (x == "tiktok") return require("../assets/tiktok.png");
    if (x == "youtube") return require("../assets/youtube.png");
    if (x == "instagram") return require("../assets/insta.png");
    if (x == "spotify") return require("../assets/spotify.png");
    if (x == "facebook") return require("../assets/facebook.png");
  }
  function dataList() {
    const array = [];
    for (const x in profileCTX.social) {
      console.log(profileCTX.social[x]);
      const imageLink = getImageLink(x);
      const item = (
        <TouchableOpacity
          key={x}
          style={styles.socialContainer}
          onPress={() => {
            openWebPage(profileCTX.social[x].url);
          }}
        >
          <View style={{ marginRight: "0%" }}>
            <Text style={styles.socialText}>{x}</Text>
          </View>
          <Image source={imageLink} style={styles.socialLogo} />
        </TouchableOpacity>
      );
      array.push(item);
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
    paddingVertical: "10%",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    width: "80%",
    marginBottom: "5%",
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
