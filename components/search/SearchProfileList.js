import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Keyboard
} from "react-native";
import global from "../../styles/global";

import AsyncStorage from "@react-native-async-storage/async-storage";
const SearchProfileList = (props) => {
    
  async function check(uuid) {
    const localId = await AsyncStorage.getItem("localId");
    if (uuid == localId) {
      props.props.navigation.navigate("ProfileScreen", { search: true });
    } else {
      AsyncStorage.setItem("searchID", uuid);
      props.props.navigation.navigate("SearchArtistProfile");
    }
   
  }
  const renderItem = (index) => {
    const item = index.item;
    return (
      <View>
        <TouchableOpacity
          style={{ padding: 12, flexDirection: "row", alignItems: "center" }}
            onPress={()=>{
                Keyboard.dismiss();
                check(item.uuid);
            }}
        >
          <Image
            source={{ uri: item.profilePicURL }}
            style={{
              width: 35,
              height: 35,
              backgroundColor: global.color.secondaryColors.adjacent,
              borderRadius: 100,
            }}
          />
          <Text
            style={{
              fontFamily: "Rubik-Regular",
              fontSize: 16,
              paddingHorizontal: 8,
            }}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  function getData() {
    if (Array.isArray(props.data)) {
      const data = props.data.filter((word) =>
        word.name
          .toLowerCase()
          .replace(/\s/g, "")
          .includes(props.searchValue.toLowerCase().replace(/\s/g, ""))
      );
      return data;
    } else {
    }
  }

  return (
    <View style={{ height: "55%" }}>
      <FlatList data={getData()} renderItem={renderItem} />
    </View>
  );
};

export default SearchProfileList;
