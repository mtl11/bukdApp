import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ProfileContext = createContext({
  basicInfo: {},
  about: {},
  availabilty: {},
  social: {},
  profilePic: "",
  personalInfo: {},
  shows: [],
  followingList: [],
  updateBasic: (basicInfo) => { },
  updateAbout: () => { },
  updateAvailability: () => { },
  updateSocial: () => { },
  updateProfilePic: () => { },
  updatePersonalInfo: () => { },
  addShow: () => { },
  updateShows: () => { },
  deleteShow: () => { },
  signOut: () => { },
  updateFollowingList: () => { },
  addFollow: () => { },
});

function ProfileContextProvider({ children }) {
  const [shows, setShows] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [personalInfo, setPersonalInfo] = useState({});
  const [basic, setBasic] = useState({});
  const [about, setAbout] = useState({});
  const [availability, setAvailability] = useState({});
  const [social, setSocial] = useState({});
  const [profilePic, setProfilePic] = useState();

  function addShow(newShow) {
    console.log(shows);
    const newShowArrow = shows;
    newShowArrow.push(newShow);
    setShows(newShowArrow);
  }
  function deleteShow(label) {
    const array = shows;
    for (const x in array) {
      console.log(array[x][0]);
      if (label == array[x][0]) {
        console.log("test")
        array.splice(x, 1);
      }
    }
    setShows(array);
  }
  function updateFollowingList(list) {
    setFollowingList(list);
  }

  function updateShows(shows) {
    setShows(Object.entries(shows))
  }
  function updatePersonalInfo(personalInfo) {
    setPersonalInfo(personalInfo);
  }

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
  function updateProfilePic(profilePic) {
    setProfilePic(profilePic);
  }
  function addFollow(follow) {
    followingList.push(follow);
    setFollowingList(followingList);
  }
  function signOut() {
    setShows([]);
    setAvailability({});
    setBasic({});
    setPersonalInfo({});
    setProfilePic({});
    setAbout({});
    setProfilePic({});
  }
  const value = {
    followingList: followingList,
    shows: shows,
    basicInfo: basic,
    about: about,
    availabilty: availability,
    social: social,
    profilePic: profilePic,
    personalInfo: personalInfo,
    updateBasic: updateBasic,
    updateAbout: updateAbout,
    updateAvailability: updateAvailability,
    updateSocial: updateSocial,
    updateProfilePic: updateProfilePic,
    updatePersonalInfo: updatePersonalInfo,
    addShow: addShow,
    updateShows: updateShows,
    deleteShow: deleteShow,
    signOut: signOut,
    updateFollowingList: updateFollowingList, addFollow: addFollow
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export default ProfileContextProvider;
