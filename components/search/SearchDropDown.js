import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Ionicons } from "@expo/vector-icons";
import global from "../../styles/global";

const SearchDropDown = (props) => {
  const [value, setValue] = useState(props.location);
  const renderItem = (item) => {
    
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };
  const [pressed, setPressed] = useState(false);
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
        if (pressed == false) {
          return (
            <Ionicons
              name="chevron-down"
              size={22}
              color={global.color.primaryColors.buttonAccent}
            />
          );
        } else {
          return (
            <Ionicons
              name="chevron-up"
              size={22}
              color={global.color.primaryColors.buttonAccent}
            />
          );
        }
      }}
      onFocus={() => {
        setPressed(true);
      }}
      onBlur={() => {
        setPressed(false);
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
        // console.log(item);
        props.setValue(item);
        setValue(item);
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
    backgroundColor: global.color.secondaryColors.adjacent,
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
    // marginVertical: "2%"
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
    color: global.color.secondaryColors.text,
    backgroundColor: global.color.secondaryColors.adjacent,
    borderColor: global.color.secondaryColors.adjacent,
  },
});

export default SearchDropDown;
