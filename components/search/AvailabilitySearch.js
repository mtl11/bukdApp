import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import global from "../../styles/global";

const AvailabilitySearch = (props) => {
  // const getTime = (time) => {
  //   if (time == "after") {
  //     return "10 PM - 1 AM";
  //   }
  //   if (time == "morn") {
  //     return "11 PM - 1 PM";
  //   }
  //   if (time == "evening") {
  //     return "6 PM - 5 PM";
  //   }
  //   if (time == "night") {
  //     return "1 PM - 9 PM";
  //   }
  // };

  const getHour = (time) => {
    if (time == "after") {
      return "Afternoon";
    }
    if (time == "morn") {
      return "Morning";
    }
    if (time == "evening") {
      return "Evening";
    }
    if (time == "night") {
      return "Night";
    }
  };

  const getDow = (time) => {
    if (time == "mon") {
      return "Monday";
    }
    if (time == "tue") {
      return "Tuesday";
    }
    if (time == "wed") {
      return "Wednesday";
    }
    if (time == "thu") {
      return "Thursday";
    }
    if (time == "fri") {
      return "Friday";
    }
    if (time == "sat") {
      return "Saturday";
    }
    if (time == "sun") {
      return "Sunday";
    }
  };

  const time = () => {
    const array = [];
    if (props.availability != null) {
      for (const x in props.availability.times) {
        const item = (
          <View key={x} style={styles.timeContainer}>
            <Text style={styles.bigText}>{getHour(x)}</Text>
            {/* <Text
              style={[styles.bigText, { color: global.color.primaryColors.text }]}
            >
              {getTime(x)}
            </Text> */}
          </View>
        );
        array.push(item);
      }
    }
    if (array.length == 0) {
      return (
        <View key={0} style={styles.timeContainer}>
          <Text style={styles.bigText}>No Preferred Times</Text>
        </View>
      );
    }
    return array;
  };

  const dow = () => {
    const array = [];
    if (props.availability != null) {
      for (const x in props.availability.dow) {
        const item = (
          <View key={x}>
            <Text style={[styles.bigText, { marginTop: "5%" }]}>{getDow(x)}</Text>
          </View>
        );
        array.push(item);
      }
    }
    if (array.length == 0) {
      return (
        <View key={0} style={styles.timeContainer}>
          <Text style={styles.bigText}>No Preferred Days</Text>
        </View>
      );
    }
    return array;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
       <View style={styles.singleContainer}>
        <View style={styles.headerContainer}>
          <Ionicons
            name="ios-calendar-outline"
            size={24}
            color={"black"}
          />
          <Text style={styles.headerText}>Preferred Days</Text>
        </View>
        <View style={styles.boxContainer}>{dow()}</View>
      </View>
      <View style={[styles.singleContainer, { marginBottom: "8%" }]}>
        <View style={styles.headerContainer}>
          <Ionicons
            name="ios-alarm-outline"
            size={24}
            color={"black"}
          />
          <Text style={styles.headerText}>Preferred Time</Text>
        </View>
        <View style={styles.boxContainer}>{time()}</View>
      </View>
     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerTextColor: "black",
  singleContainer: {
    marginTop: "8%",
    backgroundColor: "white",
    // borderWidth:1,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    marginHorizontal: "8%",
    
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: "1%",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "5%",
  },
  boxContainer: {
    // // borderTopWidth: 0,
    // borderWidth: 1,
    // borderRadius: 12,
    paddingHorizontal: "5%",
    paddingBottom: "5%",
    borderColor: global.color.secondaryColors.adjacent,
    alignItems: "center",
  },
  container: {
    // marginHorizontal: "8%",
    marginBottom: 120
    // flex:1
  },
  headerText: {
    fontFamily: "Rubik-Medium",
    fontSize: 16,
    color: global.color.secondaryColors.text,
    marginLeft: 10,
  },
  bigText: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    color: global.color.secondaryColors.text,
  }});
export default AvailabilitySearch;
