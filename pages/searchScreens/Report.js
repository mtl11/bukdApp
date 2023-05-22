import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Button
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import global from "../../styles/global";
import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { sendProfileReport } from "../../util/search";
import { getAccessToken } from "../../util/profile";

const Report = (props) => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState("");

  async function sendReport(){
    const profileID = await AsyncStorage.getItem("searchID");
    const accessToken = await getAccessToken();
    
    await sendProfileReport(profileID, text, accessToken);
    setIsLoading(false);
    props.navigation.pop();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginHorizontal: "5%" }}>
        <TouchableOpacity
          style={{ alignSelf: "flex-start" }}
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
        <View >
          <Text style={styles.headerText}>
            Report Profile
          </Text>
        </View>
        <View style={{ marginTop: "5%" }}>
          <TextInput
            style={styles.reportText}
            multiline={true}
            maxLength={250}
            placeholder="Add a comment to your report (optional)"
            placeholderTextColor={global.color.secondaryColors.placeHolderTextColor}
            value={text}
            onChangeText={setText}
            blurOnSubmit={true}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          setIsLoading(true);
          sendReport()
        }}
      >
        {!isLoading ? (
          <Text style={styles.buttonText}>Submit</Text>
        ) : (
          <ActivityIndicator size={22} />
        )}
      </TouchableOpacity>
    </SafeAreaView>)
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: global.color.secondaryColors.background,
    height: "100%"
  },
  iconColor: global.color.primaryColors.main,
  headerText: {
    fontFamily: "Rubik-Medium",
    fontSize: 20, textAlign: "center"
  },
  reportText: {
    backgroundColor: global.color.secondaryColors.adjacent,
    borderRadius: 12,
    height: 120,
    padding: 10,
    textAlign: "justify",
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    paddingTop: 10
  },
  buttonContainer: {
    alignItems: "center",
    padding: 16,
    marginHorizontal: "5%",
    backgroundColor: global.color.secondaryColors.main,
    borderRadius: 12,
    marginTop: "20%"
},
buttonText: {
  fontFamily: "Rubik-Medium",
  color: "white",
  fontSize: 18,
}
})
export default Report;