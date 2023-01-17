import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import profileInformation from "../../models/profile/profile";
import { Ionicons } from "@expo/vector-icons";
import EditModal from "../../components/EditProfileArtist.js";
import SocialTab from "../../components/SocialProfileTabArtist.js";
import AvailabilityProfileArtist from "../../components/AvailabilityProfileArtist";
import AboutTabArtist from "../../components/AboutTabArtist";
const ProfileScreen = (props) => {
  const dummyProfile = new profileInformation(
    123,
    "M-OKAY",
    "DJ",
    "House",
    "Tucson local attending UA'23 specializing in bringing a different energy to bars and clubs in the area."
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [socialShow, setSocialShow] = useState(false);
  const [aboutShow, setAboutShow] = useState(true);
  const [availShow, setAvailShow] = useState(false);
  function getScreenTab() {
    if (socialShow == true) {
      return <SocialTab />;
    }
    if (aboutShow == true) {
      return <AboutTabArtist />;
    }
    if (availShow == true) {
      return <AvailabilityProfileArtist />;
    }
  }
  return (
    // <View style={{ backgroundColor: "#2A51DB"}}>
      <SafeAreaView style={styles.container}>
        <View>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
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
          <View>
            <View style={styles.profilePicContainer}>
              <Image
                source={require("../../assets/ok-profile.jpeg")}
                style={styles.profilePic}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
        <View style={{ justifyContent: "center"}}>
          <View style={styles.usernameContainer}>
            <Text style={styles.usernameText}>{dummyProfile.username}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            alignSelf: "center",
            borderWidth: 1,
            borderRadius: 12,
            borderColor: "#2A51DB",
            width: "80%",
            marginVertical: "5%",
          }}
          onPress={() => setModalVisible(true)}
        >
          <View style={{ alignSelf: "center", padding: 10 }}>
            <Text
              style={{
                color: "#2A51DB",
                fontFamily: "Rubik-SemiBold",
                fontSize: 16,
              }}
            >
              Edit Profile
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderBottomWidth: 1,
            marginTop: 20,
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "90%",
            }}
          >
            <TouchableOpacity
              style={styles.tabContainer}
              onPress={() => {
                setAboutShow(true);
                setAvailShow(false);
                setSocialShow(false);
              }}
            >
              <View style={{ flexDirection: "column" }}>
                <View style={styles.tabTextContainer}>
                  <Text style={styles.tabText}>About</Text>
                </View>
                {aboutShow ? (
                  <View style={styles.tabBottomBar}></View>
                ) : (
                  <View></View>
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tabContainer}
              onPress={() => {
                setAvailShow(true);
                setAboutShow(false);
                setSocialShow(false);
              }}
            >
              <View style={{ flexDirection: "column" }}>
                <View style={styles.tabTextContainer}>
                  <Text style={styles.tabText}>Availability</Text>
                </View>
                {availShow ? (
                  <View style={styles.tabBottomBar}></View>
                ) : (
                  <View></View>
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tabContainer}
              onPress={() => {
                setSocialShow(true);
                setAvailShow(false);
                setAboutShow(false);
              }}
            >
              <View style={{ flexDirection: "column" }}>
                <View style={styles.tabTextContainer}>
                  <Text style={styles.tabText}>Socials</Text>
                </View>
                {socialShow ? (
                  <View style={styles.tabBottomBar}></View>
                ) : (
                  <View></View>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {getScreenTab()}
        <EditModal visible={modalVisible} setModalVisible={setModalVisible} />
      </SafeAreaView>
    // </View>
  );
};

const styles = StyleSheet.create({
  tabTextContainer: {
    paddingHorizontal: 15,
    borderRadius: 10,
    paddingBottom: 10,
  },
  tabContainer: {
    width: "50%",
    alignItems: "center",
  },
  tabBottomBar: {
    borderWidth: 3,
    borderRadius: 10,
    borderColor: "#2A51DB",
  },
  tabText: {
    color: "black",
    fontFamily: "Rubik-Regular",
    fontSize: 16,
  },
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
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  topIconContainer: {
    alignSelf: "flex-end",
    marginHorizontal: 30,
  },
  container: {
    backgroundColor: "white",
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
    alignSelf: "center",
    borderRadius: 100,
    marginTop: "3%",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.41,
    shadowRadius: 4,
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
});
export default ProfileScreen;
