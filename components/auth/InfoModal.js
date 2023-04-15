import React, { useContext, useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    Image,
    ActivityIndicator,
    Modal,
    StyleSheet
} from "react-native";
import global from "../../styles/global";
import { Feather } from '@expo/vector-icons';
import { Ionicons } from "@expo/vector-icons";

const InfoModal = (props) => {
    return (
        // <View style={styles.bigContainer}>
        <Modal visible={props.visible} animationType="slide" transparent={true} >
            <SafeAreaView style={styles.modalView}>
                <TouchableOpacity style={{ marginLeft: 30 }} onPress={() => { props.setVisible(false) }}>
                    <Feather name="x" size={32} color={global.color.primaryColors.buttonAccent} />
                </TouchableOpacity>
                <View style={styles.textContainer}>
                
                    <View style={{ marginTop: "5%", marginBottom: "5%", alignItems:"center" }}>
                    <Ionicons name="ios-information-circle-outline" size={40} color={global.color.primaryColors.main} />
                        <Text style={styles.bigText}>
                            Welcome To Bukd
                        </Text>
                        <Text style={styles.smallerText}>
                        Bukd is in all inclusive platform that connects small businesses to local musicians for bookings.
                    </Text>
                    </View>
                    <View style={styles.headerContainer}>
                        <Ionicons name={"person"} size={24} color={"white"} />
                        <View style={{ marginLeft: 10, marginRight: 40 }}>
                            <Text style={styles.headerText}>
                                Profile
                            </Text>
                            <Text style={styles.regularText}>
                            Profiles designed to show off your uniquness and book gigs faster by showcasing your 
                            talent directly with users.
                            </Text>
                        </View>
                    </View>
                    <View style={styles.headerContainer}>
                        <Ionicons name={"ios-search"} size={24} color={"white"} />
                        <View style={{ marginLeft: 10, marginRight: 40 }}>
                            <Text style={styles.headerText}>
                                Search
                            </Text>
                            <Text style={styles.regularText}>
                                Filter your search preferences to find the perfect match for you next event in your area.
                            </Text>
                        </View>
                    </View>
                    <View style={styles.headerContainer}>
                        <Ionicons name={"chatbubble"} size={24} color={"white"} />
                        <View style={{ marginLeft: 10, marginRight: 40 }}>
                            <Text style={styles.headerText}>
                                Message
                            </Text>
                            <Text style={styles.regularText}>
                                Make connections through messages and finalize details about upcoming performer bookings.
                            </Text>
                        </View>
                    </View>
                    {/* </View>
                    <Text style={styles.smallerText}>
                        Bukd is in all inclusive platform that connects small business to local musicians for bookings.
                    </Text>
                    <Text style={styles.smallerText}>
                        - Profiles designed to show off your uniquness
                    </Text>
                    <Text style={styles.smallerText}>
                        - Filtered search to find the perfect match for you next event
                    </Text>
                    <Text style={styles.smallerText}>
                        - Messaging 
                    </Text> */}
                </View>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => {
                        props.setVisible(false)
                    }}
                >
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </Modal>
        // </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: "center",
        padding: 16,
        marginHorizontal: "8%",
        backgroundColor: global.color.primaryColors.main,
        borderRadius: 12,
        marginTop: "20%"
    },
    buttonText: {
        fontFamily: "Rubik-Medium",
        color: "white",
        fontSize: 18,
    },
    textContainer: {
        marginHorizontal: 30
    },
    smallerText: {
        fontFamily: "Rubik-Regular",
        color: global.color.primaryColors.main,
        fontSize: 18,
        lineHeight: 25,
        textAlign:"center"
    },
    bigText: {
        fontFamily: "Rubik-SemiBold",
        fontSize: 32, color: global.color.primaryColors.headerText
    },
    headerContainer: {
        flexDirection: "row",
        marginTop: "7%"
        // alignItems: "center" 
    },
    headerText: {
        fontFamily: "Rubik-SemiBold",
        color: global.color.primaryColors.text,
        fontSize: 18,
        lineHeight: 25
    },
    regularText: {
        fontFamily: "Rubik-Regular",
        color: global.color.primaryColors.text,
        fontSize: 18,
        lineHeight: 25,
    },
    modalView: {

        backgroundColor: global.color.primaryColors.background,
        height: "100%",
    },

})

export default InfoModal;