import React, { useState, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import colors from "../../styles/global";

import { ProfileContext } from "../../store/profileContext.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authenticateUser, forgotPassword } from "../../util/auth";
import { getID, resetPassword } from "../../util/profile";

const PasswordSecurityScreen = (props) => {
  const [currPass, setCurrPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [error, setError] = useState(false);

  async function checkPassword() {
    const email = await AsyncStorage.getItem("email");
    console.log(email);
    const response = await authenticateUser(email, currPass);
    console.log(response);
    AsyncStorage.setItem("changePasswordToken",response);
    if (response == ""){
      setError(true);
    }else{
      props.navigation.navigate("ConfirmPasswordReset");
    };
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.color.primaryColors.background,
      }}
    >
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
          <Text style={styles.largeText}>Reset Password</Text>
        </View>
      </View>
      <View style={{ marginVertical: "10%" }}>
        <Text style={styles.smallText}>
          Enter your current password.
        </Text>
      </View>
      <View>
        <View style={styles.inputContainer}>
          <TextInput
            autoCapitalize={false}
            onChangeText={setCurrPass}
            style={styles.input}
            placeholder="Current Password"
            placeholderTextColor={
              colors.color.primaryColors.placeHolderTextColor
            }
            inputMode="email"
            keyboardType="ascii-capable"
            secureTextEntry={true}
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
              Wrong password
            </Text>
          </View>
        ) : (
          <View></View>
        )}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            checkPassword();
          }}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
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
  topIconContainer: {
    marginHorizontal: "8%",
    flexDirection: "row",
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
    marginTop: "8%",
    backgroundColor: colors.color.primaryColors.adjacent,
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
  smallText: {
    fontSize: 18,
    marginHorizontal: "8%",
    alignSelf: "center",
    fontFamily: "Rubik-SemiBold",
    color: colors.color.primaryColors.main,
  },
});

export default PasswordSecurityScreen;
