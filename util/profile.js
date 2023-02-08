import axios from "axios";
import firebaseUtil from "./firebaseUtil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {profileInfo} from "../models/profile";

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

export async function getProfileInfo(){
    const email = await AsyncStorage.getItem("email");
    const extrated = JSON.parse(email);
    const hash = extrated.hashCode();

    const response = await firebaseUtil.get("/users/" + hash + "/basicinfo.json");
    const values = Object.values(response.data)[0];
    return new profileInfo(null,values.profileName);
}

export async function setAboutInfo(location, category, genre, bio){
    const email = await AsyncStorage.getItem("email");
    const extrated = JSON.parse(email);
    const hash = extrated.hashCode();

    const response = await firebaseUtil.post("/user/"+ hash + "/basicinfo.json",{

    })
}