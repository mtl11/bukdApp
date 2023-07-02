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
const TabViewPerformer = (props) => {
    const FirstRoute = () => (
        <View style={{ paddingBottom: 780 }}>
            <AvailabilityProfileArtist />
        </View>

    );

    const SecondRoute = () => (
        <View style={{ paddingBottom: 780 }}>
            <HighlightsTab props={props} />
        </View>
    );
    const ThirdRoute = () => (
        <View style={{ paddingBottom: 780 }}>
            <SocialTab props={props} />
        </View>
    );

    const [index, setIndex] = React.useState(0);
    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute
    });
    const routes = [
        { key: 'first', title: 'Availability' },
        { key: 'second', title: 'Shows' },
        { key: 'third', title: 'Social Media' }
    ];

    const layout = useWindowDimensions();

    const renderTabBar = (props) => {
        const inputRange = props.navigationState.routes.map((x, i) => i);
        return (
            <View style={{
                flexDirection: 'row',
                borderBottomWidth: 1,
                // marginTop: 10,
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
            />
        </View>
    )
}

export default TabViewPerformer;