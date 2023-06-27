import StartScreen from "./pages/authScreens/StartScreen";
import { useFonts } from "expo-font";
import SignupScreen from "./pages/authScreens/SignupScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNav from "./components/TabNav";
import ForgetPasswordScreen from "./pages/authScreens/ForgetPasswordScreen";
import ConfirmPasswordReset from "./pages/profileScreens/ConfirmPasswordReset";
import PersonalInfoScreen from "./pages/profileScreens/PersonalInfoScreen";
import PersonalSecurityScreen from "./pages/profileScreens/PasswordSecurityScreen";
import ProfileSettingsScreen from "./pages/profileScreens/ProfileSettingsScreen";
import EditProfileArtistScreen from "./pages/profileScreens/EditProfileArtistScreen";
import SearchArtistProfile from "./pages/searchScreens/SearchArtistProfile";
import AuthContextProvider, { AuthContext } from "./store/authContext";
import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileContextProvider from "./store/profileContext";
import MessageChat from "./pages/messageScreens/MessageChat";
import SearchChat from "./pages/searchScreens/SearchChat";
import SocialModalScreen from "./pages/profileScreens/SocialModalScreen";
import MessageProfile from "./pages/messageScreens/MessageProfile";
import Report from "./pages/searchScreens/Report";
import ProfileScreen from "./pages/profileScreens/ProfileScreen";
import AddProfileLink from "./pages/profileScreens/AddProfileLink";
import { getAccessToken } from "./util/profile";
import OpenShowDetails from "./pages/showsScreens/OpenShowDetailsScreen";
import MyShowDetailsScreen from "./pages/showsScreens/MyShowDetailsScreen";
import MyShowDetailsVenueScreen from "./pages/showsScreens/MyShowDetailsVenueScreen";

import * as Sentry from '@sentry/react-native';

Sentry.init({ 
  dsn: "https://9c9d44c134ad45cda9c6c74ab4c65274@o4505430259007488.ingest.sentry.io/4505430261825536", 
});


const Stack = createNativeStackNavigator();
// SplashScreen.preventAutoHideAsync();

function AuthenticatedStack() {
  return (
    <ProfileContextProvider>
      <Stack.Navigator initialRouteName="TabNav">
        <Stack.Screen
          name="ProfileSettingsScreen"
          component={ProfileSettingsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name = "Report"
          component={Report}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name = "OpenShowDetails"
          component={OpenShowDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name = "MyShowDetailsVenue"
          component={MyShowDetailsVenueScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name = "MyShowDetails"
          component={MyShowDetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name = "AddProfileLink"
          component={AddProfileLink}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name = "ProfileScreen"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MessageProfile"
          component={MessageProfile}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="EditProfileArtistScreen"
          component={EditProfileArtistScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ConfirmPasswordReset"
          component={ConfirmPasswordReset}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PersonalInfoScreen"
          component={PersonalInfoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SocialModalScreen"
          component={SocialModalScreen}
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
          name="MessageChat"
          component={MessageChat}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SearchChat"
          component={SearchChat}
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
          name="TabNav"
          component={TabNav}
          options={{
            headerShown: false,
            animation: "none",
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </ProfileContextProvider>
  );
}

// function AuthStack() {
//   return (
//     <Stack.Navigator initialRouteName="Start">
//       <Stack.Screen
//         name="Start"
//         component={StartScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="ForgetPass"
//         component={ForgetPasswordScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Signup"
//         component={SignupScreen}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// }

function Navigation() {
  const authCTX = useContext(AuthContext);

  return (
    <NavigationContainer>
      {/* {!authCTX.isAuthenticated && <AuthStack />} */}
      {/* {authCTX.isAuthenticated && <AuthenticatedStack />} */}
      <AuthenticatedStack />
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingToLogin, setIsTryingToLogin] = useState(true);
  const authCTX = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      const accessToken = await getAccessToken();
      // console.log(accessToken);
      if (storedToken && accessToken) {
        authCTX.authenticate(storedToken);
      }else{
        authCTX.logout();
      }
      setIsTryingToLogin(false);
    }

    fetchToken();
  }, []);

  if (isTryingToLogin) {
    return null;
  }

  return <Navigation />;
}

function App() {
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
    <AuthContextProvider>
      <Root />
    </AuthContextProvider>
  );
}

export default Sentry.wrap(App);