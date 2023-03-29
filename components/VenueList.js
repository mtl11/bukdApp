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
import global from "../styles/global";
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
          <View style={[styles.textContainer, item.profilePicURL == null && { backgroundColor: "rgba(0,0,0,0)", }]}>
            <Text style={styles.bigText}>{item.name}</Text>
            <Text style={styles.smallText}>{item.category}</Text>
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
            No venues in this location.
          </Text>
        </View>
      }
      columnWrapperStyle={{ justifyContent: "space-between" }}
      numColumns={2}
      style={styles.list}
      data={getFlatListData()}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: "rgba(0,0,0,0.6)",
    height: "100%",
    borderRadius: 10,
    justifyContent: "center",
  },
  bigText: {
    alignSelf: "center",
    padding: 10,
    fontFamily: "Rubik-SemiBold",
    fontSize: 18,
    color: "white",
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
    marginHorizontal: "8%",
    marginTop: 10,
    marginBottom: 120
  },
  individualContainer: {
    width: 160,
    height: 160,
    borderRadius: 12,
    marginBottom: "8%",
  },
});
export default VenueList;
