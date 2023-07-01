import React, { useEffect, useState, useContext } from "react";
import { SafeAreaView, StyleSheet, RefreshControl, View, Text, ActivityIndicator } from "react-native";
import global from "../../styles/global";
import SearchBar from "../../components/messages/SearchBar";
import MessagesLists from "../../components/messages/MessagesList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllMessages, getChatroomIdData, getChatroomRecieverID, getChatroomSenderID, getLastMessage } from "../../util/message";
import { AuthContext } from "../../store/authContext";
import { getProfilePic, getProfileInfo } from "../../util/profile";
import { useIsFocused } from "@react-navigation/native";
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';


const MessageScreen = (props) => {

  const MyLoader = () => (
    <ContentLoader viewBox="-20 0 500 900">
      <Circle cx="40" cy="40" r="40" />
      <Circle cx="40" cy="140" r="40" />
      <Circle cx="40" cy="240" r="40" />
      <Circle cx="40" cy="340" r="40" />
      <Rect x="100" y="30" rx="12" ry="12" width="330" height="20" />
      <Rect x="100" y="130" rx="12" ry="12" width="330" height="20" />
      <Rect x="100" y="230" rx="12" ry="12" width="330" height="20" />
      <Rect x="100" y="330" rx="12" ry="12" width="330" height="20" />
    </ContentLoader>
  )
  const isFocused = useIsFocused();
  const authCTX = useContext(AuthContext);
  const [data, setData] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [gettingInfo, setGettingInfo] = useState(false);
  async function getData() {
    setGettingInfo(true);
    const messageData = await getAllMessages(await AsyncStorage.getItem("localId"));
    if (messageData != null) {
      const array = [];
      const values = Object.values(messageData);
      for (const x in values) {
        const myID = await AsyncStorage.getItem("localId");
        const data = await getChatroomIdData(values[x].chatRoomID);
        const firstUser = data.firstUser;
        let senderID, recieverName;
        if (firstUser == await AsyncStorage.getItem("localId")) {
          senderID = data.secondUser;
        } else {
          senderID = firstUser;
        }
        const getName = await getProfileInfo(senderID);

        if (getName.profileType == "general") {
          recieverName = getName.firstName + " " + getName.lastName;
        } else {
          recieverName = getName.profileName
        }
        const lastMessage = data.lastMessage;
        array.push({
          chatRoomID:
            values[x].chatRoomID,
          recieverName: recieverName,
          lastMessage: lastMessage,
          recieverID: senderID,
          basicInfo: getName,
          hasBeenChecked: data.hasBeenChecked,
          myID: myID
        })
      }
      array.sort(
        function (a, b) {
          if (a.lastMessage != null && b.lastMessage != null) {
            return new Date(b.lastMessage.message.createdAt) - new Date(a.lastMessage.message.createdAt);
          }
        });
      setData(array);
    } else {
      setData(messageData);
    }
    setGettingInfo(false);
  }

  useEffect(() => {
    if (authCTX.isAuthenticated) {
      getData();
    }
  }, [isFocused]);
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar setSearchValue={setSearchValue} searchValue={searchValue} />
      {gettingInfo && <View style={{ height: "100%", justifyContent: "center" }}>
        <MyLoader/>
      </View>}
      {authCTX.isAuthenticated ? (
        <MessagesLists data={data} searchValue={searchValue} props={props} refreshData={getData} />
      ) :
        <View style={{ alignItems: "center", marginTop: "5%" }}>
          <Text style={{ fontFamily: "Rubik-Medium", fontSize: 20 }}>
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
