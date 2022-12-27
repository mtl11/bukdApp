import react from "react";
import {
  Keyboard,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Icon,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
const ArtistsocialsScreen = (props) => {
  const getLogo = (logo) => {
    if (logo == "spotify") {
      return require("../../assets/spotify.png");
    }
    if (logo == "youtube") {
      return require("../../assets/youtube.png");
    }
    if (logo == "tiktok") {
      return require("../../assets/tiktok.png");
    }
    if (logo == "insta") {
      return require("../../assets/insta.png");
    }
    if (logo == "facebook") {
      return require("../../assets/facebook.png");
    }
    if (logo == "soundcloud") {
      return require("../../assets/soundcloud.png");
    }
  };
  const createSocial = (name, logo) => {
    return (
      <TouchableOpacity style={styles.individualSocialContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={getLogo(logo)} style={styles.socialLogo}></Image>
          <View style={{ paddingLeft: 20 }}>
            <Text style={styles.socialText}>{name}</Text>
          </View>
        </View>
        <View style={styles.arrowContainer}>
          <MaterialCommunityIcons name="link-variant" size={18} color="black" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => {
          props.navigation.navigate("ArtistSetup");
        }}
      >
        <FontAwesome5 name="arrow-left" size={28} color="white" />
      </TouchableOpacity> */}
      {/* <Image
        source={require("../../assets/logo.png")}
        style={styles.image}
      ></Image> */}
      <View style={styles.largeTextContainer}>
        <Text style={styles.largeText}>Link your Social Media</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          This will help other users explore more about you.
        </Text>
      </View>
      <View style={{ marginTop: 30 }}>
        {createSocial("Spotify", "spotify")}
        {createSocial("Soundcloud", "soundcloud")}
        {createSocial("TikTok", "tiktok")}
        {createSocial("Instagram", "insta")}
        {createSocial("YouTube", "youtube")}
        {/* {createSocial("Facebook", "facebook")} */}
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          props.navigation.navigate("TabNav");
        }}
      >
        <Text style={styles.titleText}>Done</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  largeText: {
    fontFamily: "Rubik-Medium",
    fontSize: 24,
  },
  largeTextContainer: {
    marginHorizontal: 50,
    marginTop: "5%",
  },
  arrowContainer: {
    justifyContent: "center",
  },
  buttonContainer: {
    marginTop: "13%",
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 40,
    padding: 16,
    backgroundColor: "#2A51DB",
    borderRadius: 12,
  },
  titleText: {
    fontFamily: "Rubik-Medium",
    color: "white",
    fontSize: 20,
  },
  individualSocialContainer: {
    borderRadius: 10,
    backgroundColor: "#ECECEC",
    alignItems: "center",
    flexDirection: "row",
    padding: "3%",
    paddingHorizontal: "5%",
    justifyContent: "space-between",
    margin: 15,
    marginHorizontal: 30,
  },
  socialLogo: {
    height: 40,
    width: 40,
  },
  socialText: {
    // color: "#FDF6F0",
    fontFamily: "Rubik-Regular",
    fontSize: 16,
  },
  image: {
    alignSelf: "center",
    marginTop: "5%",
    resizeMode: "contain",
    height: 120,
    width: 120,
  },
  iconContainer: { marginHorizontal: "5%" },
  infoContainer: {
    alignSelf: "center",
    marginHorizontal: 40,
    marginTop: 15,
  },
  infoText: {
    fontFamily: "Rubik-Regular",
  },
  container: {
    // backgroundColor: "#095D6A",
    backgroundColor: "white",
    height: "100%",
  },
});
export default ArtistsocialsScreen;
