import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Icon,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import MessageList from "../../components/MessageList";

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
    fontFamily: "Rubik-Regular"
  },
  headerContainer:{
    alignItems: "center",
    marginTop: "2%",
    padding: 10,
    borderBottomWidth: 1,
    width: "100%" 
  },
  errorContainer: {
    alignItems: "center",
    marginTop: "50%",
  },
  container: {
    backgroundColor: "white",
    height: "100%",
  },
  errorText: {
    fontFamily: "Rubik-Regular",
    fontSize: 20,
    color: "#9E9E9E",
  },
});

export default MessageScreen;
