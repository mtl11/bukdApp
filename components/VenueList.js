import React from "react";
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

const image = { uri: "https://reactjs.org/logo-og.png" };

const VenueList = (props) => {
  console.log(props.category);
  const renderItem = ({ item }) => {
    if (item != null) {
      if (item.category == props.category || props.category == null || props.category == "All Categories") {
        return (
          <TouchableOpacity style={styles.individualContainer}>
            <ImageBackground
              source={image}
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
          numColumns={3}
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

    // <ScrollView
    //   contentContainerStyle={styles.list}
    //   showsVerticalScrollIndicator={false}
    // >
    //  <View style={styles.rowContainer}>
    //   <TouchableOpacity style={styles.individualContainer}>
    //     <ImageBackground
    //       source={image}
    //       style={styles.imageContainer}
    //       imageStyle={{ borderRadius: 10 }}
    //     >
    //       <View style={styles.textContainer}>
    //         <Text style={styles.bigText}>Gentle Bens</Text>
    //         <Text style={styles.smallText}>Resturant</Text>
    //       </View>
    //     </ImageBackground>
    //   </TouchableOpacity>
    //   <TouchableOpacity style={styles.individualContainer}
    //       onPress={()=>{props.props.navigation.navigate("SearchArtistProfile")}}
    //   >
    //     <ImageBackground
    //       source={image}
    //       style={styles.imageContainer}
    //       imageStyle={{ borderRadius: 10 }}
    //     >
    //       <View style={styles.textContainer}>
    //         <Text style={styles.bigText}>No Anchovies</Text>
    //         <Text style={styles.smallText}>Resturant</Text>
    //       </View>
    //     </ImageBackground>
    //   </TouchableOpacity>
    // </View>
    // </ScrollView>*/}
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
    height: "100%",
    flexDirection: "column",
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
