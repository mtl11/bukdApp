import react from "react";
import {
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
          <AntDesign name="arrowright" size={18} color="white" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => {
          props.navigation.navigate("ArtistSetup");
        }}
      >
        <FontAwesome5 name="arrow-left" size={28} color="white" />
      </TouchableOpacity>
      <Image
        source={require("../../assets/logo.png")}
        style={styles.image}
      ></Image>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Link your social media to give venues a better understanding of who
          you are and what you do.
        </Text>
      </View>
      <View style={{ marginTop: 30 }}>
        {createSocial("Spotify", "spotify")}
        {createSocial("Soundcloud", "soundcloud")}
        {createSocial("TikTok", "tiktok")}
        {createSocial("Instagram", "insta")}
        {createSocial("YouTube", "youtube")}
        {createSocial("Facebook", "facebook")}
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
  arrowContainer: {
    justifyContent: "center",
  },
  buttonContainer: {
    marginTop: "13%",
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: "10%",
    paddingVertical: 20,
    backgroundColor: "#F57B51",
    borderRadius: 4,
  },
  titleText: {
    color: "#FDF6F0",
    fontSize: 16,
  },
  individualSocialContainer: {
    borderBottomWidth: 0.5,
    borderColor: "#FBBC58",
    alignItems: "center",
    flexDirection: "row",
    padding: "3%",
    paddingHorizontal: "5%",
    justifyContent: "space-between",
  },
  socialLogo: {
    height: 40,
    width: 40,
  },
  socialText: {
    color: "#FDF6F0",
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
    width: "60%",
  },
  infoText: {
    color: "#FDF6F0",
    fontFamily: "Rubik-Regular",
    textAlign: "center",
  },
  container: {
    backgroundColor: "#095D6A",
    height: "100%",
  },
});
export default ArtistsocialsScreen;
