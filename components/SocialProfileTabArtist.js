import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";

const SocialProfileTabArtist = (props) => {
  return (
    <ScrollView
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={true}
    >
      <TouchableOpacity style={[styles.socialContainer,{marginTop:0}]}>
        <View style={{ marginRight: "0%" }}>
          <Text style={styles.socialText}>Spotify</Text>
        </View>
        <Image
          source={require("../assets/spotify.png")}
          style={styles.socialLogo}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialContainer}>
        <View style={{ marginRight: "0%" }}>
          <Text style={styles.socialText}>Facebook</Text>
        </View>
        <Image
          source={require("../assets/facebook.png")}
          style={styles.socialLogo}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialContainer}>
        <View style={{ marginRight: "0%" }}>
          <Text style={styles.socialText}>Instagram</Text>
        </View>
        <Image
          source={require("../assets/insta.png")}
          style={styles.socialLogo}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialContainer}>
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
    // height: "160%",
    paddingVertical: 30
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 100,
    width: "80%",
    marginTop: 30,
    padding: 10,
    backgroundColor: "#ECECEC",
  },
  socialLogo: {
    height: 40,
    width: 40,
  },
  socialText: {
    fontFamily: "Rubik-Regular",
    fontSize: 20,
  },
});
export default SocialProfileTabArtist;
