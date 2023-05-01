import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Ionicons } from "@expo/vector-icons";
import global from "../../styles/global";
import { ScrollView } from "react-native-gesture-handler";

const CategorySelector = (props) => {
    const [selectedName, setSelectedName] = useState("All Categories")
    function getData() {
        const array = [];
        for (const x in props.data) {
            const item = props.data[x];
            array.push(
                <TouchableOpacity
                    onPress={() => {
                        setSelectedName(item.label);
                        props.setValue(item.label);
                    }}
                    key={item.value}
                    style={[styles.categoryContainer,
                    selectedName == item.label && { backgroundColor: global.color.primaryColors.main }]}>
                    <View style={{ padding: 10 }}>
                        <Text style={[styles.text, selectedName == item.label && { color: "white" }]}>
                            {item.label}
                        </Text>
                    </View>
                </TouchableOpacity>)
        }
        return array;
    }
    return (
        <ScrollView horizontal={true} style={{ width: "100%", marginVertical: "2%", }} showsHorizontalScrollIndicator={false}>
            {getData()}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    categoryContainer: {
        borderWidth: 1,
        // padding: "5%",
        marginLeft: 20,
        backgroundColor: "white",
        borderRadius: 12,
        borderColor: "#D9D9D9"
    }, text: {
        fontSize: 16,
        color: global.color.primaryColors.main,
        fontFamily: "Rubik-Regular"

    }
});
export default CategorySelector;