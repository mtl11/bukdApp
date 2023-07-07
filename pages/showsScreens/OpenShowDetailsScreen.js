import React, { useEffect, useState, useContext, useCallback } from "react";
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Button,
    FlatList
} from "react-native";
import global from "../../styles/global";
import { EvilIcons, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApplyModal from "../../components/shows/ApplyModal";
import { app } from "../../util/firebaseStorage";
import { applicationCheck } from "../../util/shows";
import { AuthContext } from "../../store/authContext";
import { ProfileContext } from "../../store/profileContext";
const OpenShowDetails = (props) => {
    const authCTX = useContext(AuthContext);
    const profileCTX = useContext(ProfileContext);

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

    let data = props.route.params.data;
    let pType = props.route.params.profileType;
    (pType)
    const [applyVisible, setApplyVisible] = useState(false);
    const start = formatAMPM(new Date(data.startTime));
    const end = formatAMPM(new Date(data.endTime));
    const month = new Date(data.date).toLocaleString('default', { month: 'long' });
    const day = new Date(data.date).getDate();
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let dayOfWeek = weekday[new Date(data.date).getDay()];
    const date = new Date(data.date).toLocaleString('default', { year: 'numeric', month: 'long', day: 'numeric' });
    const [applied, setApplied] = useState(false);
    // (profileCTX.personalInfo.profileType);
    async function checkIfApplied() {
        if (pType == "performer") {
            const localId = await AsyncStorage.getItem("localId");
            const response = await applicationCheck(localId, data.showID);
            if (response.data == null) {
                setApplied(false);
            } else {
                setApplied(true);
            }
        }
    }
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        if (authCTX.isAuthenticated) {
            checkIfApplied();
        }
        setLoading(false);
    }, []);
    // (profileCTX.personalInfo);
    return (
        <SafeAreaView style={{ height: "100%", backgroundColor: "white" }}>
            {/* <View style={{justifyContent:"space-between"}}> */}
            <View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <TouchableOpacity
                        style={styles.topIconContainer}
                        onPress={() => {
                            props.navigation.pop();
                        }}
                    >
                        <Ionicons
                            name="arrow-back"
                            size={28}
                            color={styles.iconColor}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.topIconContainer}
                        onPress={() => {
                            // (data.venueID)
                            AsyncStorage.setItem("searchID", data.venueID);
                            props.navigation.navigate("SearchArtistProfile");
                        }}
                    >
                        <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16, color: global.color.primaryColors.main }}>
                            View Profile
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", marginHorizontal: 30, marginTop: "3%" }}>
                    <Text style={{ fontFamily: "Rubik-SemiBold", fontSize: 18 }}>
                        {data.venueName}
                    </Text>

                </View>
                <View style={{ flexDirection: "row", marginHorizontal: 30, marginTop: "3%" }}>
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
                        Show Date: {dayOfWeek}, {month} {day}
                    </Text>
                </View>
                <View style={{ marginHorizontal: 30, marginTop: "3%" }}>
                    <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16 }}>
                        Show Time: {start} - {end}
                    </Text>
                </View>
                <View style={{ marginHorizontal: 30, marginTop: "3%" }}>
                    <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16 }}>
                        Compensation range: ${data.compensationStart} - ${data.compensationEnd}
                    </Text>
                </View>
                <View style={{ marginHorizontal: 30, marginTop: "3%" }}>
                    <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16 }}>
                        Venue's Equipment: {data.equipment}
                    </Text>
                </View>
                <View style={{ marginHorizontal: 30, marginTop: "3%" }}>
                    <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16 }}>
                        Description
                    </Text>
                    <Text style={{ fontFamily: "Rubik-Regular", fontSize: 14 }}>
                        {data.description}
                    </Text>
                </View>
            </View>
            
            {(applied == false && authCTX.isAuthenticated && pType == "performer" && loading == false) &&
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
                        setApplyVisible(!applyVisible)
                    }}
                >
                    <Text style={{
                        fontFamily: "Rubik-Medium",
                        color: "white",
                        fontSize: 18,
                    }}>
                        Apply now
                    </Text>
                </TouchableOpacity>}
            {(applied == true && authCTX.isAuthenticated && pType == "performer"&& loading == false) &&
                <View
                    style={{
                        alignItems: "center",
                        padding: 16,
                        // marginHorizontal: "8%",
                        // backgroundColor: global.color.secondaryColors.main,
                        // borderRadius: 12,
                        // marginTop: "7%"
                    }}
                >
                    <Text style={{
                        fontFamily: "Rubik-Medium",
                        // color: "white",
                        fontSize: 18,
                    }}>
                        You have already applied for this position
                    </Text>
                </View>}
                

            <ApplyModal
                visible={applyVisible}
                setVisible={setApplyVisible}
                showID={data.showID}
                location={data.location}
                setApplied={setApplied}
                props={props} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
        color: global.color.secondaryColors.text,
        fontFamily: "Rubik-Regular"
    },
    container: {
        backgroundColor: global.color.secondaryColors.background,
        height: "100%",
    }, footerContainer: {
        backgroundColor: global.color.secondaryColors.background,
        height: "100%",
    }, topIconContainer: {
        marginHorizontal: 30,
    },
    iconColor: global.color.primaryColors.main
});

export default OpenShowDetails;