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

const ApplicantList = (props) =>{
    const data = [{"profileName": "DENNET", "profileURI": "https://firebasestorage.googleapis.com/v0/b/bukd-app.appspot.com/o/4XnghL9Vy4WFnJpjokPa2c42PgE3-profile-pic?alt=media&token=a32dd4bd-99d3-45b7-9405-150bd843e5da", "searchID": "4XnghL9Vy4WFnJpjokPa2c42PgE3"}, {"profileName": "Shifty", "profileURI": "https://firebasestorage.googleapis.com/v0/b/bukd-app.appspot.com/o/98zytCtnYcPUZIWjUmoghWJzF7L2-profile-pic?alt=media&token=e4f01b4e-2db7-4513-be0c-2cfb0a2a4f0c", "searchID": "98zytCtnYcPUZIWjUmoghWJzF7L2"}, {"profileName": "The Joeys", "profileURI": "https://firebasestorage.googleapis.com/v0/b/bukd-app.appspot.com/o/9qVdCwUKX3Pmb5jgWWXK3nCQjvl1-profile-pic?alt=media&token=8186a0bb-dc2f-4bf5-bff4-6f0180cbb6e9", "searchID": "9qVdCwUKX3Pmb5jgWWXK3nCQjvl1"}]
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

    return (
        <FlatList
          contentContainerStyle={{ alignItems: "center", marginVertical: "5%", paddingBottom: 250 }}
             data={data}
        //   refreshControl={<RefreshControl
        //     refreshing={refreshing} onRefresh={onRefresh}
        //     tintColor={global.color.primaryColors.main} />}
          renderItem={(item) => { return itemHandler(item.item) }}
        />
    )
}

export default ApplicantList;

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