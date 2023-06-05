import React, { useEffect, useState, useContext } from "react";
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Button
} from "react-native";
import SearchDropDown from "../../components/search/SearchDropDown";
import { locations } from "../../models/dropdownData";
import global from "../../styles/global";
import LocalList from "../../components/shows/LocalList";
import MyShowsList from "../../components/shows/MyShowsList";

const PerformersSection = (props) => {
    const [location, setLocation] = useState();
    const [localShows, setLocalShows] = useState(true);
    const [usersShows, setUsersShows] = useState(false);
    return (
        <View>
            <View style={{ alignItems: "center" }}>
                <SearchDropDown
                    setValue={setLocation}
                    placeholder={"Tucson, AZ"}
                    data={locations}
                    icon={"ios-location-outline"}
                    blur={() => { }}
                />
            </View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    width: "90%",
                    alignSelf: "center",
                    marginVertical: "2.5%",
                    borderColor: global.color.secondaryColors.placeHolderTextColor
                }}
            >
                <TouchableOpacity
                    style={styles.tabContainer}
                    onPress={() => {
                        setLocalShows(true);
                        setUsersShows(false);

                    }}
                >
                    <View style={{ flexDirection: "column" }}>
                        <View style={styles.tabTextContainer}>
                            <Text style={[styles.tabText, localShows && { color: "black" }]}>Open Gigs</Text>
                        </View>
                        {localShows && (
                            <View style={styles.tabBottomBar}></View>
                        )}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.tabContainer}
                    onPress={() => {
                        setLocalShows(false);
                        setUsersShows(true);
                    }}
                >
                    <View style={{ flexDirection: "column" }}>
                        <View style={styles.tabTextContainer}>
                            <Text style={[styles.tabText, usersShows && { color: "black" }]}>My Shows</Text>
                        </View>
                        {usersShows && (
                            <View style={styles.tabBottomBar}></View>
                        )}
                    </View>
                </TouchableOpacity>
            </View>
            {localShows == true && <LocalList props={props.props} />}
            {usersShows == true && <MyShowsList props={props.props} />}
        </View>
    )
}
const styles = StyleSheet.create({
    
    tabView: {
        borderBottomWidth: 1,
        marginTop: 10,
        alignItems: "center",
        borderColor: global.color.secondaryColors.adjacent,
    },
    tabTextContainer: {
        paddingHorizontal: 15,
        borderRadius: 10,
        paddingBottom: 10,
    },
    tabContainer: {
        width: "50%",
        alignItems: "center",
    },
    tabBottomBar: {
        borderWidth: 2.5,
        borderRadius: 12,
        borderColor: global.color.secondaryColors.main,
        backgroundColor: global.color.secondaryColors.main,
    },
    tabText: {
        color: global.color.secondaryColors.placeHolderTextColor,
        fontFamily: "Rubik-Regular",
        fontSize: 16,
    },
})

export default PerformersSection;