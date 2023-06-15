import React, { useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import global from "../../styles/global";
import { Ionicons } from '@expo/vector-icons';
import VenueShowDetails from "../../components/shows/VenueShowDetails";
import ApplicantList from "../../components/shows/ApplicantList";
const MyShowDetailsVenueScreen = (props) => {
    let data = props.route.params.data;
    const [details, setDetails] = useState(true);
    const [applicants, setApplicants] = useState(false);

    return (
        <SafeAreaView style={{ height: "100%", backgroundColor: "white" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
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
            </View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    width: "90%",
                    alignSelf: "center",
                    borderColor: global.color.secondaryColors.placeHolderTextColor
                }}
            >
                <TouchableOpacity
                    style={styles.tabContainer}
                    onPress={() => {
                        setDetails(true);
                        setApplicants(false);

                    }}
                >
                    <View style={{ flexDirection: "column" }}>
                        <View style={styles.tabTextContainer}>
                            <Text style={[styles.tabText, details && { color: "black" }]}>Details</Text>
                        </View>
                        {details && (
                            <View style={styles.tabBottomBar}></View>
                        )}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.tabContainer}
                    onPress={() => {
                        setDetails(false);
                        setApplicants(true);
                    }}
                >
                    <View style={{ flexDirection: "column" }}>
                        <View style={styles.tabTextContainer}>
                            <Text style={[styles.tabText, applicants && { color: "black" }]}>Applicants</Text>
                        </View>
                        {applicants && (
                            <View style={styles.tabBottomBar}></View>
                        )}
                    </View>
                </TouchableOpacity>
            </View>

            {details && <VenueShowDetails data={data} />}
            {applicants && (<ApplicantList data={data} props={props}/>)}
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
    iconColor: global.color.primaryColors.main,

    tabView: {
        borderBottomWidth: 1,
        marginTop: 10,
        alignItems: "center",
        borderColor: global.color.secondaryColors.adjacent,
    },
    tabTextContainer: {
        paddingHorizontal: 15,
        borderRadius: 10,
        paddingBottom: 10,
    },
    tabContainer: {
        width: "50%",
        alignItems: "center",
    },
    tabBottomBar: {
        borderWidth: 2.5,
        borderRadius: 12,
        borderColor: global.color.secondaryColors.main,
        backgroundColor: global.color.secondaryColors.main,
    },
    tabText: {
        color: global.color.secondaryColors.placeHolderTextColor,
        fontFamily: "Rubik-Regular",
        fontSize: 16,
    },
});

export default MyShowDetailsVenueScreen;