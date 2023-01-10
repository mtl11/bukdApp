import React, { useState } from "react";
import {
  View,
  Modal,
  Text,
  SafeAreaView,
  Touchable,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  StatusBar
} from "react-native";

const SocialProfileTabArtist = (props) => {
  return (
    <ScrollView
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity style={styles.socialContainer}>
        <Image
          source={require("../assets/spotify.png")}
          style={styles.socialLogo}
        />
        <View style={{ marginRight: "0%" }}>
          <Text style={styles.socialText}>Spotify</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialContainer}>
        <Image
          source={require("../assets/facebook.png")}
          style={styles.socialLogo}
        />
        <View style={{ marginRight: "0%" }}>
          <Text style={styles.socialText}>Facebook</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialContainer}>
        <Image
          source={require("../assets/insta.png")}
          style={styles.socialLogo}
        />
        <View style={{ marginRight: "0%" }}>
          <Text style={styles.socialText}>Instagram</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialContainer}>
        <Image
          source={require("../assets/soundcloud.png")}
          style={styles.socialLogo}
        />
        <View style={{ marginRight: "0%" }}>
          <Text style={styles.socialText}>Soundcloud</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialContainer}>
        <Image
          source={require("../assets/tiktok.png")}
          style={styles.socialLogo}
        />
        <View style={{ marginRight: "0%" }}>
          <Text style={styles.socialText}>TikTok</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialContainer}>
        <Image
          source={require("../assets/youtube.png")}
          style={styles.socialLogo}
        />
        <View style={{ marginRight: "0%" }}>
          <Text style={styles.socialText}>YouTube</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  list: {
    alignItems: "center",
    height:"150%"
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    // borderWidth: 1,
    // shadowOffset: {
    //   width: 10,
    //   height: 10
    // },
    // shadowOpacity:.2,
    // shadowRadius:10,
    borderRadius: 100,
    width: "80%",
    marginTop: 30,
    padding: 10,
    backgroundColor: "#ECECEC",
  },
  socialLogo: {
    height: 40,
    width: 40,
    // backgroundColor:"white"
    // ,borderRadius:0
  },
  socialText: {
    fontFamily: "Rubik-Regular",
    fontSize: 20,
  },
});
export default SocialProfileTabArtist;
