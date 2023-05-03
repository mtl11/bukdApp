import React, { useContext, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,

} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import global from "../../styles/global";
import light from "../../styles/auth/light/forgotPassword";
import dark from "../../styles/auth/dark/forgotPassword";
import { AuthContext } from "../../store/authContext";
import { resetPassword } from "../../util/auth";

const ForgetPasswordScreen = (props) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [email, setEmail] = useState("")
  const authCTX = useContext(AuthContext);
  const styles = authCTX.mode === "light" ? light : dark;
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  async function checkEmail() {
    if (email == ""){
      setEmailErrorMessage("Error: Please Enter an Email");
      return;
    }
    if (validateEmail(email) == null) {
      setEmailErrorMessage("Error: Invalid Email");
      return;
    }
    
    const errorCode = await resetPassword(email);
    if (errorCode == "400"){
      setEmailErrorMessage("Error: No Account Found Associated with Email")
      return;
    }
    setEmailErrorMessage("");
    setSuccessMessage("Email Sent Successfully")
  }
  return (
    <Modal visible={props.visible}>
      
    <SafeAreaView
      style={styles.container}
    >
      <TouchableOpacity
        style={styles.backButtonContainer}
        onPress={() => {
          props.setVisible(false);
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
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{emailErrorMessage}</Text>
      </View>
      <View style={styles.errorContainer}>
        <Text style={[styles.errorText,{color:global.color.primaryColors.main}]}>{successMessage}</Text>
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          // props.navigation.pop();
          checkEmail();
        }}
      >
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </SafeAreaView>
    </Modal>
  );
};

export default ForgetPasswordScreen;
