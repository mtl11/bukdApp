import React, { useCallback, useContext, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from "react-native";
import global from "../../styles/global";
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import { ProfileContext } from "../../store/profileContext";

const MyShowsListVenue = (props) => {

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
        const datePosted = new Date(item.date).toLocaleString('default', {year: 'numeric', month: 'long', day: 'numeric'});

        return (
            <TouchableOpacity style={styles.showContainer} onPress={() => {
                props.props.navigation.navigate("MyShowDetailsVenue", { data: item });
            }}>
                <View style={{ padding: "3%", width: "100%" }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                        <View style={{ flexDirection: "column" }}>
                            <View style={{ alignSelf: "flex-start"}}>
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
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Ionicons name="person-outline" size={24} color={global.color.secondaryColors.main} />
                        <Text style={[styles.smallText, {color: global.color.secondaryColors.main}]}>
                            {item.applicants} Applicants
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    })

   const profileCTX = useContext(ProfileContext);
    return (
        <FlatList
            data={profileCTX.shows}
            renderItem={renderItem}
            contentContainerStyle={{ marginTop: "2.5%" }}
        />
    )
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
        fontSize: 20, fontFamily: "Rubik-SemiBold"
    }, smallText: {
        color: global.color.secondaryColors.placeHolderTextColor,
        fontFamily: "Rubik-Regular",
        fontSize: 14
    }
})

export default MyShowsListVenue;