import React, { useEffect, useState, useContext, useCallback } from "react";
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Button,
    FlatList
} from "react-native";
import global from "../../styles/global";
import { EvilIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApplyModal from "../../components/shows/ApplyModal";
import { app } from "../../util/firebaseStorage";
const OpenShowDetails = (props) => {
    let data = props.route.params.data;
    // console.log(data);
    const [applyVisible, setApplyVisible] = useState(false);
    return (
        <SafeAreaView style={{ height: "100%", backgroundColor: "white" }}>
            {/* <View style={{justifyContent:"space-between"}}> */}
                <View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <TouchableOpacity
                            style={styles.topIconContainer}
                            onPress={() => {
                                props.navigation.pop();
                            }}
                        >
                            <Ionicons
                                name="arrow-back"
                                size={28}
                                color={styles.iconColor}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.topIconContainer}
                            onPress={() => {
                                AsyncStorage.setItem("searchID", data.uuid);
                                props.navigation.navigate("SearchArtistProfile");
                            }}
                        >
                            <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16, color: global.color.primaryColors.main }}>
                                View Profile
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row", width: "40%", justifyContent: "space-between", marginHorizontal: 30, marginTop: "3%" }}>
                        <Text style={{ fontFamily: "Rubik-SemiBold", fontSize: 18 }}>
                            {data.name}
                        </Text>
                        <Text style={{ fontFamily: "Rubik-SemiBold", fontSize: 18 }}>
                            -
                        </Text>
                        <Text style={{ fontFamily: "Rubik-SemiBold", fontSize: 18 }}>
                            {data.typeNeeded}
                        </Text>
                    </View>
                    <View style={{ marginHorizontal: 30, marginTop: "3%" }}>
                        <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16 }}>
                            {data.location}
                        </Text>
                    </View>
                    <View style={{ marginHorizontal: 30, marginTop: "3%" }}>
                        <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16 }}>
                            {data.date}
                        </Text>
                    </View>
                    <View style={{ marginHorizontal: 30, marginTop: "3%" }}>
                        <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16 }}>
                            {data.start} - {data.end}
                        </Text>
                    </View>
                    <View style={{ marginHorizontal: 30, marginTop: "3%" }}>
                        <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16 }}>
                            Compensation range: ${data.compensationStart} - ${data.compensationEnd}
                        </Text>
                    </View>
                    <View style={{ marginHorizontal: 30, marginTop: "3%" }}>
                        <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16 }}>
                            Equipment: {data.equipment}
                        </Text>
                    </View>
                    <View style={{ marginHorizontal: 30, marginTop: "3%" }}>
                        <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16 }}>
                            Description
                        </Text>
                        <Text style={{ fontFamily: "Rubik-Regular", fontSize: 14 }}>
                            {data.description}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={{
                        alignItems: "center",
                        padding: 16,
                        marginHorizontal: "8%",
                        backgroundColor: global.color.secondaryColors.main,
                        borderRadius: 12,
                        marginTop: "7%"
                    }}
                    onPress={() => {
                        setApplyVisible(!applyVisible)
                    }}
                >
                    <Text style={{
                        fontFamily: "Rubik-Medium",
                        color: "white",
                        fontSize: 18,
                    }}>
                        Apply now
                    </Text>
                </TouchableOpacity>
            {/* </View> */}
            <ApplyModal visible={applyVisible} setVisible={setApplyVisible} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
        color: global.color.secondaryColors.text,
        fontFamily: "Rubik-Regular"
    },
    container: {
        backgroundColor: global.color.secondaryColors.background,
        height: "100%",
    }, footerContainer: {
        backgroundColor: global.color.secondaryColors.background,
        height: "100%",
    }, topIconContainer: {
        marginHorizontal: 30,
    },
    iconColor: global.color.primaryColors.main
});

export default OpenShowDetails;