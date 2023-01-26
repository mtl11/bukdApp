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
import colors from "../../styles/global";

const PasswordSecurityScreen = (props) => {
  return (
    <SafeAreaView
      style={{
        flex:1,
        backgroundColor: colors.color.primaryColors.background,
      }}
    >
      <View style={styles.topIconContainer}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.pop();
          }}
        >
          <FontAwesome5
            name="chevron-left"
            size={32}
            color={colors.color.primaryColors.buttonAccent}
          />
        </TouchableOpacity>
        <View style={styles.largeContainer}>
          <Text style={styles.largeText}>Reset Password</Text>
        </View>
      </View>
      <View style={styles.textInputsContanier}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Current Password"
            placeholderTextColor={
              colors.color.primaryColors.placeHolderTextColor
            }
            secureTextEntry={true}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            placeholderTextColor={
              colors.color.primaryColors.placeHolderTextColor
            }
            secureTextEntry={true}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Renter New Password"
            placeholderTextColor={
              colors.color.primaryColors.placeHolderTextColor
            }
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          props.navigation.navigate("TabNav");
        }}
      >
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  textInputsContanier: {
    marginVertical: "10%",
  },
  largeText: {
    fontSize: 24,
    fontFamily: "Rubik-SemiBold",
    color: colors.color.primaryColors.text,
  },
  largeContainer: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  topIconContainer: {
    marginHorizontal: "8%",
    flexDirection: "row",
  },
  input: {
    paddingVertical: "5%",
    marginHorizontal: "5%",
    fontSize: 16,
    fontFamily: "Rubik-Regular",
    color: colors.color.primaryColors.text,
  },
  inputContainer: {
    borderRadius: 12,
    marginHorizontal: "8%",
    marginTop: "5%",
    backgroundColor: colors.color.primaryColors.adjacent,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 16,
    marginHorizontal: "8%",
    backgroundColor: colors.color.primaryColors.main,
    borderRadius: 12,
    marginTop: "20%",
  },
  buttonText: {
    fontFamily: "Rubik-Medium",
    color: "white",
    fontSize: 18,
  },
});

export default PasswordSecurityScreen;
