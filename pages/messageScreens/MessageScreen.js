import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import MessageList from "../../components/MessageList";
import global from "../../styles/global";
import { Dropdown } from "react-native-element-dropdown";

const MessageScreen = (props) => {
  const data = [
    { label: "Pizza Planet", value: "1" },
    { label: "Pizza Planet", value: "2" },
    { label: "Pizza Planet", value: "3" },
    { label: "Pizza Planet", value: "4" },
    { label: "Pizza Planet", value: "5" },
    { label: "Pizza Planet", value: "6" },
    { label:"Pizza Planet", value: "7" },
  ];

  const messageData = true;
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const renderItem = (item) => {
    return (
      <View style={styles.item} key={item.value}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {!messageData ? (
        <View style={styles.errorContainer}>
          <MaterialIcons name="error-outline" size={80} color="#9E9E9E" />
          <Text style={styles.errorText}>No messages available</Text>
        </View>
      ) : (
        <View>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>All Messages</Text>
            <Dropdown
              statusBarIsTranslucent={true}
              style={[styles.dropdown, isFocus && { borderColor: "black" }]}
              placeholderStyle={[
                styles.placeholderStyle,
                isFocus && { color: "black" },
              ]}
              activeColor={global.color.primaryColors.adjacent}
              selectedTextStyle={[
                styles.selectedTextStyle,
                isFocus && { color: "black" },
              ]}
              renderItem={renderItem}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              renderLeftIcon={() => {
                return (
                  <Ionicons
                    name="search"
                    size={22}
                    color={
                      isFocus
                        ? "black"
                        : global.color.primaryColors.buttonAccent
                    }
                  />
                );
              }}
              renderRightIcon={() => {
                return <View></View>;
              }}
              autoScroll={false}
              data={data}
              search
              fontFamily="Rubik-Regular"
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={"Search"}
              searchPlaceholder="Search..."
              value={value}
              containerStyle={styles.dropContainer}
              // backgroundColor={"rgb"}
              // onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setValue(item.value);
                setIsFocus(false);
              }}
            />
          </View>
          <MessageList />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontFamily: "Rubik-Regular",
    color: global.color.primaryColors.text,
    marginBottom: 10
  },
  headerContainer: {
    alignItems: "center",
    padding: 10,
    paddingTop: 0,
    borderBottomWidth: 1,
    width: "100%",
    borderColor: global.color.primaryColors.adjacent,
  },
  errorContainer: {
    alignItems: "center",
    marginTop: "50%",
  },
  container: {
    backgroundColor: global.color.primaryColors.background,
    height: "100%",
  },
  errorText: {
    fontFamily: "Rubik-Regular",
    fontSize: 20,
    color: "#9E9E9E",
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
    height: 40,
    width: "90%",
    // borderColor: global.color.primaryColors.buttonAccent,
    // borderWidth: 1,
    backgroundColor:global.color.primaryColors.adjacent,
    borderRadius: 12,
    padding: 8,
  },
  placeholderStyle: {
    fontSize: 16,
    color: global.color.primaryColors.buttonAccent,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: global.color.primaryColors.buttonAccent,
  },
  inputSearchStyle: {
    fontSize: 16,
    color: global.color.primaryColors.text,
    backgroundColor: global.color.primaryColors.adjacent,
    borderColor: global.color.primaryColors.adjacent,
  },
  dropContainer: {
    backgroundColor: global.color.primaryColors.adjacent,
    borderColor: global.color.primaryColors.adjacent,
    borderRadius: 12,
    paddingBottom: 10,
  },
});

export default MessageScreen;
