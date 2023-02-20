import StartScreen from "./pages/authScreens/StartScreen";
import { useFonts } from "expo-font";
import SignupScreen from "./pages/authScreens/SignupScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNav from "./components/TabNav";
import ForgetPasswordScreen from "./pages/authScreens/ForgetPasswordScreen";

import PersonalInfoScreen from "./pages/profileScreens/PersonalInfoScreen";
import PersonalSecurityScreen from "./pages/profileScreens/PasswordSecurityScreen";
import ProfileSettingsScreen from "./pages/profileScreens/ProfileSettingsScreen";
import EditProfileArtistScreen from "./pages/profileScreens/EditProfileArtistScreen";
import SearchArtistProfile from "./pages/searchScreens/SearchArtistProfile";
import AuthContextProvider, { AuthContext } from "./store/authContext";
import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import ProfileContextProvider from "./store/profileContext";

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
          name="EditProfileArtistScreen"
          component={EditProfileArtistScreen}
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
    </ProfileContextProvider>
  );
}

function AuthStack() {
  return (
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
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCTX = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCTX.isAuthenticated && <AuthStack />}
      {authCTX.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingToLogin, setIsTryingToLogin] = useState(true);

  const authCTX = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        authCTX.authenticate(storedToken);
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
    <AuthContextProvider>
      <Root />
    </AuthContextProvider>
  );
}
