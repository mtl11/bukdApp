/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import VenueList from "../../components/VenueList";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import global from "../../styles/global";
import SearchDropDown from "../../components/SearchDropDown";
import { locations, profileCategoriesVenue } from "../../models/dropdownData";
import { getVenueList } from "../../util/search";
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
  const [location, setLocation] = useState(null);
  const [category, setCategory] = useState(null);

  async function getVenues(){
    const venues = await getVenueList(location);
    console.log(venues);
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <SearchDropDown
          setValue={setLocation}
          placeholder={"Select Location"}
          data={locations}
          icon={"ios-location-outline"}
          blur={getVenues}
        />
        <SearchDropDown
          setValue={setCategory}
          placeholder={"Select Category"}
          data={profileCategoriesVenue}
          icon={"business-outline"}
          blur={()=>{}}
        />
      </View>
      <View>
        <VenueList venue={location} category={category} />
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
    marginTop: 10,
  },
  container: {
    backgroundColor: global.color.primaryColors.background,
    height: "100%",
  },
  dropdown: {
    height: 40,
    width: "84%",
    backgroundColor: global.color.primaryColors.main,
    // borderWidth: 1,
    borderRadius: 12,
    padding: 10,
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
