import React, { useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,

} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import global from "../../styles/global";
import light from "../../styles/auth/light/forgotPassword";
import dark from "../../styles/auth/dark/forgotPassword";
import { AuthContext } from "../../store/authContext";

const ForgetPasswordScreen = (props) => {
  const authCTX = useContext(AuthContext);
  const styles = authCTX.mode === "light" ? light : dark;

  return (
    <SafeAreaView
      style={styles.container}
    >
      <TouchableOpacity
        style={styles.backButtonContainer}
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
      <View style={{ marginTop: "8%" }}>
        <Text style={styles.headerText}>
          Reset Password
        </Text>
      </View>
      <View style={{ marginBottom: "8%" }}>
        <Text style={styles.smallText}>
          Enter email associated with your account
          and we will send you insturctions to recover password.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          autoCapitalize={false}
          keyboardType="email-address"
          placeholder="Email"
          placeholderTextColor={styles.placeHolderColor}
        />
      </View>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          props.navigation.pop();
        }}
      >
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
// const styles = StyleSheet.create();

export default ForgetPasswordScreen;
