import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import global from "../../styles/global";
import light from "../../styles/profile/light/profileDropdown";
import dark from "../../styles/profile/dark/profileDropdown";
import {AuthContext} from "../../store/authContext";
const ProfileDropDown = (props) => {
  const authCTX = useContext(AuthContext);
  const styles = authCTX.mode === "light" ? light : dark;
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
          props.value && { color: styles.textColor },
        ]}
        activeColor={styles.activeColor}
        selectedTextStyle={[
          styles.selectedTextStyle,
          isFocus && { color: "black" },
        ]}
        renderItem={renderItem}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        // renderRightIcon={() => {
        //   // return (
        //   //   <View></View>
        //   // );
        // }}
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

export default ProfileDropDown;
