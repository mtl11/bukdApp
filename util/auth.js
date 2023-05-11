import axios from "axios";
import firebaseUtil from "./firebaseUtil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { app } from "./firebaseStorage";
const APIKey = "AIzaSyCttFPH3tkX_cN5XObiFHCc9ZXtc8FJWOM";

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

export async function resetPassword(email){
  let error = ""
  const response = await axios
  .post(
    "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=" +
      APIKey,
    {
      email: email,
      requestType: "PASSWORD_RESET"
    }
  )
  .catch((error) => {
    return error.response.status;

  });
return response;
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
      AsyncStorage.setItem("refreshToken", res.data.refreshToken);
      token = res.data.idToken;
      console.log("Token: "+res.data.refreshToken);
    })
  return token;
}

export async function addAccountFB(email, firstName, lastName, localId, accessToken) {
  // const hash = email.hashCode();
  console.log("hello");
  const response = await firebaseUtil
    .put("/users/" + localId + "/basicinfo.json?auth="+accessToken, {
      email: email,
      firstName: firstName,
      lastName: lastName,
      profileType : "general"
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

export async function submitVerifyRequest(email, profileName, firstName, lastName, accountType) {
  const response = await firebaseUtil
    .post("/help.json", {
      email: email,
      firstName: firstName,
      lastName: lastName,
      profileType : accountType,
      profileName: profileName
    })
    .catch((error) => {
      console.log(error.response);
    });
}