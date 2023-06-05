import React, { useEffect, useState, useContext } from "react";
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Button
} from "react-native";
import SearchDropDown from "../../components/search/SearchDropDown";
import { locations } from "../../models/dropdownData";
import global from "../../styles/global";
import LocalList from "../../components/shows/LocalList";
import MyShowsList from "../../components/shows/MyShowsList";
import PerformersSection from "../../components/shows/PerformersSection";
import { ProfileContext } from "../../store/profileContext";
import { AuthContext } from "../../store/authContext";
const ShowScreen = (props) => {
    const profileCTX = useContext(ProfileContext);
    const authCTX = useContext(AuthContext);
    if (authCTX.isAuthenticated) {
        return (
            <SafeAreaView style={{
                backgroundColor: global.color.secondaryColors.background,
                height: "100%"
            }}>
                {profileCTX.basicInfo.profileType == "performer" && 
                <PerformersSection props={props} />}
                {/* {profileCTX.basicInfo.profileType == "venue" && 
                } */}
            </SafeAreaView>
        )
    } else {
        return (
            <SafeAreaView style={{
                backgroundColor: global.color.secondaryColors.background,
                height: "100%"
            }}>
            </SafeAreaView>
        )
    }
}


export default ShowScreen;