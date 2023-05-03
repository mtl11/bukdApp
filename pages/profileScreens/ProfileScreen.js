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
import ShowsTab from "../../components/profile/ShowsTab.js";
import UnAuthProfile from "../../components/profile/UnAuthProfile.js"
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
  const [gettingInfo, setGettingInfo] = useState(false);

  async function getProfile() {
    setGettingInfo(true);
    const localId = await AsyncStorage.getItem("localId");
    const basicInfo = await getProfileInfo(localId);
    const otherInfo = await getProfileStart(localId);

    profileCTX.updateBasic(basicInfo);
    if (basicInfo.profileType == "venue") {
      if (otherInfo.hasOwnProperty("about")) {
        profileCTX.updateAbout({
          bio: otherInfo.about.bio,
          category: otherInfo.about.category,
          equipment: otherInfo.about.equipment,
          location: otherInfo.about.location,
        });
      }
    } else {
      if (otherInfo.hasOwnProperty("about")) {
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
    if (otherInfo.hasOwnProperty("shows")) {
      profileCTX.updateShows(otherInfo.shows);
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
  console.log(profileCTX.about);
  const [socialShow, setSocialShow] = useState(false);
  const [aboutShow, setAboutShow] = useState(true);
  const [availShow, setAvailShow] = useState(false);
  const [visible, setVisible] = useState(true);
  function getScreenTab() {
    if (socialShow == true) {
      return <SocialTab />;
    }
    if (aboutShow == true) {
      return <ShowsTab />;
    }
    if (availShow == true) {
      return <AvailabilityProfileArtist />;
    }
  }
  useEffect(() => {
    if (authCTX.isAuthenticated) {
      getProfile();
    }else{
      setVisible(true);
    }
  }, [visible, authCTX.isAuthenticated]);
  console.log(authCTX.isAuthenticated);
  if (authCTX.isAuthenticated) {
    return (
      <View>
        <SafeAreaView style={{ backgroundColor: global.color.primaryColors.main }} />
        <SafeAreaView style={styles.container}>
          {gettingInfo ? (
            <View style={{ height: "100%", justifyContent: "center" }}>
              <ActivityIndicator size={"large"} />
            </View>
          ) : (
            <View style={styles.container}>
              <View style={{ flexDirection: "row", justifyContent: "flex-end", backgroundColor: global.color.primaryColors.main, height: "12%" }}>
                <View>
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
              <View style={[styles.profilePicContainer, {
                position: 'absolute',
                top: "-1%",
                bottom: 0,
                width: 120,
                height: 120,
                marginHorizontal: 30
              }]}>
                <Image
                  source={{ uri: profileCTX.profilePic }}
                  style={styles.profilePic}
                  resizeMode="contain"
                // defaultSource={}
                />
              </View>
              <View style={{ marginHorizontal: 30 }}>
                <TouchableOpacity
                  style={{
                    // justifyContent: "flex-end",
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: "#FCFCFF",
                    width: "50%",
                    marginTop: 20,
                    marginBottom: 10,
                    backgroundColor: global.color.primaryColors.main,
                    alignSelf: "flex-end",
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,
                    elevation: 3
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
              </View>
              <View style={{ marginHorizontal: 30 }}>
                <View style={styles.usernameContainer}>
                  <Text style={styles.usernameText}>
                    {profileCTX.basicInfo.profileName}
                  </Text>
                </View>
                <View style={{ marginBottom: 2.5, flexDirection: "row", alignItems: "center" }}>
                  {profileCTX.basicInfo.profileType == "performer" ? (
                    <View>
                      <Text style={{
                        color: global.color.primaryColors.main,
                        fontFamily: "Rubik-Regular",
                        fontSize: 16,
                      }}>
                        {profileCTX.about.category} {" "}
                        {profileCTX.about.genre && <Text>
                          |{" "}{profileCTX.about.genre} </Text>}
                      </Text></View>) : (<View><Text style={{
                        color: global.color.primaryColors.main,
                        fontFamily: "Rubik-Regular",
                        fontSize: 16
                      }}>
                        {profileCTX.about.category}
                      </Text></View>)}
                  <View style={{ marginLeft: profileCTX.about.genre && 10, flexDirection: "row", alignItems: "center" }}>
                    {profileCTX.about.location != undefined ?
                      <Ionicons
                        name="location-outline"
                        size={24}
                        color={global.color.secondaryColors.placeHolderTextColor}
                      /> : <View></View>}
                    <Text style={{
                      color: global.color.secondaryColors.placeHolderTextColor,
                      fontFamily: "Rubik-Regular",
                      fontSize: 16
                    }}>
                      {profileCTX.about.location}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text style={{
                    color: "black",
                    fontFamily: "Rubik-Regular",
                    fontSize: 14,
                  }}>{profileCTX.about.bio}</Text>
                </View>
              </View>
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
                      setAvailShow(true);
                      setAboutShow(false);
                      setSocialShow(false);
                    }}
                  >
                    <View style={{ flexDirection: "column" }}>
                      <View style={styles.tabTextContainer}>
                        <Text style={[styles.tabText, availShow && { color: "black" }]}>Availability</Text>
                      </View>
                      {availShow && (
                        <View style={styles.tabBottomBar}></View>
                      )}
                    </View>
                  </TouchableOpacity>
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
                        <Text style={[styles.tabText, aboutShow && { color: "black" }]}>Shows</Text>
                      </View>
                      {aboutShow && (
                        <View style={styles.tabBottomBar}></View>
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
                        <Text style={[styles.tabText, socialShow && { color: "black" }]}>Social Media</Text>
                      </View>
                      {socialShow && (
                        <View style={styles.tabBottomBar}></View>
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              {getScreenTab()}
            </View>
          )}
        </SafeAreaView>
      </View >
    )
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <UnAuthProfile props={props} visible={visible} setVisible={setVisible} />
      </SafeAreaView>)
  }
};
export default ProfileScreen;
