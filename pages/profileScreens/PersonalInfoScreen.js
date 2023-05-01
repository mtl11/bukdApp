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
import { getPersonalInfo, setPersonalInfo, getAccessToken} from "../../util/profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../store/authContext.js";
import dark from "../../styles/profile/dark/personalInfo.js";
import light from "../../styles/profile/light/personalInfo.js";

const PersonalInfoScreen = (props) => {
  const profileCTX = useContext(ProfileContext);
  const authCTX = useContext(AuthContext);
  const styles = authCTX.mode === "light" ? light : dark;

  const [firstName, setFirstName] = useState(profileCTX.personalInfo.firstName);
  const [lastName, setLastName] = useState(profileCTX.personalInfo.lastName);
  console.log(profileCTX.personalInfo);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  async function update() {
    const accessToken = await getAccessToken();
    setLoading(true);
    const localId = await AsyncStorage.getItem("localId");
    if (firstName != (null || "") && lastName != (null|| "")) {
      const response = await setPersonalInfo(firstName, lastName, localId, accessToken);
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
            color={styles.iconColor}
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

export default PersonalInfoScreen;