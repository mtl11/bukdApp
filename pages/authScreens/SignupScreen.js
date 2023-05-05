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
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import styles from "../../styles/auth/light/signupScreen";
import global from "../../styles/global";
import { createUser, addAccountFB, authenticateUser } from "../../util/auth";
import { AuthContext } from "../../store/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAccessToken } from "../../util/profile";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SignupScreen = (props) => {
  const authCTX = useContext(AuthContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  //password needs to be at least 6 in length
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");


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
      const token = await authenticateUser(email, password);
      AsyncStorage.setItem("email", JSON.stringify(email));
      const accessToken = await getAccessToken();
      setEmailErrorMessage("");
      const response = await addAccountFB(email, firstName, lastName, localId, accessToken);
      setIsAuth(false);
      // const token = await authenticateUser(email, password);
      // AsyncStorage.setItem("email", JSON.stringify(email));
      // authCTX.authenticate(token);
    }
  }

  function checkInputs() {
    if (firstName == "") {
      setEmailErrorMessage("Error: Enter First Name");
      return;
    }
    if (lastName == "") {
      setEmailErrorMessage("Error: Enter Last Name");
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
    signUpHandler();
    setEmailErrorMessage("");
  }

  return (
    <Modal visible={props.visible}>
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={styles.topContainer}>
            <TouchableOpacity
              onPress={() => {
                props.setVisible(false);
              }}
            >
              <Ionicons
                name="arrow-back"
                size={28}
                color={global.color.primaryColors.main}
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
          <View style={styles.inputContainer}>
            <TextInput
              inputMode={"text"}
              keyboardType={"ascii-capable"}
              style={styles.input}
              placeholder="First Name"
              placeholderTextColor={global.color.secondaryColors.placeHolderTextColor}
              autoCorrect={false}
              autoCapitalize={false}
              returnKeyType={"next"}
              onChangeText={setFirstName}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              inputMode={"text"}
              keyboardType={"ascii-capable"}
              style={styles.input}
              placeholder="Last Name"
              placeholderTextColor={global.color.secondaryColors.placeHolderTextColor}
              autoCorrect={false}
              autoCapitalize={false}
              returnKeyType={"next"}
              onChangeText={setLastName}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              keyboardType={"ascii-capable"}
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={global.color.secondaryColors.placeHolderTextColor}
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
              placeholderTextColor={global.color.secondaryColors.placeHolderTextColor}
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
              placeholderTextColor={global.color.secondaryColors.placeHolderTextColor}
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
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default SignupScreen;
