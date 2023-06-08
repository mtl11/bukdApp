import React, { useEffect, useState, useContext } from "react";
import {
    SafeAreaView} from "react-native";
import global from "../../styles/global";
import PerformersSection from "../../components/shows/PerformersSection";
import { AuthContext } from "../../store/authContext";
import VenueSection from "../../components/shows/VenueSection";
import { getProfileInfo } from "../../util/profile";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ShowScreen = (props) => {
    // const profileCTX = useContext(ProfileContext);
    const authCTX = useContext(AuthContext);
    const [pType, setProfileType] = useState("");
    
    async function profileType() {
        const localId = await AsyncStorage.getItem("localId");
        if (authCTX.isAuthenticated) {
            const profiletype = await getProfileInfo(localId);
            // const profileType await AsyncStorage.setItem("profileType", profiletype.profileType);
            setProfileType(profiletype.profileType)
        }
    }
    useEffect(() => {
        profileType();
    }, [])
    if (authCTX.isAuthenticated) {
        return (
            <SafeAreaView style={{
                backgroundColor: global.color.secondaryColors.background,
                height: "100%"
            }}>
                {pType == "performer" &&
                    <PerformersSection props={props} />}
                {pType == "venue" &&
                    <VenueSection props={props} />
        }
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