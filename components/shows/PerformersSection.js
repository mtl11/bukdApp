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
import { getShowsDataAtLocation } from "../../util/shows";

const PerformersSection = (props) => {
    const [location, setLocation] = useState("Tucson, AZ");
    const [localShows, setLocalShows] = useState(true);
    const [usersShows, setUsersShows] = useState(false);
    const [showsData, setShowsData] = useState();

    async function getShowsAtLocation(){
        // (location)
        const showsData = await getShowsDataAtLocation(location);
        if (showsData){
            const data = Object.entries(showsData);
            const array = [];
            for (const x in data){
                const item = data[x][1];
                item["showID"] = data[x][0];
                array.push(item);
                // (item)
            }
            setShowsData(array);
        }
    }

    useEffect(()=>{
        getShowsAtLocation();
    },[])
    return (
        <View>
            <View style={{ alignItems: "center" }}>
                <SearchDropDown
                    setValue={setLocation}
                    placeholder={"Tucson, AZ"}
                    data={locations}
                    icon={"ios-location-outline"}
                    blur={getShowsAtLocation}
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
            {localShows == true && <LocalList props={props.props} data={showsData} profileType={props.profileType}/>}
            {usersShows == true && <MyShowsList props={props.props} profileType={props.profileType}/>}
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