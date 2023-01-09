import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const ProfileSettingsScreen = (props) => {
  const signOutAlert = () => {
    Alert.alert("Are you sure you want to sign out?", "", [
      {
        text: "Sign Out",
        onPress: () => console.log("Cancel Pressed"),
        style: "destructive",
      },
    ]);
  };

  const [newShowRequests, setNewShowRequests] = useState(false);
  const newShowToggle = () =>
    setNewShowRequests((previousState) => !previousState);

  const [newMessages, setNewMessages] = useState(false);
  const newMessageToggle = () =>
    setNewMessages((previousState) => !previousState);
  return (
    <SafeAreaView>
      <View style={styles.topIconContainer}>
        <FontAwesome5 name="chevron-left" size={32} color={"#2A51DB"} />
      </View>
      <View style={styles.mainTextContainer}>
        <Text style={styles.headerText}>Hello, M-OKAY.</Text>
        <Text style={styles.smallerText}>
          Manage your Account and Settings here.
        </Text>
      </View>
      <View style={styles.sectionHeaderContainer}>
        <FontAwesome5 name="user" size={22} color={"#2A51DB"} />
        <Text style={styles.sectionHeaderText}>Account</Text>
      </View>
      <TouchableOpacity>
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Personal Info</Text>
          <FontAwesome5 name="chevron-right" size={22} color={"#757575"} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Password and Security</Text>
          <FontAwesome5 name="chevron-right" size={22} color={"#757575"} />
        </View>
      </TouchableOpacity>
      <View style={styles.sectionHeaderContainer}>
        <FontAwesome5 name="bell" size={22} color={"#2A51DB"} />
        <Text style={styles.sectionHeaderText}>Notifications</Text>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>New show requests</Text>
        <Switch
          trackColor={{ false: "#757575", true: "#2A51DB" }}
          thumbColor={newShowRequests ? "white" : "white"}
          ios_backgroundColor="#757575"
          onValueChange={newShowToggle}
          value={newShowRequests}
        />
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>New messages</Text>
        <Switch
          trackColor={{ false: "#757575", true: "#2A51DB" }}
          thumbColor={newMessages ? "white" : "white"}
          ios_backgroundColor="#757575"
          onValueChange={newMessageToggle}
          value={newMessages}
        />
      </View>
      <TouchableOpacity onPress={signOutAlert}>
        <View style={styles.signOutContainer}>
          <Text style={styles.signOutText}>Sign Out</Text>
          <MaterialIcons name="exit-to-app" size={24} color="red" />
        </View>
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <Text style={styles.smallerText}>Bukd v0.0</Text>
        <View style={styles.copyrightContainer}>
          <FontAwesome5 name="copyright" size={16} color="#757575" />
          <Text
            style={[styles.smallerText, { paddingBottom: 10, paddingLeft: 5 }]}
          >
            2023 Bukd App, LLC
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  copyrightContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  infoContainer: {
    alignItems: "center",
    marginTop: 60,
  },
  signOutText: {
    fontFamily: "Rubik-Regular",
    color: "red",
    fontSize: 20,
  },
  signOutContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
  },
  topIconContainer: {
    marginLeft: 35,
    // marginTop: 10,
  },
  labelText: {
    fontFamily: "Rubik-Regular",
    fontSize: 20,
    color: "#757575",
  },
  labelContainer: {
    marginHorizontal: 35,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    marginTop: 30,
  },
  mainTextContainer: {
    marginLeft: 35,
    marginTop: 30,
  },
  headerText: {
    fontFamily: "Rubik-SemiBold",
    fontSize: 24,
  },
  smallerText: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    color: "#757575",
    marginTop: 10,
  },
  sectionHeaderContainer: {
    borderBottomWidth: 1,
    margin: 10,
    // marginBottom: 20,
    paddingLeft: 30,
    paddingBottom: 10,
    marginTop: 40,
    flexDirection: "row",
    borderColor: "#757575",
  },
  sectionHeaderText: {
    fontSize: 20,
    fontFamily: "Rubik-SemiBold",
    marginHorizontal: 15,
    color: "#2A51DB",
  },
});
export default ProfileSettingsScreen;
