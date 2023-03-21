import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import global from "../styles/global";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getProfilePic } from "../util/profile";

const VenueList = (props) => {
  const renderItem = ({ item }) => {
    let image = "https://firebasestorage.googleapis.com/v0/b/bukd-app.appspot.com/o/VSQdC6fc1QWp4OqrjuD4lOn5lFi2-profile-pic?alt=media&token=044ae5fe-d19d-47c6-8b86-5b14044b697d";
    async function getPPic(uuid) {
      const pp = await getProfilePic(uuid);
      image = pp;
      return pp;
    }
    if (item != null) {
      if (
        item.category == props.category ||
        props.category == null ||
        props.category == "All Categories"
      ) {
        getPPic(item.uuid).then((x) => {
          let image = x;
        });
        console.log(image);
        return (
          <TouchableOpacity
            style={styles.individualContainer}
            onPress={() => {
              AsyncStorage.setItem("searchID", item.uuid);
              props.props.navigation.navigate("SearchArtistProfile");
            }}
          >
            <ImageBackground
              source={{ uri: image }}
              // source={{uri: "https://firebasestorage.googleapis.com/v0/b/bukd-app.appspot.com/o/VSQdC6fc1QWp4OqrjuD4lOn5lFi2-profile-pic?alt=media&token=044ae5fe-d19d-47c6-8b86-5b14044b697d"}}
              style={styles.imageContainer}
              imageStyle={{ borderRadius: 10 }}
            >
              <View style={styles.textContainer}>
                <Text style={styles.bigText}>{item.name}</Text>
                <Text style={styles.smallText}>{item.category}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        );
      }
    }
  };
  return (
    <View>
      {props.venues ? (
        <FlatList
          columnWrapperStyle={{ justifyContent: "space-between" }}
          numColumns={2}
          style={styles.list}
          data={props.venues}
          renderItem={renderItem}
        />
      ) : (
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: "rgba(0,0,0,0.6)",
    height: "100%",
    borderRadius: 12,
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
    flex: 1,
    justifyContent: "center",
    borderRadius: 12,
  },
  smallText: {
    alignSelf: "center",
    //   padding: 10,
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    color: "white",
  },
  // rowContainer: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  // },
  list: {
    marginHorizontal: "8%",
    marginTop: 10,
    
    // height: "100%",
  },
  individualContainer: {
    // flex:1,
    width: 160,
    height: 160,
    // width: "40%",
    // height: "100%",
    borderRadius: 12,
    marginBottom: "8%",
  },
});
export default VenueList;
