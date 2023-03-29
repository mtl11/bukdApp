import axios from "axios";
import firebaseUtil from "./firebaseUtil";

export async function sendMessage(chatRoomID, message, senderID) {
    const mes = {
        _id: message._id,
        text: message.text,
        user: {"_id":senderID},
        createdAt: message.createdAt
    }
    // console.log(mes);
    const response = await firebaseUtil.post("/chatrooms/" + chatRoomID + "/messages/.json", {
        message: mes,
    });
}
export async function getMessages(chatRoomID) {
    const response = await firebaseUtil.get("/chatrooms/" + chatRoomID + "/messages/.json");
    return response.data;
}

export async function checkIfChatExists(senderID, recieverID) {

    const response = await firebaseUtil.get("/users/" + senderID + "/chatrooms/" + recieverID + "/.json");
    return response.data;
}

export async function createNewChatRoom(senderID, recieverID) {
    console.log("Sender: "+senderID);
    console.log("Reciever: "+recieverID);
    const response = await firebaseUtil.post("/chatrooms/.json", {
        firstUser: senderID,
        secondUser: recieverID,
        messages: {}
    })
    const putInSenderResponse = await firebaseUtil.put("/users/" + senderID + "/chatrooms/" + recieverID + "/.json", {
        chatRoomID: response.data.name
    });

    const putInRecieverResponse = await firebaseUtil.put("/users/" + recieverID + "/chatrooms/" + senderID + "/.json", {
        chatRoomID: response.data.name
    });

    return response.data.name;
}