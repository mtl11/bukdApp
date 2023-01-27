import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Image,
} from "react-native";
import global from "../styles/global";

const MessageList = () => {
  const data = [
    { name: "Pizza Planet", lastText: "hello" },
    { name: "Pizza Planet", lastText: "hello" },
    { name: "Pizza Planet", lastText: "hello" },
    { name: "Pizza Planet", lastText: "hello" },
    { name: "Pizza Planet", lastText: "hello" },
  ];

  const listItems = data.map((singleMessage) => {
    return (
      <TouchableHighlight
        activeOpacity={0.2}
        underlayColor={global.color.primaryColors.background}
        onPress={() => {}}
      >
        <View style={styles.messageContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/nochos.jpeg")}
              style={styles.profilePic}
              resizeMode="cover"
            />
          </View>
          <View style={styles.nameAndTextContainer}>
            <Text style={styles.nameText}>{singleMessage.name}</Text>
            <Text style={styles.lastText}>{singleMessage.lastText}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  });

  return <ScrollView style={{ height: "100%" }}>{listItems}</ScrollView>;
};

const styles = StyleSheet.create({
  lastText: {
    color: "#9E9E9E",
    paddingTop: "1%",
    fontFamily: "Rubik-Regular",
    fontSize: 16,
  },
  nameAndTextContainer: {
    paddingLeft: "10%",
    flexGrow: 1,
    borderColor: global.color.primaryColors.adjacent,
  },
  messageContainer: {
    padding: "5%",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: global.color.primaryColors.adjacent,
  },
  nameText: {
    fontFamily: "Rubik-Regular",
    fontSize: 18,
    color: global.color.primaryColors.text,
    paddingBottom: "1%",
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderWidth: 1.5,
    borderRadius: 100,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
});
export default MessageList;
