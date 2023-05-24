import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
  toggleMode: ()=>{},
  mode: "",
  darkMode: ""
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [mode, setMode] = useState("light");
  const [darkMode, setDarkMode] = useState(false);
  function authenticate(token) {
    // console.log(token);
    AsyncStorage.setItem("token", token);
    setAuthToken(token);
  }
  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("localId");
    AsyncStorage.removeItem("profileType");
  }

  function toggleMode(){
    if (mode == "light"){
      setDarkMode(true);
      setMode("dark");
    }else if  (mode == "dark"){
      setDarkMode(false);
      setMode("light");
    }
  }

  const value = {
    darkMode: darkMode,
    mode: mode,
    toggleMode: toggleMode,
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
