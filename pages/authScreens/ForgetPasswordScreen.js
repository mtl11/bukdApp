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
import { FontAwesome5 } from "@expo/vector-icons";
const ForgetPasswordScreen = (props) => {
  return (
    <SafeAreaView>
      <TouchableOpacity
        style={styles.backButtonContainer}
        onPress={() => {
          props.navigation.navigate("Start");
        }}
      >
        <FontAwesome5 name="chevron-left" size={32} color={"#2A51DB"} />
      </TouchableOpacity>
      <View>
        <Text style={styles.bigText}>Forgot Password</Text>
        <Text style={styles.smallText}>
          Enter the email address associated with your account.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={"#C4C4C4"}
        />
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          props.navigation.navigate("TabNav");
        }}
      >
        <Text style={styles.buttonText}>Reset Password</Text>
        <FontAwesome5 name="chevron-right" size={20} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  backButtonContainer: {
    marginLeft: 40,
    marginTop: "7%",
  },
  bigText: {
    fontSize: 49,
    marginLeft: 40,
    marginRight: 40,
    marginTop: "14%",
    fontFamily: "Rubik-SemiBold",
  },
  smallText: {
    fontSize: 20,
    marginLeft: 40,
    marginRight: 40,
    marginTop: "14%",
    fontFamily: "Rubik-SemiBold",
    color: "#C4C4C4",
  },
  input: {
    paddingVertical: 15,
    marginHorizontal: 8,
    fontSize: 20,
    fontFamily: "Rubik-Regular",
    marginTop: 37,
  },
  inputContainer: {
    borderBottomWidth: 2,
    marginHorizontal: 40,
    borderColor: "#C4C4C4",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    marginHorizontal: 40,
    backgroundColor: "#2A51DB",
    borderRadius: 12,
    marginTop: "18%"
  },
  buttonText: {
    fontFamily: "Rubik-Medium",
    color: "white",
    fontSize: 20,
  },
});

export default ForgetPasswordScreen;
