import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ProfileContext = createContext({
    basicInfo: {},
    about: {},
    availabilty: {},
    social:{},
    profilePic: "",
    updateBasic: (basicInfo) => {},
    updateAbout: () => {},
    updateAvailability: () => {},
    updateSocial: () => {},
    updateProfilePic:()=>{}
});

function ProfileContextProvider({ children }) {
    const [basic, setBasic] = useState({});
    const [about, setAbout] = useState({});
    const [availability, setAvailability] = useState({});
    const [social, setSocial] = useState({});
    const [profilePic,setProfilePic] = useState();

    function updateBasic(basicInfo) {
     setBasic(basicInfo);
    }
    function updateAbout(aboutInfo) {
     setAbout(aboutInfo);
    }
    function updateAvailability(availabilityInfo) {
        setAvailability(availabilityInfo);
    }
    function updateSocial(socialInfo) {
        setSocial(socialInfo);
    }
    function updateProfilePic(profilePic){
        setProfilePic(profilePic)
    }
    const value = {
        basicInfo: basic,
        about: about,
        availabilty: availability,
        social: social,
        profilePic: profilePic,
        updateBasic: updateBasic,
        updateAbout: updateAbout,
        updateAvailability: updateAvailability,
        updateSocial: updateSocial,
        updateProfilePic: updateProfilePic
    };
  
    return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
  }
  
  export default ProfileContextProvider;