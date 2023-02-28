import axios from "axios";
import firebaseUtil from "./firebaseUtil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { profileInfo } from "../models/profile";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../util/firebaseStorage";
import { useState } from "react";
const APIKey = "AIzaSyCttFPH3tkX_cN5XObiFHCc9ZXtc8FJWOM";

String.prototype.hashCode = function () {
  var hash = 0,
    i,
    chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

export async function getProfileInfo() {
  const email = await AsyncStorage.getItem("email");
  const extrated = JSON.parse(email);
  const hash = extrated.hashCode();
  const response = await firebaseUtil.get("/users/" + hash + "/basicinfo.json");
  const values = response.data;
  return values;
}

export async function setAboutInfo(location, category, genre, bio) {
  const email = await AsyncStorage.getItem("email");
  const extrated = JSON.parse(email);
  const hash = extrated.hashCode();

  const response = await firebaseUtil.put("/users/" + hash + "/about.json", {
    location: location,
    category: category,
    genre: genre,
    bio: bio,
  });
}

export async function setVenueAboutInfo(location, category, equipment, bio) {
  const email = await AsyncStorage.getItem("email");
  const extrated = JSON.parse(email);
  const hash = extrated.hashCode();

  const response = await firebaseUtil.put("/users/" + hash + "/about.json", {
    bio: bio,
    category: category,
    location: location,
    equipment: equipment,
  });
}

export async function setAvailabilityInfo(times, dow) {
  const email = await AsyncStorage.getItem("email");
  const extrated = JSON.parse(email);
  const hash = extrated.hashCode();

  const response = await firebaseUtil.put(
    "/users/" + hash + "/availability.json",
    {
      times: times,
      dow: dow,
    }
  );
}

export async function setProfileName(profileType, name) {
  const email = await AsyncStorage.getItem("email");
  const extrated = JSON.parse(email);
  const hash = extrated.hashCode();
  // const perfomerType = await AsyncStorage.getItem("performerType");

  const response = await firebaseUtil.put(
    "/users/" + hash + "/basicinfo.json",
    {
      email: email,
      profileType: profileType,
      profileName: name,
    }
  );
}

export async function getProfileStart() {
  const email = await AsyncStorage.getItem("email");
  const extrated = JSON.parse(email);
  const hash = extrated.hashCode();
  const response = await firebaseUtil.get("/users/" + hash + ".json");
  const values = response.data;
  return values;
}

export async function setSocial(type, url) {
  const email = await AsyncStorage.getItem("email");
  const extrated = JSON.parse(email);
  const hash = extrated.hashCode();

  const response = await firebaseUtil.put(
    "/users/" + hash + "/socials/" + type + ".json",
    {
      url: url,
    }
  );
}

export async function setProfilePic(uri) {
  // const email = await AsyncStorage.getItem("email");
  // const extrated = JSON.parse(email);
  // const hash = extrated.hashCode();
  // const blob = await new Promise((resolve, reject) => {
  //   const xhr = new XMLHttpRequest();
  //   xhr.onload = function () {
  //     resolve(xhr.response);
  //   };
  //   xhr.onerror = function (e) {
  //     console.log(e);
  //     reject(new TypeError("Network request failed"));
  //   };
  //   xhr.responseType = "blob";
  //   xhr.open("GET", uri, true);
  //   xhr.send(null);
  // });
  // const fileRef = ref(getStorage(app), hash + "-profile-pic");
  // const result = await uploadBytes(fileRef, blob);
  // blob.close();
}

export async function getProfilePic() {
  const email = await AsyncStorage.getItem("email");
  const extrated = JSON.parse(email);
  const hash = extrated.hashCode();
  const fileRef = ref(getStorage(app), hash + "-profile-pic");
  return getDownloadURL(fileRef)
    .then((url) => {
      return url;
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function setPersonalInfo(firstName, lastName) {
  const email = await AsyncStorage.getItem("email");
  const extrated = JSON.parse(email);
  const hash = extrated.hashCode();
  const response = await firebaseUtil.put(
    "/users/" + hash + "/personalInfo.json",
    {
      firstName: firstName,
      lastName: lastName,
    }
  );

  const values = response.data;
  console.log(values);
  return values;
}
export async function getPersonalInfo() {
  const email = await AsyncStorage.getItem("email");
  const extrated = JSON.parse(email);
  const hash = extrated.hashCode();
  const response = await firebaseUtil.get(
    "/users/" + hash + "/personalInfo.json"
  );
  const values = response.data;
  return values;
}

export async function resetPassword(password, idToken) {
  console.log(idToken);
  console.log(password);
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
