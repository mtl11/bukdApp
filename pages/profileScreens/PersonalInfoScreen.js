import React, { useEffect, useState, useContext } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { ProfileContext } from "../../store/profileContext.js";
import colors from "../../styles/global";
import { getPersonalInfo, setPersonalInfo } from "../../util/profile";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PersonalInfoScreen = (props) => {
 
  const profileCTX = useContext(ProfileContext);
  const [firstName, setFirstName] = useState(profileCTX.personalInfo.firstName);
  const [lastName, setLastName] = useState(profileCTX.personalInfo.lastName);
  console.log(profileCTX.personalInfo);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  async function update() {
    setLoading(true);
    const localId = await AsyncStorage.getItem("localId");
    if (firstName != (null || "") && lastName != (null|| "")) {
      const response = await setPersonalInfo(firstName, lastName, localId);
      profileCTX.updatePersonalInfo({firstName: firstName,lastName: lastName});
      setError(false);
    } else {
      setError(true);
    }
    setLoading(false);
    props.navigation.pop();
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topIconContainer}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.pop();
          }}
        >
          <FontAwesome5
            name="chevron-left"
            size={32}
            color={colors.color.primaryColors.buttonAccent}
          />
        </TouchableOpacity>
        <View style={styles.largeContainer}>
          <Text style={styles.largeText}>Personal Information</Text>
        </View>
      </View>
      <View style={styles.textInputsContanier}>
        <View style={[styles.inputContainer, { marginTop: 10 }]}>
          <TextInput
            style={styles.input}
            placeholder={"First Name"}
            placeholderTextColor={colors.color.primaryColors.main}
            onChangeText={setFirstName}
            value={firstName}
            maxLength={35}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={"Last Name"}
            placeholderTextColor={colors.color.primaryColors.main}
            onChangeText={setLastName}
            value={lastName}
            maxLength={35}
          />
        </View>
        {error ? (
          <View style={{ alignSelf: "center" }}>
            <Text
              style={{
                color: colors.color.primaryColors.errorText,
                fontFamily: "Rubik-Regular",
              }}
            >
              Please fill in all spaces
            </Text>
          </View>
        ) : (
          <View></View>
        )}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            update();
          }}
        >
          {!loading ? (
            <Text style={styles.buttonText}>Save Changes</Text>
          ) : (
            <ActivityIndicator size={22}></ActivityIndicator>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textInputsContanier: {
    marginVertical: "10%",
  },
  container: {
    flex: 1,
    backgroundColor: colors.color.primaryColors.background,
  },
  largeText: {
    fontSize: 20,
    fontFamily: "Rubik-SemiBold",
    color: colors.color.primaryColors.text,
  },
  largeContainer: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputHeader: {
    color: colors.color.primaryColors.headerText,
    fontFamily: "Rubik-Regular",
  },
  inputHeaderContainer: {
    marginHorizontal: "8%",
  },
  input: {
    paddingVertical: "5%",
    marginHorizontal: "5%",
    fontSize: 16,
    fontFamily: "Rubik-Regular",
    color: colors.color.primaryColors.text,
  },
  inputContainer: {
    borderRadius: 12,
    marginHorizontal: "8%",
    marginTop: "5%",
    backgroundColor: colors.color.primaryColors.adjacent,
  },
  topIconContainer: {
    marginHorizontal: "8%",
    flexDirection: "row",
    // marginTop: "5%"
  },
  headerText: {
    fontFamily: "Rubik-SemiBold",
    fontSize: 18,
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
    paddingLeft: 30,
    paddingBottom: 10,
    marginTop: 40,
    flexDirection: "row",
    borderColor: "#757575",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 16,
    marginHorizontal: "8%",
    backgroundColor: colors.color.primaryColors.main,
    borderRadius: 12,
    marginTop: "90%",
  },
  buttonText: {
    fontFamily: "Rubik-Medium",
    color: "white",
    fontSize: 18,
  },
});
export default PersonalInfoScreen;
