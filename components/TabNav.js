import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../pages/profileScreens/ProfileScreen";
import MessageScreen from "../pages/messageScreens/MessageScreen";
import CalenderScreen from "../pages/calenderScreens/CalenderScreen";
import SearchScreen from "../pages/searchScreens/SearchScreen";
import * as React from 'react';
const Tab = createBottomTabNavigator();

export default TabNav = (props) => {
  return (
    <Tab.Navigator
    //   screenOptions={({ route }) => ({
    //     tabBarIcon: ({ focused, color, size }) => {
    //       let iconName;
    //       if (route.name === "Max Reps") {
    //         iconName = focused ? "md-bar-chart" : "md-bar-chart-outline";
    //       } else if (route.name === "Settings") {
    //         iconName = focused ? "ios-settings" : "ios-settings-outline";
    //       } else if (route.name === "Splits") {
    //         iconName = focused ? "barbell" : "barbell-outline";
    //       }
    //       return <Ionicons name={iconName} size={size} color={color} />;
    //     },
    //     tabBarActiveTintColor: color.primary,
    //     tabBarInactiveTintColor: "gray",
    //   })}
    >
      <Tab.Screen name="Messages" component={MessageScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Calender" component={CalenderScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Search" component={SearchScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
};
