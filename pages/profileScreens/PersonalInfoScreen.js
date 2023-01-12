import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const PersonalInfoScreen = (props) => {
  return (
    <SafeAreaView>
      <View style={styles.topIconContainer}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.pop();
          }}
        >
          <FontAwesome5 name="chevron-left" size={32} color={"#2A51DB"} />
        </TouchableOpacity>
      </View>
      <View style={styles.sectionHeaderContainer}>
        <FontAwesome5 name="user-alt" size={22} />
        <Text style={styles.sectionHeaderText}>Personal Info</Text>
      </View>
      <View style={[styles.inputContainer, { marginTop: 10 }]}>
        <Text style={styles.inputHeader}>First Name</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputHeader}>Last Name</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputHeader}>Email Address</Text>
        <TextInput style={styles.input} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputHeader: {
    color: "#757575",
    fontFamily: "Rubik-Regular",
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    fontSize: 16,
    fontFamily: "Rubik-Regular",
    padding: 10,
    borderColor: "#757575",
    marginTop: 5,
  },
  inputContainer: {
    marginHorizontal: 35,
    marginTop: 25,
  },
  topIconContainer: {
    marginLeft: 35,
    // marginTop: 10,
  },
  headerText: {
    fontFamily: "Rubik-SemiBold",
    fontSize: 24,
  },
  smallerText: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    color: "#757575",
    marginTop: 10,
  },
  sectionHeaderContainer: {
    borderBottomWidth: 1,
    margin: 10,
    // marginBottom: 20,
    paddingLeft: 30,
    paddingBottom: 10,
    marginTop: 40,
    flexDirection: "row",
    borderColor: "#757575",
  },
  sectionHeaderText: {
    fontSize: 20,
    fontFamily: "Rubik-SemiBold",
    marginHorizontal: 15,
  },
});
export default PersonalInfoScreen;
