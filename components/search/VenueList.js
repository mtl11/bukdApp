import React, { memo, useCallback, useContext, useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import global from "../../styles/global";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../store/authContext";

const VenueList = (props) => {
  const authCTX = useContext(AuthContext);
  async function check(uuid) {
    const localId = await AsyncStorage.getItem("localId");
    console.log(localId);
    if (uuid == localId) {
      props.props.navigation.navigate("ProfileScreen", { search: true });
    } else {
      AsyncStorage.setItem("searchID", uuid);
      props.props.navigation.navigate("SearchArtistProfile");
    }
  }

  const renderItem = useCallback(({ item }) => {
    return (
      <TouchableOpacity
        style={styles.individualContainer}
        onPress={() => {
          check(item.uuid)
        }
        }
      >
        <ImageBackground
          source={{ uri: item.profilePicURL }}
          style={styles.imageContainer}
          imageStyle={{ borderRadius: 10 }}
          defaultSource={{ source: require("../../assets/loadingImage.png") }}
        >
          <View style={[styles.textContainer, item.profilePicURL == null && { backgroundColor: "rgba(0,0,0,0)", }]}>
            <View style={{
              height: "30%",
              backgroundColor: "rgba(255, 255, 255, .9)",
              borderBottomRightRadius: 10, borderBottomLeftRadius: 10, justifyContent: "center",
            }}>
              <Text style={styles.bigText}>{item.name}</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    )
  }, []);
  const getFlatListData = () => {
    if (props.venues != null) {
      return (props.venues.filter(venue =>
        venue.category == props.category
        || props.category == "All Categories"
        || props.category == null));
    }
  }
  return (
    <View>
      <FlatList
        maxToRenderPerBatch={8}
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
              {props.venues == undefined ? "Please Select a Location" : "No Results"}
            </Text>
          </View>
        }
        // ListHeaderComponent={props.venues && <View style={{ marginBottom: "5%", marginHorizontal: "2.5%" }}>
        //   <Text style={{ fontSize: 18, fontFamily: "Rubik-Medium" }}>
        //     New Venues To Bukd
        //   </Text>
        // </View>}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        numColumns={2}
        style={styles.list}
        data={getFlatListData()}
        renderItem={renderItem}
        contentContainerStyle={{ justifyContent: "space-evenly" }}
      />
    </View>
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
    marginBottom: "65%",
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
