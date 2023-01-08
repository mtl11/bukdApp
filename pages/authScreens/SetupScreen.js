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
} from "react-native";
import styles from "../../styles/auth/setupScreen";
import { FontAwesome5 } from "@expo/vector-icons";
const Setupscreen = (props) => {
  const profileType = props.route.params.profileType;
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => {
          props.navigation.navigate("Signup");
        }}
      >
        <FontAwesome5 name="arrow-left" size={28} color="white" />
      </TouchableOpacity>
      {/* <Image
        source={require("../../assets/logo.png")}
        style={styles.image}
      ></Image> */}
      <TouchableOpacity
        style={[styles.buttonContainer, { backgroundColor: "#FDF6F0" }]}
        onPress={() => {
          {
            profileType == "Performer"
              ? props.navigation.navigate("ArtistSetup")
              : console.log("Venue");
          }
        }}
      >
        <Text style={[styles.buttonText, { color: "#F57B51" }]}>
          Setup My Profile
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.buttonContainerSkip,
          { marginTop: 30, backgroundColor: "#F57B51" },
        ]}
        onPress={() => {
          props.navigation.navigate("TabNav");
        }}
      >
        <Text style={[styles.buttonText, { color: "#FDF6F0" }]}>
          Skip For Now
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Setupscreen;
