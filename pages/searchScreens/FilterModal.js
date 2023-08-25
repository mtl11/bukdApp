import React, { useState, useContext, useEffect } from "react";
import {
  Modal,
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import SearchDropDown from "../../components/search/SearchDropDown";
import global from "../../styles/global";
import CategorySelector from "../../components/search/CategorySelector";
import PerformerCategorySelector from "../../components/search/PerformerCategorySelector";
import {
  locations,
  profileCategoriesVenue,
  profileCategoriesArtist,
  locationsDropDown,
} from "../../models/dropdownData";
import { color } from "react-native-elements/dist/helpers";

const FilterModal = (props) => {
  const [selectedExp, setSelectedExp] = useState("Performer");
  async function saveChanges() {
    props.setSearchFor(selectedExp);
    props.setVisible(false);
    props.setLocation(location);
    if (selectedExp == "Performer") {
      props.setCategory(performerCategory);
    } else {
      props.setCategory(venueCategory);
    }
  }
  const [performerCategory, setPerformerCategory] = useState("All Categories");
  const [venueCategory, setVenueCategory] = useState("All Categories");
  const [location, setLocation] = useState(props.location);

  return (
    <Modal visible={props.visible}>
      <SafeAreaView
        style={{
          backgroundColor: global.color.secondaryColors.background,
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              style={{ marginHorizontal: 16 }}
              onPress={() => {
                props.setVisible(false);
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Rubik-Medium",
                  color: global.color.secondaryColors.main,
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingVertical: "2.5%" }}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                fontFamily: "Rubik-Regular",
              }}
            >
              Filter your search
            </Text>
          </View>
          <View style={styles.performervenueHeader}>
            <TouchableOpacity
              style={[
                styles.buttonContainer,
                selectedExp == "Performer" && {
                  backgroundColor: global.color.primaryColors.main,
                },
              ]}
              onPress={() => {
                setSelectedExp("Performer");
              }}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedExp == "Performer" && { color: "white" },
                ]}
              >
                Performers
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.buttonContainer,
                selectedExp == "Venue" && {
                  backgroundColor: global.color.primaryColors.main,
                },
              ]}
              onPress={() => {
                // props.setSearchFor("Venue");
                setSelectedExp("Venue");
              }}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedExp == "Venue" && { color: "white" },
                ]}
              >
                Venues
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "90%",
              alignSelf: "center",
              borderWidth: 1,
              borderColor: global.color.secondaryColors.adjacent,
              marginVertical: "3.5%",
            }}
          ></View>
          <View style={{ alignItems: "center" }}>
            <SearchDropDown
              location={location}
              setValue={setLocation}
              placeholder={"Choose a Location"}
              data={locationsDropDown}
              icon={"ios-location-outline"}
            />
          </View>
          <View
            style={{
              width: "90%",
              alignSelf: "center",
              borderWidth: 1,
              borderColor: global.color.secondaryColors.adjacent,
              marginVertical: "2.5%",
            }}
          ></View>
          <View>
            {selectedExp == "Performer" ? (
              <PerformerCategorySelector
                data={profileCategoriesArtist}
                setValue={setPerformerCategory}
                value={performerCategory}
              />
            ) : (
              <CategorySelector
                data={profileCategoriesVenue}
                setValue={setVenueCategory}
                value={venueCategory}
              />
            )}
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={{
              alignItems: "center",
              padding: 12,
              marginHorizontal: "8%",
              backgroundColor: global.color.secondaryColors.main,
              borderRadius: 12,
            }}
            onPress={saveChanges}
          >
            <Text
              style={{
                fontFamily: "Rubik-Medium",
                color: "white",
                fontSize: 18,
              }}
            >
              Apply Filters
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  performervenueHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  buttonContainer: {
    marginLeft: 20,
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
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Rubik-Regular",
    padding: 10,
  },
});

export default FilterModal;
