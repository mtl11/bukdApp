import React, { useContext, useState } from "react";
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
import colors from "../../styles/global";
import { AuthContext } from "../../store/authContext";


const ProfileSettingsScreen = (props) => {
  const authCTX = useContext(AuthContext);


  const signOutAlert = () => {
    Alert.alert("Are you sure you want to Sign Out?", "", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "destructive",
      },
      {
        text: "Sign Out",
        onPress: ()=>{authCTX.logout()},
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
        <View style={styles.largeContainer}>
          <Text style={styles.largeText}>Settings</Text>
        </View>
      </View>
      <View style={styles.mainTextContainer}>
        <Text style={styles.headerText}>Hello, User.</Text>
        <Text style={styles.smallerText}>
          Manage your Account and Settings here.
        </Text>
      </View>
      <View style={styles.sectionHeaderContainer}>
        <FontAwesome5
          name="user"
          size={22}
          color={colors.color.primaryColors.main}
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
            color={colors.color.primaryColors.text}
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
            color={colors.color.primaryColors.text}
          />
        </View>
      </TouchableOpacity>
      {/* <View style={styles.sectionHeaderContainer}>
        <FontAwesome5
          name="bell"
          size={22}
          color={colors.color.primaryColors.main}
        />
        <Text style={styles.sectionHeaderText}>Notifications</Text>
      </View> */}
      {/* <View style={styles.labelContainer}>
        <Text style={styles.labelText}>New show requests</Text>
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
      {/* <View style={styles.labelContainer}>
        <Text style={styles.labelText}>New messages</Text>
        <Switch
          trackColor={{
            false: colors.color.primaryColors.text,
            true: colors.color.primaryColors.main,
          }}
          thumbColor={newMessages ? "white" : "white"}
          ios_backgroundColor={colors.color.primaryColors.adjacent}
          onValueChange={newMessageToggle}
          value={newMessages}
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
        <Text style={styles.smallerText}>Bukd v0.0</Text>
        <View style={styles.copyrightContainer}>
          <FontAwesome5
            name="copyright"
            size={16}
            color={colors.color.primaryColors.text}
          />
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
  container: {
    flex: 1,
    backgroundColor: colors.color.primaryColors.background,
  },
  copyrightContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  infoContainer: {
    alignItems: "center",
    //   marginTop: 60,
  },
  signOutText: {
    fontFamily: "Rubik-Regular",
    color: colors.color.primaryColors.main,
    fontSize: 20,
    marginHorizontal: 7.5,
  },
  largeText: {
    fontSize: 20,
    fontFamily: "Rubik-SemiBold",
    color: colors.color.primaryColors.text,
  },
  largeContainer: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  signOutContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "50%",
    marginVertical: "15%",
  },
  topIconContainer: {
    marginHorizontal: "8%",
    flexDirection: "row",
  },
  labelText: {
    fontFamily: "Rubik-Regular",
    fontSize: 20,
    color: colors.color.primaryColors.text,
  },
  labelContainer: {
    marginHorizontal: "8%",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    marginTop: "8%",
  },
  mainTextContainer: {
    marginLeft: "8%",
    marginTop: "10%",
  },
  headerText: {
    fontFamily: "Rubik-SemiBold",
    fontSize: 24,
    color: colors.color.primaryColors.main,
  },
  smallerText: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    color: colors.color.primaryColors.text,
    marginTop: "2%",
  },
  sectionHeaderContainer: {
    borderBottomWidth: 1,
    margin: 10,
    paddingLeft: 30,
    paddingBottom: 10,
    marginTop: "10%",
    flexDirection: "row",
    borderColor: colors.color.primaryColors.adjacent,
  },
  sectionHeaderText: {
    fontSize: 20,
    fontFamily: "Rubik-SemiBold",
    marginHorizontal: 15,
    color: colors.color.primaryColors.main,
  },
});
export default ProfileSettingsScreen;
