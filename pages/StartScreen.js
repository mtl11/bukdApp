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

const StartScreen = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
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
      <TouchableOpacity style={styles.buttonContainer}>
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

const styles = StyleSheet.create({
  image: {
    alignSelf: "center",
    marginTop: "15%",
  },
  orContainer: {
    marginVertical: 50,
    alignSelf: "center",
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginHorizontal: "10%",
    marginTop: 3,
    marginBottom: 25,
  },
  container: {
    backgroundColor: "#095D6A",
    height: "100%",
  },
  forgotPasswordText: {
    fontFamily: "Rubik-Regular",
    color: "#FDF6F0",
    fontSize: 12,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 18,
    backgroundColor: "rgba(253, 246, 240, 0.6)",
    marginHorizontal: "10%",
    borderRadius: 4,
    fontSize: 14,
    fontFamily: "Rubik-Regular",
    marginTop: 25,
    color: "#FDF6F0",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: "10%",
    paddingVertical: 20,
    backgroundColor: "#F57B51",
    boxShadow: "1px 1px 2px rgba(253, 246, 240, 0.6)",
    borderRadius: 4,
  },
  buttonContainerSignUp: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: "10%",
    paddingVertical: 20,
    backgroundColor: "#FDF6F0",
    boxShadow: "1px 1px 2px rgba(253, 246, 240, 0.6)",
    borderRadius: 4,
  },
  buttonTextSignUp: {
    alignSelf: "center",
    fontFamily: "Rubik-Regular",
    color: "#F57B51",
    fontSize: 14,
  },
  buttonText: {
    alignSelf: "center",
    fontFamily: "Rubik-Regular",
    color: "#FDF6F0",
    fontSize: 14,
  },
});
export default StartScreen;
