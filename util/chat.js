import axios from "axios";
import firebaseUtil from "./firebaseUtil";

export async function sendMessage(chatRoomID, message, senderID, accessToken) {
    const mes = {
        _id: message._id,
        text: message.text,
        user: {"_id":senderID},
        createdAt: message.createdAt
    }
    // console.log(mes);
    const response = await firebaseUtil.post("/chatrooms/" + chatRoomID + "/messages/.json?auth="+accessToken, {
        message: mes,
    });
    await firebaseUtil.put("/chatrooms/" + chatRoomID + "/lastMessage/.json?auth="+accessToken, {
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

export async function createNewChatRoom(senderID, recieverID, senderName, recieverName, accessToken) {
    console.log("Sender: "+senderID);
    console.log("Reciever: "+recieverID);
    const response = await firebaseUtil.post("/chatrooms/.json?auth="+accessToken, {
        firstUser: senderID,
        secondUser: recieverID,
        messages: {}
    })
    const putInSenderResponse = await firebaseUtil.put("/users/" + senderID + "/chatrooms/" + recieverID + "/.json?auth="+accessToken, {
        chatRoomID: response.data.name,
        recieverName: recieverName
    });
    const putInRecieverResponse = await firebaseUtil.put("/users/" + recieverID + "/chatrooms/" + senderID + "/.json?auth="+accessToken, {
        chatRoomID: response.data.name,
        recieverName: senderName
    });
    return response.data.name;
}