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

export async function setAboutInfo(location, category, genre, bio, localId) {
  const response = await firebaseUtil.put("/users/" + localId + "/about.json", {
    location: location,
    category: category,
    genre: genre,
    bio: bio,
  });
}

export async function setVenueAboutInfo(bio, category, location, equipment, localId) {
  const response = await firebaseUtil.put("/users/" + localId + "/about.json", {
    bio: bio,
    category: category,
    location: location,
    equipment: equipment,
  });
}

export async function setAvailabilityInfo(times, dow, localId) {
  const response = await firebaseUtil.put(
    "/users/" + localId + "/availability.json",
    {
      times: times,
      dow: dow,
    }
  );
}

export async function setProfileName(profileType, name, localId) {
  const email = await AsyncStorage.getItem("email");
  const response = await firebaseUtil.put(
    "/users/" + localId + "/basicinfo.json",
    {
      email: email,
      profileType: profileType,
      profileName: name,
    }
  );
}

export async function getProfileStart(localId) {
  const response = await firebaseUtil.get("/users/" + localId + ".json");
  return response.data;
}

export async function setSocial(type, url, localId, username) {
  console.log(username);
  const response = await firebaseUtil.put(
    "/users/" + localId + "/socials/" + type + ".json",
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

export async function setPersonalInfo(firstName, lastName,localId) {
  const response = await firebaseUtil.put(
    "/users/" + localId + "/personalInfo.json",
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

export async function setPerformerInList(location, category, name, uuid, profilePicURL){
  const response = await firebaseUtil.put(
    "/performers/" +location+"/"+ uuid+".json",
    {
      category: category,
      name: name,
      uuid:uuid,
      profilePicURL:profilePicURL
    }
  );
}

export async function setVenueInList(location, category, name, uuid, profilePicURL){
  const response = await firebaseUtil.put(
    "/venues/" +location+"/"+ uuid +".json",
    {
      category: category,
      name: name,
      uuid:uuid,
      profilePicURL:profilePicURL
    }
  );
}
