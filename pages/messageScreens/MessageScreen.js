import React, { useState, useCallback } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import global from "../../styles/global";
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import SearchBar from "../../components/messages/SearchBar";
const MessageScreen = (props) => {
  // const [messages, setMessages] = useState([]);
  // const onSend = useCallback((messages = []) => {
  //   setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  // }, [])

  // const customtInputToolbar = props => {
  //   return (
  //     <InputToolbar
  //       {...props}
  //       containerStyle={{
  //         backgroundColor: global.color.primaryColors.adjacent,
  //       }}
  //     />
  //   );
  // };
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar/>
      {/* <GiftedChat
        renderInputToolbar={props => customtInputToolbar(props)}
        textInputStyle={styles.input}
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: { color: global.color.primaryColors.main },
  container: {
    backgroundColor: global.color.primaryColors.background,
    height: "100%",
  },
});

export default MessageScreen;
