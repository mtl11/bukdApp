import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
} from "react-native";

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
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => {}}
      >
        <View style={styles.messageContainer}>
          <View style={styles.imageContainer}></View>
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
  },
  nameAndTextContainer: {
    marginLeft: 20,
  },
  messageContainer: {
    margin: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  nameText: {
    fontFamily: "Rubik-Regular",
    fontSize: 18,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderWidth: 1.5,
    borderRadius: 100,
  },
});
export default MessageList;
