import React, { Component, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Animated,
} from "react-native";
import styles from "../../styles/auth/startScreen";
import { FontAwesome5 } from "@expo/vector-icons";
import { modes } from "../../models/dummyData.js";
const StartScreen = (props) => {
  const [matchedCreds, setMatchedCreds] = useState(false);
  const [passwordDontMatch, setPasswordDontMatch] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function checkCreds() {
    if (
      email == modes.artist.auth.email &&
      password == modes.artist.auth.password
    ) {
      props.navigation.navigate("TabNav");
    }else{
      startShake();
      setPasswordDontMatch(true);
    }
  }
  const shakeAnimation = new Animated.Value(0);

  function startShake() {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/biglogo.png")}
        style={styles.logoImage}
      ></Image>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome Back</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize={false}
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={"#C4C4C4"}
          onChangeText={setEmail}
          autoCorrect={false}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor={"#C4C4C4"}
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
      {passwordDontMatch ? <View style={{alignSelf:"center"}}>
        <Text style={{color:"red", fontFamily: "Rubik-Regular"}}>
         The Email and Password you entered do not match.
        </Text>
      </View> : <View></View>}
      <Animated.View style={{ transform: [{ translateX: shakeAnimation }] }}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            checkCreds();
            // if (matchedCreds == true) {
            //   props.navigation.navigate("TabNav");
            // } else {
            
            // }
          }}
        >
          <Text style={styles.buttonText}>Login</Text>

          <FontAwesome5 name="chevron-right" size={20} color="white" />
        </TouchableOpacity>
      </Animated.View>
      <View style={styles.newAccountContainer}>
        <Text style={styles.newAccountText}>Don't have an account?</Text>
        <TouchableOpacity
          // style={styles.buttonContainerSignUp}
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
