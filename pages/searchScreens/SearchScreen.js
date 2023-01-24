/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import VenueList from "../../components/VenueList";
import { Ionicons } from "@expo/vector-icons";
const data = [
  { label: "Tuscon, AZ", value: "1" },
  { label: "Los Angeles, CA", value: "2" },
  { label: "Miami, FL", value: "3" },
  { label: "Denver, CO", value: "4" },
  { label: "Las Vegas, NV", value: "5" },
  { label: "San Francsico, CA", value: "6" },
  { label: "Seattle, WA", value: "7" }
];

const SearchScreen = (props) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Dropdown
          statusBarIsTranslucent={true}
          style={[styles.dropdown, isFocus && { borderColor: "black" }]}
          placeholderStyle={[styles.placeholderStyle, isFocus && { color: "black" }]}
          selectedTextStyle={[
            styles.selectedTextStyle,
            isFocus && { color: "black" },
          ]}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          renderLeftIcon={() => {
            return (
              <Ionicons
                name="ios-location-outline"
                size={28}
                color={isFocus ? "black" : "#9E9E9E"}
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
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue(item.value);
            setIsFocus(false);
          }}
        />
      </View>
      <View>
        <VenueList props ={props}/>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "white",
    height: "100%",
  },
  dropdown: {
    height: 50,
    width: "90%",
    borderColor: "#9E9E9E",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 8
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 18,
    color: "#9E9E9E"
  },
  selectedTextStyle: {
    fontSize: 18,
    color: "#9E9E9E",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});