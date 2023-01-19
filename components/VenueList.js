import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
const image = { uri: "https://reactjs.org/logo-og.png" };

const VenueList = (props) => {
  return (
    <ScrollView
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.rowContainer}>
        <TouchableOpacity style={styles.individualContainer}>
          <ImageBackground
            source={image}
            style={styles.imageContainer}
            imageStyle={{ borderRadius: 10 }}
          >
            <View style={styles.textContainer}>
              <Text style={styles.bigText}>Gentle Bens</Text>
              <Text style={styles.smallText}>Resturant</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={styles.individualContainer}
            onPress={()=>{props.props.navigation.navigate("SearchArtistProfile")}}
        >
          <ImageBackground
            source={image}
            style={styles.imageContainer}
            imageStyle={{ borderRadius: 10 }}
          >
            <View style={styles.textContainer}>
              <Text style={styles.bigText}>No Anchovies</Text>
              <Text style={styles.smallText}>Resturant</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  list: {
    height: "100%",
    marginHorizontal: "5%",
    marginTop: 10,
  },
  individualContainer: {
    // flex:1,
    width: 160,
    height: 160,
    // width: "40%",
    // height: "100%",
    borderRadius: 12,
  },
});
export default VenueList;
