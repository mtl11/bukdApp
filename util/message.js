import firebaseUtil from "./firebaseUtil";

export async function getAllMessages(uuid) {
    const response = await firebaseUtil.get("/users/" + uuid + "/chatrooms/.json").catch((error) => {
        console.log(error.response);
    });
    const values = response.data;
    return values;
}

export async function getChatroomIdData(chatroom) {
    // const chatRoomID = chatroom.chatRoomID;
    const response = await firebaseUtil.get("/chatrooms/" + chatroom + "/.json").catch((error) => {
        console.log(error.response);
    });
    return response.data;
}

export async function getChatroomSenderID(chatroom) {
    // const chatRoomID = chatroom.chatRoomID;
    const response = await firebaseUtil.get("/chatrooms/" + chatroom + "/firstUser/.json").catch((error) => {
        console.log(error.response);
    });
    return response.data;
}

export async function getChatroomRecieverID(chatroom) {
    // const chatRoomID = chatroom.chatRoomID;
    const response = await firebaseUtil.get("/chatrooms/" + chatroom + "/secondUser/.json").catch((error) => {
        console.log(error.response);
    });
    return response.data;
}

export async function getLastMessage(chatroom) {
    // const chatRoomID = chatroom.chatRoomID;
    const response = await firebaseUtil.get("/chatrooms/" + chatroom + "/lastMessage/.json").catch((error) => {
        console.log(error.response);
    });
    return response.data;
}
