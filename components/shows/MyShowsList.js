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

const MyShowsList = (props) => {
    const data = [
        {
            appliedDate: "June, 2nd 2023",
            name: "Gentle Bens",
            date: "May, 15th",
            start: "10:00 pm",
            end: "12:00 am",
            location: "Tucson, AZ",
            address: "8150 east loftwood ln",
            type: "Bar",
            uuid: "6CBblFlY0YTml1qXWdvpMfRgvYG2",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            equipment: "lots of stuff",
            compensationStart: "50",
            compensationEnd: "85",
            typeNeeded: "DJ",
            genreNeeded: "House",
            expires: "",
            status: "pending",
            numberOfCanidates: "",
            profilePic: "https://firebasestorage.googleapis.com/v0/b/bukd-app.appspot.com/o/vLOnJSi62Dh4u6Ul9WDJtJzf0Lw2-profile-pic?alt=media&token=b7674092-b166-4416-b189-29bed24afe81&_gl=1*b960h8*_ga*MTcxNzU0OTM3OC4xNjc5NTQ2ODcx*_ga_CW55HF8NVT*MTY4NTczMDUyMy4zOS4xLjE2ODU3MzA1ODYuMC4wLjA."
        },
        {
            appliedDate: "June, 2nd 2023",
            name: "Gentle Bens",
            date: "May, 15th",
            start: "10:00 pm",
            end: "12:00 am",
            location: "Tucson, AZ",
            address: "8150 east loftwood ln",
            type: "Bar",
            uuid: "6CBblFlY0YTml1qXWdvpMfRgvYG2",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            equipment: "lots of stuff",
            compensationStart: "50",
            compensationEnd: "85",
            typeNeeded: "DJ",
            genreNeeded: "House",
            expires: "",
            status: "accepted",
            numberOfCanidates: "",
            profilePic: "https://firebasestorage.googleapis.com/v0/b/bukd-app.appspot.com/o/vLOnJSi62Dh4u6Ul9WDJtJzf0Lw2-profile-pic?alt=media&token=b7674092-b166-4416-b189-29bed24afe81&_gl=1*b960h8*_ga*MTcxNzU0OTM3OC4xNjc5NTQ2ODcx*_ga_CW55HF8NVT*MTY4NTczMDUyMy4zOS4xLjE2ODU3MzA1ODYuMC4wLjA."
        },
        {
            appliedDate: "June, 2nd 2023",
            name: "Gentle Bens",
            date: "May, 15th",
            start: "10:00 pm",
            end: "12:00 am",
            location: "Tucson, AZ",
            address: "8150 east loftwood ln",
            type: "Bar",
            uuid: "6CBblFlY0YTml1qXWdvpMfRgvYG2",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            equipment: "lots of stuff",
            compensationStart: "50",
            compensationEnd: "85",
            typeNeeded: "DJ",
            genreNeeded: "House",
            expires: "",
            status: "denied",
            numberOfCanidates: "",
            profilePic: "https://firebasestorage.googleapis.com/v0/b/bukd-app.appspot.com/o/vLOnJSi62Dh4u6Ul9WDJtJzf0Lw2-profile-pic?alt=media&token=b7674092-b166-4416-b189-29bed24afe81&_gl=1*b960h8*_ga*MTcxNzU0OTM3OC4xNjc5NTQ2ODcx*_ga_CW55HF8NVT*MTY4NTczMDUyMy4zOS4xLjE2ODU3MzA1ODYuMC4wLjA."
        }
    ]

    const renderItem = useCallback(({ item }) => {
        return (
            <TouchableOpacity style={styles.showContainer} onPress={() => {
                props.props.navigation.navigate("MyShowDetails", { data: item });
            }}>
                <View style={{ padding: "3%", width: "100%" }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", }}>

                        <View style={{ flexDirection: "column" }}>
                            <View style={{ alignSelf: 'center' }}>
                                <Text style={styles.dateText}>{item.date}</Text>
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
                                    {item.start} - {item.end}
                                </Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
                                <Ionicons
                                    name="location-outline"
                                    size={24}
                                    color={global.color.secondaryColors.placeHolderTextColor}
                                />
                                <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.smallText,]} >
                                    {item.name}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View >
                        <Text style={styles.smallText}>
                            Applied on {item.appliedDate}
                        </Text>
                    </View>
                    {item.status == "pending" &&
                        <View style={{ flexDirection: "row", alignItems: "center" }}>

                            <Ionicons name="ellipsis-horizontal-circle-outline" size={24} color={global.color.secondaryColors.placeHolderTextColor} />
                            <Text style={styles.smallText}>
                                Pending
                            </Text>
                        </View>
                    }
                    {item.status == "accepted" &&
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Ionicons name="checkmark-circle-outline" size={24} color={global.color.secondaryColors.placeHolderTextColor} />
                            <Text style={styles.smallText}>
                                Accepted
                            </Text>
                        </View>
                    }
                    {item.status == "denied" &&
                        <View style={{ flexDirection: "row", alignItems: "center" }}>

<Ionicons name="remove-circle-outline" size={24} color={global.color.secondaryColors.placeHolderTextColor} />
                            <Text style={styles.smallText}>
                                Denied
                            </Text>
                        </View>
                    }
                </View>

            </TouchableOpacity>
        )
    })
    return (
        <FlatList
            data={data}
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

export default MyShowsList;