import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ProfileContext = createContext({
    basicInfo: {},
    about: {},
    availabilty: {},
    social:{},
    updateBasic: (basicInfo) => {},
    updateAbout: () => {},
    updateAvailability: () => {},
    updateSocial: () => {},
});

function ProfileContextProvider({ children }) {
    const [basic, setBasic] = useState({});
    const [about, setAbout] = useState({});
    const [availability, setAvailability] = useState({});
    const [social, setSocial] = useState({});

    function updateBasic(basicInfo) {
     setBasic(basicInfo);
    }
    function updateAbout(aboutInfo) {
     setAbout(aboutInfo);
    }
    function updateAvailability(availabilityInfo) {
        setAvailability(availabilityInfo);
    }
    function updateSocial() {
     
    }
    
    const value = {
        basicInfo: basic,
        about: about,
        availabilty: availability,
        social: social,
        updateBasic: updateBasic,
        updateAbout: updateAbout,
        updateAvailability: updateAvailability,
        updateSocial: updateSocial,

    };
  
    return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
  }
  
  export default ProfileContextProvider;