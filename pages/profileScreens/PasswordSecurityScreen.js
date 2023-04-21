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

import { AuthContext } from "../../store/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authenticateUser, forgotPassword } from "../../util/auth";
import { getID, resetPassword } from "../../util/profile";

import light from "../../styles/profile/light/passwordSecurity";
import dark from "../../styles/profile/dark/passwordSecurity";

const PasswordSecurityScreen = (props) => {
  const [currPass, setCurrPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [error, setError] = useState(false);
  const authCTX = useContext(AuthContext);
  const styles = authCTX.mode === "light" ? light : dark;

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
      style={styles.container}
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
            color={styles.iconColor}
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

export default PasswordSecurityScreen;
