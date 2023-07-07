import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../styles/global";
import { AuthContext } from "../../store/authContext";
import dark from "../../styles/profile/dark/settings";
import light from "../../styles/profile/light/settings";
import { ProfileContext } from "../../store/profileContext";
import * as Notifications from 'expo-notifications';

const ProfileSettingsScreen = (props) => {
  const authCTX = useContext(AuthContext);
  const profileCTX = useContext(ProfileContext);
  const styles = authCTX.mode === "light" ? light : dark;

  const signOutAlert = () => {
    Alert.alert("Are you sure you want to Sign Out?", "", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "destructive",
      },
      {
        text: "Sign Out",
        onPress: () => { authCTX.logout(); profileCTX.signOut(); props.navigation.navigate("TabNav", { screen: "Search" }); },
        style: "destructive",
      },

    ]);
  };
  const [newShowRequests, setNewShowRequests] = useState(false);
  // async function newShowToggle() {
  //   setNewShowRequests(!newShowRequests);
  //   const { permissions } = await Notifications.getPermissionsAsync();

  //   const { status } = await Notifications.requestPermissionsAsync();
  //   console.log(status);
  // };

  // async function checkPermissions() {
  //   const { status } = await Notifications.getPermissionsAsync();
  //   // console.log(status);
  //   if (status == 'granted') {
  //     setNewShowRequests(true);
  //   }
  //   // console.log(status);

  // }

  // useEffect(() => {
  //   checkPermissions();
  // }, []);
  return (
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
        <View style={styles.largeContainer}>
          <Text style={styles.largeText}>Settings</Text>
        </View>
      </View>
      <View style={styles.sectionHeaderContainer}>
        <FontAwesome5
          name="user"
          size={22}
          color={styles.iconColor}
        />
        <Text style={styles.sectionHeaderText}>Account</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("PersonalInfoScreen");
        }}
      >
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Personal Info</Text>
          <FontAwesome5
            name="chevron-right"
            size={22}
            color={styles.iconColor}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("PersonalSecurityScreen");
        }}
      >
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Reset Password</Text>
          <FontAwesome5
            name="chevron-right"
            size={22}
            color={styles.iconColor}
          />
        </View>
      </TouchableOpacity>
      {/* <View style={styles.sectionHeaderContainer}>
        <Ionicons
          name="ios-settings-outline"
          size={22}
          color={styles.iconColor}
        />
        <Text style={styles.sectionHeaderText}>General</Text>
      </View> */}
      {/* <View style={styles.labelContainer}>
        <Text style={styles.labelText}>Notifications</Text>
        <Switch
          trackColor={{
            false: "#757575",
            true: colors.color.primaryColors.main,
          }}
          thumbColor={newShowRequests ? "white" : "white"}
          ios_backgroundColor={colors.color.primaryColors.adjacent}
          onValueChange={newShowToggle}
          value={newShowRequests}
        />
      </View> */}
      <TouchableOpacity style={styles.signOutContainer} onPress={signOutAlert}>
        <View style={{ marginHorizontal: 7.5 }}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </View>
        <MaterialIcons
          name="exit-to-app"
          size={24}
          color={colors.color.primaryColors.main}
        />
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <Text style={styles.smallerText}>Bukd v1.0.0</Text>
        <View style={styles.copyrightContainer}>
          <FontAwesome5
            name="copyright"
            size={16}
            color={styles.copyrightColor}
          />
          <Text
            style={[styles.smallerText, { paddingBottom: 10, paddingLeft: 5 }]}
          >
            2023 Bukd App LLC
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileSettingsScreen;
