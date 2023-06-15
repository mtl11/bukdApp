import React, { useState } from "react"
import { View, ViewBase, TouchableOpacity, TextInput, Text } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import global from "../../styles/global"
import Modal from "react-native-modal";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { addAppliedShowToProfile, applyToShow } from "../../util/shows";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAccessToken } from "../../util/profile";

const ApplyModal = (props) => {
    const [message, setMessage] = useState("");

    async function apply(){
        const localId = await AsyncStorage.getItem("localId");
        const accessToken = await getAccessToken();
        await applyToShow(message, props.showID, props.location, localId, accessToken);
        await addAppliedShowToProfile(message, props.showID, props.location, localId, accessToken);
    }
    return (
        <Modal
            isVisible={props.visible} avoidKeyboard={true}>
            <View style={{
                height: "60%",
                wieght: "50%",
                backgroundColor: "white",
                borderRadius: 12,
            }}>
                <TouchableOpacity style={{ margin: 10 }} onPress={() => {
                    props.setVisible(!props.visible)
                }}>
                    <Ionicons name="close-circle-outline" size={28} color={global.color.primaryColors.main} />
                </TouchableOpacity>
                <View style={{ marginHorizontal: "5%" }}>
                    <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16 }}>
                        Your profile information will be shared to Gentle Ben's when you apply for this position.
                    </Text>

                </View>
                <View style={{
                    borderRadius: 12,
                    marginHorizontal: "8%",
                    marginTop: "5%",
                    backgroundColor: global.color.secondaryColors.adjacent,

                    height: "30%"
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
                        placeholder={"Send a welcome message"}
                        placeholderTextColor={global.color.secondaryColors.placeHolderTextColor}
                        onChangeText={setMessage}
                        maxLength={240}
                        // maxHeight={160}
                        blurOnSubmit={true}
                        multiline={true}
                        // numberOfLines={4}
                        returnKeyType="done"
                    />
                </View>
                <TouchableOpacity
                    style={{
                        borderRadius: 12,
                        borderColor: "#FCFCFF",
                        width: "90%",
                        marginTop: "40%",
                        marginBottom: 10,
                        backgroundColor: global.color.primaryColors.main,
                        alignSelf: "center",
                    }}
                    onPress={() => {
                        apply();
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
                            Submit
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </Modal>)
}

export default ApplyModal;