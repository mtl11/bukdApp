import firebaseUtil from "./firebaseUtil";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getVenueList(location) {
    console.log(location);
    const response = await firebaseUtil.get("/venues/"+location+"/.json");
    const values = response.data;
    return values;
  }