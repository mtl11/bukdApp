import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import MessageList from "../../components/MessageList";
import global from "../../styles/global";

const MessageScreen = (props) => {
  const data = true;
  return (
    <SafeAreaView style={styles.container}>
      {!data ? (
        <View style={styles.errorContainer}>
          <MaterialIcons name="error-outline" size={80} color="#9E9E9E" />
          <Text style={styles.errorText}>No messages available</Text>
        </View>
      ) : (
        <View>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>All Messages</Text>
          </View>
          <MessageList />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerText:{
    fontSize: 20,
    fontFamily: "Rubik-Regular",
    color: global.color.primaryColors.text
  },
  headerContainer:{
    alignItems: "center",
    padding: 10,
    paddingTop: 0,
    borderBottomWidth: 1,
    width: "100%" ,
    borderColor: global.color.primaryColors.adjacent
  },
  errorContainer: {
    alignItems: "center",
    marginTop: "50%",
  },
  container: {
    backgroundColor: global.color.primaryColors.background,
    height: "100%",
  },
  errorText: {
    fontFamily: "Rubik-Regular",
    fontSize: 20,
    color: "#9E9E9E",
  },
});

export default MessageScreen;
