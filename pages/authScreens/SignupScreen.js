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
    { label: "Artist/Performer", value: "1" },
    { label: "Venue", value: "2" },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => {
          props.navigation.navigate("Start");
        }}
      >
        <FontAwesome5 name="arrow-left" size={28} color="white" />
      </TouchableOpacity>
      <Image
        source={require("../../assets/logo.png")}
        style={styles.image}
      ></Image>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor={"rgba(9, 93, 106, .6)"}
      />
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor={"rgba(9, 93, 106, .6)"}
      />
      <TextInput
        style={styles.input}
        placeholder="Create Password"
        secureTextEntry={true}
        placeholderTextColor={"rgba(9, 93, 106, .6)"}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
        placeholderTextColor={"rgba(9, 93, 106, .6)"}
      />
      <View>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={data}
          labelField="label"
          valueField="value"
          placeholder="Who are you?"
          value={value}
          onChange={(item) => {
            setValue(item.value);
          }}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Primary Location"
        placeholderTextColor={"rgba(9, 93, 106, .6)"}
      />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          props.navigation.navigate("Setup");
        }}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignupScreen;
