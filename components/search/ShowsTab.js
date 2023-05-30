import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList} from "react-native";
import global from "../../styles/global";
import { EvilIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';
const ShowsTab = (props) => {
    // const profileCTX = useContext(ProfileContext);
    const [shows, setShows] = useState(Object.entries(props.shows));
    const [visible, setVisible] = useState(false);
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
    if (shows != undefined) {
        const sorted = shows.sort(
            function (a, b) {
                return new Date(a[1].date) - new Date(b[1].date);
            });
    }
    const getItem = (item, label) => {
        const month = new Date(item.date).toLocaleString('default', { month: 'long' });
        const day = new Date(item.date).getDate();
        const start = formatAMPM(new Date(item.startTime));
        const end = formatAMPM(new Date(item.endTime));
        const venueName = item.venueName;
        const performersNeeded = item.performersNeeded;
        const description = item.description;
        return (
            <View key={label} style={styles.showContainer}>
                <View style={{ width: "90%" }}>
                    <View style={{ padding: "3%", flexDirection: "row", justifyContent: "space-between", width: "110%" }}>
                        <View style={{ alignSelf: 'center' }}>
                            <Text style={styles.dateText}>{month} {day}</Text>
                        </View>
                        <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <EvilIcons name="clock" size={28} color={global.color.secondaryColors.placeHolderTextColor} />
                                <Text style={styles.smallText}>
                                    {start} - {end}
                                </Text>
                            </View>
                            {props.basicInfo.profileType == "venue" ? 
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                {performersNeeded ?<MaterialIcons name="event-available" size={24} color={global.color.secondaryColors.placeHolderTextColor} />:
                                <MaterialIcons name="event-busy" size={24} color={global.color.secondaryColors.placeHolderTextColor} />}
                                <Text style={styles.smallText}>
                                    {performersNeeded ? "Performers needed" : "Booked"}
                                </Text>
                            </View> :
                                <View style={{ flexDirection: "row", alignItems: "center" ,width:200, justifyContent:"flex-end"}}>
                                    <Ionicons
                                        name="location-outline"
                                        size={24}
                                        color={global.color.secondaryColors.placeHolderTextColor}
                                    />
                                    <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.smallText, ]} >
                                        {venueName}
                                    </Text>
                                </View>
                            }
                        </View>
                    </View>
                    {description &&
                    <View style={{ marginVertical:"5%", marginHorizontal: "2%"}}>  
                        <Text style={{fontFamily:"Rubik-Regular", fontSize: 16, lineHeight: 20}}>
                            {description}    
                        </Text>     
                    </View>
                    }
                </View>
            </View>
        )
    }
    return (
        <View style={{ flex: 1 }} >
            {shows.length == 0 &&
                <View style={{ alignItems: "center", marginVertical: "10%" }}>
                    <Text
                        style={{
                            fontSize: 22,
                            fontFamily: "Rubik-Regular",
                            color: global.color.primaryColors.adjacent,
                        }}
                    >
                        No Shows Available
                    </Text>
                </View>}
            {shows.length != 0 &&
                <FlatList
                    contentContainerStyle={{ alignItems: "center", marginVertical: "5%", paddingBottom: 100 }}
                    data={shows} renderItem={
                        ({ item }) => { return getItem(item[1], item[0]) }
                    }
                />}
        </View>
    );
}
const styles = StyleSheet.create({
    showContainer: {
        // width: "90%",
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
    },
    dateText: {
        fontSize: 20, fontFamily: "Rubik-SemiBold"
    }, smallText: {
        color: global.color.secondaryColors.placeHolderTextColor,
        fontFamily: "Rubik-Regular",
        fontSize: 14
    }
});

export default ShowsTab;