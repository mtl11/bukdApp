import firebaseUtil from "./firebaseUtil";

export async function addShowToGlobalList(venueName, location, genreNeeded,
    typeNeeded, date, startTime, endTime, maxApplicants, compensationStart,
    compensationEnd, equipment, description, postsExpire, datePosted, localId, accessToken) {
    const response = await firebaseUtil.post(
        "/shows/" + location + ".json?auth=" + accessToken,
        {
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
    );

    return response.data;
}

export async function editShow(data,showID, location, accessToken) {
    console.log("/shows/" + location + "/"+showID+".json?auth=" + accessToken);

    const response = await firebaseUtil.put(
        "/shows/" + location + "/"+showID+".json?auth=" + accessToken,
        data
    ).catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        };});

    // return response.data;
}

export async function addShowToProfile(showID, localId, accessToken) {
    const response = await firebaseUtil.put("/users/" + localId + "/shows/" + showID + ".json?auth=" + accessToken,{
        showID: showID
    });

    // console.log(response.data);
}

export async function getShowData(showID, location){
    const response = await firebaseUtil.get("/shows/" + location + "/" + showID + ".json");
    return response.data;
}