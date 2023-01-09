import React, { useState } from "react";
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
  TouchableHighlight,
} from "react-native";
import profileInformation from "../../models/profile/profile";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import EditModal from "../../components/EditProfileArtist.js";

const ProfileScreen = (props) => {
  const dummyProfile = new profileInformation(
    123,
    "M-OKAY",
    "DJ",
    "House",
    "Tucson local attending UA'23 specializing in bringing a different energy to bars and clubs in the area."
  );
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ justifyContent: "center" }}>
          <TouchableOpacity
            style={[styles.topIconContainer]}
            onPress={() => setModalVisible(true)}
          >
            <Entypo name="edit" size={28} color="#2A51DB" />
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: "center" }}>
          <TouchableOpacity
            style={styles.topIconContainer}
            onPress={() => {
              props.navigation.navigate("ProfileSettingsScreen");
            }}
          >
            <Ionicons name="ios-settings" size={28} color="#2A51DB" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.profilePicContainer}>
        <Image
          source={require("../../assets/ok-profile.jpeg")}
          style={styles.profilePic}
          resizeMode="contain"
        />
      </View>
      <View style={styles.usernameContainer}>
        <Text style={styles.usernameText}>{dummyProfile.username}</Text>
      </View>
      <View style={styles.genreContainer}>
        <Text style={styles.genreText}>
          {dummyProfile.genre} | {dummyProfile.subgenre}
        </Text>
      </View>
      <View style={styles.bioContainer}>
        <Text style={styles.bioText}>{dummyProfile.bio}</Text>
      </View>
      <View
        style={{
          alignContent: "center",
          flexDirection: "row",
          justifyContent: "space-evenly",
          width: "80%",
          alignSelf: "center",
          marginTop: 40,
          marginBottom: 40,
        }}
      >
        <TouchableOpacity>
          <Image
            source={require("../../assets/spotify.png")}
            style={styles.socialLogo}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../../assets/tiktok.png")}
            style={styles.socialLogo}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../../assets/insta.png")}
            style={styles.socialLogo}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.buttonContainer}>
        <View>
          <Text
            style={[
              styles.buttontext,
              { fontSize: 16, fontFamily: "Rubik-Regular" },
            ]}
          >
            Book Now
          </Text>
          <Text style={styles.buttontext}>6pm October 20th</Text>
        </View>
        <View style={styles.iconContainer}>
          <FontAwesome5 name="chevron-right" size={24} color={"white"} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer}>
        <View>
          <Text
            style={[
              styles.buttontext,
              { fontSize: 16, fontFamily: "Rubik-Regular" },
            ]}
          >
            Reviews
          </Text>
          <View style={styles.starIcons}>
            <FontAwesome name="star" size={22} color="white" />
            <FontAwesome name="star" size={22} color="white" />
            <FontAwesome name="star" size={22} color="white" />
            <FontAwesome name="star" size={22} color="white" />
            <FontAwesome name="star" size={22} color="white" />
          </View>
        </View>
        <View style={styles.iconContainer}>
          <FontAwesome5 name="chevron-right" size={24} color={"white"} />
        </View>
      </TouchableOpacity>
      <EditModal visible={modalVisible} setModalVisible={setModalVisible} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  socialLogo: {
    height: 30,
    width: 30,
  },
  editProfileContainer: {
    borderWidth: 1,
    alignSelf: "center",
    borderRadius: 3,
    marginTop: 10,
    marginBottom: 30,
    justifyContent: "center",
    borderColor: "#2A51DB",
    padding: 10,
    width: "40%",
    alignItems: "center",
  },
  profilePic: {
    width: 157,
    height: 157,
    borderRadius: 100,
  },
  starIcons: {
    flexDirection: "row",
  },
  topIconContainer: {
    alignSelf: "flex-end",
    marginHorizontal: 30,
  },
  container: {
    backgroundColor: "#FFFFFF",
    height: "100%",
  },
  buttontext: {
    color: "white",
    fontFamily: "Rubik-SemiBold",
    fontSize: 20,
  },
  iconContainer: {
    justifyContent: "center",
  },
  profilePicContainer: {
    borderWidth: 1.5,
    alignSelf: "center",
    borderRadius: 100,
    marginTop: 30,
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    marginHorizontal: 30,
    backgroundColor: "#2A51DB",
    borderRadius: 12,
    marginTop: 20,
  },
  usernameContainer: {
    alignSelf: "center",
    marginTop: 15,
  },
  usernameText: {
    fontFamily: "Rubik-SemiBold",
    fontSize: 24,
  },
  genreText: {
    fontFamily: "Rubik-SemiBold",
    fontSize: 20,
    color: "#2A51DB",
  },
  genreContainer: {
    alignSelf: "center",
    marginTop: 8,
  },
  bioContainer: {
    paddingHorizontal: 40,
    textAlign: "center",
    marginTop: 20,
  },
  bioText: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    color: "#757575",
    textAlign: "left",
  },
});
export default ProfileScreen;
