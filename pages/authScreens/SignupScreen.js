import React, { useContext, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Modal,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "../../styles/auth/light/signupScreen";
import global from "../../styles/global";
import { createUser, addAccountFB, authenticateUser } from "../../util/auth";
import { AuthContext } from "../../store/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { color } from "react-native-elements/dist/helpers";

const SignupScreen = (props) => {
  const authCTX = useContext(AuthContext);

  const [profileName, setProfileName] = useState("");
  const [email, setEmail] = useState("");
  //password needs to be at least 6 in length
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [acccountType, setAccountType] = useState("");

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePasswordsLength = () => {
    if (password.length >= 10 && confirmPassword.length >= 10) {
      return true;
    }
    return false;
  };

  const validatePasswords = () => {
    if (password == confirmPassword) {
      return true;
    }
    return false;
  };

  async function signUpHandler() {
    setIsAuth(true);
    const response = await createUser(email, password);
    if (response) {
      setEmailErrorMessage("Error: email already in use");
      setIsAuth(false);
    } else {
      const localId = await AsyncStorage.getItem("localId");
      setEmailErrorMessage("");
      const response = await addAccountFB(email, profileName, localId);
      setIsAuth(false);
      const token = await authenticateUser(email, password);
      AsyncStorage.setItem("email", JSON.stringify(email));
      authCTX.authenticate(token);
    }
  }

  function checkInputs() {
    if (acccountType == "") {
      setEmailErrorMessage("Error: Must select account type");
      return;
    }
    if (profileName.alphanumeric) {
      setEmailErrorMessage("Error: Invalid Profile Name");
      return;
    }
    if (validateEmail(email) == null) {
      setEmailErrorMessage("Error: Invalid Email");
      return;
    }
    if (!validatePasswordsLength()) {
      setEmailErrorMessage("Error: Passwords must be at least 10 charaters");
      return;
    }
    if (!validatePasswords()) {
      setEmailErrorMessage("Error: Passwords must match");
      return;
    }
    setEmailErrorMessage("");
    // signUpHandler();
  }

  return (
    <Modal visible={props.visible}>
      <SafeAreaView style={styles.container}>
        <View style={styles.topContainer}>
          <TouchableOpacity
            onPress={() => {
              props.setVisible(false);
            }}
          >
            <FontAwesome5
              name="chevron-left"
              size={32}
              color={global.color.primaryColors.text}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignSelf: "center",
            marginVertical: "5%",
          }}
        >
          <Text style={styles.bigText}>We are so happy you are here.</Text>
          <Text style={styles.bigText}>Let’s get you set up!</Text>
        </View>
        <View style={styles.passwordInfoContainer}>
          <Text style={styles.passwordInfoText}>Choose type of account</Text>
        </View>
        <View style={{ flexDirection: "row", marginHorizontal: "8%", justifyContent: "space-evenly", marginTop: "2%" }}>
          <TouchableOpacity
            style={{
              backgroundColor: global.color.primaryColors.adjacent,
              padding: 16,
              borderRadius: 12,
              width: "33%",
              borderWidth: 1,
              borderColor: acccountType == "Performer" ? "white" : global.color.primaryColors.background
            }}
            onPress={() => {
              setAccountType("Performer")
            }}>
            <Text style={{
              color: acccountType == "Performer" ?
                "white" : global.color.primaryColors.placeHolderTextColor,
              fontFamily: "Rubik-Regular",
              textAlign: "center",
              fontSize: 16
            }}>
              Performer
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            backgroundColor: global.color.primaryColors.adjacent,
            padding: 16,
            borderRadius: 12,
            width: "33%",
            borderWidth: 1,
            borderColor: acccountType == "Venue" ? "white" : global.color.primaryColors.background
          }}
            onPress={() => {
              setAccountType("Venue")
            }}>
            <Text style={{
              color: acccountType == "Venue" ?
                "white" : global.color.primaryColors.placeHolderTextColor, fontFamily: "Rubik-Regular",
              textAlign: "center", fontSize: 16
            }}>
              Venue
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            inputMode={"text"}
            keyboardType={"ascii-capable"}
            style={styles.input}
            placeholder="Profile Name (Optional)"
            placeholderTextColor={global.color.primaryColors.placeHolderTextColor}
            autoCorrect={false}
            autoCapitalize={false}
            returnKeyType={"next"}
            onChangeText={setProfileName}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            keyboardType={"ascii-capable"}
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={global.color.primaryColors.placeHolderTextColor}
            autoCorrect={false}
            autoCapitalize={false}
            inputMode={"email"}
            returnKeyType={"next"}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.passwordInfoContainer}>
          <Text style={styles.passwordInfoText}>
            Password must be at least 10 characters
          </Text>
        </View>
        <View style={[styles.inputContainer, { marginTop: "2%" }]}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={global.color.primaryColors.placeHolderTextColor}
            secureTextEntry={true}
            textContentType={"oneTimeCode"}
            autoCapitalize={false}
            returnKeyType={"next"}
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.passwordInfoContainer}>
          <Text style={styles.passwordInfoText}>Passwords must match</Text>
        </View>
        <View style={[styles.inputContainer, { marginTop: "2%" }]}>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor={global.color.primaryColors.placeHolderTextColor}
            secureTextEntry={true}
            autoCapitalize={false}
            returnKeyType={"next"}
            textContentType={"oneTimeCode"}
            onChangeText={setConfirmPassword}
          />
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{emailErrorMessage}</Text>
        </View>
        <TouchableOpacity
          style={[styles.buttonContainer, { marginTop: "20%" }]}
          onPress={() => {
            checkInputs();
          }}
        >
          {!isAuth ? (
            <Text style={styles.buttonText}>Create Account</Text>
          ) : (
            <ActivityIndicator size={22} />
          )}
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

export default SignupScreen;
