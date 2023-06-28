import firebaseUtil from "./firebaseUtil";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getVenueList(location) {
  if (location == "Tucson, AZ") {
    location = "Tuscon, AZ"
  }
  const response = await firebaseUtil.get("/venues/" + location + "/.json").catch((error) => {
    console.log(error.response);
  });
  const values = response.data;
  return values;
}

export async function getPerformersList(location) {
  // console.log("Backend: "+location);
  if (location == "Tucson, AZ") {
    location = "Tuscon, AZ"
  }
  const response = await firebaseUtil.get("/performers/" + location + "/.json").catch((error) => {
    console.log(error.response);
  });
  // console.log(response);
  const values = response.data;
  return values;
}

export async function addToFollowingList(profileURI, profileName, searchID, localId, accessToken) {
  const response = await firebaseUtil.put(
    "/users/" + localId + "/following/" + searchID + ".json?auth=" + accessToken,
    {
      profileURI: profileURI,
      profileName: profileName,
      searchID: searchID
    }
  ).catch((error) => {
    console.log(error.response);
  });
}

export async function sendProfileReport(profileID, reportMessage, accessToken) {
  const response = await firebaseUtil.post(
    "/report.json?auth=" + accessToken,
    {
      profileID: profileID,
      reportMessage: reportMessage
    }
  ).catch((error) => {
    console.log(error.response);
  });
}
