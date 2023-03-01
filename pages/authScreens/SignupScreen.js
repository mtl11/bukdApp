import React, { useContext, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "../../styles/auth/signupScreen";
import global from "../../styles/global";
import { createUser, addAccountFB, authenticateUser } from "../../util/auth";
import {AuthContext} from "../../store/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignupScreen = (props) => {
  const authCTX = useContext(AuthContext);

  const [profileName, setProfileName] = useState("");
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
      setEmailErrorMessage("");
      const response = await addAccountFB(email, profileName, localId);
      setIsAuth(false);
      const token = await authenticateUser(email, password);
      AsyncStorage.setItem("email",JSON.stringify(email));
      authCTX.authenticate(token);
    }
  }

  function checkInputs() {
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
    signUpHandler();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.pop();
          }}
        >
          <FontAwesome5
            name="chevron-left"
            size={32}
            color={global.color.primaryColors.main}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignSelf: "center",
          marginVertical: "10%",
        }}
      >
        <Text style={styles.bigText}>We are so happy you are here.</Text>
        <Text style={styles.bigText}>Let’s get you set up!</Text>
      </View>
      <View style={[styles.inputContainer, { marginTop: 0 }]}>
        <TextInput
          inputMode={"text"}
          keyboardType={"ascii-capable"}
          style={styles.input}
          placeholder="Profile Name"
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
        style={[styles.buttonContainer, { marginTop: "30%" }]}
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
  );
};

export default SignupScreen;
