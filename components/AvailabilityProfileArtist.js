import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
const AvailabilityProfileArtist = () => {
  return (
    <View style={styles.container}>
      <View style={styles.singleContainer}>
        <View style={styles.headerContainer}>
          <Ionicons name="time-outline" size={24} color="#757575" />
          <Text style={styles.headerText}>Preferred Time</Text>
        </View>
        <View style={[styles.boxContainer, styles.timeContainer]}>
          <Text style={styles.bigText}>Evening</Text>
          <Text style={[styles.bigText, { color: "#757575" }]}>
            10 PM - 1 AM
          </Text>
        </View>
      </View>
      <View style={styles.singleContainer}>
        <View style={styles.headerContainer}>
          <FontAwesome5 name="calendar" size={22} color="#757575" />
          <Text style={styles.headerText}>Preferred Days</Text>
        </View>
        <View style={styles.boxContainer}>
          <Text style={styles.bigText}>Tuesdays</Text>
          <Text style={[styles.bigText, { marginTop: "5%" }]}>Thursdays</Text>
          <Text style={[styles.bigText, { marginVertical: "5%" }]}>
            Saturdays
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  singleContainer: {
    marginTop: "8%",
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
  },
  boxContainer: {
    borderTopWidth: 0,
    borderWidth: 1,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    padding: "5%",
    borderColor: "#2A51DB",
  },
  container: {
    flex: 1,
    marginHorizontal: "8%",
  },
  headerText: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    color: "#757575",
    marginLeft: "2%",
  },
  bigText: {
    fontFamily: "Rubik-SemiBold",
    fontSize: 20,
    // color: "#2A51DB",
  },
});
export default AvailabilityProfileArtist;
