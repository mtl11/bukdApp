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

const PersonalSecurityScreen = (props) => {
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
        <Text style={styles.inputHeader}>Current Password</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputHeader}>New Password</Text>
        <TextInput style={styles.input} textContentType="newPassword"secureTextEntry={true}/>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputHeader}>Confirm New Password</Text>
        <TextInput style={styles.input} textContentType="newPassword"secureTextEntry={true}/>
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          props.navigation.pop();
        }}
      >
        <Text style={styles.buttonText}>Reset Password</Text>
        <FontAwesome5 name="chevron-right" size={20} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
        marginHorizontal: 35,
        backgroundColor: "#2A51DB",
        borderRadius: 12,
        margin: "10%"
      },
      buttonText: {
        fontFamily: "Rubik-Medium",
        color: "white",
        fontSize: 20,
      },
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
export default PersonalSecurityScreen;
