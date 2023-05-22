import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Button
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import global from "../../styles/global";
import {
  getAccessToken,
  getProfileInfo,
  getProfilePic,
  getProfileStart,
} from "../../util/profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AvailabilitySearch from "../../components/search/AvailabilitySearch";
import SocialSearchTab from "../../components/search/SocialSearchTab";
import UnAuthSearch from "../../components/search/UnAuthSearch";
import { AuthContext } from "../../store/authContext";
import ShowsTab from "../../components/search/ShowsTab";
import { ProfileContext } from "../../store/profileContext";
import { addToFollowingList } from "../../util/search";
import { BottomSheet } from 'react-native-btr';
import { Octicons } from '@expo/vector-icons';

const ProfileScreen = (props) => {
  const authCTX = useContext(AuthContext);
  const profileCTX = useContext(ProfileContext)

  const [visibleBottomNav, setVisibleBottomNav] = useState(false);
  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisibleBottomNav(!visibleBottomNav);
  };

  const [gettingInfo, setGettingInfo] = useState(true);
  const [basicInfo, setBasicInfo] = useState({});
  const [about, setAbout] = useState({});
  const [availability, setAvailability] = useState({});
  const [profileURI, setProfileURI] = useState({});
  const [socials, setSocials] = useState({});
  const [searchID, setSearchID] = useState({});
  const [shows, setShows] = useState([]);

  async function getProfile() {
    setGettingInfo(true);
    const searchID = await AsyncStorage.getItem("searchID");
    setSearchID(searchID);
    const basicInfo = await getProfileInfo(searchID);
    const otherInfo = await getProfileStart(searchID);
    if(basicInfo.profileType == "performer"){
      setAvailShow(true);
    }else{
      setAboutShow(true);
    }
    setBasicInfo(basicInfo);
    setAbout(otherInfo.about);
    setAvailability(otherInfo.availability);
    setSocials(otherInfo.socials);
    const profileuri = await getProfilePic(searchID);
    setProfileURI(profileuri);
    if (otherInfo.shows != undefined) {
      setShows(otherInfo.shows);
    }
    setGettingInfo(false);
  }
  const [socialShow, setSocialShow] = useState(false);
  const [aboutShow, setAboutShow] = useState(false);
  const [availShow, setAvailShow] = useState(false);

  function getScreenTab() {
    if (socialShow == true) {
      return <SocialSearchTab socials={socials} />;
    }
    if (aboutShow == true) {
      return <ShowsTab shows={shows} basicInfo={basicInfo} />;
    }
    if (availShow == true) {
      return <AvailabilitySearch availability={availability} />;
    }
  }
  function checkFollowingList() {
    for (const x in profileCTX.followingList) {
      if (profileCTX.followingList[x].searchID == searchID) {
        return true;
      }
    }
    return false;
  }
  async function addToFollowing() {
    const token = await AsyncStorage.getItem("localId")
    const accessToken = await getAccessToken();
    // console.log(profileCTX.followingList);
    for (const x in profileCTX.followingList) {
      if (profileCTX.followingList[x].searchID == searchID) {
        return
      }
    }
    await addToFollowingList(profileURI, basicInfo.profileName, searchID, token, accessToken);
    profileCTX.addFollow([searchID,
      {
        profileName: basicInfo.profileName, searchID: searchID, profileURI: profileURI
      }])
  }
  // console.log(profileCTX.basicInfo);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <View>
      <UnAuthSearch visible={visible} setVisible={setVisible} props={props} />
      <SafeAreaView style={{ backgroundColor: global.color.primaryColors.main }} />
      <SafeAreaView style={styles.container}>
        {gettingInfo ? (
          <View style={{ height: "100%", justifyContent: "center" }}>
            <ActivityIndicator size={"large"} />
          </View>
        ) : (
          <View style={styles.container}>
            <BottomSheet
              visible={visibleBottomNav}
              onBackButtonPress={toggleBottomNavigationView}
              onBackdropPress={toggleBottomNavigationView}
            >
              <View style={styles.bottomNavigationView}>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginHorizontal: "5%",
                    backgroundColor: "white",
                    borderRadius: 12,
                    padding: 15,
                    
                  }}
                  onPress={()=>{
                    toggleBottomNavigationView()
                    props.navigation.navigate("Report")
                  }}
                  >
                    <Text style={{
                      fontFamily: "Rubik-Regular",
                      fontSize: 20,
                      paddingHorizontal: 10,
                      color: global.color.primaryColors.errorText
                    }}>
                      Report Profile
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{
                    marginTop: "3%",
                    flexDirection: "row",
                    justifyContent: "center",
                    marginHorizontal: "5%",
                    backgroundColor: "white",
                    borderRadius: 12,
                    padding: 15,
                    
                  }} onPress={toggleBottomNavigationView}>
                    <Text style={{
                      fontFamily: "Rubik-SemiBold",
                      fontSize: 20,
                      paddingHorizontal: 10,
                      color: global.color.primaryColors.main
                    }}>
                      Done
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </BottomSheet>
            <View style={{ flexDirection: "row", backgroundColor: global.color.primaryColors.main, height: "12%", justifyContent: "space-between" }}>
              <View>
                <TouchableOpacity
                  style={styles.topIconContainer}
                  onPress={() => {
                    props.navigation.pop();
                  }}
                >
                  <Ionicons
                    name="arrow-back"
                    size={28}
                    color={styles.iconColor}
                  />
                </TouchableOpacity>
              </View>
              {authCTX.isAuthenticated &&
              <View>
                <TouchableOpacity
                  style={styles.topIconContainer}

                  onPress={toggleBottomNavigationView}

                >
                  <Ionicons
                    name="ellipsis-horizontal-sharp"
                    size={28}
                    color={styles.iconColor} />
                </TouchableOpacity>
              </View>}
            </View>
            <View style={[styles.profilePicContainer, {
              position: 'absolute',
              top: "-1%",
              bottom: "0%",
              width: 120,
              height: 120,
              marginHorizontal: 30
            }]}>
              <Image
                source={{ uri: profileURI }}
                style={styles.profilePic}
              />
            </View>
            <View style={{ marginHorizontal: 30, flexDirection: "row", justifyContent: "flex-end" }}>
              <TouchableOpacity
                style={{
                  // justifyContent: "flex-end",
                  borderRadius: 12,
                  // borderWidth: 1,
                  // borderColor: "#FCFCFF",
                  width: "30%",
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
                  if (authCTX.isAuthenticated == true) {
                    props.navigation.navigate("SearchChat", {
                      displayName: basicInfo.profileName, searchID: searchID
                    })
                  } else {
                    setVisible(true);
                  }
                }}
              >
                <View style={{ alignSelf: "center", padding: 10 }}>
                  <Text
                    style={styles.editProfileText}
                  >
                    Message
                  </Text>
                </View>
              </TouchableOpacity>

              {(profileCTX.basicInfo.profileType != "venue") || (profileCTX.basicInfo.profileType != "performer") ?
                <TouchableOpacity
                  style={{
                    // justifyContent: "flex-end",
                    borderRadius: 12,
                    // borderWidth: 1,
                    marginLeft: 10,
                    width: "15%",
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
                    if (authCTX.isAuthenticated == true) {
                      addToFollowing();
                    } else {
                      setVisible(true);
                    }
                  }}
                >
                  <View style={{ alignSelf: "center", padding: 10 }}>
                    {checkFollowingList() == true && <MaterialCommunityIcons name="cards-heart" size={20} color="white" />}
                    {checkFollowingList() == false && <MaterialCommunityIcons name="cards-heart-outline" size={20} color="white" />}
                  </View>
                </TouchableOpacity> : <View></View>}
            </View>
            <View style={{ marginHorizontal: 30 }}>
              <View style={styles.usernameContainer}>
                <Text style={styles.usernameText}>
                  {basicInfo.profileName}
                </Text>
              </View>
              <View style={{ marginBottom: 2.5, flexDirection: "row", alignItems: "center" }}>
                {basicInfo.profileType == "performer" ? (
                  <View>
                    <Text style={{
                      color: global.color.primaryColors.main,
                      fontFamily: "Rubik-Regular",
                      fontSize: 16,
                    }}>
                      {about.category} {" "}
                      {about.genre && <Text>
                        |{" "}{about.genre} </Text>}
                    </Text></View>) : (<View><Text style={{
                      color: global.color.primaryColors.main,
                      fontFamily: "Rubik-Regular",
                      fontSize: 16
                    }}>
                      {about.category}
                    </Text>
                    </View>)}
                <View style={{ marginLeft: about.genre ? 10 : 0, flexDirection: "row", alignItems: "center" }}>
                  {about.location != undefined ?
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
                    {about.location}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={{
                  color: "black",
                  fontFamily: "Rubik-Regular",
                  fontSize: 14,
                }}>{about.bio}</Text>
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
                {basicInfo.profileType == "performer" &&
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
                }
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
  );
};

const styles = StyleSheet.create({
  bottomNavigationView: {
    // backgroundColor: '#fff',
    width: '100%',
    height: 150,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  iconColor: "white",
  editProfileText: {
    color: "white",
    fontFamily: "Rubik-Medium",
    fontSize: 18,
  },
  tabView: {
    borderBottomWidth: 1,
    marginTop: 10,
    alignItems: "center",
    borderColor: global.color.secondaryColors.adjacent,
  },
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
    borderColor: global.color.secondaryColors.main,
    backgroundColor: global.color.secondaryColors.main,
  },
  tabText: {
    color: global.color.secondaryColors.placeHolderTextColor,
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
    backgroundColor: "white"
  },
  topIconContainer: {
    alignSelf: "flex-end",
    marginHorizontal: 30,
  },
  container: {
    backgroundColor: "#FCFCFF",
    height: "100%",
  },
  iconContainer: {
    justifyContent: "center",
  },
  profilePicContainer: {
    alignItems: "center",
    overflow: 'hidden',
    flex: 1,
    borderRadius: 100,
    marginTop: 50,
    justifyContent: "center",
    borderWidth: 3,
    borderColor: global.color.secondaryColors.main,
  },
  usernameContainer: {
    // marginTop: 5,
  },
  usernameText: {
    fontFamily: "Rubik-SemiBold",
    fontSize: 20,
    color: global.color.secondaryColors.text,
  }
});
export default ProfileScreen;
