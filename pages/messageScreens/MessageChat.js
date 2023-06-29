import React, { useState, useCallback, useEffect, useContext } from "react";
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from "react-native";
import global from "../../styles/global";
import { GiftedChat, Send, InputToolbar } from "react-native-gifted-chat";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { sendMessage, checkIfChatExists, createNewChatRoom, getMessages, updateHasBeenChecked } from "../../util/chat";
import { ProfileContext } from "../../store/profileContext";
import { getAccessToken } from "../../util/profile";
import { getPushNotficationTokenToDB } from "../../util/auth";

const MessageChat = (props) => {
    // console.log(props.route.params)
    const profileCTX = useContext(ProfileContext);
    const [chatRoomID, setChatRoomID] = useState(props.route.params.chatID);
    const [senderID, setSenderID] = useState();
    const [recieverID, setRecieverID] = useState();
    const [messages, setMessages] = useState([]);
    // console.log(profileCTX.about);
    async function sendMessageNotification() {
        const id = await AsyncStorage.getItem("searchID");
        const response = await getPushNotficationTokenToDB(id);
        // console.log(response.data);
        if (response != null) {
            fetch('https://exp.host/--/api/v2/push/send', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    to: response.data.token.data,
                    title: "Bukd",
                    body: "Someone sent you a message",
                    data: { userID: id },
                }),
                // data: "test"

            })
        }

    }

    async function send(message) {
        const accessToken = await getAccessToken();
        // console.log(chatRoomID);
        await sendMessage(chatRoomID, message, senderID, accessToken);
        sendMessageNotification();
    }
    const onSend = useCallback((messages = []) => {
        const { _id, createdAt, text, user, } = messages[0];
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
        send(messages[0]);
    }, [chatRoomID, senderID])

    const customtInputToolbar = props => {
        return (
            <InputToolbar
                {...props}
                containerStyle={{
                    backgroundColor: global.color.secondaryColors.background,
                    paddingTop: 5,
                    borderRadius: 100,
                    borderTopWidth: 0
                }}
                primaryStyle={{
                    backgroundColor: global.color.secondaryColors.background,
                    paddingTop: 5,
                    borderRadius: 100,
                    borderTopWidth: 1,
                    borderWidth: 1,
                    borderTopColor: global.color.secondaryColors.text,
                    borderColor: global.color.secondaryColors.text,
                    marginHorizontal: 10
                }}
            />
        );
    };

    const renderSend = (props) => {
        return (
            <Send {...props} containerStyle={{ borderRadius: 100, paddingTop: 5, }} >
                <View style={{ height: '100%', marginRight: 15 }}>
                    <Ionicons name="send" size={22} color={global.color.primaryColors.main} />
                </View>
            </Send>
        )
    }
    function renderMessages(messages) {
        const msgs = [];
        for (const x in messages) {
            msgs.push(
                messages[x].message
            );
        }
        return msgs.reverse();
    }

    async function getPreviousMessages() {
        setSenderID(await AsyncStorage.getItem("localId"))

        const response = await getMessages(props.route.params.chatID);
        setMessages(renderMessages(response));
        await updateHasBeenChecked(props.route.params.chatID);
    }
    useEffect(() => {
        getPreviousMessages()

    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <View style={{
                flexDirection: "row", borderBottomWidth: 1,
                paddingBottom: 10, borderColor: global.color.secondaryColors.adjacent,
                justifyContent: "space-between",
                paddingHorizontal: 30
            }}>
                <View style={{ justifyContent: "center" }}>
                    <TouchableOpacity
                        style={styles.topIconContainer}
                        onPress={() => {
                            props.navigation.pop();
                        }}
                    >
                        <Ionicons
                            name="arrow-back"
                            size={28}
                            color={styles.iconColor}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ justifyContent: "center" }}>
                    <Text style={{ color: global.color.secondaryColors.text, fontFamily: "Rubik-Regular", fontSize: 20 }}>
                        {props.route.params.displayName}
                    </Text>
                </View>
                {props.route.params.profileType == "general" ?
                    // <View style={{ justifyContent: "center" }}>
                    <View style={{ justifyContent: "center" }}>
                        <Text style={{
                            color: global.color.secondaryColors.main,
                            fontFamily: "Rubik-Regular",
                            fontSize: 18
                        }}>
                            Fan
                        </Text>
                    </View>
                    :
                    <TouchableOpacity style={{ justifyContent: "center" }} onPress={() => {
                        props.navigation.navigate("MessageProfile")
                    }}>
                        <Ionicons name="person" size={22} color={styles.iconColor} />
                    </TouchableOpacity>
                }
            </View>
            <GiftedChat
                renderSend={props => renderSend(props, chatRoomID, senderID)}
                renderInputToolbar={props => customtInputToolbar(props)}
                messagesContainerStyle={{ paddingBottom: 12, paddingHorizontal: 10 }}
                textInputStyle={styles.input}
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: senderID,
                }}
                renderAvatar={null}


            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: { color: global.color.secondaryColors.text, fontFamily: "Rubik-Regular" },
    container: {
        backgroundColor: global.color.secondaryColors.background,
        height: "100%",
    }, footerContainer: {
        backgroundColor: global.color.secondaryColors.background,
        height: "100%",
    }, topIconContainer: {
        // alignSelf: "flex-end",
        // marginHorizontal: 30,
    },
    iconColor: global.color.primaryColors.main
});
export default MessageChat;