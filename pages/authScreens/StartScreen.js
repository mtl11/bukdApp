import React, { useContext, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";
import styles from "../../styles/auth/startScreen";
import global from "../../styles/global";
import { authenticateUser } from "../../util/auth";
import { AuthContext } from "../../store/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
const StartScreen = (props) => {
  const authCTX = useContext(AuthContext);

  const [passwordDontMatch, setPasswordDontMatch] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  async function authenticateHandler() {
    try {
      const token = await authenticateUser(email, password);
      setPasswordDontMatch(false);
      authCTX.authenticate(token);
      AsyncStorage.setItem("email", email);
    } catch (error) {
      setPasswordDontMatch(true);
      setIsAuth(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "30%",
        }}
      >
        <Image
          source={require("../../assets/Logo.png")}
          style={styles.logoImage}
        />
        <Image
          source={require("../../assets/Vector.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Your local live music hub</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize={false}
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={global.color.primaryColors.placeHolderTextColor}
          onChangeText={setEmail}
          autoCorrect={false}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor={global.color.primaryColors.placeHolderTextColor}
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity
        style={styles.forgotPasswordContainer}
        onPress={() => {
          props.navigation.navigate("ForgetPass");
        }}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
      {passwordDontMatch ? (
        <View style={{ alignSelf: "center" }}>
          <Text style={{ color: global.color.primaryColors.errorText, fontFamily: "Rubik-Regular" }}>
            Entered email and password do not match our records.
          </Text>
        </View>
      ) : (
        <View></View>
      )}
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          setIsAuth(true);
          authenticateHandler();
        }}
      >
        {!isAuth ? (
          <Text style={styles.buttonText}>Login</Text>
        ) : (
          <ActivityIndicator size={22} />
        )}
      </TouchableOpacity>
      <View style={styles.newAccountContainer}>
        <Text style={styles.newAccountText}>Don't have an account?</Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Signup");
          }}
        >
          <Text style={styles.buttonTextSignUp}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default StartScreen;
