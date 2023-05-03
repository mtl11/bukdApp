import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import global from "../../styles/global";
import { AuthContext } from "../../store/authContext.js";
import { ProfileContext } from "../../store/profileContext.js";
import dark from "../../styles/profile/dark/availabilityTab";
import light from "../../styles/profile/light/availabilityTab";

const AvailabilityProfileArtist = () => {
  const authCTX = useContext(AuthContext);
  const styles = authCTX.mode === "light" ? light : dark;

  const profileCTX = useContext(ProfileContext);
  const getTime = (time) => {
    if (time == "after") {
      return "12 PM - 5 PM";
    }
    if (time == "morn") {
      return "8 AM - 12 PM";
    }
    if (time == "evening") {
      return "5 PM - 9 PM";
    }
    if (time == "night") {
      return "9 PM - 2 AM";
    }
  };

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
    for (const x in profileCTX.availabilty.times) {
      const item = (
        <View key={x} style={styles.timeContainer}>
          <Text style={styles.bigText}>{getHour(x)}</Text>
          <Text
            style={[styles.bigText, { color: styles.headerTextColor }]}
          >
            {getTime(x)}
          </Text>
        </View>
      );
      array.push(item);
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
    for (const x in profileCTX.availabilty.dow) {
      const item = (
        <View key={x}>
          <Text style={[styles.bigText, { marginTop: "5%" }]}>{getDow(x)}</Text>
        </View>
      );
      array.push(item);
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
            name="ios-alarm-outline"
            size={24}
            color={global.color.primaryColors.main}
          />
          <Text style={styles.headerText}>Preferred Time</Text>
        </View>
        <View style={styles.boxContainer}>{time()}</View>
      </View>
      <View style={[styles.singleContainer, { marginBottom: "8%" }]}>
        <View style={styles.headerContainer}>
          <Ionicons
            name="ios-calendar-outline"
            size={24}
            color={global.color.primaryColors.main}
          />
          <Text style={styles.headerText}>Preferred Days</Text>
        </View>
        <View style={styles.boxContainer}>{dow()}</View>
      </View>
    </ScrollView>
  );
};

export default AvailabilityProfileArtist;
