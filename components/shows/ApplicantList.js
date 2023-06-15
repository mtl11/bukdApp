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
import { getAccessToken, getProfileInfo, unfollowAccount } from "../../util/profile";

const ApplicantList = (props) => {
  const [data, setData] = useState("");

  const itemHandler = (item) => {
    console.log(item);
    

    return (
      <View style={styles.showContainer} >
        <View style={{ flexDirection: "row", alignItems:"center"}}>

          <TouchableWithoutFeedback onPress={() => {
            AsyncStorage.setItem("searchID", item.applicantID);
            props.props.navigation.navigate("SearchArtistProfile");
          }}>
            <Image
              style={styles.imageContainer}
              source={{ uri: item.profileURI }}
            />
          </TouchableWithoutFeedback>
          <View style={{ width: "90%" }}>
            <TouchableOpacity onPress={() => {
              AsyncStorage.setItem("searchID", item.applicantID);
              props.props.navigation.navigate("SearchArtistProfile");
            }}>
              <Text style={{ fontSize: 16, paddingHorizontal: 20, color: global.color.primaryColors.main }}>
                {item.profileName}
              </Text>
            </TouchableOpacity>

          </View>

        </View>
        <View style={{paddingTop: 10}}>
          <Text style={{ fontSize: 16 }}>
            Applicant Message:
          </Text>
          <Text style={{ fontSize: 14, padding: 5 }}>
            {item.message}
          </Text>
        </View>
        <View style={{paddingTop: 10}}>
          <Text style={{ fontSize: 16 }}>
            Date applied:
          </Text>
          <Text style={{ fontSize: 14, padding: 5 }}>
            {new Date(item.appliedToDate).toLocaleString('default', {year: 'numeric', month: 'long', day: 'numeric'})}
          </Text>
        </View>
      </View>
    )
  }
  async function getApplicantsData() {
    const rawData = Object.values(props.data.applicants);
    console.log(rawData)
    const array = [];
    for (const x in rawData) {
      const singleData = await getProfileInfo(rawData[x].localId);
      const item = {
        appliedToDate: rawData[x].appliedToDate,
        message: rawData[x].message,
        profileURI: singleData.profileURI,
        profileName: singleData.profileName,
        applicantID: rawData[x].localId
      }
      array.push(item);
    }
    setData(array);
  }

  useEffect(() => {
    if (props.data.applicants) {
      getApplicantsData();
    }

  }, [])
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
    // alignItems: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    // marginBottom: "5%",
    width: "90%",
    padding: "5%"
  }, imageContainer: {
    borderWidth: 1,
    borderRadius: 100,
    width: 40,
    height: 40
  }
}
)