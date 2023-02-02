import React, { useState } from "react";
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
import { createUser } from "../../util/auth";

const SignupScreen = (props) => {
  const [profileName, setProfileName] = useState("");
  const [email, setEmail] = useState("");
  //password needs to be at least 6 in length
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  // const height = useHeaderHeight();

  async function signUpHandler() {
    setIsAuth(true);
    await createUser(email, password);
    setIsAuth(false);
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
          style={styles.input}
          placeholder="Profile Name"
          placeholderTextColor={global.color.primaryColors.placeHolderTextColor}
          autoCorrect={false}
          autoCapitalize={false}
          returnKeyType={"done"}
          onChangeText={setProfileName}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={global.color.primaryColors.placeHolderTextColor}
          autoCorrect={false}
          autoCapitalize={false}
          inputMode={"email"}
          returnKeyType={"done"}
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
          returnKeyType={"done"}
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
          returnKeyType={"done"}
          textContentType={"oneTimeCode"}
          onChangeText={setConfirmPassword}
        />
      </View>
      <TouchableOpacity
        style={[styles.buttonContainer, { marginTop: "40%" }]}
        onPress={() => {
          signUpHandler();
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
