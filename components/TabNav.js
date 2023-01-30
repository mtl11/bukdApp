import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../pages/profileScreens/ProfileScreen";
import MessageScreen from "../pages/messageScreens/MessageScreen";
import SearchScreen from "../pages/searchScreens/SearchScreen";
import * as React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import global from "../styles/global";
const Tab = createBottomTabNavigator();
export default TabNav = (props) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Search") {
            iconName = focused ? "ios-search" : "ios-search-outline";
            return <Ionicons name={iconName} size={34} color={color} />;
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
            return <Ionicons name={iconName} size={28} color={color} />;
          } else if (route.name === "Messages") {
            iconName = focused ? "chatbubble" : "chatbubble-outline";
            return <Ionicons name={iconName} size={28} color={color} />;
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: global.color.primaryColors.main,
        tabBarInactiveTintColor: "#C4C4C4",
        tabBarStyle: {
          backgroundColor: "#303046",
          alignItems: "center",
          justifyContent: "center",
          borderTopWidth:.5,
          borderColor: "#C4C4C4"
       },
       tabBarBadgeStyle:{
        // margin: 10,
        // borderWidth:1,
        // width: 50,
        // height:50
      },tabBarItemStyle:{
        // height: 40
      },
      tabBarShowLabel:false

      })}
    >
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Tab.Screen
        name="Messages"
        component={MessageScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};
