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
import global from "../../styles/global";
const ForgetPasswordScreen = (props) => {
  return (
    <SafeAreaView
      style={{
        height: "100%",
        backgroundColor: global.color.primaryColors.background,
      }}
    >
      <TouchableOpacity
        style={styles.backButtonContainer}
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
      <View style={{ marginVertical: "10%"}}>
        <Text style={styles.smallText}>
          First enter your current password. 
        </Text>
        <Text style={styles.smallText}>
        Then confirm the new password.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={global.color.primaryColors.placeHolderTextColor}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Current Password"
          placeholderTextColor={global.color.primaryColors.placeHolderTextColor}
          secureTextEntry={true}
        />
      </View>
      <View style={[styles.inputContainer,{marginTop: "10%"}]}>
        <TextInput
          style={styles.input}
          placeholder="New Password"
          placeholderTextColor={global.color.primaryColors.placeHolderTextColor}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Renter New Password"
          placeholderTextColor={global.color.primaryColors.placeHolderTextColor}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          props.navigation.navigate("TabNav");
        }}
      >
        <Text style={styles.buttonText}>Reset Password</Text>
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
   alignSelf: "center",
    fontFamily: "Rubik-SemiBold",
    color: global.color.primaryColors.main,
  },
  input: {
    paddingVertical: "5%",
    marginHorizontal: "5%",
    fontSize: 16,
    fontFamily: "Rubik-Regular",
    color: global.color.primaryColors.text,
  },
  inputContainer: {
    borderRadius: 12,
    marginHorizontal: "8%",
    marginTop: "5%",
    backgroundColor: global.color.primaryColors.adjacent,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 16,
    marginHorizontal: "8%",
    backgroundColor: global.color.primaryColors.main,
    borderRadius: 12,
    marginTop: "25%",
  },
  buttonText: {
    fontFamily: "Rubik-Medium",
    color: "white",
    fontSize: 18,
  },
});

export default ForgetPasswordScreen;
