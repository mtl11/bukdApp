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
} from "react-native";
import profileInformation from "../../models/profile/profile";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const ProfileScreen = (props) => {
  const dummyProfile = new profileInformation(
    123,
    "M-OKAY",
    "DJ",
    "House",
    "Tucson local attending UA'23 specializing in bringing a different energy to bars and clubs in the area."
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profilePicContainer}>
        <Image />
      </View>
      <View style={styles.usernameContainer}>
        <Text style={styles.usernameText}>{dummyProfile.username}</Text>
      </View>
      <View style={styles.genreContainer}>
        <Text style={styles.genreText}>
          {dummyProfile.genre} | {dummyProfile.subgenre}
        </Text>
      </View>
      <View style={styles.bioContainer}>
        <Text style={styles.bioText}>{dummyProfile.bio}</Text>
      </View>
      <TouchableOpacity style={styles.buttonContainer}>
        <View>
          <Text style={[styles.buttontext,{fontSize: 16, fontFamily: "Rubik-Regular"}]}>Book Now</Text>
          <Text style={styles.buttontext}>6pm October 20th</Text>
        </View>
        <View style={styles.iconContainer}>
          <FontAwesome5 name="chevron-right" size={24} color={"white"} />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    
  },
  buttontext: {
    color: "white",
    fontFamily: "Rubik-SemiBold",
    fontSize: 20
  },
  iconContainer: {
    justifyContent:"center"
  },
  profilePicContainer: {
    borderWidth: 1,
    width: 157,
    height: 157,
    alignSelf: "center",
    borderRadius: 11,
    marginTop: 60
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
    paddingHorizontal: 50,
    textAlign: "center",
    marginTop: 15,
  },
  bioText: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    color: "#757575",
    textAlign: "left",
  },
});
export default ProfileScreen;
