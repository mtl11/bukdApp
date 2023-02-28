import { useLinkProps } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Text,
  TextInput,
  ActivityIndicator,
} from "react-native";
import colors from "../styles/global";
import { SocialLinks, TYPE_MOBILE } from "social-links";
import { FontAwesome5 } from "@expo/vector-icons";
import { setSocial } from "../util/profile";

const AddLinkModal = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const socialLinks = new SocialLinks();
  const [username, setUsername] = useState("");
  const [valid, setValid] = useState(false);
  async function updateSocial() {
    setIsAuth(true);
    const header = props.profileType;
    const usernameURL = props.url + username;
    await setSocial(header, usernameURL);
    setIsAuth(false);
    props.setVisible(false);
  }
  return (
    <Modal visible={props.visible}>
      <SafeAreaView style={styles.container}>
        <View style={styles.topIconContainer}>
          <TouchableOpacity
            onPress={() => {
              setValid(false);
              props.setVisible(false);
            }}
          >
            <FontAwesome5
              name="chevron-left"
              size={32}
              color={colors.color.primaryColors.buttonAccent}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: "8%" }}>
          <Text style={styles.text}>
            Enter username for {props.name} to link on Bukd profile.
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            autoCapitalize={false}
            keyboardType="email-address"
            placeholder="Username"
            placeholderTextColor={
              colors.color.primaryColors.placeHolderTextColor
            }
            onChangeText={setUsername}
          />
        </View>
        {valid ? (
          <View style={{ alignSelf: "center" }}>
            <Text
              style={{
                color: colors.color.primaryColors.errorText,
                fontFamily: "Rubik-Regular",
              }}
            >
              Username is invalid
            </Text>
          </View>
        ) : (
          <View></View>
        )}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            const val = socialLinks.isValid(
              props.profileType,
              props.url + username
            );
            setValid(!val);
            if (val) {
              updateSocial();
            }
          }}
        >
          {!isAuth ? (
            <Text style={styles.buttonText}>Add</Text>
          ) : (
            <ActivityIndicator size={22} />
          )}
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    marginLeft: 40,
    marginRight: 40,
    alignSelf: "center",
    fontFamily: "Rubik-SemiBold",
    color: colors.color.primaryColors.main,
  },
  topIconContainer: {
    marginHorizontal: "8%",
    marginTop: "7%",
    flexDirection: "row",
  },
  container: {
    flex: 1,
    backgroundColor: colors.color.primaryColors.background,
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
    marginTop: "90%",
  },
  buttonText: {
    fontFamily: "Rubik-Medium",
    color: "white",
    fontSize: 18,
  },
});
export default AddLinkModal;
