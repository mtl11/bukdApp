import React, { useEffect, useState, useContext } from "react";
import { SafeAreaView, StyleSheet, RefreshControl, View, Text } from "react-native";
import global from "../../styles/global";
import SearchBar from "../../components/messages/SearchBar";
import MessagesLists from "../../components/messages/MessagesList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllMessages } from "../../util/message";
import { AuthContext } from "../../store/authContext";
const MessageScreen = (props) => {
  const authCTX = useContext(AuthContext);
  const [data, setData] = useState({});
  const [searchValue, setSearchValue] = useState("");
  async function getData() {
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
  }, [authCTX.isAuthenticated]);
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar setSearchValue={setSearchValue} searchValue={searchValue} />
      {authCTX.isAuthenticated ?
        <MessagesLists data={data} searchValue={searchValue} props={props} refreshData={getData} /> :
        <View style={{alignItems:"center", marginTop: "5%"}}>
          <Text style={{fontFamily:"Rubik-Medium", fontSize: 20}}>
            Login or Sign up to Message
          </Text>
        </View>}


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: { color: global.color.secondaryColors.main },
  container: {
    backgroundColor: global.color.secondaryColors.background,
    height: "100%",
  },
});

// const styles = StyleSheet.create({
//   input: { color: global.color.primaryColors.main },
//   container: {
//     backgroundColor: global.color.primaryColors.background,
//     height: "100%",
//   },
// });

export default MessageScreen;
