import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  Alert, RefreshControl
} from "react-native";
import { ProfileContext } from "../../store/profileContext";
import { FlatList, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import global from "../../styles/global";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAccessToken, unfollowAccount } from "../../util/profile";

const FollowingTab = (props) => { 
  const profileCTX = useContext(ProfileContext);
  const [data, setData] = useState(profileCTX.followingList);

  async function unfollowHelper(id) {
    const localId = await AsyncStorage.getItem("localId");
    const accessToken = await getAccessToken();
    await unfollowAccount(localId, id, accessToken);
  }
  const unfollowAlert = (name, id) => {
    Alert.alert("Are you sure you want to unfollow "+name+"?", "", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Unfollow",
        onPress: () => { setData(data.filter(item => item.searchID != id)); unfollowHelper(id); profileCTX.unfollow(id);},
        // unfollowHelper(id)
        style: "destructive",
      },
    ]);
  };

  const itemHandler = (item) => {
    return (
      <View style={styles.showContainer} >
        <TouchableWithoutFeedback onPress={() => {
          AsyncStorage.setItem("searchID", item.searchID);
          props.props.navigation.navigate("SearchArtistProfile");
        }}>
          <Image
            style={styles.imageContainer}
            source={{ uri: item.profileURI }}
          />
        </TouchableWithoutFeedback>
        <View style={{ width: "80%" }}>
          <TouchableOpacity onPress={() => {
            AsyncStorage.setItem("searchID", item.searchID);
            props.props.navigation.navigate("SearchArtistProfile");
          }}>
            <Text style={{ fontSize: 16, padding: 20 }}>
              {item.profileName}
            </Text>
          </TouchableOpacity>

        </View>
        <TouchableOpacity onPress={()=>{unfollowAlert(item.profileName, item.searchID)}}>
          <MaterialCommunityIcons name="cards-heart" size={20} color={global.color.primaryColors.main} />
        </TouchableOpacity>
      </View>
    )
  }
  const dataHelper =()=>{
    setData(profileCTX.followingList)
    console.log()
  }
  useEffect(() => { 
    dataHelper()
  });
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dataHelper();
    // setTimeout(() => {
    setRefreshing(false);
    // }, 1000);
  }, []);
  return (
    <View>
      {data.length != 0 &&
        <FlatList
          contentContainerStyle={{ alignItems: "center", marginVertical: "5%", paddingBottom: 250 }}
          data={data}
          refreshControl={<RefreshControl
            refreshing={refreshing} onRefresh={onRefresh}
            tintColor={global.color.primaryColors.main} />}
          renderItem={(item) => { return itemHandler(item.item) }}
        />}
      {data == 0 &&
        <View style={{ marginTop: "5%" }}>
          <Text style={{ textAlign: "center", fontSize: 20, fontFamily: "Rubik-Regular", }}>
            No Performers Following
          </Text>
        </View>}
    </View>
  )
}

const styles = StyleSheet.create({
  showContainer: {
    borderRadius: 12,
    borderColor: "#D9D9D9",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    marginBottom: "5%",
    width: "90%",
    paddingHorizontal: "5%"
  }, imageContainer: {
    borderWidth: 1,
    borderRadius: 100,
    width: 40,
    height: 40
  }
}
)

export default FollowingTab;