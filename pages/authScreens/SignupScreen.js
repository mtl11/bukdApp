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
import { Dropdown } from "react-native-element-dropdown";
import styles from "../../styles/auth/signupScreen";

const SignupScreen = (props) => {
  const [value, setValue] = useState("Artist/Performer");
  const data = [
    { label: "Live Music Fan", value: "0" },
    { label: "Artist/Performer", value: "1" },
    { label: "Venue/Business", value: "2" },
  ];
  const [profileType, setProfileType] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => {
          props.navigation.navigate("Start");
        }}
      >
        <FontAwesome5 name="chevron-left" size={32} color="#2A51DB" />
      </TouchableOpacity>
      <View>
        <Text style={styles.bigText}>
          Create Account
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor={"#C4C4C4"}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={"#C4C4C4"}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={"#C4C4C4"}
        />
      </View>
      <View>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={data}
          labelField="label"
          valueField="value"
          placeholder="Account Type"
          value={value}
          onChange={(item) => {
            setValue(item.value);
            setProfileType(item.label);
          }}
        />
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          if(profileType == "Artist/Performer"){
            props.navigation.navigate("ArtistSetup",{profileType:profileType});
          }
          if(profileType == "Venue/Business"){
            props.navigation.navigate("VenueSetup",{profileType:profileType});
          }
        }}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignupScreen;
