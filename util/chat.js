import axios from "axios";
import firebaseUtil from "./firebaseUtil";

export async function sendMessage(chatRoomID, message){
    const response = await firebaseUtil.post("/chatrooms/" + chatRoomID +"/messages/.json", {
        message: message
      });
}
export async function getMessages(chatRoomID){
    const response = await firebaseUtil.get("/chatrooms/" + chatRoomID +"/messages/.json");
    return response.data;
}

export async function checkIfChatExists(senderID, recieverID){
    const response = await firebaseUtil.get("/users/" + senderID + "/chatrooms/"+recieverID+"/.json");
    return response.data;
}

export async function createNewChatRoom(senderID, recieverID){
    const response = await firebaseUtil.post("/chatrooms/.json",{
        firstUser: senderID,
        secondUser: recieverID,
        messages: {} 
    })
    const underProfileResponse = await firebaseUtil.put("/users/" + senderID + "/chatrooms/"+recieverID+"/.json",{
        chatRoomID: response.data.name
    });
    return response.data.name;
}