import React, { useContext, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  Modal
} from "react-native";
import styles from "../../styles/auth/startScreen";
import global from "../../styles/global";
import { authenticateUser } from "../../util/auth";
import { AuthContext } from "../../store/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from '@expo/vector-icons';
import InfoModal from "../../components/auth/InfoModal";

const StartScreen = (props) => {
  const authCTX = useContext(AuthContext);

  const [passwordDontMatch, setPasswordDontMatch] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [visible, setVisible] = useState(true);
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
      
      <TouchableOpacity style={{ marginLeft: 30 }} onPress={() => { setVisible(true) }}>
        <Ionicons name="ios-information-circle-outline" size={32} color={global.color.primaryColors.buttonAccent} />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "25%",
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
          autoCapitalize={"none"}
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
      {/* 
      DO NOT DELETE
      <View style={styles.newAccountContainer}>
        <Text style={styles.newAccountText}>Don't have an account?</Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Signup");
          }}
        >
          <Text style={styles.buttonTextSignUp}> Sign Up</Text>
        </TouchableOpacity>
      </View> */}
      <InfoModal visible={visible} setVisible={setVisible} />
    </SafeAreaView>
  );
};
export default StartScreen;
