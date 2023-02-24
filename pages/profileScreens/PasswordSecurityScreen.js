import React, { useState, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import colors from "../../styles/global";

import { ProfileContext } from "../../store/profileContext.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { forgotPassword } from "../../util/auth";

const PasswordSecurityScreen = (props) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false)
  
  async function checkEmail() {
    const curr = await AsyncStorage.getItem("email");
    const idToken = await AsyncStorage.getItem("token");
    const extrated = JSON.stringify(JSON.parse(curr));

    if (extrated === JSON.stringify(email)){
      console.log(idToken);
      // await forgotPassword(email);
      setError(false);
    }else{
      setError(true);
    }
  };
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
      <View style={{ marginVertical: "8%"}}>
        <Text style={styles.smallText}>
          Enter email associated with your account 
          and we will send you insturctions to reset password.
        </Text>
      </View>
      <View style={styles.textInputsContanier}>
        <View style={styles.inputContainer}>
          <TextInput
            autoCapitalize={false}
            onChangeText={setEmail}
            style={styles.input}
            placeholder="Current Email"
            placeholderTextColor={
              colors.color.primaryColors.placeHolderTextColor
            }
            inputMode="email"
            keyboardType="email-address"
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
              Email is not associated with account
            </Text>
          </View>
        ) : (
          <View></View>
        )}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            checkEmail();
          }}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  textInputsContanier: {
    marginVertical: "10%",
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
    backgroundColor: colors.color.primaryColors.adjacent,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 16,
    marginHorizontal: "8%",
    backgroundColor: colors.color.primaryColors.main,
    borderRadius: 12,
    marginTop: "100%",
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
  }
});

export default PasswordSecurityScreen;
