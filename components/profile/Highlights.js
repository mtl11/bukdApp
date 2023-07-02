import React, { useContext, useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Button,
    TextInput,
    FlatList,
    TouchableWithoutFeedback,
    Alert,
    KeyboardAvoidingView,
} from "react-native";
import global from "../../styles/global";
import Modal from "react-native-modal";
import DateTimePicker from '@react-native-community/datetimepicker';
import { EvilIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { ProfileContext } from "../../store/profileContext.js";
import { addNewShow, getAccessToken, deleteSomeShow, addNewShowVenue } from "../../util/profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import EditShow from "./EditShow";

const HighlightsTab = () => {
    const profileCTX = useContext(ProfileContext);
    const [shows, setShows] = useState(profileCTX.shows);
    const [visible, setVisible] = useState(false);
    const [editVisible, editSetVisible] = useState(false);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [date, setDate] = useState(new Date());
    const [venueName, setVenueName] = useState("");
    const [description, setDescription] = useState("");
    const [performersNeeded, setPerformersNeeded] = useState(false);
    const [editSelectedItem, setEditSelectedItem] = useState({});
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
    shows.sort(
        function (a, b) {
            return new Date(a[1].date) - new Date(b[1].date);
        });
    const getItem = (item, label) => {
        const month = new Date(item.date).toLocaleString('default', { month: 'long' });
        const day = new Date(item.date).getDate();
        const start = formatAMPM(new Date(item.startTime));
        const end = formatAMPM(new Date(item.endTime));
        const venueName = item.venueName;
        const performersNeeded = item.performersNeeded;
        const description = item.description;

        return (
            <TouchableOpacity key={label} style={styles.showContainer} onPress={() => {
                if (label == selectedItem) {
                    setSelectedItem(null);
                } else
                    setSelectedItem(label);
            }}>
                <View style={{ width: "90%" }}>
                    <View style={{ padding: "3%", flexDirection: "row", justifyContent: "space-between", width: "110%" }}>
                        <View style={{ alignSelf: 'center' }}>
                            <Text style={styles.dateText}>{month} {day}</Text>
                        </View>
                        <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
                            <View style={{ flexDirection: "row", alignItems: "center", paddingBottom: 10 }}>
                                <EvilIcons name="clock" size={28} color={global.color.secondaryColors.placeHolderTextColor} />
                                <Text style={styles.smallText}>
                                    {start} - {end}
                                </Text>
                            </View>
                            {profileCTX.basicInfo.profileType == "venue" ?
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    {performersNeeded ? <MaterialIcons name="event-available" size={24} color={global.color.secondaryColors.placeHolderTextColor} /> :
                                        <MaterialIcons name="event-busy" size={24} color={global.color.secondaryColors.placeHolderTextColor} />}
                                    <Text style={styles.smallText}>
                                        {performersNeeded ? "Performers needed" : "Booked"}
                                    </Text>
                                </View> :
                                <View style={{ flexDirection: "row", alignItems: "center", width: 200, justifyContent: "flex-end" }}>
                                    <Ionicons
                                        name="location-outline"
                                        size={24}
                                        color={global.color.secondaryColors.placeHolderTextColor}
                                    />
                                    <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.smallText,]}>
                                        {venueName}
                                    </Text>
                                </View>}

                        </View>
                    </View>
                    {description &&
                        <View style={{ marginVertical: "5%", marginHorizontal: "2%" }}>
                            <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16, lineHeight: 20 }}>
                                {description}
                            </Text>
                        </View>}
                    {selectedItem == label &&
                        <TouchableWithoutFeedback >
                            <View style={{ flexDirection: "row", justifyContent: "space-evenly", width: "110%", padding: "5%" }}>
                                <TouchableOpacity onPress={() => { setEditSelectedItem(item); editSetVisible(!editVisible) }} style={{ backgroundColor: "white", padding: 12, borderRadius: 12, width: "30%", alignItems: "center", borderWidth: 1, borderColor: global.color.primaryColors.main }}>
                                    <Text style={{ color: global.color.primaryColors.main, fontSize: 14, fontFamily: "Rubik-SemiBold" }}>
                                        Edit
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={deleteShow} style={{ backgroundColor: global.color.primaryColors.main, padding: 12, borderRadius: 12, width: "30%", alignItems: "center" }}>
                                    <Text style={{ color: "white", fontSize: 14, fontFamily: "Rubik-SemiBold" }}>
                                        Delete
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </TouchableWithoutFeedback>
                    }
                </View>
            </TouchableOpacity>
        )
    }

    async function deletehelper() {
        const localId = await AsyncStorage.getItem("localId");
        const accessToken = await getAccessToken();
        await deleteSomeShow(localId, selectedItem, accessToken);
    }

    const deleteShow = () => {
        Alert.alert("Are you sure you want to delete this show?", "This action can not be undone", [
            {
                text: "Cancel",
                onPress: () => { },
                style: "destructive",
            },
            {
                text: "Delete",
                onPress: () => {
                    profileCTX.deleteShow(selectedItem);
                    const filteredData = shows.filter(item => item[0] != selectedItem);
                    setShows(filteredData);
                    deletehelper();
                },
                style: "destructive",
            },
        ]);
    };
    async function addShow() {
        const accessToken = await getAccessToken();
        const localId = await AsyncStorage.getItem("localId");
        const value = await addNewShow(startTime, endTime, date, venueName, description, localId, accessToken);
        const show = [value.name, {
            startTime: startTime,
            endTime: endTime,
            date: date,
            description: description,
            venueName: venueName,
        }];
        profileCTX.addShow(show);
    }

    async function addShowVenue() {
        const accessToken = await getAccessToken();
        const localId = await AsyncStorage.getItem("localId");
        const value = await addNewShowVenue(startTime, endTime, date, performersNeeded, description, localId, accessToken);
        const show = [value.name, {
            startTime: startTime,
            endTime: endTime,
            date: date,
            description: description,
            performersNeeded: performersNeeded
        }]
        profileCTX.addShow(show);
    }

    useEffect(() => {
        const data = profileCTX.shows;
        setShows(profileCTX.shows);
    }, [profileCTX.shows]);

    return (
        <View >
            {profileCTX.shows.length == 0 &&
                <View style={{ alignItems: "center", marginVertical: "10%" }}>

                    <Text
                        style={{
                            fontSize: 22,
                            fontFamily: "Rubik-Regular",
                            color: global.color.primaryColors.adjacent,
                        }}
                    >
                        Click to Add a Show
                    </Text>
                    <TouchableOpacity onPress={() => {
                        setVisible(!visible)
                    }}>
                        <Ionicons name="add-circle-outline" size={50} color={global.color.primaryColors.main} />
                    </TouchableOpacity>
                </View>}
            {profileCTX.shows.length != 0 &&
            // <View style={{flex:1}}>

                <FlatList
                // style={{height: "100%"}}
                showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ alignItems: "center", marginVertical: "5%",}}
                    data={shows}
                    renderItem={
                        ({ item }) => {
                            return getItem(item[1], item[0])
                        }
                    }
                    ListFooterComponent={() => {

                        if (shows.length <= 5) {
                            return (
                                <View style={{ alignItems: "center", marginBottom: "5%" }}>
                                    <TouchableOpacity onPress={() => {
                                        setVisible(!visible)
                                    }}>
                                        <Ionicons name="add-circle-outline" size={50} color={global.color.primaryColors.main} />
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 14, fontFamily: "Rubik-Regular", color: global.color.secondaryColors.placeHolderTextColor }}>
                                        Maximum Shows: 6
                                    </Text>
                                </View>
                            )
                        } else {
                            return (
                                <View style={{ alignItems: "center", marginBottom: "5%" }}>
                                    <Text style={{ fontSize: 14, fontFamily: "Rubik-Regular", color: global.color.secondaryColors.placeHolderTextColor }}>
                                        Maximum Shows: 6
                                    </Text>
                                </View>
                            )
                        }
                    }
                    }
                    ListFooterComponentStyle={{ marginBottom: "10%" }}
                />
            // </View>    
            }

            <Modal isVisible={visible}>
                <View style={{
                    height: "70%",
                    wieght: "50%",
                    backgroundColor: "white",
                    borderRadius: 12,
                }}>
                    <KeyboardAwareScrollView>
                        <TouchableOpacity style={{ margin: 10 }} onPress={() => {
                            setVisible(!visible)
                        }}>
                            <Ionicons name="close-circle-outline" size={28} color={global.color.primaryColors.main} />
                        </TouchableOpacity>
                        <View style={{ alignSelf: "center" }}>
                            <Text style={{ fontSize: 20, fontFamily: "Rubik-SemiBold" }}>
                                Add Show
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            marginHorizontal: 30,
                            justifyContent: "space-between",
                            marginTop: "5%"
                        }}>
                            <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
                                <Text style={{ fontSize: 16, fontFamily: "Rubik-Regular", padding: 5 }}>
                                    Start Time
                                </Text>
                                <DateTimePicker
                                    themeVariant={"light"}
                                    testID="dateTimePicker"
                                    value={startTime}
                                    mode={"time"}
                                    is24Hour={true}
                                    onChange={(event, selectedDate) => {
                                        const currentDate = selectedDate;
                                        setStartTime(currentDate);
                                    }}
                                />
                            </View>
                            <View style={{ flexDirection: "column" }}>
                                <Text style={{ fontSize: 16, fontFamily: "Rubik-Regular", padding: 5, }}>
                                    End Time
                                </Text>
                                <DateTimePicker
                                    themeVariant={"light"}
                                    testID="dateTimePicker"
                                    value={endTime}
                                    mode={"time"}
                                    is24Hour={true}
                                    onChange={(event, selectedDate) => {
                                        const currentDate = selectedDate;
                                        setEndTime(currentDate);
                                    }}
                                />
                            </View>
                        </View>
                        <View style={{ marginTop: "2%", marginHorizontal: 30, alignSelf: "flex-start", marginTop: "5%" }}>
                            <Text style={{ fontSize: 16, fontFamily: "Rubik-Regular", padding: 5 }}>
                                Date
                            </Text>
                            <DateTimePicker
                                themeVariant={"light"}
                                testID="dateTimePicker"
                                value={date}
                                mode={"date"}
                                is24Hour={true}
                                onChange={(event, selectedDate) => {
                                    const currentDate = selectedDate;
                                    setDate(currentDate);
                                }}
                            />
                        </View>
                        {profileCTX.basicInfo.profileType == "venue" &&
                            <View>
                                <View style={{ marginTop: "2%", marginHorizontal: 30, alignSelf: "flex-start", marginTop: "5%", flexDirection: "row" }}>
                                    <Text style={{ fontSize: 16, fontFamily: "Rubik-Regular", padding: 5 }}>
                                        Performers needed?
                                    </Text>
                                    <TouchableOpacity onPress={() => { setPerformersNeeded(!performersNeeded) }}>
                                        {performersNeeded ? <Ionicons name="checkbox-outline" size={28} color={global.color.primaryColors.main} /> :
                                            <Ionicons name="ios-square-outline" size={28} color={"black"} />}
                                    </TouchableOpacity>
                                </View>
                                <View style={{
                                    borderRadius: 12,
                                    marginHorizontal: "8%",
                                    marginTop: "5%",
                                    backgroundColor: global.color.secondaryColors.adjacent,
                                }}>
                                    <TextInput
                                        style={{
                                            paddingVertical: "5%",
                                            marginHorizontal: "5%",
                                            marginTop: 10,
                                            fontSize: 16,
                                            fontFamily: "Rubik-Regular",
                                            color: global.color.secondaryColors.text,
                                        }}
                                        placeholder={"Description"}
                                        placeholderTextColor={global.color.secondaryColors.placeHolderTextColor}
                                        onChangeText={setDescription}
                                        maxLength={120}
                                        maxHeight={160}
                                        blurOnSubmit={true}
                                        multiline={true}
                                        numberOfLines={4}
                                    />
                                </View>
                            </View>
                        }
                        {profileCTX.basicInfo.profileType == "performer" &&
                            <View>
                                <View style={{
                                    borderRadius: 12,
                                    marginHorizontal: "8%",
                                    marginTop: "5%",
                                    backgroundColor: global.color.secondaryColors.adjacent,
                                }}>
                                    <TextInput
                                        style={{
                                            paddingVertical: "5%",
                                            marginHorizontal: "5%",
                                            fontSize: 16,
                                            fontFamily: "Rubik-Regular",
                                            color: global.color.secondaryColors.text,
                                        }}
                                        maxLength={24}
                                        placeholder={"Venue Name"}
                                        placeholderTextColor={global.color.secondaryColors.placeHolderTextColor}
                                        onChangeText={setVenueName}
                                    />
                                </View>
                                <View style={{
                                    borderRadius: 12,
                                    marginHorizontal: "8%",
                                    marginTop: "5%",
                                    backgroundColor: global.color.secondaryColors.adjacent,

                                }}>
                                    <TextInput
                                        style={{
                                            paddingVertical: "5%",
                                            marginHorizontal: "5%",
                                            marginTop: 10,
                                            fontSize: 16,
                                            fontFamily: "Rubik-Regular",
                                            color: global.color.secondaryColors.text,
                                        }}
                                        placeholder={"Description"}
                                        placeholderTextColor={global.color.secondaryColors.placeHolderTextColor}
                                        onChangeText={setDescription}
                                        maxLength={120}
                                        maxHeight={160}
                                        blurOnSubmit={true}
                                        multiline={true}
                                        numberOfLines={4}
                                    />
                                </View>
                            </View>
                        }
                        <TouchableOpacity
                            style={{
                                borderRadius: 12,
                                borderWidth: 1,
                                borderColor: "#FCFCFF",
                                width: "90%",
                                marginTop: "20%",
                                marginBottom: 10,
                                backgroundColor: global.color.primaryColors.main,
                                alignSelf: "center",
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 1,
                                },
                                shadowOpacity: 0.22,
                                shadowRadius: 2.22,
                                elevation: 3
                            }}
                            onPress={() => {
                                setVisible(!visible);
                                setPerformersNeeded(false);
                                setVenueName("");
                                setDescription("");
                                if (profileCTX.basicInfo.profileType == "performer") {
                                    addShow();
                                } else {
                                    addShowVenue();
                                }

                            }}
                        >
                            <View style={{ alignSelf: "center", padding: "5%", }}>
                                <Text
                                    style={{
                                        color: global.color.primaryColors.buttonAccent,
                                        fontFamily: "Rubik-Medium",
                                        fontSize: 18
                                    }}
                                >
                                    Done
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </KeyboardAwareScrollView>
                </View>
            </Modal>
            <EditShow
                visible={editVisible}
                setVisible={editSetVisible}
                item={editSelectedItem}
                label={selectedItem}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    showContainer: {
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

export default HighlightsTab;