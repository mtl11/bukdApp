import React, { } from "react";
import {
    View,
    TouchableOpacity,
    Animated
} from "react-native";
import { TabView, SceneMap } from 'react-native-tab-view';
import styles from "../../../styles/profile/light/profileScreen";
import global from "../../../styles/global";
import SocialProfileTabArtist from "../SocialSearchTab";
import ShowsTab from "../ShowsTab";

const TabViewVenue = (props) => {
    const FirstRoute = () => (
        <ShowsTab
            shows={props.shows}
            basicInfo={props.basicInfo}
            props={props.props}
            pType={props.profileType}
        />
    );

    const SecondRoute = () => (
        <SocialProfileTabArtist socials={props.socials} />
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
                            {index == i && <View style={[styles.tabBottomBar, { width: "60%" }]}></View>}
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