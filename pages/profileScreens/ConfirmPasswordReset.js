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

const ConfirmPasswordReset = (props) => {
  const [confirmPass, setConfirmPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [error, setError] = useState(false);

  async function checkPassword() {
    const idToken = await AsyncStorage.getItem("changePasswordToken");
    if (newPass == "" || confirmPass == "") {
      setError(true);
    } else if (!(newPass === confirmPass)) {
      setError(true);
    } else {
      Alert.alert(
        "Are you sure you want to change your password?",
        "This can not be undone.",
        [
          {
            text: "Cancel",
            onPress: () => {},
            style: "destructive",
          },
          { text: "Reset", onPress: () => { reset(confirmPass, idToken) , props.navigation.navigate("ProfileSettingsScreen")}}
        ]
      );
      setError(false);
    }
  }

  async function reset(password, token){
    // // const IDtoken = await getID(token);
    // // console.log(IDtoken);
    // const email = await AsyncStorage.getItem("email");
    // const response = await authenticateUser(email, password);
    const response = await resetPassword(password, token);
    console.log(response);
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
            props.navigation.navigate("ProfileSettingsScreen");
          }}
        >
          <FontAwesome5
            name="chevron-left"
            size={32}
            color={colors.color.primaryColors.buttonAccent}
          />
        </TouchableOpacity>
        <View style={styles.largeContainer}>
          <Text style={styles.largeText}>Create New Password</Text>
        </View>
      </View>
      <View style={{ marginVertical: "10%" }}>
        <Text style={styles.smallText}>
          {/* Enter and confirm current password, then enter new password to 
          reset. */}
          Enter and confirm your new password.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize={false}
          onChangeText={setNewPass}
          style={styles.input}
          placeholder="New Password"
          placeholderTextColor={colors.color.primaryColors.placeHolderTextColor}
          inputMode="email"
          keyboardType="ascii-capable"
          secureTextEntry={true}
        />
      </View>
      <View>
        <View style={styles.inputContainer}>
          <TextInput
            autoCapitalize={false}
            onChangeText={setConfirmPass}
            style={styles.input}
            placeholder="Confirm New Password"
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
              New Password is invalid
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
          <Text style={styles.buttonText}>Reset</Text>
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
    marginTop: "80%",
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

export default ConfirmPasswordReset;
