import firebaseUtil from "./firebaseUtil";

export async function getAllMessages(uuid) {
    const response = await firebaseUtil.get("/users/" + uuid + "/chatrooms/.json");
    const values = response.data;
    console.log(values);
    return values;
}