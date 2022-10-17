import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../pages/profileScreens/ProfileScreen";
import MessageScreen from "../pages/messageScreens/MessageScreen";
import CalenderScreen from "../pages/calenderScreens/CalenderScreen";
import SearchScreen from "../pages/searchScreens/SearchScreen";
import * as React from "react";
import { FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default TabNav = (props) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          
          let iconName;
          if (route.name === "Messages") {
            iconName = focused ? "comments" : "comments";
          } else if (route.name === "Calender") {
            iconName = focused ? "calendar" : "calendar";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search";
          } else if (route.name === "Profile") {
            iconName = focused ? "user-circle" : "user-circle";
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#095D6A",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Calender"
        component={CalenderScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
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
