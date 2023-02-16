import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SocialTab from "../../components/SocialProfileTabArtist.js";
import AvailabilityProfileArtist from "../../components/AvailabilityProfileArtist";
import AboutTabArtist from "../../components/AboutTabArtist";
import global from "../../styles/global";
import { getProfileInfo, getProfileStart } from "../../util/profile";
import { ProfileContext } from "../../store/profileContext.js";
import { aboutInfo, availabilityInfo } from "../../models/profile.js";

const ProfileScreen = (props) => {
  const profileCTX = useContext(ProfileContext);
  const [gettingInfo, setGettingInfo] = useState(true);
  async function getProfile() {
    setGettingInfo(true);
    const basicInfo = await getProfileInfo();
    const otherInfo = await getProfileStart();
    // console.log(otherInfo.availability);
    profileCTX.updateBasic(basicInfo);
    profileCTX.updateAbout(
      new aboutInfo(
        otherInfo.about.bio,
        otherInfo.about.category,
        otherInfo.about.genre,
        otherInfo.about.location
      )
    );
    console.log(otherInfo);
    if (otherInfo.hasOwnProperty("availability")) {
      profileCTX.updateAvailability(
        new availabilityInfo(
          otherInfo.availability.dow,
          otherInfo.availability.times
        )
      );
    }else{
      profileCTX.updateAvailability(
        new availabilityInfo(
          {},
          {}
        )
      );
    }
    setGettingInfo(false);
  }

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
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {gettingInfo ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <View style={styles.container}>
          <View>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <View style={{ justifyContent: "center" }}>
                <TouchableOpacity
                  style={styles.topIconContainer}
                  onPress={() => {
                    props.navigation.navigate("ProfileSettingsScreen");
                  }}
                >
                  <Ionicons
                    name="ios-settings"
                    size={28}
                    color={global.color.primaryColors.text}
                  />
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
          <View style={{ justifyContent: "center" }}>
            <View style={styles.usernameContainer}>
              <Text style={styles.usernameText}>
                {profileCTX.basicInfo.profileName}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              alignSelf: "center",
              borderRadius: 12,
              borderColor: "#2A51DB",
              width: "80%",
              marginVertical: "5%",
              backgroundColor: global.color.primaryColors.adjacent,
            }}
            onPress={() => {
              props.navigation.navigate("EditProfileArtistScreen");
            }}
          >
            <View style={{ alignSelf: "center", padding: 10 }}>
              <Text
                style={{
                  color: "#2A51DB",
                  fontFamily: "Rubik-Medium",
                  fontSize: 18,
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
              borderColor: global.color.primaryColors.adjacent,
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
        </View>
      )}
    </SafeAreaView>
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
    borderWidth: 2.5,
    borderRadius: 12,
    borderColor: global.color.primaryColors.main,
    backgroundColor: global.color.primaryColors.main,
  },
  tabText: {
    color: global.color.primaryColors.text,
    fontFamily: "Rubik-Regular",
    fontSize: 16,
  },
  socialLogo: {
    height: 30,
    width: 30,
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
    backgroundColor: global.color.primaryColors.background,
    height: "100%",
  },
  iconContainer: {
    justifyContent: "center",
  },
  profilePicContainer: {
    alignSelf: "center",
    borderRadius: 100,
    marginTop: "3%",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: global.color.primaryColors.adjacent,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 0.41,
    // shadowRadius: 4,
  },
  usernameContainer: {
    alignSelf: "center",
    marginTop: 15,
  },
  usernameText: {
    fontFamily: "Rubik-SemiBold",
    fontSize: 24,
    color: global.color.primaryColors.text,
  },
});
export default ProfileScreen;
