import React from "react";
import { View, StyleSheet, FlatList, Text, TouchableHighlight, RefreshControl } from "react-native";
import global from "../../styles/global";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MessagesLists = (props) => {
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        props.refreshData();
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);
    console.log(props.data)
    const renderItem = (chatroom) => {
        // console.log(chatroom.item.chatRoomID);
        return (
            <TouchableHighlight
                id={chatroom.item.chatroomID}
                activeOpacity={0.2}
                underlayColor={global.color.secondaryColors.background}
                onPress={() => { props.props.navigation.navigate("MessageChat", { chatID: chatroom.item.chatRoomID, displayName: chatroom.item.recieverName }) }}
            >
                <View style={styles.messageContainer}>
                    <View style={styles.imageContainer}>
                        <MaterialCommunityIcons name="account-music" size={34} color={global.color.primaryColors.main} />
                    </View>
                    <View style={styles.nameAndTextContainer}>
                        <Text style={styles.nameText}> {chatroom.item.recieverName}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
    const getData = () => {
        if (props.data != {}) {
            if (Array.isArray(props.data)) {
                const data = props.data.filter(word => word.recieverName.includes(props.searchValue))
                return data;
            }
        } else {
            return [];
        }

    }

    return (
        <FlatList data={getData()} renderItem={renderItem}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing} onRefresh={onRefresh}
                    tintColor={global.color.primaryColors.main} />
            } />
    )
}

const styles = StyleSheet.create({
    roomText: {
        color: global.color.secondaryColors.text
    }, lastText: {
        color: "#9E9E9E",
        paddingTop: "1%",
        fontFamily: "Rubik-Regular",
        fontSize: 16,
    },
    nameAndTextContainer: {
        paddingLeft: "10%",
        flexGrow: 1,
        borderColor: global.color.secondaryColors.adjacent,
    },
    messageContainer: {
        padding: "5%",
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: global.color.secondaryColors.adjacent,
    },
    nameText: {
        fontFamily: "Rubik-Regular",
        fontSize: 18,
        color: global.color.secondaryColors.text,
        paddingBottom: "1%",
    },
    imageContainer: {
        padding: 10,
        borderWidth: 1.5,
        borderRadius: 100,
        borderColor: global.color.secondaryColors.adjacent
    },
})

export default MessagesLists;