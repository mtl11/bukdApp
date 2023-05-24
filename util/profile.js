import axios from "axios";
import firebaseUtil from "./firebaseUtil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { profileInfo } from "../models/profile";
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { app } from "../util/firebaseStorage";
import { useState } from "react";
const APIKey = "AIzaSyCttFPH3tkX_cN5XObiFHCc9ZXtc8FJWOM";

export async function getProfileInfo(localId) {
  const response = await firebaseUtil.get("/users/" + localId + "/basicinfo.json");
  return response.data;
}

export async function setAboutInfo(location, category, genre, bio, localId, accessToken) {
  const response = await firebaseUtil.put("/users/" + localId + "/about.json?auth="+accessToken, {
    location: location,
    category: category,
    genre: genre,
    bio: bio,
  });
}

export async function addNewShow(startTime, endTime, date, venueName, description, localId, accessToken) {
  const response = await firebaseUtil.post("/users/" + localId + "/shows.json?auth="+accessToken, {
    startTime: startTime,
    endTime: endTime,
    date: date,
    venueName: venueName,
    description: description
  });
  return response.data;
}

export async function addNewShowVenue(startTime, endTime, date, performersNeeded,description, localId, accessToken) {
  const response = await firebaseUtil.post("/users/" + localId + "/shows.json?auth="+accessToken, {
    startTime: startTime,
    endTime: endTime,
    date: date,
    performersNeeded: performersNeeded,
    description: description,
  });
  return response.data;
}


export async function deleteSomeShow(localId, item, accessToken){
  const response = await firebaseUtil.delete("/users/" + localId + "/shows/"+item+".json?auth="+accessToken);
}

export async function unfollowAccount(localId, profileID, accessToken){
  const response = await firebaseUtil.delete("/users/" + localId + "/following/"+profileID+".json?auth="+accessToken);
}

export async function setVenueAboutInfo(bio, category, location, equipment, localId, accessToken) {
  const response = await firebaseUtil.put("/users/" + localId + "/about.json?auth="+accessToken, {
    bio: bio,
    category: category,
    location: location,
    equipment: equipment,
  });
}

export async function setGeneralName(firstName, lastName, localId, accessToken){
  const email = await AsyncStorage.getItem("email");
  const response = await firebaseUtil.put(
    "/users/" + localId + "/basicinfo.json?auth="+accessToken,
    {
      email: email,
      firstName: firstName,
      lastName: lastName,
      profileType: "general"
    }
  );
}
// export async function getFollowing(localId){
//   const response = await firebaseUtil.get("/users/" + localId + "/following.json");
//   return response.data
// }
export async function setAvailabilityInfo(times, dow, localId, accessToken) {
  const response = await firebaseUtil.put(
    "/users/" + localId + "/availability.json?auth="+accessToken,
    {
      times: times,
      dow: dow,
    }
  );
}
export async function getAccessToken(){
  const refreshToken = await AsyncStorage.getItem("refreshToken");
  const tokenUrl = `https://securetoken.googleapis.com/v1/token?key=${APIKey}`;
  const response = await axios.post(tokenUrl, {
    grant_type: "refresh_token",
    refresh_token: refreshToken
  });
  return response.data.access_token;
}
export async function setProfileName(profileType, name, localId,image, accessToken) {
  const email = await AsyncStorage.getItem("email");
  const post = await firebaseUtil.put(
    "/users/" + localId + "/basicinfo.json?auth="+accessToken,
    {
      email: email,
      profileType: profileType,
      profileName: name,
      profileURI: image
    }
  ).catch((error) => {
    if (error.response) {
      console.log(error.response.data);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    };})
}

export async function getProfileStart(localId) {
  const response = await firebaseUtil.get("/users/" + localId + ".json");
  return response.data;
}

export async function setSocial(type, url, localId, username,accessToken) {
  const response = await firebaseUtil.put(
    "/users/" + localId + "/socials/" + type + ".json?auth="+accessToken,
    {
      url: url,
      username: username
    }
  );
}

export async function setProfilePic(uri, localId) {
  const response = await fetch(uri);
  const blob = await response.blob();
  const fileRef = ref(getStorage(app), localId + "-profile-pic");
  const result = await uploadBytes(fileRef, blob);
  blob.close();
  // return result.metadata;
}

export async function getProfilePic(localId) {
  const fileRef = ref(getStorage(app), localId + "-profile-pic");
  return getDownloadURL(fileRef)
    .then((url) => {
      return url;
    })
    .catch((error) => {
      console.log("profile pic not found");
    });
}

export async function setPersonalInfo(firstName, lastName, localId, accessToken) {
  const response = await firebaseUtil.put(
    "/users/" + localId + "/personalInfo.json?auth="+accessToken,
    {
      firstName: firstName,
      lastName: lastName,
    }
  );

  const values = response.data;
  return values;
}
export async function getPersonalInfo(localId) {
  const response = await firebaseUtil.get(
    "/users/" + localId + "/personalInfo.json"
  );
  return response.data;
}

export async function resetPassword(password, idToken) {
  const response = await axios
    .post(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=" + APIKey,
      {
        idToken: idToken,
        password: password,
        returnSecureToken: true,
      }
    )
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    });
  return response;
}

export async function setPerformerInList(location, category, name, uuid, profilePicURL, accessToken) {
  if (location == "Tucson, AZ"){
    location = "Tuscon, AZ"
  }
  const response = await firebaseUtil.put(
    "/performers/" + location + "/" + uuid + ".json?auth="+accessToken,
    {
      category: category,
      name: name,
      uuid: uuid,
      profilePicURL: profilePicURL
    }
  );
}

export async function setVenueInList(location, category, name, uuid, profilePicURL, accessToken) {
  if (location == "Tucson, AZ"){
    location = "Tuscon, AZ"
  }
  const response = await firebaseUtil.put(
    "/venues/" + location + "/" + uuid + ".json?auth="+accessToken,
    {
      category: category,
      name: name,
      uuid: uuid,
      profilePicURL: profilePicURL
    }
  );
}
