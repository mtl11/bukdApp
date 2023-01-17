import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Icon,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import VenueList from "../../components/VenueList";
const SearchScreen = (props) => {
  const [value, setValue] = useState(null);
  const data = [{ label: "Tucson", value: "1" }];
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Ionicons name="ios-location-outline" size={28} color="black" />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          itemTextStyle={styles.itemTextStyle}
          itemContainerStyle={styles.itemContainerStyle}
          iconColor="black"
          data={data}
          labelField="label"
          valueField="value"
          placeholder="Select Location"
          value={value}
          onChange={(item) => {
            setValue(item.value);
          }}
        />
      </View>
      <View>
          <VenueList/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemContainerStyle: {
    borderWidth: 1,
    borderRadius: 10,
  },
  itemTextStyle: {
    fontSize: 20,
  },
  iconStyle: {},
  topContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
  },
  dropdown: {
    paddingVertical: 5,
    paddingHorizontal: 18,
    borderRadius: 12,
    fontSize: 20,
    color: "#FDF6F0",
    width: "80%",
    marginHorizontal: 10,
  },
  placeholderStyle: {
    fontSize: 20,
    fontFamily: "Rubik-Regular",
  },
  selectedTextStyle: {
    fontSize: 20,
    fontFamily: "Rubik-Regular",
    color: "black",
  },
  container: {
    backgroundColor: "#FFFFFF",
    height: "100%",
  },
});
export default SearchScreen;
