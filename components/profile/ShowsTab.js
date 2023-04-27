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
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from "@expo/vector-icons";
import global from "../../styles/global";
import Modal from "react-native-modal";
import DateTimePicker from '@react-native-community/datetimepicker';

const ShowsTab = () => {
    const [visible, setVisible] = useState(false);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [date, setDate] = useState(new Date());

    return (
        <View style={{ alignItems: "center", flexDirection: "column", paddingVertical: "10%" }}>
            <Text
                style={{
                    fontSize: 22,
                    fontFamily: "Rubik-Regular",
                    color: global.color.primaryColors.adjacent,
                }}
            >
                Click to Add a Show
            </Text>
            <View>
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
                        <Ionicons name="close-circle" size={28} color={global.color.primaryColors.main} />
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
                            <Text style={{ fontSize: 16, fontFamily: "Rubik-Regular", padding: 5 ,}}>
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
                            setVisible(!visible)
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

export default ShowsTab;