/* eslint-disable react-native/no-inline-styles */
import React, { useState, useContext, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity
} from "react-native";
import VenueList from "../../components/search/VenueList";
import global from "../../styles/global";
import SearchDropDown from "../../components/search/SearchDropDown";
import {
  locations,
  profileCategoriesVenue,
  profileCategoriesArtist,
} from "../../models/dropdownData";
import { getVenueList, getPerformersList } from "../../util/search";
import { getProfileInfo } from "../../util/profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../store/authContext";
import CategorySelector from "../../components/search/CategorySelector";
import PerformerCategorySelector from "../../components/search/PerformerCategorySelector";
import PerformerList from "../../components/search/PerformerList";
const SearchScreen = (props) => {
  const [location, setLocation] = useState("Tucson, AZ");
  const [performerCategory, setPerformerCategory] = useState("All Categories");
  const [venueCategory, setVenueCategory] = useState("All Categories");
  const [venues, setVenues] = useState(null);
  const [performers, setPerformers] = useState(null);
  const [auth, setAuth] = useState(false);
  const [pt, setPT] = useState(null);

  const authCTX = useContext(AuthContext);

  async function getVenues(location) {
    const venues = await getVenueList(location);
    if (venues != null) {
      setVenues(Object.values(venues));
    } else {
      setVenues(venues);
    }

    await getPerformers(location);
  }

  async function getPerformers(location) {
    const performers = await getPerformersList(location);
    if (performers != null) {
      setPerformers(Object.values(performers));
    } else {
      setPerformers(performers);
    }
    await getVenues(location);
  }

  async function profileType() {
    const localId = await AsyncStorage.getItem("localId");
    
    if (!authCTX.isAuthenticated) {
      getPerformers("Tucson, AZ");
      getVenues("Tucson, AZ");
      authCTX.logout();
    } else {
      const profiletype = await getProfileInfo(localId);
      await AsyncStorage.setItem("profileType", profiletype.profileType);
      getPerformers("Tucson, AZ");
      getVenues("Tucson, AZ");
    }
  }

  const [performersShow, setPerformersShow] = useState(true);
  const [venuesShow, setVenuesShow] = useState(false);

  useEffect(() => {
    setAuth(false);
    profileType();
    setAuth(true);
  }, [authCTX.isAuthenticated]);
  return (
    <SafeAreaView style={styles.container}>
      {auth ? (
        <View>
          <View style={styles.topContainer}>
            {venuesShow == false ? (
              <SearchDropDown
                setValue={setLocation}
                placeholder={"Tucson, AZ"}
                data={locations}
                icon={"ios-location-outline"}
                blur={getPerformers}
              />
            ) : (
              <SearchDropDown
                setValue={setLocation}
                placeholder={"Tucson, AZ"}
                data={locations}
                icon={"ios-location-outline"}
                blur={getVenues}
              />
            )}
            {venuesShow == false ?
              <PerformerCategorySelector data={profileCategoriesArtist} setValue={setPerformerCategory} value={performerCategory} /> :
              <CategorySelector data={profileCategoriesVenue} setValue={setVenueCategory} value={venueCategory} />}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "90%",
              alignSelf: "center"
            }}
          >
            <TouchableOpacity
              style={styles.tabContainer}
              onPress={() => {
                setPerformersShow(true);
                setVenuesShow(false);

              }}
            >
              <View style={{ flexDirection: "column" }}>
                <View style={styles.tabTextContainer}>
                  <Text style={[styles.tabText, performersShow && { color: "black" }]}>Performers</Text>
                </View>
                {performersShow && (
                  <View style={styles.tabBottomBar}></View>
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tabContainer}
              onPress={() => {
                setPerformersShow(false);
                setVenuesShow(true);

              }}
            >
              <View style={{ flexDirection: "column" }}>
                <View style={styles.tabTextContainer}>
                  <Text style={[styles.tabText, venuesShow && { color: "black" }]}>Venues</Text>
                </View>
                {venuesShow && (
                  <View style={styles.tabBottomBar}></View>
                )}
              </View>
            </TouchableOpacity>
          </View>
          {venuesShow == false ? (
            <PerformerList venues={performers} category={performerCategory} props={props}  getPerformers={getPerformers} location={location}/>
          ) : (
            <VenueList venues={venues} category={venueCategory} props={props}  getVenues={getVenues} location={location}/>
          )}
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
    backgroundColor: global.color.secondaryColors.adjacent,
    borderColor: global.color.secondaryColors.adjacent,
    borderRadius: 12,
    paddingBottom: 10,
  },
  item: {
    backgroundColor: global.color.secondaryColors.adjacent,
    borderRadius: 12,
  },
  textItem: {
    color: global.color.secondaryColors.text,
    fontSize: 16,
    padding: 20,
    fontFamily: "Rubik-Regular",
  },
  topContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "#FCFCFF",
    // // flex:1
    height: "100%",
  },
  dropdown: {
    height: 40,
    width: "84%",
    backgroundColor: global.color.secondaryColors.main,
    // borderWidth: 1,
    borderRadius: 12,
    padding: 10,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: global.color.secondaryColors.buttonAccent,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: global.color.secondaryColors.buttonAccent,
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
  tabView: {
    borderBottomWidth: 1,
    marginTop: 10,
    alignItems: "center",
    borderColor: global.color.secondaryColors.adjacent,
  },
  tabTextContainer: {
    paddingHorizontal: 15,
    borderRadius: 10,
    paddingBottom: 10,
  },
  tabContainer: {
    width: "50%",
    alignItems: "center",
  },
  tabBottomBar: {
    borderWidth: 2.5,
    borderRadius: 12,
    borderColor: global.color.secondaryColors.main,
    backgroundColor: global.color.secondaryColors.main,
  },
  tabText: {
    color: global.color.secondaryColors.placeHolderTextColor,
    fontFamily: "Rubik-Regular",
    fontSize: 16,
  },
});
