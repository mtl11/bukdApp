import React, { useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image
} from "react-native";
import global from "../../styles/global";
import { EvilIcons, Ionicons } from '@expo/vector-icons';

const LocalList = (props) => {
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
        const datePosted = new Date(item.datePosted).toLocaleString('default', { year: 'numeric', month: 'long', day: 'numeric' });
        // console.log(datePosted);
        return (
            <TouchableOpacity style={styles.showContainer} onPress={() => {
                props.props.navigation.navigate("OpenShowDetails", { data: item, profileType: props.profileType });
            }}>
                <View style={{ padding: "5%", width: "100%", }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View>
                            <Image
                                source={{ uri: item.uri }}
                                style={{ height: 110, width: 110, borderRadius: 100, backgroundColor: global.color.secondaryColors.adjacent }}
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
                    <Text style={{
                        alignSelf: "center", marginTop: 5, fontFamily: "Rubik-SemiBold",
                        fontSize: 16,
                        color: global.color.primaryColors.main
                    }} >
                        View Details
                    </Text>
                </View>

            </TouchableOpacity>
        )
    }, [])

    const getData = () => {
        props.data.sort(function (a, b) {
            return new Date(a.date) - new Date(b.date);
        })
        return props.data;
    }

    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            data={getData()}
            renderItem={renderItem}
            style={{ height: "85%" }}
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
        fontSize: 18, fontFamily: "Rubik-SemiBold"
    }, smallText: {
        fontFamily: "Rubik-Regular",
        fontSize: 16
    }
})

export default LocalList;