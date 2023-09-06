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
  Keyboard, TouchableWithoutFeedback,
  Alert
} from "react-native";
import colors from "../../styles/global";
import { SocialLinks } from "social-links";
import { Ionicons } from "@expo/vector-icons";
import { setSocial,getAccessToken, } from "../../util/profile";
import { ProfileContext } from "../../store/profileContext.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthContext} from "../../store/authContext";
import light from "../../styles/profile/light/socialModal";
import dark from "../../styles/profile/dark/socialModal";

const SocialModalScreen = (props) => {
  const authCTX = useContext(AuthContext);
  const styles = authCTX.mode === "light" ? light : dark;

  const profileCTX = useContext(ProfileContext);
  const [isAuth, setIsAuth] = useState(false);
  const socialLinks = new SocialLinks();
  const [username, setUsername] = useState(props.route.params.username);
  const [valid, setValid] = useState(false);

  const confirmation = () => {
    Alert.alert("Success!", "", [
      {
        text: "OK",
        onPress: () => props.navigation.pop(),
        style: "default",
      },
    ]);
  };

  async function updateSocial() {
    const localId = await AsyncStorage.getItem("localId");
    const accessToken = await getAccessToken();
    setIsAuth(true);
    const header = props.route.params.profileType;
    const usernameURL = props.route.params.url + username;
    let newSocial = profileCTX.social;
    if (newSocial == undefined){
      newSocial = {};
    }
    const type = props.route.params.profileType;
    newSocial[type] = { url: usernameURL, username: username };
    profileCTX.updateSocial(newSocial);

    await setSocial(header, usernameURL, localId, username, accessToken);
    setIsAuth(false);
    confirmation();
    // props.navigation.pop();
  }
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <View style={styles.topIconContainer}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.pop();
            }}
          >
            <Ionicons
              name="arrow-back"
              size={28}
              color={styles.iconColor}
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
            placeholderTextColor={styles.placeHolderTextColor}
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
      </TouchableWithoutFeedback>
  );
};

export default SocialModalScreen;
