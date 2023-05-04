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
import { FontAwesome5,Ionicons } from "@expo/vector-icons";
import colors from "../../styles/global";

import { AuthContext } from "../../store/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { resetPassword } from "../../util/profile";
import light from "../../styles/profile/light/confirmPassword";
import dark from "../../styles/profile/dark/confirmPassword";

const ConfirmPasswordReset = (props) => {
  const [confirmPass, setConfirmPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [error, setError] = useState(false);
  const authCTX = useContext(AuthContext);
  const styles = authCTX.mode === "light" ? light : dark;

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
            onPress: () => { },
            style: "destructive",
          },
          { text: "Reset", onPress: () => { reset(confirmPass, idToken), props.navigation.navigate("ProfileSettingsScreen") } }
        ]
      );
      setError(false);
    }
  }

  async function reset(password, token) {
    const response = await resetPassword(password, token);
    console.log(response);
  }
  return (
    <SafeAreaView
      style={styles.container}
    >
      <View style={styles.topIconContainer}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("ProfileSettingsScreen");
          }}
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color={styles.iconColor}
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
          placeholderTextColor={styles.placeHolderTextColor}
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
              styles.placeHolderTextColor
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

export default ConfirmPasswordReset;
