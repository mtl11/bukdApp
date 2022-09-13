import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import styles from "../../styles/auth/startScreen";

const StartScreen = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/logo.png")}
        style={styles.image}
      ></Image>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={"rgba(9, 93, 106, .6)"}
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Password"
        placeholderTextColor={"rgba(9, 93, 106, .6)"}
      />
      <View style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          props.navigation.navigate("TabNav");
        }}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.orContainer}>
        <Text style={styles.forgotPasswordText}>OR</Text>
      </View>
      <TouchableOpacity
        style={styles.buttonContainerSignUp}
        onPress={() => {
          props.navigation.navigate("Signup");
        }}
      >
        <Text style={styles.buttonTextSignUp}>Sign Up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default StartScreen;
