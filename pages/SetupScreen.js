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

import { FontAwesome5 } from "@expo/vector-icons";
const Setupscreen = (props) => {
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
      <Image
        source={require("../assets/logo.png")}
        style={styles.image}
      ></Image>
      <TouchableOpacity
        style={[styles.buttonContainer, { backgroundColor: "#FDF6F0" }]}
        onPress={() => {
            props.navigation.navigate("ArtistSetup");
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
          //   props.navigation.navigate("Setup");
        }}
      >
        <Text style={[styles.buttonText, { color: "#FDF6F0" }]}>
          Skip For Now
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#095D6A",
    height: "100%",
  },
  iconContainer: { marginHorizontal: "5%" },
  image: {
    alignSelf: "center",
    marginTop: "5%",
    resizeMode: "contain",
  },
  buttonContainer: {
    marginTop: "60%",
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: "10%",
    paddingVertical: 20,
    backgroundColor: "#FBBC58",
    borderRadius: 4,
  },
  buttonContainerSkip: {
    marginTop: "60%",
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: "10%",
    paddingVertical: 20,
    backgroundColor: "#FBBC58",
    borderRadius: 4,
  },
});

export default Setupscreen;
