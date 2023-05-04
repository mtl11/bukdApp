/* eslint-disable react-native/no-inline-styles */
import React, { useState, useContext, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  ActivityIndicator,
  Text
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

const SearchScreen = (props) => {
  const [location, setLocation] = useState(null);
  const [category, setCategory] = useState(null);
  const [venues, setVenues] = useState(null);
  const [performers, setPerformers] = useState(null);
  const [auth, setAuth] = useState(false);
  const [pt, setPT] = useState(null);

  const authCTX = useContext(AuthContext);

  async function getVenues(location) {
    const venues = await getVenueList(location);
    console.log(venues);
    // setVenues(venues);
    if (venues != null) {
      setVenues(Object.values(venues));
    } else {
      setVenues(venues);
    }
  }

  async function getPerformers(location) {
    const performers = await getPerformersList(location);
    console.log(performers);
    if (performers != null) {
      setPerformers(Object.values(performers));
    } else {
      setPerformers(performers);
    }
  }

  async function profileType() {
    const localId = await AsyncStorage.getItem("localId");
    const email = await AsyncStorage.getItem("localId");
    if (localId == null) {
      authCTX.logout();
    } else {
      console.log(email);
      const profiletype = await getProfileInfo(localId);
      setPT(profiletype.profileType);
    }
  }

  useEffect(() => {
    setAuth(false);
    profileType();
    setAuth(true);
  }, [authCTX.isAuthenticated]);
  console.log(authCTX.isAuthenticated);
  return (
    <SafeAreaView style={styles.container}>
      {auth ? (
        <View>
          <View style={styles.topContainer}>
            {(pt == "venue" || authCTX.isAuthenticated == false) ? (
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
            {pt == "venue" || authCTX.isAuthenticated == false? <CategorySelector data={profileCategoriesArtist} setValue={setCategory}/> :
              <CategorySelector data={profileCategoriesVenue} setValue={setCategory}/>}
          </View>
          {pt == "venue" || authCTX.isAuthenticated == false? (
            <VenueList venues={performers} category={category} props={props} />
          ) : (
            <VenueList venues={venues} category={category} props={props} />
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
});


// const styles = StyleSheet.create({
//   dropContainer: {
//     backgroundColor: global.color.primaryColors.adjacent,
//     borderColor: global.color.primaryColors.adjacent,
//     borderRadius: 12,
//     paddingBottom: 10,
//   },
//   item: {
//     backgroundColor: global.color.primaryColors.adjacent,
//     borderRadius: 12,
//   },
//   textItem: {
//     color: global.color.primaryColors.text,
//     fontSize: 16,
//     padding: 20,
//     fontFamily: "Rubik-Regular",
//   },
//   topContainer: {
//     width: "100%",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   container: {
//     backgroundColor: global.color.secondaryColors.background,
//     // // flex:1
//     height: "100%",
//   },
//   dropdown: {
//     height: 40,
//     width: "84%",
//     backgroundColor: global.color.primaryColors.main,
//     // borderWidth: 1,
//     borderRadius: 12,
//     padding: 10,
//   },
//   icon: {
//     marginRight: 5,
//   },
//   placeholderStyle: {
//     fontSize: 16,
//     color: global.color.primaryColors.buttonAccent,
//   },
//   selectedTextStyle: {
//     fontSize: 16,
//     color: global.color.primaryColors.buttonAccent,
//   },
//   iconStyle: {
//     width: 18,
//     height: 18,
//   },
//   inputSearchStyle: {
//     fontSize: 16,
//     color: global.color.primaryColors.text,
//     backgroundColor: global.color.primaryColors.adjacent,
//     borderColor: global.color.primaryColors.adjacent,
//   },
// });
