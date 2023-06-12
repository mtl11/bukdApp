import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity
} from "react-native";
import global from "../../styles/global";
import EditShowDetailsModal from "./EditShowDetailsModal";

const VenueShowDetails = (props) => {
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
    console.log(props.data)
    const [visible, setVisible] = useState(false);
    const start = formatAMPM(new Date(props.data.startTime));
    const end = formatAMPM(new Date(props.data.endTime));
    const exiprationDate = new Date(props.data.postsExpire).toLocaleString('default', {year: 'numeric', month: 'long', day: 'numeric'});
    const date = new Date(props.data.date).toLocaleString('default', {year: 'numeric', month: 'long', day: 'numeric'});

    return (
        <View>
            <View style={{
                flexDirection: "row",
                width: "40%",
                justifyContent: "space-between",
                marginHorizontal: 30,
                marginTop: "3%"
            }}>
                <Text style={{ fontFamily: "Rubik-SemiBold", fontSize: 18 }}>
                    {props.data.venueName}
                </Text>
            </View>
            <View style={{ flexDirection: "row", marginHorizontal: 30, marginTop: "3%" }}>
                <Text style={{ fontFamily: "Rubik-SemiBold", fontSize: 18 }}>
                    {props.data.typeNeeded}
                </Text>
                <Text style={{ fontFamily: "Rubik-SemiBold", fontSize: 18 }}>
                    {" "}-{" "}
                </Text>
                <Text style={{ fontFamily: "Rubik-SemiBold", fontSize: 18 }}>
                    {props.data.genreNeeded}
                </Text>
            </View>
            <View style={{ marginHorizontal: 30, marginTop: "3%" }}>
                <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16 }}>
                    {props.data.location}
                </Text>
            </View>
            <View style={{ marginHorizontal: 30, marginTop: "3%" }}>
                <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16 }}>
                    Date: {date}
                </Text>
            </View>
            <View style={{ marginHorizontal: 30, marginTop: "3%" }}>
                <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16 }}>
                    Time: {start} - {end}
                </Text>
            </View>
            <View style={{ marginHorizontal: 30, marginTop: "3%" }}>
                <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16 }}>
                    Current Applicants: {props.data.applicants}
                </Text>
            </View>
            <View style={{ marginHorizontal: 30, marginTop: "3%" }}>
                <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16 }}>
                    Max Applicants: {props.data.maxApplicants}
                </Text>
            </View>
            <View style={{ marginHorizontal: 30, marginTop: "3%" }}>
                <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16 }}>
                    Compensation range: ${props.data.compensationStart} - ${props.data.compensationEnd}
                </Text>
            </View>
            <View style={{ marginHorizontal: 30, marginTop: "3%" }}>
                <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16 }}>
                    Equipment: {props.data.equipment}
                </Text>
            </View>
            <View style={{ marginHorizontal: 30, marginTop: "3%" }}>
                <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16 }}>
                    Description
                </Text>
                <Text style={{ fontFamily: "Rubik-Regular", fontSize: 14 }}>
                    {props.data.description}
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
            <EditShowDetailsModal visible={visible} setVisible={setVisible} data={props.data} />
        </View>
    )
}

export default VenueShowDetails;