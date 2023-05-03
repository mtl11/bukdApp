import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import global from "../../styles/global";
import AsyncStorage from "@react-native-async-storage/async-storage";

const VenueList = (props) => {
  console.log(props.venues)
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.individualContainer}
        onPress={() => {
          AsyncStorage.setItem("searchID", item.uuid);
          props.props.navigation.navigate("SearchArtistProfile");
        }}
      >
        <ImageBackground
          source={{ uri: item.profilePicURL }}
          style={styles.imageContainer}
          imageStyle={{ borderRadius: 10 }}
        >
          {/* "rgba(34, 109, 206, .7)" */}
          <View style={[styles.textContainer, item.profilePicURL == null && { backgroundColor: "rgba(0,0,0,0)", }]}>
            <View style={{
              height: "30%",
              backgroundColor: "rgba(255, 255, 255, .6)",
              borderBottomRightRadius: 10, borderBottomLeftRadius: 10, justifyContent: "center",
              // borderWidth:1,
              // borderColor: "rgba(256, 256, 256, .7)"
            }}>
              <Text style={styles.bigText}>{item.name}</Text>
            </View>

            {/* <Text style={styles.smallText}>{item.category}</Text> */}
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  const getFlatListData = () => {
    if (props.venues != null) {
      return (props.venues.filter(venue =>
        venue.category == props.category
        || props.category == "All Categories"
        || props.category == null));
    }
  }
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <View style={{ alignItems: "center", marginTop: "40%" }}>
          <Ionicons
            name={"ios-search"}
            size={80}
            color={global.color.primaryColors.adjacent}
          />
          <Text
            style={[
              styles.bigText,
              { color: global.color.primaryColors.adjacent },
            ]}
          >
            No Results
          </Text>
        </View>
      }
      columnWrapperStyle={{ justifyContent: "space-between" }}
      numColumns={2}
      style={styles.list}
      data={getFlatListData()}
      renderItem={renderItem}
      contentContainerStyle={{ justifyContent: "space-evenly" }}
    />
  );
};

const styles = StyleSheet.create({
  textContainer: {
    // backgroundColor: "rgba(0,0,0,0.6)",
    height: "100%",
    borderRadius: 10,
    justifyContent: "flex-end",
    textAlign: "center"
  },
  bigText: {
    // alignSelf: "center",
    paddingHorizontal: 10,
    // justifyContent:"center",
    textAlign: "center",
    fontFamily: "Rubik-SemiBold",
    fontSize: 16,
    color: "black",
  },
  imageContainer: {
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: global.color.primaryColors.adjacent
  },
  smallText: {
    alignSelf: "center",
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    color: "white",
  },
  list: {
    marginHorizontal: "2.5%",
    marginTop: 10,
    marginBottom: 120,
    // height:"100%",
    // flexDirection: "row", 

  },
  individualContainer: {
    width: 165,
    height: 165,
    borderRadius: 13,
    marginBottom: "8%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    marginHorizontal: "2.5%"
  },
});
export default VenueList;
