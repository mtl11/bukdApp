import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Icon,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import profileInformation from "../../models/profile/profile";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import EditModal from "../../components/EditProfileArtist.js";
import SocialTab from "../../components/SocialProfileTabArtist.js";
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

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        {/* <View style={{ justifyContent: "center" }}>
          <TouchableOpacity
            style={[styles.topIconContainer]}
            onPress={() => setModalVisible(true)}
          >
            <Entypo name="edit" size={28} color="#2A51DB" />
          </TouchableOpacity>
        </View> */}
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
      <View style={{ flexDirection: "row", marginHorizontal: 30 }}>
        <View style={styles.profilePicContainer}>
          <Image
            source={require("../../assets/ok-profile.jpeg")}
            style={styles.profilePic}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            marginLeft: 20,
          }}
        >
          <View style={styles.usernameContainer}>
            <Text style={styles.usernameText}>{dummyProfile.username}</Text>
          </View>
          <View style={styles.genreContainer}>
            <Text style={styles.genreText}>
              {dummyProfile.genre} | {dummyProfile.subgenre}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.bioContainer}>
        <Text style={styles.bioText}>{dummyProfile.bio}</Text>
      </View>
      <TouchableOpacity
        style={{
          alignSelf: "center",
          borderWidth: 1,
          borderRadius: 6,
          borderColor: "#2A51DB",
          width: "70%",
          marginTop: 10,
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
          flexDirection: "row",
          justifyContent: "space-evenly",
          borderBottomWidth: 1,
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={styles.tabContainer}
          onPress={() => {
            setSocialShow(true);
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
        <TouchableOpacity
          style={styles.tabContainer}
          onPress={() => {
            setSocialShow(false);
          }}
        >
          <View style={{ flexDirection: "column" }}>
            <View style={styles.tabTextContainer}>
              <Text style={styles.tabText}>Availability</Text>
            </View>
            {socialShow ? (
              <View></View>
            ) : (
              <View style={styles.tabBottomBar}></View>
            )}
          </View>
        </TouchableOpacity>
      </View>
      {socialShow ? <SocialTab /> : <View></View>}
      <EditModal visible={modalVisible} setModalVisible={setModalVisible} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabTextContainer: {
    paddingHorizontal: 15,
    borderRadius: 10,
    paddingBottom: 5,
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
  starIcons: {
    flexDirection: "row",
  },
  topIconContainer: {
    alignSelf: "flex-end",
    marginHorizontal: 30,
  },
  container: {
    backgroundColor: "#FFFFFF",
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
    borderWidth: 1.5,
    alignSelf: "center",
    borderRadius: 100,
    marginTop: 10,
    justifyContent: "center",
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
  genreText: {
    fontFamily: "Rubik-SemiBold",
    fontSize: 20,
    color: "#2A51DB",
  },
  genreContainer: {
    alignSelf: "center",
    marginTop: 8,
  },
  bioContainer: {
    paddingHorizontal: 40,
    textAlign: "center",
    marginTop: 10,
  },
  bioText: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    color: "#757575",
    textAlign: "left",
  },
});
export default ProfileScreen;
