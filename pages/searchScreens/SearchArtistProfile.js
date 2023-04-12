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
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import SocialTab from "../../components/SocialProfileTabArtist.js";
import AvailabilityProfileArtist from "../../components/search/AvailabilitySearch";
import AboutTabArtist from "../../components/search/AboutTabArtist";
import global from "../../styles/global";
import {
  getProfileInfo,
  getProfilePic,
  getProfileStart,
} from "../../util/profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AvailabilitySearch from "../../components/search/AvailabilitySearch";
import SocialSearchTab from "../../components/search/SocialSearchTab";
const ProfileScreen = (props) => {
  const [gettingInfo, setGettingInfo] = useState(true);
  const [basicInfo, setBasicInfo] = useState({});
  const [about, setAbout] = useState({});
  const [availability, setAvailability] = useState({});
  const [profileURI, setProfileURI] = useState({});
  const [socials, setSocials] = useState({});
  const [searchID, setSearchID] = useState({});
  async function getProfile() {
    setGettingInfo(true);
    const searchID = await AsyncStorage.getItem("searchID");
    setSearchID(searchID);
    const basicInfo = await getProfileInfo(searchID);
    const otherInfo = await getProfileStart(searchID);

    setBasicInfo(basicInfo);
    setAbout(otherInfo.about);
    setAvailability(otherInfo.availability);
    setSocials(otherInfo.socials);
    const profileuri = await getProfilePic(searchID);
    setProfileURI(profileuri);
    setGettingInfo(false);
  }
  const [socialShow, setSocialShow] = useState(false);
  const [aboutShow, setAboutShow] = useState(true);
  const [availShow, setAvailShow] = useState(false);
  function getScreenTab() {
    if (socialShow == true) {
      return <SocialSearchTab socials={socials} />;
    }
    if (aboutShow == true) {
      return <AboutTabArtist about={about} basicInfo={basicInfo} />;
    }
    if (availShow == true) {
      return <AvailabilitySearch availability={availability} />;
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
            <View style={{ flexDirection: "row" }}>
              <View style={{ justifyContent: "center" }}>
                <TouchableOpacity
                  style={styles.topIconContainer}
                  onPress={() => {
                    props.navigation.pop();
                  }}
                >
                  <FontAwesome5
                    name="chevron-left"
                    size={32}
                    color={global.color.primaryColors.buttonAccent}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <View style={styles.profilePicContainer}>
                <Image
                  source={{ uri: profileURI }}
                  style={styles.profilePic}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
          <View style={{ justifyContent: "center" }}>
            <View style={styles.usernameContainer}>
              <Text style={styles.usernameText}>{basicInfo.profileName}</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  color: global.color.primaryColors.main,
                  fontFamily: "Rubik-Medium",
                  fontSize: 18,
                }}
              >
                {basicInfo.profileType.charAt(0).toUpperCase() + basicInfo.profileType.slice(1)}
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
              backgroundColor: global.color.primaryColors.main,
            }}
            onPress={() => {props.navigation.navigate("SearchChat",{displayName: basicInfo.profileName,searchID:searchID})}}
          >
            <View style={{ alignSelf: "center", padding: 10 }}>
              <Text
                style={{
                  color: global.color.primaryColors.buttonAccent,
                  fontFamily: "Rubik-Medium",
                  fontSize: 18,
                }}
              >
                Message
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
