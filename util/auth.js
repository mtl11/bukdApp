import axios from "axios";
import firebaseUtil from "./firebaseUtil";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    // AsyncStorage.setItem("token", response.data.idToken);
    return false;
  }
}

export async function authenticateUser(email, password) {
  const response = await axios.post(
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
      APIKey,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );
  const token = response.data.idToken;

  return token;
}

export async function addAccountFB(email, profileName) {
  const hash = email.hashCode();
  const response = await firebaseUtil
    .post("/users/" + hash + "/basicinfo.json", {
      email: email,
      profileName: profileName,
    })
    .catch((error) => {
      console.log(error.response);
    });
}
