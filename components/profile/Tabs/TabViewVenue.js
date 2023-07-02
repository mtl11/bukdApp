import React, { useContext, useEffect, useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Linking,
    Modal,
    useWindowDimensions,
    Animated,
    StatusBar
} from "react-native";
import { TabView, SceneMap } from 'react-native-tab-view';
import styles from "../../../styles/profile/light/profileScreen";
import global from "../../../styles/global";
import HighlightsTab from "../Highlights";
import AvailabilityProfileArtist from "../AvailabilityProfileArtist";
import SocialTab from "../SocialProfileTabArtist";
import ShowsTab from "../ShowsTab";
const TabViewVenue = (props) => {
    const FirstRoute = () => (
        <View style={{ paddingBottom: 800 }}>
            <ShowsTab props={props} />

        </View>

    );

    const SecondRoute = () => (
        <View >
            <SocialTab props={props} />
        </View>
    );


    const [index, setIndex] = React.useState(0);
    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });
    const routes = [
        { key: 'first', title: 'Shows' },
        { key: 'second', title: 'Social' },
    ];

    const layout = useWindowDimensions();

    const renderTabBar = (props) => {
        const inputRange = props.navigationState.routes.map((x, i) => i);
        return (
            <View style={{
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderColor: global.color.secondaryColors.adjacent,
            }}>
                {props.navigationState.routes.map((route, i) => {
                    const opacity = props.position.interpolate({
                        inputRange,
                        outputRange: inputRange.map((inputIndex) =>
                            inputIndex === i ? 1 : 0.5
                        ),
                    });

                    return (
                        <TouchableOpacity
                            key={i}
                            style={{
                                flex: 1,
                                alignItems: 'center',
                            }}
                            onPress={() => { setIndex(i) }}
                        >
                            <View style={[styles.tabTextContainer]}>
                                <Animated.Text style={[styles.tabText, { opacity }]}>{route.title}</Animated.Text>
                            </View>
                            {index == i && <View style={[styles.tabBottomBar, { width: "90%" }]}></View>}
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    }
    return (
        <View style={{ height: "100%" }}>
            <TabView
                renderTabBar={renderTabBar}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: "10%" }}
            />
        </View>
    )
}

export default TabViewVenue;