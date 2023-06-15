import React, { useContext, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from "react-native";
import global from "../../styles/global";
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import { ProfileContext } from "../../store/profileContext.js";

const ShowsTab = (props) => {
    const [shows, setShows] = useState(props.shows);
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

    const [selectedItem, setSelectedItem] = useState("");
    const getItem = (item) => {
        // console.log(item);
        const start = formatAMPM(new Date(item.startTime));
        const end = formatAMPM(new Date(item.endTime));
        const month = new Date(item.date).toLocaleString('default', { month: 'long' });
        const day = new Date(item.date).getDate();
        const datePosted = new Date(item.date).toLocaleString('default', { year: 'numeric', month: 'long', day: 'numeric' });
        // console.log(props.pType);
        return (
            <TouchableOpacity style={styles.showContainer} onPress={() => {

                props.props.navigation.navigate("OpenShowDetails", { data: item, profileType: props.pType });
            }}>
                <View style={{ padding: "3%", width: "100%" }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                        <View style={{ flexDirection: "column" }}>
                            <View style={{ alignSelf: "flex-start" }}>
                                <Text style={styles.dateText}>{month} {day}</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Ionicons name="musical-notes-outline" size={20} color="black" />
                                <View style={{ alignSelf: 'center' }}>
                                    <Text style={styles.dateTextSmall}>{item.typeNeeded} - {item.genreNeeded}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: "column" }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <EvilIcons name="clock" size={28} color={global.color.secondaryColors.placeHolderTextColor} />
                                <Text style={styles.smallText}>
                                    {start} - {end}
                                </Text>
                            </View>

                        </View>
                    </View>
                    <View >
                        <Text style={styles.smallText}>
                            Created on {datePosted}
                        </Text>
                    </View>
                    {item.hasOwnProperty("applicants") ?
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Ionicons name="person-outline" size={24} color={global.color.secondaryColors.main} />
                            <Text style={[styles.smallText, { color: global.color.secondaryColors.main }]}>

                                {Object.values(item.applicants).length} Applicants
                            </Text>
                        </View>
                        : <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Ionicons name="person-outline" size={24} color={global.color.secondaryColors.main} />
                            <Text style={[styles.smallText, { color: global.color.secondaryColors.main }]}>
                                0 Applicants
                            </Text>
                        </View>
                    }
                </View>
            </TouchableOpacity>
            // <TouchableOpacity key={label} style={styles.showContainer} onPress={() => {
            //     if (label == selectedItem) {
            //         setSelectedItem(null);
            //     } else
            //         setSelectedItem(label);
            // }}>
            //     <View style={{ width: "90%" }}>
            //         <View style={{ padding: "3%", flexDirection: "row", justifyContent: "space-between", width: "110%" }}>
            //             <View style={{ alignSelf: 'center' }}>
            //                 <Text style={styles.dateText}>{month} {day}</Text>
            //             </View>
            //             <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
            //                 <View style={{ flexDirection: "row", alignItems: "center", paddingBottom: 10 }}>
            //                     <EvilIcons name="clock" size={28} color={global.color.secondaryColors.placeHolderTextColor} />
            //                     <Text style={styles.smallText}>
            //                         {start} - {end}
            //                     </Text>
            //                 </View>
            //                 {profileCTX.basicInfo.profileType == "venue" ?
            //                     <View style={{ flexDirection: "row", alignItems: "center" }}>
            //                         {performersNeeded ? <MaterialIcons name="event-available" size={24} color={global.color.secondaryColors.placeHolderTextColor} /> :
            //                             <MaterialIcons name="event-busy" size={24} color={global.color.secondaryColors.placeHolderTextColor} />}
            //                         <Text style={styles.smallText}>
            //                             {performersNeeded ? "Performers needed" : "Booked"}
            //                         </Text>
            //                     </View> :
            //                     <View style={{ flexDirection: "row", alignItems: "center", width: 200, justifyContent: "flex-end" }}>
            //                         <Ionicons
            //                             name="location-outline"
            //                             size={24}
            //                             color={global.color.secondaryColors.placeHolderTextColor}
            //                         />
            //                         <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.smallText,]}>
            //                             {venueName}
            //                         </Text>
            //                     </View>}

            //             </View>
            //         </View>
            //         {description &&
            //             <View style={{ marginVertical: "5%", marginHorizontal: "2%" }}>
            //                 <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16, lineHeight: 20 }}>
            //                     {description}
            //                 </Text>
            //             </View>}
            //         {selectedItem == label &&
            //             <TouchableWithoutFeedback >
            //                 <View style={{ flexDirection: "row", justifyContent: "space-evenly", width: "110%", padding: "5%" }}>
            //                     <TouchableOpacity onPress={() => { setEditSelectedItem(item); editSetVisible(!editVisible) }} style={{ backgroundColor: "white", padding: 12, borderRadius: 12, width: "30%", alignItems: "center", borderWidth: 1, borderColor: global.color.primaryColors.main }}>
            //                         <Text style={{ color: global.color.primaryColors.main, fontSize: 14, fontFamily: "Rubik-SemiBold" }}>
            //                             Edit
            //                         </Text>
            //                     </TouchableOpacity>
            //                     <TouchableOpacity onPress={deleteShow} style={{ backgroundColor: global.color.primaryColors.main, padding: 12, borderRadius: 12, width: "30%", alignItems: "center" }}>
            //                         <Text style={{ color: "white", fontSize: 14, fontFamily: "Rubik-SemiBold" }}>
            //                             Delete
            //                         </Text>
            //                     </TouchableOpacity>
            //                 </View>

            //             </TouchableWithoutFeedback>
            //         }
            //     </View>
            // </TouchableOpacity>
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
                        ({ item }) => { return getItem(item) }
                    }
                />}
        </View>
    );
}
const styles = StyleSheet.create({
    // showContainer: {
    //     borderRadius: 12,
    //     borderColor: "#D9D9D9",
    //     flexDirection: "row",
    //     backgroundColor: "white",
    //     shadowColor: "#000",
    //     shadowOffset: {
    //         width: 0,
    //         height: 1,
    //     },
    //     shadowOpacity: 0.22,
    //     shadowRadius: 2.22,
    //     marginBottom: "5%"
    // },
    // dateText: {
    //     fontSize: 20, fontFamily: "Rubik-SemiBold"
    // }, smallText: {
    //     color: global.color.secondaryColors.placeHolderTextColor,
    //     fontFamily: "Rubik-Regular",
    //     fontSize: 14
    // },
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
        fontSize: 20, fontFamily: "Rubik-SemiBold"
    }, smallText: {
        color: global.color.secondaryColors.placeHolderTextColor,
        fontFamily: "Rubik-Regular",
        fontSize: 14
    }
});

export default ShowsTab;