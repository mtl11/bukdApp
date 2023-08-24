import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Ionicons } from "@expo/vector-icons";
import global from "../../styles/global";
import { ScrollView } from "react-native-gesture-handler";

const CategorySelector = (props) => {
  const [selectedName, setSelectedName] = useState(props.value);
  function renderItem(dataItem) {
    // const array = [];
    // for (const x in props.data) {
    const item = dataItem.item;
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedName(item.label);
          props.setValue(item.label);
        }}
        key={item.value}
        style={[
          styles.categoryContainer,
          selectedName == item.label && {
            backgroundColor: global.color.primaryColors.main,
          },
        ]}
      >
        <View style={{ padding: 10 }}>
          <Text
            style={[
              styles.text,
              selectedName == item.label && { color: "white" },
            ]}
          >
            {item.label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <FlatList
      renderItem={renderItem}
      data={props.data}
      numColumns={2}
      columnWrapperStyle={styles.columnStyle}
    />
  );
};

const styles = StyleSheet.create({
  columnStyle: {
    justifyContent: "space-evenly",
  },
  categoryContainer: {
    marginVertical: 5,
    backgroundColor: "white",
    borderRadius: 12,
    borderColor: "#D9D9D9",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    minWidth: 125,
    alignItems: "center",
    // flex:1
    marginHorizontal: "5%",
  },
  text: {
    fontSize: 16,
    // color: global.color.primaryColors.main,
    fontFamily: "Rubik-Regular",
  },
});
export default CategorySelector;
