import React, { useContext, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Animated,
  ActivityIndicator,
} from "react-native";
import styles from "../../styles/auth/startScreen";
import global from "../../styles/global";
import { authenticateUser } from "../../util/auth";
import {AuthContext} from "../../store/authContext";

const StartScreen = (props) => {
  const authCTX = useContext(AuthContext);

  const [passwordDontMatch, setPasswordDontMatch] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  async function authenticateHandler() {
    console.log(email);
    console.log(password);
    try {
      const token = await authenticateUser(email, password);
      console.log(token);
      setPasswordDontMatch(false);
      authCTX.authenticate(token);
      // props.navigation.navigate("TabNav")
    } catch (error) {
      setPasswordDontMatch(true);
      setIsAuth(false);
      console.log(error);
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
          <Text style={{ color: "red", fontFamily: "Rubik-Regular" }}>
            The Email and Password you entered do not match.
          </Text>
        </View>
      ) : (
        <View></View>
      )}
      <Animated.View style={{ transform: [{ translateX: shakeAnimation }] }}>
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
      </Animated.View>
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
