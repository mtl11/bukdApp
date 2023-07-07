import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Alert
} from "react-native";
import global from "../../styles/global";
import EditShowDetailsModal from "./EditShowDetailsModal";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAccessToken } from "../../util/profile";
import { deleteShow } from "../../util/shows";
const VenueShowDetails = (props) => {
    const [data, setData] = useState(props.data);

    async function deleteShowHelper(){
        const localId = await AsyncStorage.getItem("localId");
        const accessToken = await getAccessToken();
        deleteShow(props.data.showID, props.data.location, localId, accessToken)
    }

    const deleteAlert = () => {
        Alert.alert("Are you sure you want to delete this show?", "", [
          {
            text: "Cancel",
            onPress: () => {},
            style: "destructive",
          },
          {
            text: "Delete",
            onPress: () => { deleteShowHelper(), props.navigation.pop(); },
            style: "destructive",
          },
    
        ]);
      };

    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    const [visible, setVisible] = useState(false);
    const start = formatAMPM(new Date(data.startTime));
    const end = formatAMPM(new Date(data.endTime));
    const exiprationDate = new Date(data.postsExpire).toLocaleString('default', { year: 'numeric', month: 'long', day: 'numeric' });
    const date = new Date(data.date).toLocaleString('default', { year: 'numeric', month: 'long', day: 'numeric' });
    // console.log(props.data)
    return (
        <View>
            <View style={{
                flexDirection: "row",

                justifyContent: "space-between",
                marginHorizontal: 30,
                marginTop: "3%"
            }}>
                <Text style={{ fontFamily: "Rubik-SemiBold", fontSize: 18 }}>
                    {props.data.venueName}
                </Text>
            </View>
            <View style={{ flexDirection: "row", marginHorizontal: 30, marginTop: "3%", alignItems: "center" }}>
                <MaterialCommunityIcons name="account-search" size={24} color="black" />
                <Text style={{ fontFamily: "Rubik-SemiBold", fontSize: 18 }}>
                    {data.typeNeeded}
                </Text>
                <Text style={{ fontFamily: "Rubik-SemiBold", fontSize: 18 }}>
                    {" "}-{" "}
                </Text>
                <Text style={{ fontFamily: "Rubik-SemiBold", fontSize: 18 }}>
                    {data.genreNeeded}
                </Text>
            </View>
            <View style={{ marginHorizontal: 30, marginTop: "3%" }}>
                <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16 }}>
                    Location: {data.location}
                </Text>
            </View>
            <View style={{ marginHorizontal: 30, marginTop: "3%" }}>
                <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16 }}>
                    Show Date: {date}
                </Text>
            </View>
            <View style={{ marginHorizontal: 30, marginTop: "3%" }}>
                <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16 }}>
                    Show Time: {start} - {end}
                </Text>
            </View>
            <View style={{ marginHorizontal: 30, marginTop: "3%" }}>
                {data.applicants != null ?
                    <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16 }}>
                        Current Applicants: {Object.values(data.applicants).length}
                    </Text> : <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16 }}>
                        Current Applicants: 0
                    </Text>}
            </View>
            <View style={{ marginHorizontal: 30, marginTop: "3%" }}>
                <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16 }}>
                    Max Applicants: {data.maxApplicants}
                </Text>
            </View>
            <View style={{ marginHorizontal: 30, marginTop: "3%" }}>
                <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16 }}>
                    Compensation range: ${data.compensationStart} - ${data.compensationEnd}
                </Text>
            </View>
            {/* <View style={{ marginHorizontal: 30, marginTop: "3%" }}>
                <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16 }}>
                    Equipment: {data.equipment}
                </Text>
            </View> */}
            <View style={{ marginHorizontal: 30, marginTop: "3%" }}>
                <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16 }}>
                    Description:
                </Text>
                <Text style={{ fontFamily: "Rubik-Regular", fontSize: 14 }}>
                    {data.description}
                </Text>
            </View>
            <View style={{ marginHorizontal: 30, marginTop: "3%" }}>
                <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16 }}>
                    Post expires: {exiprationDate}
                </Text>
            </View>
            <TouchableOpacity
                style={{
                    alignItems: "center",
                    padding: 16,
                    marginHorizontal: "8%",
                    backgroundColor: global.color.secondaryColors.main,
                    borderRadius: 12,
                    marginTop: "7%"
                }}
                onPress={() => {
                    setVisible(!visible)
                }}
            >
                <Text style={{
                    fontFamily: "Rubik-Medium",
                    color: "white",
                    fontSize: 18,
                }}>
                    Edit Details
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    alignItems: "center",
                    padding: 16,
                    marginHorizontal: "8%",
                    backgroundColor: "white",
                    borderRadius: 12,
                    marginTop: "7%",
                    borderWidth: 1.5,
                    borderColor: global.color.secondaryColors.main
                }}
                onPress={() => {
                    deleteAlert();
                    // setVisible(!visible)
                }}
            >
                <Text style={{
                    fontFamily: "Rubik-Medium",
                    color: global.color.secondaryColors.main,
                    fontSize: 18,
                }}>
                    Delete
                </Text>
            </TouchableOpacity>
            <EditShowDetailsModal visible={visible} setVisible={setVisible} data={data} setData={setData} />
        </View>
    )
}

export default VenueShowDetails;