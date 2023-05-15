import React, { useState } from "react";
import { View, StyleSheet, FlatList, Text, TouchableHighlight, RefreshControl, Image } from "react-native";
import global from "../../styles/global";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getChatroomIdData } from "../../util/message";

const MessagesLists = (props) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        props.refreshData();
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    // function formatAMPM(date) {
    //     var hours = date.getHours();
    //     var minutes = date.getMinutes();
    //     var ampm = hours >= 12 ? 'PM' : 'AM';
    //     hours = hours % 12;
    //     hours = hours ? hours : 12; // the hour '0' should be '12'
    //     minutes = minutes < 10 ? '0' + minutes : minutes;
    //     var strTime = hours + ':' + minutes + ' ' + ampm;
    //     return strTime;
    // }
    const formatter = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        hour12: false,
        minute: 'numeric',
        weekday: 'long',
      });
      function time_ago(time) {

        switch (typeof time) {
          case 'number':
            break;
          case 'string':
            time = +new Date(time);
            break;
          case 'object':
            if (time.constructor === Date) time = time.getTime();
            break;
          default:
            time = +new Date();
        }
        var time_formats = [
          [60, 'seconds', 1], // 60
          [120, '1 minute ago', '1 minute from now'], // 60*2
          [3600, 'minutes', 60], // 60*60, 60
          [7200, '1 hour ago', '1 hour from now'], // 60*60*2
          [86400, 'hours', 3600], // 60*60*24, 60*60
          [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
          [604800, 'days', 86400], // 60*60*24*7, 60*60*24
          [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
          [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
          [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
          [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
          [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
          [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
          [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
          [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
        ];
        var seconds = (+new Date() - time) / 1000,
          token = 'ago',
          list_choice = 1;
      
        if (seconds == 0) {
          return 'Just now'
        }
        if (seconds < 0) {
          seconds = Math.abs(seconds);
          token = 'from now';
          list_choice = 2;
        }
        var i = 0,
          format;
        while (format = time_formats[i++])
          if (seconds < format[0]) {
            if (typeof format[2] == 'string')
              return format[list_choice];
            else
              return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
          }
        return time;
      }
    const renderItem = (chatroom) => {
        return (
            <TouchableHighlight
                id={chatroom.item.chatRoomID}
                activeOpacity={0.2}
                underlayColor={global.color.secondaryColors.background}
                onPress={() => { props.props.navigation.navigate("MessageChat", { chatID: chatroom.item.chatRoomID, displayName: chatroom.item.recieverName }) }}
            >
                <View style={styles.messageContainer}>
                    <View style={styles.imageContainer}>
                        <Image
                        style={styles.img}
                            source={chatroom.item.profilePicURL === undefined ? {source: require("../../assets/loadingImage.png")} :{  uri: chatroom.item.profilePicURL}}
                            defaultSource={require("../../assets/loadingImage.png") }
                        />
                    </View>
                    <View style={styles.nameAndTextContainer}>
                        <View style={{flexDirection: "row", alignItems:"center", justifyContent:"space-between", paddingBottom: "1%"}}>
                        <Text style={styles.nameText}>{chatroom.item.recieverName}</Text>
                        {chatroom.item.lastMessage != null &&
                        <Text style={styles.lastText}>{time_ago(new Date(chatroom.item.lastMessage.message.createdAt))}</Text>}
                        </View>
                        
                        {chatroom.item.lastMessage != null &&
                        <View>
                            
                        <Text style={styles.lastText}>{chatroom.item.lastMessage.message.text}</Text>
                        
                        
                        </View>}
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
    const getData = () => {
        // console.log(props.data)
        if (props.data != {}) {
            if (Array.isArray(props.data)) {
                const data = props.data.filter(word =>
                    word.recieverName.includes(props.searchValue))
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
    img:{
        width: 50,
        height: 50,
        borderRadius: 100,
        overflow: "hidden",
    },
    roomText: {
        color: global.color.secondaryColors.text
    }, lastText: {
        color: "#9E9E9E",
        // paddingTop: "1%",
        fontFamily: "Rubik-Regular",
        fontSize: 16,
    },
    nameAndTextContainer: {
        paddingLeft: "5%",
        flexGrow: 1,
        borderColor: global.color.secondaryColors.adjacent,
    },
    messageContainer: {
        padding: "4%",
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
        // paddingBottom: "1%",
    },
    imageContainer: {
        // padding: 10,
        overflow: "hidden",
        borderWidth: 1.5,
        borderRadius: 100,
        borderColor: global.color.secondaryColors.adjacent
    },
})

export default MessagesLists;