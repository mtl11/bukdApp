import React, { useState } from "react";
import {
  View,
  Modal,
  Text,
  SafeAreaView,
  Touchable,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AvailabilityProfileArtist = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="ios-location-outline" size={28} color="black" />
        <Text style={styles.smallText}>Tucson, AZ</Text>
      </View>
      <View style={styles.iconContainer}>
        <Ionicons name="ios-time-outline" size={28} color="black" />
        <Text style={styles.smallText}>Evening - 10pm - 1am</Text>
      </View>
      <View style={styles.iconContainer}>
        <View style={[styles.doaContainer,{borderLeftWidth:1}]}>
          <Text style={styles.smallText}>Sun</Text>
        </View>
        <View style={styles.doaContainer}>
          <Text style={styles.smallText}>Mon</Text>
        </View>
        <View style={[styles.doaContainer,{backgroundColor:"#51db2a"}]}>
          <Text style={styles.smallText}>Tue</Text>
        </View>
        <View style={styles.doaContainer}>
          <Text style={styles.smallText}>Wed</Text>
        </View>
        <View style={[styles.doaContainer,{backgroundColor:"#51db2a"}]}>
          <Text style={styles.smallText}>Thu</Text>
        </View>
        <View style={styles.doaContainer}>
          <Text style={styles.smallText}>Fri</Text>
        </View>
        <View style={[styles.doaContainer,{backgroundColor:"#51db2a"}]}>
          <Text style={styles.smallText}>Sat</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  doaContainer: {
    borderWidth: 1,
    borderLeftWidth: 0,
    padding: 5.5,
  },
  container: {
    flex: 1,
    justifyContent: "space-around",
    marginHorizontal: 30,
  },
  smallText: {
    fontFamily: "Rubik-Regular",
    fontSize: 20,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
export default AvailabilityProfileArtist;
