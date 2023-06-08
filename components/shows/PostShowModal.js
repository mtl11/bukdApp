import React, { useState } from "react"
import { View, ViewBase, TouchableOpacity, TextInput, Text, SafeAreaView, StyleSheet } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import global from "../../styles/global"
import Modal from "react-native-modal";
import ProfileDropDown from "../profile/ProfileDropDown";
import { profileCategoriesArtist, profileCategoriesArtistEdit, subCategories } from "../../models/dropdownData";
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView } from "react-native-gesture-handler";

const PostShowModal = (props) => {
    const [description, setDescription] = useState();
    // const [genre, setGenre] = useState(props.data.genreNeeded);
    const [genre, setGenre] = useState();
    const [typeNeeded, setTypeNeeded] = useState();
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [maxApplicants, setMaxApplicants] = useState();
    const [compensationStart, setCompensationStart] = useState();
    const [compensationEnd, setCompensationEnd] = useState();
    return (
        <Modal
            isVisible={props.visible} avoidKeyboard={true} style={{ backgroundColor: "white" }}>
            <SafeAreaView style={{
                flex: 1,
                borderRadius: 12,
            }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity style={{ justifyContent: "flex-end" }} onPress={() => {
                        props.setVisible(!props.visible)
                    }}>
                        <Ionicons name="close-circle-outline" size={28} color={global.color.primaryColors.main} />
                    </TouchableOpacity>

                </View>
                <ScrollView>

                    <View style={{ marginHorizontal: "3%" }}>
                        <View style={{ flexDirection: "row", width: "40%", justifyContent: "space-between", marginTop: "5%" }}>
                            <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16 }}>
                                Bens
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row", width: "40%", justifyContent: "space-between", marginTop: "5%" }}>
                            <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16 }}>
                                Tucson
                            </Text>
                        </View>
                        <View style={{ width: "120%", alignSelf: "center", marginTop: "5%" }}>
                            <ProfileDropDown
                                data={profileCategoriesArtistEdit}
                                setValue={setTypeNeeded}
                                value={typeNeeded}
                                placeholder={typeNeeded}
                            />
                        </View>
                        <View style={{ width: "120%", alignSelf: "center", marginTop: "5%" }}>
                            <ProfileDropDown
                                data={subCategories}
                                setValue={setGenre}
                                value={genre}
                                placeholder={genre}
                            />
                        </View>
                        <View style={{ alignSelf: "flex-start", marginTop: "5%" }}>
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
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder={"Max Applicants"}
                                placeholderTextColor={global.color.secondaryColors.placeHolderTextColor}
                                onChangeText={setMaxApplicants}
                                value={maxApplicants}
                                maxLength={3}
                                blurOnSubmit={true}
                                returnKeyType="done"
                                keyboardType="decimal-pad"
                            />
                        </View>

                        {/* <Text style={{ fontSize: 16, fontFamily: "Rubik-Regular", padding: 10, }}> 
                                End Time
                            </Text>  */}
                        <View style={{
                            flexDirection: "row",
                            marginHorizontal: 30,
                            justifyContent: "space-between",
                            marginTop: "5%"
                        }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontFamily: "Rubik-Regular",
                                    color: global.color.secondaryColors.text,
                                }}>
                                    $
                                </Text>
                                <View style={[styles.inputContainer, { margin: 0, },]}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={"0"}
                                        placeholderTextColor={global.color.secondaryColors.placeHolderTextColor}
                                        onChangeText={setCompensationStart}
                                        value={compensationStart}
                                        maxLength={3}
                                        blurOnSubmit={true}
                                        returnKeyType="done"
                                        keyboardType="decimal-pad"
                                    />
                                </View>
                                <Text style={{
                                    fontSize: 16,
                                    fontFamily: "Rubik-Regular",
                                    color: global.color.secondaryColors.text,
                                }}>
                                    hr
                                </Text>
                            </View>
                            <View style={{ alignSelf: "center" }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontFamily: "Rubik-Regular",
                                    color: global.color.secondaryColors.text,
                                }}>
                                    -
                                </Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontFamily: "Rubik-Regular",
                                    color: global.color.secondaryColors.text,
                                }}>
                                    $
                                </Text>
                                <View style={[styles.inputContainer, { flexDirection: "column", }]}>
                                    <TextInput
                                        style={{
                                            paddingVertical: 16,
                                            marginHorizontal: 16,
                                            fontSize: 16,
                                            fontFamily: "Rubik-Regular",
                                            color: global.color.secondaryColors.text,
                                        }}
                                        placeholder={"0"}
                                        placeholderTextColor={global.color.secondaryColors.placeHolderTextColor}
                                        onChangeText={setCompensationEnd}
                                        value={compensationEnd}
                                        maxLength={3}
                                        blurOnSubmit={true}
                                        returnKeyType="done"
                                        keyboardType="decimal-pad"
                                    />
                                </View>
                                <Text style={{
                                    fontSize: 16,
                                    fontFamily: "Rubik-Regular",
                                    color: global.color.secondaryColors.text,
                                }}>
                                    hr
                                </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", width: "40%", justifyContent: "space-between", marginTop: "5%" }}>
                            <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16 }}>
                                Equipment
                            </Text>
                        </View>
                        <View style={{
                            borderRadius: 12,
                            // marginHorizontal: "8%",
                            marginTop: "5%",
                            backgroundColor: global.color.secondaryColors.adjacent,
                            // height: "25%"
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
                                value={description}
                                maxLength={300}
                                // maxHeight={160}
                                blurOnSubmit={true}
                                multiline={true}
                                // numberOfLines={4}
                                returnKeyType="done"
                            />
                        </View>
                        <View style={{ alignSelf: "flex-start", marginTop: "5%" }}>
                            <Text style={{ fontSize: 16, fontFamily: "Rubik-Regular", padding: 5 }}>
                                 Expiration Date
                            </Text>
                            <DateTimePicker
                            style={{alignSelf:"stretch"}}
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
                    </View>

                    <TouchableOpacity
                        style={{
                            borderRadius: 12,
                            borderColor: "#FCFCFF",
                            width: "100%",
                            marginTop: "5%",
                            marginBottom: "20%",
                            backgroundColor: global.color.primaryColors.main,
                            alignSelf: "center",
                        }}
                        onPress={() => {
                            props.setVisible(!props.visible);
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
                                Save Details
                            </Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </Modal>)
}

const styles = StyleSheet.create({
    input: {
        paddingVertical: 16,
        marginHorizontal: 16,
        fontSize: 16,
        fontFamily: "Rubik-Regular",
        color: global.color.secondaryColors.text,
    },
    inputContainer: {
        borderRadius: 12,
        marginTop: "5%",
        backgroundColor: global.color.secondaryColors.adjacent,
    }
})

export default PostShowModal;