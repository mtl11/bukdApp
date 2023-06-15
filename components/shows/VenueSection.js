import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity} from "react-native";
import global from "../../styles/global";
import MyShowsListVenue from "./MyShowsListVenue";
import PostShowModal from "./PostShowModal";

const VenueSection = (props) => {
    const [visible, setVisible] = useState(false); 
     return (
        <View>
            <TouchableOpacity
                style={{
                    alignItems: "center",
                    padding: 16,
                    marginHorizontal: "8%",
                    backgroundColor: global.color.secondaryColors.main,
                    borderRadius: 12,
                }}
                onPress={() => {
                    setVisible(!visible)
                }}
            >
                <Text style={{
                    fontFamily: "Rubik-Medium",
                    color: "white",
                    fontSize: 18,
                }}>
                    Post a show
                </Text>
            </TouchableOpacity>
            <View
                style={{
                    flexDirection: "row",
                    marginHorizontal: "5%",
                    marginVertical: "2.5%",
                }}
            >
                <Text style={styles.headerText}>My Shows</Text>
            </View>

            <MyShowsListVenue props={props.props} refreshData={props.refreshData}/>
            <PostShowModal visible={visible} setVisible={setVisible} username={props.username} userLocation ={props.userLocation}/>
        </View>
    )
}
const styles = StyleSheet.create({

    tabView: {
        borderBottomWidth: 1,
        marginTop: 10,
        alignItems: "center",
        borderColor: global.color.secondaryColors.adjacent,
    },
    tabTextContainer: {
        paddingHorizontal: 15,
        borderRadius: 10,
        paddingBottom: 10,
    },
    tabContainer: {
        width: "50%",
        alignItems: "center",
    },
    tabBottomBar: {
        borderWidth: 2.5,
        borderRadius: 12,
        borderColor: global.color.secondaryColors.main,
        backgroundColor: global.color.secondaryColors.main,
    },
    headerText: {
        fontFamily: "Rubik-SemiBold",
        fontSize: 20,
    },
})

export default VenueSection;