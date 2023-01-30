/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import VenueList from "../../components/VenueList";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import global from "../../styles/global";
const data = [
  { label: "Tuscon, AZ", value: "1" },
  { label: "Los Angeles, CA", value: "2" },
  { label: "Miami, FL", value: "3" },
  { label: "Denver, CO", value: "4" },
  { label: "Las Vegas, NV", value: "5" },
  { label: "San Francsico, CA", value: "6" },
  { label: "Seattle, WA", value: "7" },
];
const categories = [
  { label: "DJ", value: "1" },
  { label: "Singer", value: "2" },
];

const SearchScreen = (props) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [valueType, setValueType] = useState(null);
  const [isFocusType, setIsFocusType] = useState(false);
  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Dropdown
          statusBarIsTranslucent={true}
          style={[styles.dropdown, isFocus && { borderColor: "black" }]}
          placeholderStyle={[
            styles.placeholderStyle,
            isFocus && { color: "black" },
          ]}
          activeColor={global.color.primaryColors.adjacent}
          selectedTextStyle={[
            styles.selectedTextStyle,
            isFocus && { color: "black" },
          ]}
          renderItem={renderItem}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          renderLeftIcon={() => {
            return (
              <Ionicons
                name="ios-location-outline"
                size={22}
                color={
                  isFocus ? "black" : global.color.primaryColors.buttonAccent
                }
              />
            );
          }}
          renderRightIcon={() => {
            return (
              <Ionicons
                name="chevron-down"
                size={22}
                color={
                  isFocus ? "black" : global.color.primaryColors.buttonAccent
                }
              />
            );
          }}
          autoScroll={false}
          data={data}
          search
          fontFamily="Rubik-Regular"
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={"Select Location"}
          searchPlaceholder="Search..."
          value={value}
          containerStyle={styles.dropContainer}
          // backgroundColor={"rgb"}
          // onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue(item.value);
            setIsFocus(false);
          }}
        />
        <Dropdown
          statusBarIsTranslucent={true}
          style={[styles.dropdown, {marginTop: "2%"},isFocus && { borderColor: "black"}]}
          placeholderStyle={[
            styles.placeholderStyle,
            isFocus && { color: "black" },
          ]}
          activeColor={global.color.primaryColors.adjacent}
          selectedTextStyle={[
            styles.selectedTextStyle,
            isFocus && { color: "black" },
          ]}
          renderItem={renderItem}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          renderLeftIcon={() => {
            return (
              <Ionicons
                name="musical-notes-outline"
                size={22}
                color={
                  isFocus ? "black" : global.color.primaryColors.buttonAccent
                }
              />
            );
          }}
          renderRightIcon={() => {
            return (
              <Ionicons
                name="chevron-down"
                size={22}
                color={
                  isFocus ? "black" : global.color.primaryColors.buttonAccent
                }
              />
            );
          }}
          autoScroll={false}
          data={categories}
          search
          fontFamily="Rubik-Regular"
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={"Select Category"}
          searchPlaceholder="Search..."
          value={valueType}
          containerStyle={styles.dropContainer}
          onBlur={() => setIsFocusType(false)}
          onChange={(item) => {
            setValueType(item.value);
            setIsFocusType(false);
          }}
        />
      </View>
      <View>
        <VenueList props={props} />
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  dropContainer: {
    backgroundColor: global.color.primaryColors.adjacent,
    borderColor: global.color.primaryColors.adjacent,
    borderRadius: 12,
    paddingBottom: 10,
  },
  item: {
    backgroundColor: global.color.primaryColors.adjacent,
    borderRadius: 12,
  },
  textItem: {
    color: global.color.primaryColors.text,
    fontSize: 16,
    padding: 20,
    fontFamily: "Rubik-Regular",
  },
  topContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10
  },
  container: {
    backgroundColor: global.color.primaryColors.background,
    height: "100%",
  },
  dropdown: {
    height: 40,
    width: "84%",
    borderColor: global.color.primaryColors.buttonAccent,
    borderWidth: 1,
    borderRadius: 12,
    padding: 8,
  
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
    backgroundColor: global.color.primaryColors.adjacent,
    borderColor: global.color.primaryColors.adjacent,
  },
});
