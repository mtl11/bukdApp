import React, { useEffect, useState, useContext } from "react";
import { SafeAreaView, StyleSheet, RefreshControl, View, Text , ActivityIndicator} from "react-native";
import global from "../../styles/global";
import SearchBar from "../../components/messages/SearchBar";
import MessagesLists from "../../components/messages/MessagesList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllMessages, getChatroomIdData, getChatroomRecieverID, getChatroomSenderID, getLastMessage } from "../../util/message";
import { AuthContext } from "../../store/authContext"; 
import {getProfilePic, getProfileInfo} from "../../util/profile";

const MessageScreen = (props) => {
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
      for (const x in values){
        const firstUser = await getChatroomSenderID(values[x].chatRoomID);
        let senderID, recieverName;
        if (firstUser == await AsyncStorage.getItem("localId")){
          senderID = await getChatroomRecieverID(values[x].chatRoomID);
        }else{
          senderID = firstUser;
        }
        const getName = await getProfileInfo(senderID);

        if (getName.profileType == "general"){
          recieverName = getName.firstName + " " + getName.lastName;
        }else{
          recieverName = getName.profileName
        }
        const lastMessage = await getLastMessage(values[x].chatRoomID);
        array.push({chatRoomID: 
          values[x].chatRoomID, 
          recieverName: recieverName, 
          lastMessage: lastMessage,
          recieverID: senderID,
          // profilePicURL: await getProfilePic(senderID),
          basicInfo: getName
        })
      }
      // console.log(array);
      setData(array);
    } else {
      setData(messageData);
    }
    setGettingInfo(false);
  }

  useEffect(() => {
    if(authCTX.isAuthenticated){
      getData();
    }
  }, [authCTX.isAuthenticated]);
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar setSearchValue={setSearchValue} searchValue={searchValue} />
      {gettingInfo &&  <View style={{ height: "100%", justifyContent: "center" }}>
              <ActivityIndicator size={"large"} />
            </View>}
      {authCTX.isAuthenticated ? (
    <MessagesLists data={data} searchValue={searchValue} props={props} refreshData={getData} />
     ): 
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
