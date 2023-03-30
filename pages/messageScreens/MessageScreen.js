import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import global from "../../styles/global";
import SearchBar from "../../components/messages/SearchBar";
import MessagesLists from "../../components/messages/MessagesList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllMessages } from "../../util/message";
const MessageScreen = (props) => {
  const [data, setData] = useState({});
  const [searchValue, setSearchValue] = useState("");
  async function getData(){
    const messageData = await getAllMessages(await AsyncStorage.getItem("localId"));
    // console.log(messageData);
    if (messageData != null) {
      setData(Object.values(messageData));
    } else {
      setData(messageData);
    }
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar setSearchValue={setSearchValue} searchValue={searchValue}/>
      <MessagesLists data={data} searchValue={searchValue}/>
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
