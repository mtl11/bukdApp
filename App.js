import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StartScreen from "./pages/authScreens/StartScreen";
import { useFonts } from "expo-font";
import SignupScreen from "./pages/authScreens/SignupScreen";
import SetupScreen from "./pages/authScreens/SetupScreen";
import ProfileSettingsScreen from "./pages/profileScreens/ProfileSettingsScreen";
import ArtistSetupScreen from "./pages/authScreens/ArtistSetupScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ArtistsocialsScreen from "./pages/authScreens/ArtistsocialsScreen";
import TabNav from "./components/TabNav";
import ForgetPasswordScreen from "./pages/authScreens/ForgetPasswordScreen";
import VenueSetupScreen from "./pages/authScreens/VenueSetupScreen";
import PersonalInfoScreen from "./pages/profileScreens/PersonalInfoScreen";
import PersonalSecurityScreen from "./pages/profileScreens/PasswordSecurityScreen";
const Stack = createNativeStackNavigator();
export default function App() {
  let [fontsLoaded] = useFonts({
    "Rubik-Regular": require("./assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Light": require("./assets/fonts/Rubik-Light.ttf"),
    "Rubik-SemiBold": require("./assets/fonts/Rubik-SemiBold.ttf"),
    "Rubik-Medium": require("./assets/fonts/Rubik-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgetPass"
          component={ForgetPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VenueSetup"
          component={VenueSetupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Setup"
          component={SetupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ArtistSetup"
          component={ArtistSetupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ArtistSocial"
          component={ArtistsocialsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileSettingsScreen"
          component={ProfileSettingsScreen}
          options={{ headerShown: false }}
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
        <Stack.Screen
          name="TabNav"
          component={TabNav}
          options={{
            headerShown: false,
            animation: "none",
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
