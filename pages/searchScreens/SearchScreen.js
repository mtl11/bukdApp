/* eslint-disable react-native/no-inline-styles */
import React, { useState, useContext, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import VenueList from "../../components/VenueList";
import global from "../../styles/global";
import SearchDropDown from "../../components/SearchDropDown";
import {
  locations,
  profileCategoriesVenue,
  profileCategoriesArtist,
} from "../../models/dropdownData";
import { getVenueList, getPerformersList } from "../../util/search";
import { getProfileInfo } from "../../util/profile";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SearchScreen = (props) => {
  const [location, setLocation] = useState(null);
  const [category, setCategory] = useState(null);
  const [venues, setVenues] = useState(null);
  const [performers, setPerformers] = useState(null);
  const [auth, setAuth] = useState(false);
  const [pt, setPT] = useState(null);

  async function getVenues(location) {
    const venues = await getVenueList(location);
    setVenues(venues);
  }

  async function getPerformers(location) {
    const venues = await getPerformersList(location);
    setPerformers(venues);
  }

  async function profileType() {
    const localId = await AsyncStorage.getItem("localId");
    const profiletype = await getProfileInfo(localId);
    setPT(profiletype.profileType);
  }

  useEffect(() => {
    setAuth(false);
    profileType();
    setAuth(true);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {auth ? (
        <View>
          <View style={styles.topContainer}>
            {pt == "venue" ? (
              <SearchDropDown
                setValue={setLocation}
                placeholder={"Select Location"}
                data={locations}
                icon={"ios-location-outline"}
                blur={getPerformers}
              />
            ) : (
              <SearchDropDown
                setValue={setLocation}
                placeholder={"Select Location"}
                data={locations}
                icon={"ios-location-outline"}
                blur={getVenues}
              />
            )}

            {pt == "venue" ? (
              <SearchDropDown
                setValue={setCategory}
                placeholder={"Select Category"}
                data={profileCategoriesArtist}
                icon={"musical-notes-outline"}
                blur={() => {}}
              />
            ) : (
              <SearchDropDown
                setValue={setCategory}
                placeholder={"Select Category"}
                data={profileCategoriesVenue}
                icon={"business-outline"}
                blur={() => {}}
              />
            )}
          </View>
          {pt == "venue" ? (
          <View>
            <VenueList venues={performers} category={category} />
          </View>):(
          <View>
            <VenueList venues={venues} category={category} />
          </View>)}
        </View>
      ) : (
        <View style={{ height: "100%", justifyContent: "center" }}>
          <ActivityIndicator size={"large"} />
        </View>
      )}
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
