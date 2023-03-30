import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import global from "../../styles/global";
import { SearchBar } from 'react-native-elements';
const SearchBarMessages = (props) => {
   
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>All Messages</Text>
            <SearchBar
                platform="ios"
                containerStyle={{ backgroundColor: global.color.primaryColors.background }}
                inputContainerStyle={{ backgroundColor: global.color.primaryColors.adjacent }}
                inputStyle={{ fontSize: 16, color: global.color.primaryColors.text, fontFamily: "Rubik-Regular" }}
                onChangeText={props.setSearchValue}
                value={props.searchValue}
                showCancel={true}
                round="false"
            />
        </View>
    )
}
const styles = StyleSheet.create({
    headerText: {
        fontSize: 20,
        fontFamily: "Rubik-Regular",
        color: global.color.primaryColors.text,
        // marginBottom: 10
    },
    headerContainer: {
        alignItems: "center",
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        width: "100%",
        borderColor: global.color.primaryColors.adjacent,
    },
});

export default SearchBarMessages;