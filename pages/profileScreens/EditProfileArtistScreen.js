import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import global from "../../styles/global";
import * as ImagePicker from "expo-image-picker";
import {
  getProfilePic,
  setAboutInfo,
  setAvailabilityInfo,
  setPerformerInList,
  setProfileName,
  setProfilePic,
  setVenueAboutInfo,
  setVenueInList,
} from "../../util/profile";
import { ProfileContext } from "../../store/profileContext.js";
import { aboutInfo, profileInfo } from "../../models/profile";
import ProfileDropDown from "../../components/profile/ProfileDropDown";
import {
  locations,
  profileCategoriesArtist,
  subCategories,
  profileCategoriesVenue,
} from "../../models/dropdownData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../store/authContext";
import { FontAwesome5 } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import light from "../../styles/profile/light/editProfile";
import dark from "../../styles/profile/dark/editProfile";

const EditProfileArtistScreen = (props) => {
  const profileCTX = useContext(ProfileContext);
  const authCTX = useContext(AuthContext);
  const styles = authCTX.mode === "light" ? light : dark;
  async function update() {
    const localId = await AsyncStorage.getItem("localId");
    await setProfileName(
      profileCTX.basicInfo.profileType,
      profilename,
      localId
    );

    const dow = getDow();
    const time = getTime();
    await setAvailabilityInfo(time, dow, localId);
    if (image) {
      await setProfilePic(image, localId);
    }
    profileCTX.updateBasic(
      new profileInfo(
        profileCTX.basicInfo.email,
        profileCTX.basicInfo.profileType,
        profilename
      )
    );
    if (profileCTX.basicInfo.profileType == "performer") {
      await setAboutInfo(location, category, genre, bio, localId);
      profileCTX.updateAbout(new aboutInfo(bio, category, genre, location));
    } else {
      await setVenueAboutInfo(bio, category, location, equipment, localId);
      profileCTX.updateAbout({
        bio: bio,
        category: category,
        location: location,
        equipment: equipment,
      });
    }
    profileCTX.updateAvailability({ dow: dow, times: time });
    profileCTX.updateProfilePic(image);

    const profilePic = await getProfilePic(localId);
    if (profileCTX.basicInfo.profileType == "performer") {
      await setPerformerInList(location, category, profilename, localId, profilePic);
    } else {
      await setVenueInList(location, category, profilename, localId, profilePic);
    }
  }

  const [profilename, setProfilename] = useState(
    profileCTX.basicInfo.profileName
  );
  const [location, setLocation] = useState(profileCTX.about.location);
  const [category, setCategory] = useState(profileCTX.about.category);
  const [genre, setGenre] = useState(profileCTX.about.genre);
  const [bio, setBio] = useState(profileCTX.about.bio);
  const [equipment, setEquipment] = useState(profileCTX.about.equipment);
  const [image, setImage] = useState(profileCTX.profilePic);
  const [about, setAbout] = useState(false);
  const [social, setSocial] = useState(false);
  const [avail, setAvail] = useState(false);
  const [mon, setMon] = useState(profileCTX.availabilty.dow.mon);
  const [tue, setTue] = useState(profileCTX.availabilty.dow.tue);
  const [wed, setWed] = useState(profileCTX.availabilty.dow.wed);
  const [thu, setThu] = useState(profileCTX.availabilty.dow.thu);
  const [fri, setFri] = useState(profileCTX.availabilty.dow.fri);
  const [sat, setSat] = useState(profileCTX.availabilty.dow.sat);
  const [sun, setSun] = useState(profileCTX.availabilty.dow.sun);

  const [morn, setMorn] = useState(profileCTX.availabilty.times.morn);
  const [after, setAfter] = useState(profileCTX.availabilty.times.after);
  const [evening, setEvening] = useState(profileCTX.availabilty.times.evening);
  const [night, setNight] = useState(profileCTX.availabilty.times.night);

  const getDow = () => {
    const dow = {};
    if (mon) dow.mon = true;
    if (tue) dow.tue = true;
    if (wed) dow.wed = true;
    if (thu) dow.thu = true;
    if (fri) dow.fri = true;
    if (sat) dow.sat = true;
    if (sun) dow.sun = true;
    return dow;
  };

  const getTime = () => {
    const time = {};
    if (morn) time.morn = true;
    if (after) time.after = true;
    if (evening) time.evening = true;
    if (night) time.night = true;
    return time;
  };
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
    }
  };

  const locationPlaceholder = () => {
    if (profileCTX.about.location == ("" || undefined)) {
      return "Location";
    } else {
      return profileCTX.about.location;
    }
  };
  const categoryPlaceholder = () => {
    if (profileCTX.about.category == ("" || undefined)) {
      return "Category";
    } else {
      return profileCTX.about.category;
    }
  };
  const genrePlaceholder = () => {
    if (profileCTX.about.genre == ("" || undefined)) {
      return "Genre";
    } else {
      return profileCTX.about.genre;
    }
  };

  function getSocialUsername(pType) {
    console.log(profileCTX.social[pType]);
    if (profileCTX.social[pType] != undefined) {
      if (profileCTX.social[pType].username != undefined) {
        console.log(profileCTX.social[pType].username);
        return profileCTX.social[pType].username;
      } else {
        return ""
      }
    } else {
      return ""
    }
  }

  return (
    <SafeAreaView
      style={styles.container}
    >

      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          marginHorizontal: "8%",
          alignItems: "center",
          // marginTop: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            props.navigation.pop();
          }}
        >
          <Text
            style={{
              color: styles.cancelColor,
              fontSize: 18,
              fontFamily: "Rubik-Regular",
            }}
          >
            Cancel
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 18,
            fontFamily: "Rubik-Medium",
            color: styles.cancelColor,
          }}
        >
          Edit Profile
        </Text>
        <TouchableOpacity
          onPress={() => {
            update();
            props.navigation.pop();
          }}
        >
          <Text
            style={{
              color: global.color.primaryColors.main,
              fontSize: 18,
              fontFamily: "Rubik-Regular",
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAwareScrollView>
          <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
            {image ? (
              <Image
                source={{ uri: image }}
                style={{
                  width: 148,
                  height: 148,
                  borderRadius: 100,
                  overflow: "hidden",
                }}
              />
            ) : (
              <View>
                <FontAwesome name="camera" size={30} color="#BDBDBD" />
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.inputContainer}>
            <KeyboardAvoidingView behavior='padding'>
              <TextInput
                style={styles.input}
                placeholder={"Profile Name"}
                placeholderTextColor={styles.placeHolderTextColor}
                value={profilename}
                onChangeText={setProfilename}
                maxLength={24}
                returnKeyType="done"
              />
            </KeyboardAvoidingView>
          </View>

          <TouchableOpacity
            style={[styles.headerContainer, !about && { marginBottom: 0 }]}
            onPress={() => {
              setAbout(!about);
            }}
          >
            <Text style={styles.headerText}>About</Text>
            {about ? (
              <Ionicons
                name="chevron-up"
                size={28}
                color={styles.iconColor}
              />
            ) : (
              <Ionicons
                name="chevron-down"
                size={28}
                color={styles.iconColor}
              />
            )}
          </TouchableOpacity>
          {about ? (
            <View>
              <ProfileDropDown
                data={locations}
                setValue={setLocation}
                value={profileCTX.about.location}
                placeholder={locationPlaceholder()}
              />
              {profileCTX.basicInfo.profileType == "performer" ? (
                <ProfileDropDown
                  data={profileCategoriesArtist}
                  setValue={setCategory}
                  value={profileCTX.about.category}
                  placeholder={categoryPlaceholder()}
                  margin={"5%"}
                />
              ) : (
                <ProfileDropDown
                  data={profileCategoriesVenue}
                  setValue={setCategory}
                  value={profileCTX.about.category}
                  placeholder={categoryPlaceholder()}
                  margin={"5%"}
                />
              )}
              {profileCTX.basicInfo.profileType == "performer" ? (
                <ProfileDropDown
                  data={subCategories}
                  setValue={setGenre}
                  value={profileCTX.about.genre}
                  placeholder={genrePlaceholder()}
                  margin={"5%"}
                />
              ) : (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder={"List available equipment"}
                    onChangeText={setEquipment}
                    value={equipment}
                    placeholderTextColor={styles.placeHolderTextColor}
                    maxLength={160}
                  />
                </View>
              )}
              <View style={[styles.inputContainer]}>
                <TextInput
                  style={[styles.input, { marginTop: 10 }]}
                  multiline={true}
                  numberOfLines={4}
                  placeholder={"Bio"}
                  onChangeText={setBio}
                  value={bio}
                  placeholderTextColor={styles.placeHolderTextColor}
                  maxLength={160}
                  maxHeight={160}
                  blurOnSubmit={true}
                />
              </View>
            </View>
          ) : (
            <View></View>
          )}
          <TouchableOpacity
            style={[styles.headerContainer, !avail && { marginBottom: 0 }]}
            onPress={() => {
              setAvail(!avail);
            }}
          >
            <Text style={styles.headerText}>Availability</Text>
            {avail ? (
              <Ionicons
                name="chevron-up"
                size={28}
                color={styles.iconColor}
              />
            ) : (
              <Ionicons
                name="chevron-down"
                size={28}
                color={styles.iconColor}
              />
            )}
          </TouchableOpacity>
          {avail ? (
            <View>
              <View>
                <View style={styles.timeRow}>
                  <TouchableOpacity
                    style={[
                      styles.timeContainer,
                      morn && { borderColor: styles.borderColorDay },
                    ]}
                    onPress={() => {
                      setMorn(!morn);
                    }}
                  >
                    <Text style={styles.timeText}>Morning</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.timeContainer,
                      after && { borderColor: styles.borderColorDay },
                    ]}
                    onPress={() => {
                      setAfter(!after);
                    }}
                  >
                    <Text style={styles.timeText}>Afternoon</Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles.timeRow, { marginTop: "5%" }]}>
                  <TouchableOpacity
                    style={[
                      styles.timeContainer,
                      evening && { borderColor: styles.borderColorDay },
                    ]}
                    onPress={() => {
                      setEvening(!evening);
                    }}
                  >
                    <Text style={styles.timeText}>Evening</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.timeContainer,
                      night && { borderColor: styles.borderColorDay },
                    ]}
                    onPress={() => {
                      setNight(!night);
                    }}
                  >
                    <Text style={styles.timeText}>Late Night</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <View style={[styles.dayRow, { marginTop: "10%" }]}>
                  <TouchableOpacity
                    style={[styles.dayContainer, mon && { borderColor: styles.borderColorDay }]}
                    onPress={() => {
                      setMon(!mon);
                    }}
                  >
                    <Text style={styles.timeText}>Mon</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.dayContainer, tue && { borderColor: styles.borderColorDay }]}
                    onPress={() => {
                      setTue(!tue);
                    }}
                  >
                    <Text style={styles.timeText}>Tue</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.dayContainer, wed && { borderColor: styles.borderColorDay }]}
                    onPress={() => {
                      setWed(!wed);
                    }}
                  >
                    <Text style={styles.timeText}>Wed</Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles.dayRow, { marginTop: "5%" }]}>
                  <TouchableOpacity
                    style={[styles.dayContainer, thu && { borderColor: styles.borderColorDay }]}
                    onPress={() => {
                      setThu(!thu);
                    }}
                  >
                    <Text style={styles.timeText}>Thu</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.dayContainer, fri && { borderColor: styles.borderColorDay }]}
                    onPress={() => {
                      setFri(!fri);
                    }}
                  >
                    <Text style={styles.timeText}>Fri</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.dayContainer, sat && { borderColor: styles.borderColorDay }]}
                    onPress={() => {
                      setSat(!sat);
                    }}
                  >
                    <Text style={styles.timeText}>Sat</Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles.dayRow, { marginTop: "5%" }]}>
                  <TouchableOpacity
                    style={[styles.dayContainer, sun && { borderColor: styles.borderColorDay }]}
                    onPress={() => {
                      setSun(!sun);
                    }}
                  >
                    <Text style={styles.timeText}>Sun</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            <View></View>
          )}
          <TouchableOpacity
            style={styles.headerContainer}
            onPress={() => {
              setSocial(!social);
            }}
          >
            <Text style={styles.headerText}>Social Media Links</Text>
            {social ? (
              <Ionicons
                name="chevron-up"
                size={28}
                color={styles.iconColor}
              />
            ) : (
              <Ionicons
                name="chevron-down"
                size={28}
                color={styles.iconColor}
              />
            )}
          </TouchableOpacity>
          {social ? (
            <View>
              <View style={styles.socialRow}>
                <TouchableOpacity
                  style={[styles.inputContainerSocial, { marginTop: 0 }]}
                  onPress={() => {
                    const socialName = getSocialUsername("soundcloud");
                    props.navigation.navigate("SocialModalScreen",
                      {
                        name: "Soundcloud", url: "https://soundcloud.com/", profileType: "soundcloud",
                        username: socialName
                      })
                  }}
                >
                  <FontAwesome5
                    name="soundcloud"
                    size={40}
                    color={global.color.primaryColors.main}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.inputContainerSocial}
                  onPress={() => {
                    const socialName = getSocialUsername("instagram");
                    props.navigation.navigate("SocialModalScreen",
                      {
                        name: "Instagram", url: "https://instagram.com/", profileType: "instagram",
                        username: socialName
                      })
                  }}
                >
                  <FontAwesome5
                    name="instagram"
                    size={40}
                    color={global.color.primaryColors.main}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.inputContainerSocial}
                  onPress={() => {
                    const socialName = getSocialUsername("tiktok");
                    props.navigation.navigate("SocialModalScreen",
                      {
                        name: "TikTok", url: "https://tiktok.com/@", profileType: "tiktok",
                        username: socialName
                      })
                  }}
                >
                  <FontAwesome5
                    name="tiktok"
                    size={40}
                    color={global.color.primaryColors.main}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.socialRow}>
                <TouchableOpacity
                  style={styles.inputContainerSocial}
                  onPress={() => {
                    const socialName = getSocialUsername("youtube");
                    props.navigation.navigate("SocialModalScreen",
                      {
                        name: "YouTube", url: "https://youtube.com/@", profileType: "youtube",
                        username: socialName
                      })
                  }}
                >
                  <FontAwesome5
                    name="youtube"
                    size={40}
                    color={global.color.primaryColors.main}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.inputContainerSocial}
                  onPress={() => {
                    const socialName = getSocialUsername("spotify");
                    props.navigation.navigate("SocialModalScreen",
                      {
                        name: "Spotify", url: "https://open.spotify.com/artist/", profileType: "spotify",
                        username: socialName
                      })
                  }}
                >
                  <FontAwesome5
                    name="spotify"
                    size={40}
                    color={global.color.primaryColors.main}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.inputContainerSocial}
                  onPress={() => {
                    const socialName = getSocialUsername("twitter");
                    props.navigation.navigate("SocialModalScreen",
                      {
                        name: "Twitter", url: "https://twitter.com/", profileType: "twitter",
                        username: socialName
                      })
                  }}
                >
                  <FontAwesome5
                    name="facebook"
                    size={40}
                    color={global.color.primaryColors.main}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View></View>
          )}
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileArtistScreen;
