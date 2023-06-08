import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Linking,
  Modal
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SocialTab from "../../components/profile/SocialProfileTabArtist.js";
import AvailabilityProfileArtist from "../../components/profile/AvailabilityProfileArtist.js";
import ShowsTab from "../../components/profile/ShowsTab.js";
import UnAuthProfile from "../../components/profile/UnAuthProfile.js"
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
import FollowingTab from "../../components/profile/FollowingTab.js";
import { URL } from 'react-native-url-polyfill';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const ProfileScreen = (props) => {
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
      profileCTX.updateShows(otherInfo.shows);
    } else {
      profileCTX.updateShows([]);
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

  const handleLinkPress = () => {
    Linking.openURL(profileCTX.profileLink);
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const handleImageClick = () => {
    setModalVisible(!isModalVisible);
  };

  const [socialShow, setSocialShow] = useState(false);
  const [aboutShow, setAboutShow] = useState(true);
  const [availShow, setAvailShow] = useState(false);
  const [visible, setVisible] = useState(true);
  function getScreenTab() {
    if (profileCTX.basicInfo.profileType != "general") {
      if (socialShow == true) {
        return <SocialTab />;
      }
      if (aboutShow == true) {
        return <ShowsTab />;
      }
      if (profileCTX.basicInfo.profileType == "performer") {
        if (availShow == true) {
          return <AvailabilityProfileArtist />;
        }
      }
    } else {
      return <FollowingTab props={props} />
    }
  }
  useEffect(() => {
    if (authCTX.isAuthenticated) {
      getProfile();
    } else {
      setVisible(true);
    }
  }, [visible, authCTX.isAuthenticated]);
  if (authCTX.isAuthenticated) {
    return (
      <View>
        {/* <SafeAreaView style={{ backgroundColor: global.color.primaryColors.main }} /> */}
        <SafeAreaView style={styles.container}>
          {gettingInfo ? (
            <View style={{ height: "100%", justifyContent: "center" }}>
              <ActivityIndicator size={"large"} />
            </View>
          ) : (
            <View style={styles.container}>
              <View style={{
                flexDirection: "row", justifyContent: "space-between",
                // backgroundColor: global.color.primaryColors.main,
                // height:  "5%"
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
                : <View style={{ marginHorizontal: 30, marginTop: "5%", }}>
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
                style={styles.tabView}
              >
                {profileCTX.basicInfo.profileType != "general" ?
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      width: "90%",
                    }}
                  >

                    {profileCTX.basicInfo.profileType == "performer" &&
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
                      </TouchableOpacity>}
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
                  </View> :
                  <View>
                    <View style={styles.tabTextContainer}>
                      <Text style={[styles.tabText, { color: "black" }]}>Following</Text>
                    </View>
                    <View style={styles.tabBottomBar}></View>
                  </View>}
              </View>
              {getScreenTab()}
            </View>
          )}
        <Modal visible={isModalVisible} transparent={true}>
          <TouchableWithoutFeedback onPress={handleImageClick}>
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#000000c0',

            }}>
              <View style={{ height: "100%", alignContent:"center", justifyContent:"center" }}>
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
