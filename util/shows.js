import firebaseUtil from "./firebaseUtil";

export async function addShowToGlobalList(profilePic, venueName, location, genreNeeded,
    typeNeeded, date, startTime, endTime, maxApplicants, compensationStart,
    compensationEnd, equipment, description, postsExpire, datePosted, localId, accessToken) {
        
    const response = await firebaseUtil.post(
        "/shows/" + location + ".json?auth=" + accessToken,
        {
            uri: profilePic,
            venueName: venueName,
            location: location,
            genreNeeded: genreNeeded,
            typeNeeded: typeNeeded,
            date: date,
            startTime: startTime,
            endTime: endTime,
            maxApplicants: maxApplicants,
            compensationStart: compensationStart,
            compensationEnd: compensationEnd,
            equipment: equipment,
            description: description,
            postsExpire: postsExpire,
            venueID: localId,
            datePosted: datePosted
        }
    ).catch((error) => {
        console.log(error.response);
    });

    return response.data;
}

export async function editShow(data, showID, location, accessToken) {

    const response = await firebaseUtil.put(
        "/shows/" + location + "/" + showID + ".json?auth=" + accessToken,
        data
    ).catch((error) => {
        if (error.response) {
            console.log(error.response.data);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log("Error", error.message);
        };
    });

    // return response.data;
}

export async function addShowToProfile(showID, localId, accessToken) {
    const response = await firebaseUtil.put("/users/" + localId + "/shows/" + showID + ".json?auth=" + accessToken, {
        showID: showID
    }).catch((error) => {
        console.log(error.response);
    });

    // console.log(response.data);
}

export async function addAppliedShowToProfile(message, showID, location, localId, accessToken) {
    const response = await firebaseUtil.put("/users/" + localId + "/appliedShows/" + showID + ".json?auth=" + accessToken, {
        showID: showID,
        message: message,
        appliedToDate: new Date(),
        location: location
    }).catch((error) => {
        console.log(error.response);
    });
}

export async function applicationCheck(localId, showID) {
    const response = await firebaseUtil.get("/users/" + localId + "/appliedShows/" + showID + ".json").catch((error) => {
        console.log(error.response);
    });
    return response;
}

export async function applyToShow(message, showID, location, localId, accessToken) {
    // if (location == "Tucson, AZ"){
    //     location = "Tuscon, AZ"
    // }
    const response = await firebaseUtil.post("/shows/" + location + "/" + showID + "/applicants.json?auth=" + accessToken, {
        message: message,
        localId: localId,
        appliedToDate: new Date()
    }).catch((error) => {
        console.log(error.response);
    });
}

export async function getShowData(showID, location) {
    // if (location == "Tucson, AZ"){
    //     location = "Tuscon, AZ"
    // }
    const response = await firebaseUtil.get("/shows/" + location + "/" + showID + ".json").catch((error) => {
        console.log(error.response);
    });
    return response.data;
}

export async function getMyShowsData(localId) {

    const response = await firebaseUtil.get("/users/" + localId + "/appliedShows.json").catch((error) => {
        console.log(error.response);
    });
    return response.data;
}

export async function getShowsDataAtLocation(location) {
    // if (location == "Tucson, AZ"){
    //     location = "Tuscon, AZ"
    // }
    const response = await firebaseUtil.get("/shows/" + location + ".json").catch((error) => {
        console.log(error.response);
    });
    return response.data;
}