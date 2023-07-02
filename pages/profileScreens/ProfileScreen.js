import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Linking,
  Modal,
  useWindowDimensions,
  Animated,
  StatusBar
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SocialTab from "../../components/profile/SocialProfileTabArtist.js";
import AvailabilityProfileArtist from "../../components/profile/AvailabilityProfileArtist.js";
import ShowsTab from "../../components/profile/ShowsTab.js";
import UnAuthProfile from "../../components/profile/UnAuthProfile.js"
import global from "../../styles/global";
import { getShowData } from "../../util/shows.js";
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
import FollowingTab from "../../components/profile/FollowingTab.js";
import { URL } from 'react-native-url-polyfill';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import HighlightsTab from "../../components/profile/Highlights.js";
import * as WebBrowser from "expo-web-browser";
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';
import { TabView, SceneMap } from 'react-native-tab-view';
import TabViewPerformer from "../../components/profile/Tabs/TabViewArtist.js";
import TabViewVenue from "../../components/profile/Tabs/TabViewVenue.js";

const ProfileScreen = (props) => {
  const MyLoader = () => (
    <ContentLoader viewBox="-20 -20 500 900">
      <Circle cx="90" cy="90" r="80" />
      <Rect x="280" y="60" rx="12" ry="12" width="150" height="50" />
      <Rect x="0" y="200" rx="3" ry="3" width="200" height="20" />
      <Rect x="0" y="240" rx="3" ry="3" width="280" height="20" />
    </ContentLoader>
  )
  const authCTX = useContext(AuthContext);
  const styles = authCTX.mode === "light" ? light : dark;
  const profileCTX = useContext(ProfileContext);
  const [gettingInfo, setGettingInfo] = useState(false);

  async function helper(data) {
    const array = [];
    for (const x in data) {
      const singleData = await getProfileInfo(data[x][0]);
      let profileURI = singleData.profileURI;
      if (profileURI == null) {
        profileURI = data[x][1].profileURI;
      }

      array.push({
        profileName: singleData.profileName,
        profileURI: profileURI,
        searchID: data[x][0]
      })
    }
    return array;
  }

  async function getProfile() {
    setGettingInfo(true);

    const localId = await AsyncStorage.getItem("localId");
    const basicInfo = await getProfileInfo(localId);
    const otherInfo = await getProfileStart(localId);
    profileCTX.updateBasic(basicInfo);

    if (basicInfo.profileType == "general") {
      profileCTX.updatePersonalInfo({ firstName: basicInfo.firstName, lastName: basicInfo.lastName });
      if (otherInfo.hasOwnProperty("following")) {
        const data = await helper(Object.entries(otherInfo.following));
        profileCTX.updateFollowingList(data);
      } else {
        profileCTX.updateFollowingList([]);
      }
    }
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
    if (otherInfo.hasOwnProperty("profileLink")) {
      profileCTX.updateProfileLink(otherInfo.profileLink.link);
    }
    if (otherInfo.hasOwnProperty("shows")) {
      if (basicInfo.profileType == "venue") {
        const myShows = [];
        for (const x in otherInfo.shows) {
          const response = await getShowData(x, otherInfo.about.location);
          response["showID"] = x;
          myShows.push(response);
        }
        profileCTX.changeShow(myShows);
      } else {
        profileCTX.updateShows(otherInfo.shows)
      }
    } else {
      profileCTX.changeShow([]);
    }
    if (otherInfo.hasOwnProperty("socials")) {
      profileCTX.updateSocial(otherInfo.socials);
    } else {
      profileCTX.updateSocial();
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
  async function handleLinkPress() {
    await WebBrowser.openBrowserAsync(profileCTX.profileLink);

  };

  const [isModalVisible, setModalVisible] = useState(false);

  const handleImageClick = () => {
    setModalVisible(!isModalVisible);
  };

  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (authCTX.isAuthenticated) {
      getProfile();
    } else {
      setVisible(true);
    }
  }, [visible, authCTX.isAuthenticated]);
  if (authCTX.isAuthenticated) {
    return (
      <SafeAreaView style={styles.container}>
        {gettingInfo ? (
          <View style={{ height: "100%" }}>
            <MyLoader />
          </View>
        ) : (
          <View style={[styles.container, profileCTX.basicInfo.profileType == "general" && { height: "100%" }]}>
            <View style={{
              flexDirection: "row", justifyContent: "space-between",
            }}>
              <View>
                {props.route.params != undefined &&
                  <TouchableOpacity
                    style={styles.topIconContainer}
                    onPress={() => {
                      props.navigation.pop();
                    }}
                  >
                    <Ionicons
                      name="arrow-back"
                      size={28}
                      color={global.color.secondaryColors.main}
                    />
                  </TouchableOpacity>
                }
              </View>
              <View>
                <TouchableOpacity
                  style={[styles.topIconContainer, { alignSelf: "flex-end" }]}
                  onPress={() => {
                    props.navigation.navigate("ProfileSettingsScreen");
                  }}
                >
                  <Ionicons
                    name="ios-settings"
                    size={28}
                    color={global.color.secondaryColors.main}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {profileCTX.basicInfo.profileType != "general" &&
              <View style={{
                flexDirection: "row", justifyContent: "space-between", marginHorizontal: 30,
                alignItems: "center", marginBottom: "2%"
              }}>
                <TouchableOpacity style={{
                  borderWidth: 3,
                  justifyContent: "center",
                  overflow: "hidden",
                  width: 120,
                  height: 120,
                  borderRadius: 100,
                  borderColor: global.color.primaryColors.main
                }} onPress={handleImageClick} >
                  {/* <TouchableOpacity onPress={handleImageClick}> */}
                  <Image
                    source={{ uri: profileCTX.profilePic }}
                    style={styles.profilePic}
                  />
                  {/* </TouchableOpacity> */}
                </TouchableOpacity>

                <View>
                  <TouchableOpacity
                    style={{
                      borderRadius: 12,
                      // width: "50%",
                      paddingHorizontal: 10,
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
                      shadowRadius: 2.22
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
              </View>}
            {profileCTX.basicInfo.profileType != "general" ?
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
                      </Text>
                    </View>
                  ) : (
                    <View>
                      <Text style={{
                        color: global.color.primaryColors.main,
                        fontFamily: "Rubik-Regular",
                        fontSize: 16
                      }}>
                        {profileCTX.about.category}
                      </Text>
                    </View>)}
                  <View style={{ marginLeft: profileCTX.about.genre ? 10 : 0, flexDirection: "row", alignItems: "center" }}>
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
                {profileCTX.about.hasOwnProperty("equipment") &&
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {/* <FontAwesome5 name="clipboard" size={20} color={global.color.secondaryColors.placeHolderTextColor} /> */}
                    <Text style={{
                      color: global.color.secondaryColors.placeHolderTextColor,
                      fontFamily: "Rubik-Regular",
                      fontSize: 14,
                    }}>Equipment: {profileCTX.about.equipment}</Text>
                  </View>}
              </View>
              : <View style={{ marginHorizontal: 30 }}>
                <View style={styles.usernameContainer}>
                  <Text style={styles.usernameText}>
                    {profileCTX.basicInfo.firstName} {profileCTX.basicInfo.lastName}
                  </Text>
                </View>
              </View>}
            {profileCTX.profileLink &&
              <TouchableOpacity onPress={handleLinkPress} style={{ marginHorizontal: "5%", flexDirection: "row", marginTop: "3%" }}>
                <Ionicons name="link-outline" size={20} color={global.color.primaryColors.main} style={{ paddingHorizontal: "2%" }} />
                <Text style={{
                  textDecorationLine: 'underline',
                  color: global.color.primaryColors.main,
                  fontFamily: "Rubik-Regular",
                }}>
                  {new URL(profileCTX.profileLink).hostname}
                </Text>
              </TouchableOpacity>}
            <View
            // style={styles.tabView}
            >
              {profileCTX.basicInfo.profileType != "general" ?
                <View
                  style={{
                    // flexDirection: "row",
                    // justifyContent: "space-evenly",
                    // width: "90%",
                  }}
                >
                  {profileCTX.basicInfo.profileType == "performer" &&
                    <TabViewPerformer props={props} />
                  }
                  {profileCTX.basicInfo.profileType == "venue" &&
                    <TabViewVenue props={props} />
                  }

                </View> :
                <View>
                  <View style={[styles.tabTextContainer, { alignSelf: "center" }]}>
                    <Text style={[styles.tabText, { color: "black" }]}>Following</Text>
                  </View>
                  <View style={[styles.tabBottomBar, { borderRadius: 0 }]}></View>
                </View>}
            </View>
            {profileCTX.basicInfo.profileType == "general" &&
              <FollowingTab props={props} />
            }
          </View>
        )}
        <Modal visible={isModalVisible} transparent={true}>
          <TouchableWithoutFeedback onPress={handleImageClick}>
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#000000c0',

            }}>
              <View style={{ height: "100%", alignContent: "center", justifyContent: "center" }}>
                <Image source={{ uri: profileCTX.profilePic }}
                  style={{
                    width: 250,
                    height: 250,
                    borderRadius: 1000
                  }} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </SafeAreaView>
    )
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <UnAuthProfile props={props} visible={visible} setVisible={setVisible} />
      </SafeAreaView>)
  }
};
export default ProfileScreen;
