/* eslint-disable react-native/no-inline-styles */
import React, { useState, useContext, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Button,
  Keyboard,
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
import { Ionicons } from "@expo/vector-icons";
import FilterModal from "./FilterModal";
import { SearchBar } from "react-native-elements";
import {
  getPerformersListByLocation,
  getVenueListByLocation,
} from "../../util/search";
import SearchProfileList from "../../components/search/SearchProfileList";
const SearchScreen = (props) => {
  const [location, setLocation] = useState({
    label: "All Locations",
    value: "0",
  });
  const [performerCategory, setPerformerCategory] = useState("All Categories");
  const [performers, setPerformers] = useState(null);
  const [auth, setAuth] = useState(false);
  const [text, setText] = useState("Welcome To Bukd");
  const [data, setData] = useState([]);
  const authCTX = useContext(AuthContext);

  async function getVenues() {
    const venues = await getVenueList();
    let cols = [];
    for (const x in venues) {
      cols = cols.concat(Object.values(venues[x]));
    }
    setPerformers(cols);
    setData(cols);
  }

  async function getPerformers() {
    const performers = await getPerformersList();
    let cols = [];
    for (const x in performers) {
      cols = cols.concat(Object.values(performers[x]));
    }
    setPerformers(cols);
    setData(cols);
  }

  async function getVenuesByLocation(searchLocation) {
    if (searchLocation) {
      const venues = await getVenueListByLocation(searchLocation);
      if (venues != null) {
        setPerformers(Object.values(venues));
      } else {
        setPerformers(venues);
      }
    }
  }

  async function getPerformersByLocation(searchLocation) {
    if (searchLocation) {
      const performers = await getPerformersListByLocation(searchLocation);
      if (performers != null) {
        setPerformers(Object.values(performers));
      } else {
        setPerformers(performers);
      }
    }
  }

  async function profileType() {
    const localId = await AsyncStorage.getItem("localId");
    if (!authCTX.isAuthenticated) {
      authCTX.logout();
    } else {
      const profiletype = await getProfileInfo(localId);
      await AsyncStorage.setItem("profileType", profiletype.profileType);
    }
    getPerformers();
  }
  const [filterModal, setFilterModal] = useState(false);
  const [searchFor, setSearchFor] = useState("Performer");

  useEffect(() => {
    if (location.label == "All Locations") {
      if (searchFor == "Performer") {
        getPerformers();
      }
      if (searchFor == "Venue") {
        getVenues();
      }
    } else {
      if (searchFor == "Performer") {
        getPerformersByLocation(location.label);
      }
      if (searchFor == "Venue") {
        getVenuesByLocation(location.label);
      }
    }
  }, [searchFor, location]);

  useEffect(() => {
    if (location.label == "All Locations" || location.label == undefined) {
      if (performerCategory == "All Categories")
        setText(performerCategory + " in All Locations");
      else setText(performerCategory + "s in All Locations");
    } else {
      if (performerCategory == "All Categories")
        setText(performerCategory + " in " + location.label);
      else setText(performerCategory + "s in " + location.label);
    }
  }, [searchFor, location, performerCategory]);

  useEffect(() => {
    setAuth(false);
    profileType();
    setAuth(true);
  }, [authCTX.isAuthenticated]);

  const [searchValue, setSearchValue] = useState("");
  const [showSearchList, setShowSearchList] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      {auth ? (
        <View>
          {showSearchList ? (
            <TouchableOpacity
              onPress={() => {
                setShowSearchList(false);
                Keyboard.dismiss();
              }}
            >
              <Text
                style={{
                  paddingHorizontal: 16,
                  paddingBottom: 5,
                  fontFamily: "Rubik-Medium",
                  fontSize: 18,
                  color: global.color.secondaryColors.main,
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={{ marginHorizontal: "5%", paddingBottom: 5 }}>
              <Text style={styles.titleText}>{text}</Text>
            </View>
          )}
          <View style={styles.topContainer}>
            <SearchBar
              autoCorrect={false}
              onFocus={() => {
                setShowSearchList(true);
              }}
              onBlur={() => {
                // setShowSearchList(false);
              }}
              onChangeText={setSearchValue}
              value={searchValue}
              containerStyle={{
                width: !showSearchList ? "80%" : "93%",
                marginLeft: "3%",
                padding: 0,
                borderBottomWidth: 0,
                borderTopWidth: 0,
                backgroundColor: global.color.secondaryColors.background,
              }}
              inputContainerStyle={{
                backgroundColor: global.color.secondaryColors.adjacent,
                borderColor: "blue",
                borderRadius: 12,
              }}
              inputStyle={{
                fontSize: 16,
                color: global.color.secondaryColors.text,
                fontFamily: "Rubik-Regular",
              }}
              placeholder={"Search " + searchFor + "s"}
            />
            {!showSearchList &&
            <TouchableOpacity
              style={{
                borderTopRightRadius: 12,
                borderBottomRightRadius: 12,
                // backgroundColor: global.color.secondaryColors.adjacent,
                width: "15%",
                justifyContent: "center",
              }}
              onPress={() => {
                setFilterModal(!filterModal);
              }}
            >
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="ios-filter-outline"
                  size={24}
                  color={global.color.primaryColors.main}
                />
              </View>
            </TouchableOpacity>
            }
          </View>
          {showSearchList && (
            <SearchProfileList
              data={data}
              searchValue={searchValue}
              props={props}
              setShowSearchList={setShowSearchList}
            />
          )}
          <PerformerList
            venues={performers}
            category={performerCategory}
            props={props}
            getPerformers={getPerformers}
            location={location}
          />
        </View>
      ) : (
        <View style={{ height: "100%", justifyContent: "center" }}>
          <ActivityIndicator size={"large"} />
        </View>
      )}
      <FilterModal
        visible={filterModal}
        setVisible={setFilterModal}
        setSearchFor={setSearchFor}
        setCategory={setPerformerCategory}
        setLocation={setLocation}
        location={location}
      />
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
  titleText: {
    fontFamily: "Rubik-Regular",
    fontSize: 18,
  },
  topContainer: {
    width: "100%",
    flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "center",
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
