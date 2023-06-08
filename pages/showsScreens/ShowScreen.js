import React, { useEffect, useState, useContext } from "react";
import {
    SafeAreaView} from "react-native";
import global from "../../styles/global";
import PerformersSection from "../../components/shows/PerformersSection";
import { AuthContext } from "../../store/authContext";
import VenueSection from "../../components/shows/VenueSection";
import { getProfileInfo, getProfileStart } from "../../util/profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProfileContext } from "../../store/profileContext";

const ShowScreen = (props) => {
    // const profileCTX = useContext(ProfileContext);
    const authCTX = useContext(AuthContext);
    const profileCTX = useContext(ProfileContext);
    const [pType, setProfileType] = useState("");
    const [userLocation, setUserLocation] =useState("");
    const [username, setUsername] = useState("")
    // const [location]
    async function profileType() {
        const localId = await AsyncStorage.getItem("localId");
        if (authCTX.isAuthenticated) {
            const profiletype = await getProfileInfo(localId);
            
            const otherInfo = await getProfileStart(localId);
            setUsername(profiletype.profileName);
            setUserLocation(otherInfo.about.location);
            setProfileType(profiletype.profileType)

        }
    }
    useEffect(() => {
        profileType();
        // if (profileCTX)
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
                    <VenueSection props={props} userLocation={userLocation} username={username}/>
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