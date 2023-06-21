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
import { EvilIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApplyModal from "../../components/shows/ApplyModal";
import { app } from "../../util/firebaseStorage";
const MyShowDetailsScreen = (props) => {
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
    const start = formatAMPM(new Date(data.startTime));
    const end = formatAMPM(new Date(data.endTime));
    const exiprationDate = new Date(data.postsExpire).toLocaleString('default', { year: 'numeric', month: 'long', day: 'numeric' });
    const date = new Date(data.date).toLocaleString('default', { year: 'numeric', month: 'long', day: 'numeric' });
    console.log(data)
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
                            // console.log(data.venueID)
                            AsyncStorage.setItem("searchID", data.venueID);
                            props.navigation.navigate("SearchArtistProfile");
                        }}
                    >
                        <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16, color: global.color.primaryColors.main }}>
                            View Profile
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginHorizontal: 30,
                    marginTop: "3%"
                }}>
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
                        Show Date: {date}
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
                        Equipment: {data.equipment}
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
                <View style={{ marginHorizontal: 30, marginTop: "3%" }}>
                    <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16 }}>
                        My Message
                    </Text>
                    <Text style={{ fontFamily: "Rubik-Regular", fontSize: 14 }}>
                        {data.message}
                    </Text>
                </View>
            </View>
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

export default MyShowDetailsScreen;