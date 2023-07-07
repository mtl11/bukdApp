import React, { useEffect, useState, useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
    Image
} from "react-native";
import global from "../../styles/global";
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import { getMyShowsData, getShowData } from "../../util/shows";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyShowsList = (props) => {
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
    const renderItem = useCallback(({ item }) => {
        const start = formatAMPM(new Date(item.startTime));
        const end = formatAMPM(new Date(item.endTime));
        const month = new Date(item.date).toLocaleString('default', { month: 'long' });
        const day = new Date(item.date).getDate();
        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let dayOfWeek = weekday[new Date(item.date).getDay()];
        const datePosted = new Date(item.date).toLocaleString('default', { year: 'numeric', month: 'long', day: 'numeric' });
        const appliedDate = new Date(item.appliedToDate).toLocaleString('default', { year: 'numeric', month: 'long', day: 'numeric' });
        return (
            <TouchableOpacity style={styles.showContainer} onPress={() => {
                props.props.navigation.navigate("MyShowDetails", { data: item });
            }}>
                <View style={{ padding: "5%", width: "100%", }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View>
                            <Image
                                source={{ uri: item.uri }}
                                style={{ height: 110, width: 110, borderRadius: 12, backgroundColor: global.color.secondaryColors.adjacent }}
                            />
                        </View>
                        <View style={{ alignItems: "flex-end" }}>
                            <View style={{ marginBottom: 5 }}>
                                <Text style={styles.dateText}>{dayOfWeek}, {month} {day}</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
                                <Ionicons name="musical-notes-outline" size={20} color="black" />
                                <View style={{ alignSelf: 'center' }}>
                                    <Text style={styles.dateTextSmall}>{item.typeNeeded} - {item.genreNeeded}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
                                <EvilIcons name="clock" size={28} ccolor="black" />
                                <Text style={styles.smallText}>
                                    {start} - {end}
                                </Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                <Ionicons
                                    name="location-outline"
                                    size={24}
                                    color="black"
                                />
                                <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.smallText,]} >
                                    {item.venueName}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{marginVertical: "3%"}}>
                        <Text style={[styles.smallText,{color: global.color.secondaryColors.placeHolderTextColor}]}>
                            Applied on {appliedDate}
                        </Text>
                    </View> 
                    <Text style={{
                        alignSelf: "center", marginTop: 5, fontFamily: "Rubik-Regular",
                        fontSize: 16,
                        color: global.color.primaryColors.main
                    }} >
                        View Details
                    </Text>
                </View>
            </TouchableOpacity>
            /*<TouchableOpacity style={styles.showContainer} onPress={() => {
            //     props.props.navigation.navigate("MyShowDetails", { data: item });
            // }}>
            //     <View style={{ padding: "3%", width: "100%" }}>
            //         <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            //             <View style={{ flexDirection: "column" }}>
            //                 <View style={{ alignSelf: 'center' }}>
            //                     <Text style={styles.dateText}>{dayOfWeek}, {month} {day}</Text>
            //                 </View>
            //                 <View style={{ flexDirection: "row", alignItems: "center" }}>
            //                     <Ionicons name="musical-notes-outline" size={20} color="black" />
            //                     <View style={{ alignSelf: 'center' }}>
            //                         <Text style={styles.dateTextSmall}>{item.typeNeeded} - {item.genreNeeded}</Text>
            //                     </View>
            //                 </View>
            //             </View>
            //             <View style={{ flexDirection: "column" }}>
            //                 <View style={{ flexDirection: "row", alignItems: "center" }}>
            //                     <EvilIcons name="clock" size={28} color={global.color.secondaryColors.placeHolderTextColor} />
            //                     <Text style={styles.smallText}>
            //                         {start} - {end}
            //                     </Text>
            //                 </View>
            //                 <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
            //                     <Ionicons
            //                         name="location-outline"
            //                         size={24}
            //                         color={global.color.secondaryColors.placeHolderTextColor}
            //                     />
            //                     <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.smallText,]} >
            //                         {item.venueName}
            //                     </Text>
            //                 </View>
            //             </View>
            //         </View>
            //         {/* <View>
            //             <Text style={styles.smallText}>
            //                 Applied on {appliedDate}
            //             </Text>
            //         </View> */
            //     </View>
            // </TouchableOpacity>
            // *\}
        )
    })

    async function getMyShows() {
        const localId = await AsyncStorage.getItem("localId");
        const myShows = await getMyShowsData(localId);
        if (myShows != null) {
            const rawData = Object.values(myShows);
            (rawData);
            const flatListData = [];
            for (const x in rawData) {
                const retrievedData = await getShowData(rawData[x].showID, rawData[x].location);

                if (rawData[x].hasOwnProperty("message")) {

                    retrievedData["message"] = rawData[x].message;
                }
                if (rawData[x].hasOwnProperty("appliedToDate")) {
                    retrievedData["appliedToDate"] = rawData[x].appliedToDate;
                }
                flatListData.push(retrievedData);
            }
            setData(flatListData)
        }
        setGettingShows(false);
    }
    const [data, setData] = useState();
    const [gettingShows, setGettingShows] = useState(false);
    useEffect(() => {
        setGettingShows(true);
        getMyShows();

    }, [])
    if (gettingShows == false) {
        return (
            <FlatList
                style={{ height: "100%" }}
                data={data}
                renderItem={renderItem}
                contentContainerStyle={{ marginTop: "2.5%" }}
                ListEmptyComponent={() => {
                    return (
                        <View>
                            <Text style={{ textAlign: "center", fontSize: 18, fontFamily: "Rubik-Regular" }}>
                                No Applied to Shows !
                            </Text>
                        </View>
                    )
                }}
            />
        )
    } else {
        return (
            <ActivityIndicator size={"small"} />
        )
    }
}

const styles = StyleSheet.create({
    showContainer: {
        // width: "90%",
        marginHorizontal: "5%",
        // borderWidth: 1, 
        borderRadius: 12,
        borderColor: "#D9D9D9",
        flexDirection: "row",
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 1,
        // },
        // shadowOpacity: 0.2,
        // shadowRadius: 2.2,
        marginBottom: "5%"
    }, dateTextSmall: {
        fontSize: 16, fontFamily: "Rubik-Regular"
    },
    dateText: {
        fontSize: 18, fontFamily: "Rubik-SemiBold"
    }, smallText: {
        color: "black",
        fontFamily: "Rubik-Regular",
        fontSize: 14
    }
})

export default MyShowsList;