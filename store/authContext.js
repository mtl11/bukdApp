import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
  mode: ""
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [mode, setMode] = useState("light");
  function authenticate(token) {
    console.log(token);
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
  }
  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem("token");
  }

  function toggleMode(){
    if (mode == "light"){
      setMode("dark");
    }else if  (mode == "dark"){
      setMode("light");
    }
  }

  const value = {
    mode: mode,
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
