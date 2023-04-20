import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SocialTab from "../../components/profile/SocialProfileTabArtist.js";
import AvailabilityProfileArtist from "../../components/profile/AvailabilityProfileArtist.js";
import AboutTabArtist from "../../components/profile/AboutTabArtist.js";
import global from "../../styles/global";
import {
  getProfileInfo,
  getProfilePic,
  getProfileStart,
  getPersonalInfo,
} from "../../util/profile";
import { AuthContext } from "../../store/authContext.js";
import { ProfileContext } from "../../store/profileContext.js";
import { aboutInfo, availabilityInfo } from "../../models/profile.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dark from "../../styles/profile/dark/profileScreen.js";
import light from "../../styles/profile/light/profileScreen.js"

const ProfileScreen = (props) => {
  const authCTX = useContext(AuthContext);
  const styles = authCTX.mode === "light" ? light : dark;

  const profileCTX = useContext(ProfileContext);
  const [gettingInfo, setGettingInfo] = useState(true);

  async function getProfile() {
    setGettingInfo(true);
    const localId = await AsyncStorage.getItem("localId");
    const basicInfo = await getProfileInfo(localId);
    const otherInfo = await getProfileStart(localId);

    profileCTX.updateBasic(basicInfo);
    if (basicInfo.profileType == "venue") {
      if (otherInfo.hasOwnProperty("socials")) {
        profileCTX.updateAbout({
          bio: otherInfo.about.bio,
          category: otherInfo.about.category,
          equipment: otherInfo.about.equipment,
          location: otherInfo.about.location,
        });
      }
    } else {
      if (otherInfo.hasOwnProperty("socials")) {
        profileCTX.updateAbout(
          new aboutInfo(
            otherInfo.about.bio,
            otherInfo.about.category,
            otherInfo.about.genre,
            otherInfo.about.location
          )
        );
      }
    }
    if (otherInfo.hasOwnProperty("socials")) {
      profileCTX.updateSocial(otherInfo.socials);
    }
    if (otherInfo.hasOwnProperty("availability")) {
      profileCTX.updateAvailability(
        new availabilityInfo(
          otherInfo.availability.dow,
          otherInfo.availability.times
        )
      );
    } else {
      profileCTX.updateAvailability(new availabilityInfo({}, {}));
    }
    const personalInfo = await getPersonalInfo(localId);
    if (personalInfo != null) {
      profileCTX.updatePersonalInfo(personalInfo);
    }
    const profileuri = await getProfilePic(localId);
    profileCTX.updateProfilePic(profileuri);
    setGettingInfo(false);
  }

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
        <View style={{ height: "100%", justifyContent: "center" }}>
          <ActivityIndicator size={"large"} />
        </View>
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
                    color={styles.iconColor}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <View style={styles.profilePicContainer}>
                <Image
                  source={{ uri: profileCTX.profilePic }}
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
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  color: global.color.primaryColors.main,
                  fontFamily: "Rubik-Medium",
                  fontSize: 18,
                }}
              >
                {profileCTX.basicInfo.profileType.charAt(0).toUpperCase() + profileCTX.basicInfo.profileType.slice(1)}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={{
              alignSelf: "center",
              borderRadius: 12,
              borderColor: "#2A51DB",
              width: "80%",
              marginVertical: 10,
              backgroundColor: global.color.primaryColors.main,
            }}
            onPress={() => {
              props.navigation.navigate("EditProfileArtistScreen");
            }}
          >
            <View style={{ alignSelf: "center", padding: 10 }}>
              <Text
                style={styles.editProfileText}
              >
                Edit Profile
              </Text>
            </View>
          </TouchableOpacity>

          <View
            style={styles.tabView}
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

export default ProfileScreen;
