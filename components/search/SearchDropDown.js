import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Ionicons } from "@expo/vector-icons";
import global from "../../styles/global";

const SearchDropDown = (props) => {
  const [value, setValue] = useState(null);
  const renderItem = (item) => {
    // if (item.label == "Tuscon, AZ") {
      return (
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.label}</Text>
        </View>
      );
    // } else {
    //   return (
    //     <View style={[styles.item, { flexDirection: "row", justifyContent: "space-between" }]}>
    //       <Text style={[styles.textItem, { color: global.color.primaryColors.background }]}>{item.label}</Text>
    //       <Text style={[styles.textItem, { color: global.color.primaryColors.background }]}>{"Coming Soon"}</Text>
    //     </View>
    //   );
    // }

  };
  return (
    <Dropdown
      statusBarIsTranslucent={true}
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      activeColor={global.color.primaryColors.adjacent}
      selectedTextStyle={styles.selectedTextStyle}
      renderItem={renderItem}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      renderLeftIcon={() => {
        return (
          <Ionicons
            name={props.icon}
            size={22}
            color={global.color.primaryColors.buttonAccent}
          />
        );
      }}
      renderRightIcon={() => {
        return (
          <Ionicons
            name="chevron-down"
            size={22}
            color={global.color.primaryColors.buttonAccent}
          />
        );
      }}
      autoScroll={false}
      data={props.data}
      search
      fontFamily="Rubik-Regular"
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={props.placeholder}
      searchPlaceholder="Search..."
      value={value}
      containerStyle={styles.dropContainer}
      onChange={(item) => {
        props.setValue(item.label);
        // console.log(item.label);
        setValue(item.value);
        props.blur(item.label);
      }}
    />
  );
};

const styles = StyleSheet.create({
  dropContainer: {
    backgroundColor: global.color.secondaryColors.adjacent,
    borderColor: global.color.secondaryColors.adjacent,
    borderRadius: 12,
    paddingBottom: 10,
  },
  item: {
    backgroundColor: global.color.secondaryColors.adjacent
  },
  textItem: {
    color: "black",
    fontSize: 16,
    padding: 20,
    fontFamily: "Rubik-Regular",
  },
  dropdown: {
    height: 40,
    width: "90%",
    backgroundColor: global.color.primaryColors.main,
    borderRadius: 12,
    padding: 10,
    marginVertical: "2%"
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: global.color.primaryColors.buttonAccent,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: global.color.primaryColors.buttonAccent,
  },
  iconStyle: {
    width: 18,
    height: 18,
  },
  inputSearchStyle: {
    fontSize: 16,
    color: global.color.primaryColors.text,
    backgroundColor: global.color.secondaryColors.adjacent,
    borderColor: global.color.secondaryColors.adjacent,
  },
});

export default SearchDropDown;
