import React, { useState, useContext, useEffect } from "react";
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
import colors from "../../styles/global";
import { SocialLinks } from "social-links";
import { FontAwesome5 } from "@expo/vector-icons";
import { setSocial } from "../../util/profile";
import { ProfileContext } from "../../store/profileContext.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
const SocialModalScreen = (props) => {
  // console.log(props.route.params);
  const profileCTX = useContext(ProfileContext);
  const [isAuth, setIsAuth] = useState(false);
  const socialLinks = new SocialLinks();
  const [username, setUsername] = useState(props.route.params.username);
  const [valid, setValid] = useState(false);

  async function updateSocial() {
    const localId = await AsyncStorage.getItem("localId");
    setIsAuth(true);
    const header = props.route.params.profileType;
    const usernameURL = props.route.params.url + username;
    const newSocial = profileCTX.social;
    const type = props.route.params.profileType;
    newSocial[type] = { url: usernameURL, username: username };
    profileCTX.updateSocial(newSocial);
    await setSocial(header, usernameURL, localId, username);
    setIsAuth(false);
    props.navigation.pop();
  }
  return (
      <SafeAreaView style={styles.container}>
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
        </View>
        <View style={{ marginVertical: "8%" }}>
          <Text style={styles.text}>
            Enter username for {props.route.params.name} to link on Bukd profile.
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            autoCapitalize={"none"}
            keyboardType="email-address"
            placeholder="Username"
            maxLength={40}
            placeholderTextColor={
              colors.color.primaryColors.placeHolderTextColor
            }
            onChangeText={setUsername}
            value={username}
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
            console.log("isvalid"+username);
            const val = socialLinks.isValid(
              props.route.params.profileType,
              props.route.params.url + username
            );
            console.log(val);
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
export default SocialModalScreen;
