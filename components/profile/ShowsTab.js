import React, { useContext, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Button,
    TextInput,

} from "react-native";
import global from "../../styles/global";
import Modal from "react-native-modal";
import DateTimePicker from '@react-native-community/datetimepicker';
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import { ProfileContext } from "../../store/profileContext.js";

const ShowsTab = () => {
    const profileCTX = useContext(ProfileContext);
    const [visible, setVisible] = useState(false);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [date, setDate] = useState(new Date());
    const [venueName, setVenueName] = useState("");
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
    // console.log(profileCTX.shows);
    const getShows = () => {
        const array = [];
        console.log(profileCTX.shows);
        for (const show in profileCTX.shows) {
            const month = new Date(profileCTX.shows[show].date).toLocaleString('default', { month: 'long' });
            const day = new Date(profileCTX.shows[show].date).getUTCDate();
            const start = formatAMPM(new Date(profileCTX.shows[show].startTime));
            const end = formatAMPM(new Date(profileCTX.shows[show].endTime));
            const venueName = profileCTX.shows[show].venueName;
            array.push(
                <View key={show} style={styles.showContainer}>
                    <View style={{ padding: "3%" ,flexDirection: "row", width:"100%", justifyContent:"space-between"}}>
                        <View style={{alignSelf: 'center'}}>
                            <Text style={styles.dateText}>{month} {day}</Text>
                        </View>
                        <View style={{flexDirection: "column", alignItems: "flex-end"}}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <EvilIcons name="clock" size={28} color={global.color.secondaryColors.placeHolderTextColor} />
                                <Text style={styles.smallText}>
                                    {start} - {end}
                                </Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Ionicons
                                    name="location-outline"
                                    size={24}
                                    color={global.color.secondaryColors.placeHolderTextColor}
                                />
                                <Text style={styles.smallText}>
                                    {venueName}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }
        return array;
    }

    const addShow = () => {
        const show = {
            startTime: startTime,
            endTime: endTime,
            date: date,
            venueName: venueName,
        }
        profileCTX.addShow(show);
    }
    return (
        <View style={{ alignItems: "center", flexDirection: "column", paddingVertical: "5%" }}>
            {profileCTX.shows.length != 0 ? getShows() :
                <Text
                    style={{
                        fontSize: 22,
                        fontFamily: "Rubik-Regular",
                        color: global.color.primaryColors.adjacent,
                    }}
                >
                    Click to Add a Show
                </Text>}
            <View >
                <TouchableOpacity onPress={() => {
                    setVisible(!visible)
                }}>
                    <Ionicons name="add-circle-outline" size={50} color={global.color.primaryColors.main} />
                </TouchableOpacity>
            </View>
            <Modal isVisible={visible}>
                <View style={{
                    height: "60%",
                    wieght: "50%",
                    backgroundColor: "white",
                    borderRadius: 12,
                }}>
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
                    <View style={{
                        borderRadius: 12,
                        marginHorizontal: "8%",
                        marginTop: "10%",
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
                            placeholder={"Venue Name"}
                            placeholderTextColor={global.color.secondaryColors.placeHolderTextColor}
                            onChangeText={setVenueName}
                        />
                    </View>
                    <TouchableOpacity
                        style={{
                            // alignContent: "center",
                            // justifyContent: "flex-end",
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
                            addShow();
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
                                Add Show
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}
const styles = StyleSheet.create({
    showContainer: {
        width: "90%",
        borderWidth: 1, borderRadius: 12,
        borderColor: "#D9D9D9",
        flexDirection: "row",
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