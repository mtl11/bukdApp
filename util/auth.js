import axios from "axios";
import firebaseUtil from "./firebaseUtil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { app } from "./firebaseStorage";
const APIKey = "AIzaSyCttFPH3tkX_cN5XObiFHCc9ZXtc8FJWOM";

// String.prototype.hashCode = function () {
//   var hash = 0,
//     i,
//     chr;
//   if (this.length === 0) return hash;
//   for (i = 0; i < this.length; i++) {
//     chr = this.charCodeAt(i);
//     hash = (hash << 5) - hash + chr;
//     hash |= 0; // Convert to 32bit integer
//   }
//   return hash;
// };

export async function createUser(email, password) {
  let sameEmail = false;
  const response = await axios
    .post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + APIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    )
    .catch((error) => {
      sameEmail = true;
    });

  if (sameEmail) {
    return sameEmail;
  } else {
    AsyncStorage.setItem("localId", response.data.localId);
    return false;
  }
  
}

export async function authenticateUser(email, password) {
  // console.log(email);
  let token = "";
  const response = await axios
    .post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
        APIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    )
    .then((res) => {
      AsyncStorage.setItem("localId", res.data.localId);
      token = res.data.idToken;
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    });
  return token;
}

export async function addAccountFB(email, profileName, localId) {
  // const hash = email.hashCode();
  const response = await firebaseUtil
    .put("/users/" + localId + "/basicinfo.json", {
      email: email,
      profileName: profileName,
    })
    .catch((error) => {
      console.log(error.response);
    });
  await firebaseUtil
    .put("/users/" + localId + "/about.json", {
      about: "",
      bio: "",
      category: "",
      genre: "",
    })
    .catch((error) => {
      console.log(error.response);
    });
  await firebaseUtil
    .put("/users/" + localId + "/availability.json", {
      dow: {},
      times: {},
    })
    .catch((error) => {
      console.log(error.response);
    });
}

export async function forgotPassword(idToken, password){

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
      sameEmail = true;
    });
}
