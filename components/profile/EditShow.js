import React, { useContext, useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
} from "react-native";
import global from "../../styles/global";
import Modal from "react-native-modal";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { ProfileContext } from "../../store/profileContext.js";
import { getAccessToken, editShowV, editShowP } from "../../util/profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const EditShow = (props) => {
    const profileCTX = useContext(ProfileContext);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [date, setDate] = useState(new Date());
    const [venueName, setVenueName] = useState("");
    const [description, setDescription] = useState("");
    const [performersNeeded, setPerformersNeeded] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

    function editShow() {
        var objIndex = profileCTX.shows.findIndex((obj => obj[0] == props.label));
        const newShow = [props.label, {
            date: date,
            description: description,
            endTime: endTime,
            venueName: venueName,
            startTime: startTime
        }];

        const shows = profileCTX.shows;
        shows[objIndex] = newShow;
        profileCTX.changeShow(shows);
        setIsAuth(false);
    }

    async function editShowVenue() {
        var objIndex = profileCTX.shows.findIndex((obj => obj[0] == props.label));
        const newShow = [props.label, {
            date: date,
            description: description,
            endTime: endTime,
            performersNeeded: performersNeeded,
            startTime: startTime
        }];

        const shows = profileCTX.shows;
        shows[objIndex] = newShow;
        profileCTX.changeShow(shows);
        setIsAuth(false);
    }

    async function editHelperVenue(){
        const localId = await AsyncStorage.getItem("localId");
        const accessToken = await getAccessToken();
        await editShowV(props.label, startTime, endTime, date, performersNeeded, description, localId, accessToken);
    }

    async function editHelperPerformer(){
        const localId = await AsyncStorage.getItem("localId");
        const accessToken = await getAccessToken();
        await editShowP(props.label, startTime, endTime, date, venueName, description, localId, accessToken);
    }
    useEffect(() => {
        setPerformersNeeded(props.item.performersNeeded);
        if (props.item.date != undefined) {
            setDate(new Date(props.item.date));
        }
        if (props.item.startTime != undefined) {
            setStartTime(new Date(props.item.startTime));
        }
        if (props.item.endTime != undefined) {
            setEndTime(new Date(props.item.endTime));
        }
        setVenueName(props.item.venueName);
        setDescription(props.item.description);

    }, [props]);
    return (
        <Modal isVisible={props.visible}>
            <View style={{
                height: "70%",
                wieght: "50%",
                backgroundColor: "white",
                borderRadius: 12,
            }}>
                <KeyboardAwareScrollView>
                    <TouchableOpacity style={{ margin: 10 }} onPress={() => {
                        props.setVisible(!props.visible)
                    }}>
                        <Ionicons name="close-circle-outline" size={28} color={global.color.primaryColors.main} />
                    </TouchableOpacity>
                    <View style={{ alignSelf: "center" }}>
                        <Text style={{ fontSize: 20, fontFamily: "Rubik-SemiBold" }}>
                            Edit Show
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
                                    value={description}
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
                                    value={venueName}
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
                                    value={description}
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
                            setIsAuth(true);
                           
                            
                            if (profileCTX.basicInfo.profileType == "performer") {
                                editShow();
                                editHelperPerformer();
                            } else {
                                editShowVenue();
                                editHelperVenue();
                            }
                            props.setVisible(!props.visible);
                        }}
                    >
                        <View style={{ alignSelf: "center", padding: "5%", }}>
                            {isAuth == true ? <ActivityIndicator/> :
                            <Text
                                style={{
                                    color: global.color.primaryColors.buttonAccent,
                                    fontFamily: "Rubik-Medium",
                                    fontSize: 18
                                }}
                            >
                                Save Show
                            </Text>}
                        </View>
                    </TouchableOpacity>
                </KeyboardAwareScrollView>
            </View>
        </Modal>)
}

export default EditShow;