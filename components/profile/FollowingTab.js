import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import { ProfileContext } from "../../store/profileContext";
import { FlatList } from "react-native-gesture-handler";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import global from "../../styles/global";
import AsyncStorage from "@react-native-async-storage/async-storage";
const FollowingTab = (props) => {
  const profileCTX = useContext(ProfileContext);
  const [data, setData] = useState(profileCTX.followingList);
  const itemHandler = (item) => {
    console.log("hey")
    // console.log(item[1].profileName)
    console.log(item[1].searchID)
    return (
      <TouchableOpacity style={styles.showContainer} onPress={() => {
        AsyncStorage.setItem("searchID", item[1].searchID);
        props.props.navigation.navigate("SearchArtistProfile");
      }}>
        {/* <View style={styles.imageContainer}> */}
          <Image
            style={styles.imageContainer}
            source={{ uri: item[1].profileURI }}
          />
        {/* </View> */}
        <View style={{ width: "80%" }}>
          <Text style={{ fontSize: 16, padding: 20 }}>
            {item[1].profileName}
          </Text>
        </View>
        <View>
        <MaterialCommunityIcons name="cards-heart" size={20} color={global.color.primaryColors.main} />
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <View>
      {profileCTX.followingList.length != 0 &&
      <FlatList
        contentContainerStyle={{ alignItems: "center", marginVertical: "5%", paddingBottom: 100 }}
        data={data}
        renderItem={(item) => { return itemHandler(item.item) }}
      />}
      {profileCTX.followingList.length == 0 &&
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
  },imageContainer:{
    borderWidth:1,
    borderRadius: 100,
    width: 40,
    height:40
  }
}
)

export default FollowingTab;