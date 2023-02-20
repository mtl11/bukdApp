import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../pages/profileScreens/ProfileScreen";
import MessageScreen from "../pages/messageScreens/MessageScreen";
import SearchScreen from "../pages/searchScreens/SearchScreen";
import PersonalInfoScreen from "../pages/profileScreens/PersonalInfoScreen";
import PersonalSecurityScreen from "../pages/profileScreens/PasswordSecurityScreen";
import ProfileSettingsScreen from "../pages/profileScreens/ProfileSettingsScreen";
import EditProfileArtistScreen from "../pages/profileScreens/EditProfileArtistScreen";
import React, { useLayoutEffect } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import global from "../styles/global";
import ProfileContextProvider from "../store/profileContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();
function ProfileScreens({ route }) {
  return (
    <ProfileContextProvider>
      <Stack.Navigator initialRouteName="ProfileScreen">
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfileArtistScreen"
          component={EditProfileArtistScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileSettingsScreen"
          component={ProfileSettingsScreen}
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="PersonalInfoScreen"
          component={PersonalInfoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PersonalSecurityScreen"
          component={PersonalSecurityScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </ProfileContextProvider>
  );
}

export default TabNav = (props) => {
  const getTabBarVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    const hideOnScreens = ["EditProfileArtistScreen"]; // put here name of screen where you want to hide tabBar
    const value = hideOnScreens.indexOf(routeName) <= -1;
    if(value == false){
      return "none";
    }
    return !hideOnScreens.indexOf(routeName) <= -1;
  };
  return (
    <Tab.Navigator
      screenOptions={({ navigation, route }) => ({
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
          borderTopWidth: 0.5,
          borderColor: "#C4C4C4",
        },
        tabBarShowLabel: false,
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
        component={ProfileScreens}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};
