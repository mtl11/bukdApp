import React, { useContext, useState } from "react"
import { View, TouchableOpacity, TextInput, Text, SafeAreaView, StyleSheet } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import global from "../../styles/global"
import Modal from "react-native-modal";
import ProfileDropDown from "../profile/ProfileDropDown";
import { profileCategoriesArtistEdit, subCategories } from "../../models/dropdownData";
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView } from "react-native-gesture-handler";
import { addShowToGlobalList, addShowToProfile } from "../../util/shows";
import { ProfileContext } from "../../store/profileContext.js";
import { getAccessToken } from "../../util/profile";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PostShowModal = (props) => {
    const profileCTX = useContext(ProfileContext)
    const [description, setDescription] = useState("");
    // const [genre, setGenre] = useState(props.data.genreNeeded);
    const [genre, setGenre] = useState();
    const [typeNeeded, setTypeNeeded] = useState();
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [maxApplicants, setMaxApplicants] = useState("");
    const [compensationStart, setCompensationStart] = useState("");
    const [compensationEnd, setCompensationEnd] = useState("");
    const [postsExpire, setPostsExpire] = useState(new Date());
    // console.log(profileCTX);
    const [errorMessage, setErrorMessage] = useState();
    
    function check() {
        if (typeNeeded == undefined) {
            setErrorMessage("Please Select a Performer Type");
        }else if(genre == undefined){
            setErrorMessage("Please Select a Genre");
        }else if(maxApplicants == ""){
            setErrorMessage("Please Add Number of Max Applicants");
        }else if(compensationStart == ""){
            setErrorMessage("Please Add Starting Compensation");
        }else if(compensationEnd == ""){
            setErrorMessage("Please Add Ending Compensation");
        }
        else if(description == ""){
            setErrorMessage("Please Add a Description");
        }
        else{
            setErrorMessage();
            return true;
        }
        // console.log(genre);
        return false;
    }
    async function addGlobalShow() {
            const localId = await AsyncStorage.getItem("localId");
            const accessToken = await getAccessToken();
            const datePosted = new Date();
            const response = await addShowToGlobalList(props.username, props.userLocation, genre, typeNeeded,
                date, startTime, endTime, maxApplicants, compensationStart,
                compensationEnd, profileCTX.about.equipment, description, postsExpire, datePosted, localId, accessToken,);
            addShowToProfile(response.name, localId, accessToken)
            props.setVisible(!props.visible);
            setDescription("");
            setCompensationEnd("");
            setCompensationStart("");
            setGenre();
            setTypeNeeded();

       
    }

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
                <ScrollView showsVerticalScrollIndicator={false}>

                    <View style={{ marginHorizontal: "3%" }}>
                        <View style={{ flexDirection: "row",  justifyContent: "space-between", marginTop: "5%" }}>
                            <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16 }}>
                            Venue Name: {props.username}
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row",  justifyContent: "space-between", marginTop: "5%" }}>
                            <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16 }}>
                            Location: {props.userLocation}
                            </Text>
                        </View>
                        <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16, marginTop: "5%" }}>
                            Performer(s) you are looking for...
                        </Text>
                        <View style={{ width: "120%", alignSelf: "center" }}>
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
                        <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16, marginTop: "5%" }}>
                            Max Applicants
                        </Text>
                        <View style={[styles.inputContainer, {marginTop: 0}]}>
                            <TextInput
                                style={styles.input}
                                placeholder={"100 Applicants"}
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
                            <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16, marginTop: "5%" }}>
                            Compensation Range
                        </Text>
                        <View style={{
                            flexDirection: "row",
                            marginHorizontal: 30,
                            justifyContent: "space-between",
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
                                        placeholder={"000"}
                                        placeholderTextColor={global.color.secondaryColors.placeHolderTextColor}
                                        onChangeText={setCompensationStart}
                                        value={compensationStart}
                                        maxLength={5}
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
                                        placeholder={"000"}
                                        placeholderTextColor={global.color.secondaryColors.placeHolderTextColor}
                                        onChangeText={setCompensationEnd}
                                        value={compensationEnd}
                                        maxLength={5}
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
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: "5%" }}>
                            <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16 }}>
                                Equipment: {profileCTX.about.equipment}
                            </Text>
                        </View>
                        <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16, marginTop: "5%" }}>
                            Description
                        </Text>
                        <View style={{
                            borderRadius: 12,
                            // marginHorizontal: "8%",
                            // marginTop: "5%",
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
                                placeholder={"Tell people about show..."}
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
                                style={{ alignSelf: "stretch" }}
                                themeVariant={"light"}
                                testID="dateTimePicker"
                                value={postsExpire}
                                mode={"date"}
                                is24Hour={true}
                                onChange={(event, selectedDate) => {
                                    const currentDate = selectedDate;
                                    setPostsExpire(currentDate);
                                }}
                            />
                        </View>
                    </View>
                    {errorMessage != undefined &&
                        <View>
                            <Text style={{ fontSize: 16, fontFamily: "Rubik-Regular", padding: 5, textAlign: "center", color: global.color.secondaryColors.errorText }}>
                                {errorMessage}
                            </Text>
                        </View>
                    }
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
                            if(check()){
                                addGlobalShow()
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
                                Post Show
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