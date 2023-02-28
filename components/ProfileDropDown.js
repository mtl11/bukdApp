import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import global from "../styles/global";

const ProfileDropDown = (props) => {
  const [isFocus, setIsFocus] = useState(false);
  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };
  return (
    <View style={styles.topContainer}>
      <Dropdown
        statusBarIsTranslucent={true}
        style={[
          styles.dropdown,
          isFocus && { borderColor: "black" },
          { marginTop: props.margin },
        ]}
        placeholderStyle={[
          styles.placeholderStyle,
          props.value && { color: "white" },
        ]}
        activeColor={global.color.primaryColors.adjacent}
        selectedTextStyle={[
          styles.selectedTextStyle,
          isFocus && { color: "black" },
        ]}
        renderItem={renderItem}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        renderRightIcon={() => {
          return (
            <View></View>
          );
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
        value={props.value}
        containerStyle={styles.dropContainer}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          props.setValue(item.label);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 10,
  },
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
  dropdown: {
    width: "84%",
    paddingHorizontal: "5%",
    paddingVertical: "2.5%",
    marginHorizontal: "5%",
    borderColor: global.color.primaryColors.buttonAccent,
    borderRadius: 12,
    marginHorizontal: "8%",
    backgroundColor: global.color.primaryColors.adjacent,
  },

  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: global.color.primaryColors.main,
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

export default ProfileDropDown;
