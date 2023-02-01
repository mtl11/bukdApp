import StartScreen from "./pages/authScreens/StartScreen";
import { useFonts } from "expo-font";
import SignupScreen from "./pages/authScreens/SignupScreen";
import ProfileSettingsScreen from "./pages/profileScreens/ProfileSettingsScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNav from "./components/TabNav";
import ForgetPasswordScreen from "./pages/authScreens/ForgetPasswordScreen";
import PersonalInfoScreen from "./pages/profileScreens/PersonalInfoScreen";
import PersonalSecurityScreen from "./pages/profileScreens/PasswordSecurityScreen";
import SearchArtistProfile from "./pages/searchScreens/SearchArtistProfile";

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
          name="Signup"
          component={SignupScreen}
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
          name="SearchArtistProfile"
          component={SearchArtistProfile}
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

