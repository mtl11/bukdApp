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
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import global from "../../styles/global";
import * as ImagePicker from "expo-image-picker";
import {
  setAboutInfo,
  setAvailabilityInfo,
  setProfileName,
} from "../../util/profile";
import { ProfileContext } from "../../store/profileContext.js";
import { aboutInfo, profileInfo } from "../../models/profile";
import { SocialLinks, TYPE_MOBILE } from "social-links";
import AddLinkModal from "../../components/AddLinkModal";

const EditProfileArtistScreen = (props) => {
  const profileCTX = useContext(ProfileContext);
  
  async function update() {
    await setProfileName(profilename);
    await setAboutInfo(location, category, genre, bio);
    const dow = getDow();
    const time = getTime();
    await setAvailabilityInfo(time, dow);

    profileCTX.updateBasic(new profileInfo(null, profilename));
    profileCTX.updateAbout(new aboutInfo(bio, category, genre, location));
    profileCTX.updateAvailability({ dow: dow, times: time });
  }

  const [profilename, setProfilename] = useState(
    profileCTX.basicInfo.profileName
  );
  const [location, setLocation] = useState(profileCTX.about.location);
  const [category, setCategory] = useState(profileCTX.about.category);
  const [genre, setGenre] = useState(profileCTX.about.genre);
  const [bio, setBio] = useState(profileCTX.about.bio);

  const [image, setImage] = useState(null);
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

  const [visible, setVisible] = useState(false);
  const [name, setName] = useState(false);
  const [profileType, setProifleType] = useState(false);
  const [url, setUrl] = useState(false);

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
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: global.color.primaryColors.background,
        height: "100%",
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          marginHorizontal: "8%",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            props.navigation.pop();
          }}
        >
          <Text
            style={{
              color: global.color.primaryColors.text,
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
            color: global.color.primaryColors.text,
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
          <TextInput
            style={styles.input}
            placeholder={"Profile Name"}
            placeholderTextColor={global.color.primaryColors.main}
            value={profilename}
            onChangeText={setProfilename}
          />
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
              color={global.color.primaryColors.buttonAccent}
            />
          ) : (
            <Ionicons
              name="chevron-down"
              size={28}
              color={global.color.primaryColors.buttonAccent}
            />
          )}
        </TouchableOpacity>
        {about ? (
          <View>
            <View style={[styles.inputContainer, { marginTop: 0 }]}>
              <TextInput
                style={styles.input}
                placeholder={"Location"}
                placeholderTextColor={global.color.primaryColors.main}
                onChangeText={setLocation}
                value={location}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={"Category"}
                placeholderTextColor={global.color.primaryColors.main}
                onChangeText={setCategory}
                value={category}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={"Genre"}
                placeholderTextColor={global.color.primaryColors.main}
                onChangeText={setGenre}
                value={genre}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, { marginTop: 10 }]}
                multiline={true}
                placeholder={"Bio"}
                onChangeText={setBio}
                value={bio}
                placeholderTextColor={global.color.primaryColors.main}
                maxLength={160}
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
              color={global.color.primaryColors.buttonAccent}
            />
          ) : (
            <Ionicons
              name="chevron-down"
              size={28}
              color={global.color.primaryColors.buttonAccent}
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
                    morn && { borderColor: "white" },
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
                    after && { borderColor: "white" },
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
                    evening && { borderColor: "white" },
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
                    night && { borderColor: "white" },
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
                  style={[styles.dayContainer, mon && { borderColor: "white" }]}
                  onPress={() => {
                    setMon(!mon);
                  }}
                >
                  <Text style={styles.timeText}>Mon</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.dayContainer, tue && { borderColor: "white" }]}
                  onPress={() => {
                    setTue(!tue);
                  }}
                >
                  <Text style={styles.timeText}>Tue</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.dayContainer, wed && { borderColor: "white" }]}
                  onPress={() => {
                    setWed(!wed);
                  }}
                >
                  <Text style={styles.timeText}>Wed</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.dayRow, { marginTop: "5%" }]}>
                <TouchableOpacity
                  style={[styles.dayContainer, thu && { borderColor: "white" }]}
                  onPress={() => {
                    setThu(!thu);
                  }}
                >
                  <Text style={styles.timeText}>Thu</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.dayContainer, fri && { borderColor: "white" }]}
                  onPress={() => {
                    setFri(!fri);
                  }}
                >
                  <Text style={styles.timeText}>Fri</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.dayContainer, sat && { borderColor: "white" }]}
                  onPress={() => {
                    setSat(!sat);
                  }}
                >
                  <Text style={styles.timeText}>Sat</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.dayRow, { marginTop: "5%" }]}>
                <TouchableOpacity
                  style={[styles.dayContainer, sun && { borderColor: "white" }]}
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
              color={global.color.primaryColors.buttonAccent}
            />
          ) : (
            <Ionicons
              name="chevron-down"
              size={28}
              color={global.color.primaryColors.buttonAccent}
            />
          )}
        </TouchableOpacity>
        {social ? (
          <View>
            <View style={styles.socialRow}>
              <TouchableOpacity
                style={[styles.inputContainerSocial, { marginTop: 0 }]}
                onPress={() => {
                  setName("Soundcloud");
                  setUrl("https://soundcloud.com/");
                  setProifleType("soundcloud");
                  setVisible(true);
                }}
              >
                <Image
                  source={require("../../assets/soundcloud.png")}
                  style={{ width: 40, height: 40 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.inputContainerSocial}
                onPress={() => {
                  setName("Instagram");
                  setUrl("https://instagram.com/");
                  setProifleType("instagram");
                  setVisible(true);
                }}
              >
                <Image
                  source={require("../../assets/insta.png")}
                  style={{ width: 40, height: 40 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.inputContainerSocial}
                onPress={() => {
                  setName("TikTok");
                  setUrl("https://tiktok.com/@");
                  setProifleType("tiktok");
                  setVisible(true);
                }}
              >
                <Image
                  source={require("../../assets/tiktok.png")}
                  style={{ width: 40, height: 40 }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.socialRow}>
              <TouchableOpacity
                style={styles.inputContainerSocial}
                onPress={() => {
                  setName("YouTube");
                  setUrl("https://youtube.com/@");
                  setProifleType("youtube");
                  setVisible(true);
                }}
              >
                <Image
                  source={require("../../assets/youtube.png")}
                  style={{ width: 40, height: 40 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.inputContainerSocial}
                onPress={() => {
                  setName("Spotify");
                  setUrl("https://open.spotify.com/artist/");
                  setProifleType("spotify");
                  setVisible(true);
                }}
              >
                <Image
                  source={require("../../assets/spotify.png")}
                  style={{ width: 40, height: 40 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.inputContainerSocial}
                onPress={() => {
                  setName("Twitter");
                  setUrl("https://twitter.com/");
                  setProifleType("twitter");
                  setVisible(true);
                }}
              >
                <Image
                  source={require("../../assets/facebook.png")}
                  style={{ width: 40, height: 40 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View></View>
        )}
      </ScrollView>
      <AddLinkModal visible={visible} setVisible={setVisible} name={name} profileType={profileType} url={url}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: "5%",
    marginBottom: "8%",
  },
  image: {
    alignSelf: "center",
    marginTop: "5%",
    resizeMode: "contain",
    height: 120,
    width: 120,
  },
  imageContainer: {
    borderRadius: 100,
    borderWidth: 2,
    width: 150,
    height: 150,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: global.color.primaryColors.adjacent,
    borderColor: global.color.primaryColors.adjacent,
    marginTop: "5%",
  },
  dayContainer: {
    width: "29%",
    borderColor: global.color.primaryColors.main,
    alignItems: "center",
    padding: "5%",
    borderWidth: 1,
    borderColor: global.color.primaryColors.adjacent,
    borderRadius: 12,
    backgroundColor: global.color.primaryColors.adjacent,
  },
  dayRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "10%",
    borderColor: "white",
  },
  timeText: {
    fontFamily: "Rubik-Regular",
    color: global.color.primaryColors.main,
    fontSize: 16,
  },
  timeContainer: {
    width: "47%",
    borderColor: global.color.primaryColors.main,
    alignItems: "center",
    padding: "5%",
    borderRadius: 12,
    backgroundColor: global.color.primaryColors.adjacent,
    borderWidth: 1,
    borderColor: global.color.primaryColors.adjacent,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "10%",
    borderColor: "white",
  },
  headerText: {
    fontFamily: "Rubik-Regular",
    fontSize: 18,
    color: global.color.primaryColors.text,
  },
  headerContainer: {
    margin: "8%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    paddingVertical: "5%",
    marginHorizontal: "5%",
    fontSize: 16,
    fontFamily: "Rubik-Regular",
    color: global.color.primaryColors.text,
  },
  inputContainerSocial: {
    backgroundColor: global.color.primaryColors.adjacent,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: 90,
    height: 90,
    borderRadius: 100,
  },
  inputSocial: {
    fontSize: 16,
    fontFamily: "Rubik-Regular",
    padding: "5%",
    marginTop: 5,
    width: "85%",
    borderRadius: 12,
    marginHorizontal: "8%",
    backgroundColor: global.color.primaryColors.adjacent,
    color: global.color.primaryColors.text,
  },
  inputContainer: {
    borderRadius: 12,
    marginHorizontal: "8%",
    marginTop: "5%",
    backgroundColor: global.color.primaryColors.adjacent,
  },
  inputHeader: {
    color: "#757575",
    fontFamily: "Rubik-Regular",
  },
});
export default EditProfileArtistScreen;
