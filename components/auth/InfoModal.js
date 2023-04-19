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
import { AuthContext } from "../../store/authContext";
import light from "../../styles/auth/light/infoModal";
import dark from "../../styles/auth/dark/infoModal";

const InfoModal = (props) => {
    const authCTX = useContext(AuthContext);
  const styles = authCTX.mode === "light" ? light : dark;
    return (
        <Modal visible={props.visible} animationType="slide" transparent={true} >
            <SafeAreaView style={styles.modalView}>
                <TouchableOpacity style={{ marginLeft: 30 }} onPress={() => { props.setVisible(false) }}>
                    <Feather name="x" size={32} color={styles.iconColor} />
                </TouchableOpacity>
                <View style={styles.textContainer}>
                
                    <View style={{ marginTop: "5%", marginBottom: "5%", alignItems:"center" }}>
                    <Ionicons name="ios-information-circle-outline" size={40} color={styles.iconColor} />
                        <Text style={styles.bigText}>
                            Welcome To Bukd
                        </Text>
                        <Text style={styles.smallerText}>
                        Bukd is in all inclusive platform that connects small businesses to local musicians for bookings.
                    </Text>
                    </View>
                    <View style={styles.headerContainer}>
                        <Ionicons name={"person"} size={24} color={styles.infoIconColor} />
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
                        <Ionicons name={"ios-search"} size={24} color={styles.infoIconColor} />
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
                        <Ionicons name={"chatbubble"} size={24} color={styles.infoIconColor} />
                        <View style={{ marginLeft: 10, marginRight: 40 }}>
                            <Text style={styles.headerText}>
                                Message
                            </Text>
                            <Text style={styles.regularText}>
                                Make connections through messages and finalize details about upcoming performer bookings.
                            </Text>
                        </View>
                    </View>
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
    )
}



export default InfoModal;