import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity
} from "react-native";
import global from "../../styles/global";
import EditShowDetailsModal from "./EditShowDetailsModal";

const VenueShowDetails = (props) => {
    const [visible, setVisible] = useState(false);
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
                    {props.data.name}
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
                    Date: {props.data.date}
                </Text>
            </View>
            <View style={{ marginHorizontal: 30, marginTop: "3%" }}>
                <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16 }}>
                    Time: {props.data.start} - {props.data.end}
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
                    Post expires: {props.data.expires}
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