import React, { useContext, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import styles from "../../styles/auth/light/signupScreen";
import global from "../../styles/global";
import { createUser, addAccountFB, authenticateUser, submitVerifyRequest } from "../../util/auth";
import { AuthContext } from "../../store/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAccessToken } from "../../util/profile";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SignupScreen = (props) => {
  const authCTX = useContext(AuthContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  //password needs to be at least 6 in length
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");


  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePasswordsLength = () => {
    if (password.length >= 10 && confirmPassword.length >= 10) {
      return true;
    }
    return false;
  };

  const validatePasswords = () => {
    if (password == confirmPassword) {
      return true;
    }
    return false;
  };

  async function signUpHandler() {
    setIsAuth(true);
    const response = await createUser(email, password);
    if (response) {
      setEmailErrorMessage("Error: email already in use");
      setIsAuth(false);
    } else {
      const localId = await AsyncStorage.getItem("localId");
      const token = await authenticateUser(email, password);
      AsyncStorage.setItem("email", JSON.stringify(email));
      const accessToken = await getAccessToken();
      setEmailErrorMessage("");
      const response = await addAccountFB(email, firstName, lastName, localId, accessToken);
      setIsAuth(false);
      props.setVisible(false);
      authCTX.authenticate(token);
      // const token = await authenticateUser(email, password);
      // AsyncStorage.setItem("email", JSON.stringify(email));

    }
    setIsAuth(false);
  }

  async function signUpHandlerPerformer() {
    setIsAuth(true);
    let accountType;
    if (isPerformer == true)
      accountType = "performer";
    else
      accountType = "venue";
    const response = await submitVerifyRequest(performerEmail, profileName, firstName, lastName, accountType);
    setIsAuth(false);
    setAddedAccount(true);
  }

  function checkInputs() {
    if (firstName == "") {
      setEmailErrorMessage("Error: Enter First Name");
      return;
    }
    if (lastName == "") {
      setEmailErrorMessage("Error: Enter Last Name");
      return;
    }
    if (validateEmail(email) == null) {
      setEmailErrorMessage("Error: Invalid Email");
      return;
    }
    if (!validatePasswordsLength()) {
      setEmailErrorMessage("Error: Passwords must be at least 10 charaters");
      return;
    }
    if (!validatePasswords()) {
      setEmailErrorMessage("Error: Passwords must match");
      return;
    }
    signUpHandler();
    setEmailErrorMessage("");
  }

  function checkInputsPerformer() {
    if (isPerformer == false && isVenue == false) {
      setEmailErrorMessage("Error: Select Account Type");
      return;
    }
    if (firstName == "") {
      setEmailErrorMessage("Error: Enter First Name");
      return;
    }
    if (lastName == "") {
      setEmailErrorMessage("Error: Enter Last Name");
      return;
    }
    if (profileName == "") {
      setEmailErrorMessage("Error: Enter Profile Name");
      return;
    }

    if (validateEmail(performerEmail) == null) {
      setEmailErrorMessage("Error: Invalid Email");
      return;
    }

    signUpHandlerPerformer();
    setEmailErrorMessage("");
  }

  const [fanAccount, setFanAccount] = useState(false);
  const [performerAccount, setPerformerAccount] = useState(false);
  const [account, setAccount] = useState(false);
  const [profileName, setProfileName] = useState(false);
  const [location, setLocation] = useState(false);
  const [performerEmail, setPerformerEmail] = useState(false);
  const [isPerformer, setIsPerformer] = useState(false);
  const [isVenue, setIsVenue] = useState(false);
  const [addedAccount, setAddedAccount] = useState(false);

  return (
    <Modal visible={props.visible}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style={styles.container}>
          {addedAccount == true ?
            <View style={{ marginTop: "10%", alignItems: "center" }}>
              <Text style={{ margin: "5%", fontSize: 18, fontFamily: "Rubik-SemiBold", textAlign: "center" }}>
                Thank you for Joining the Waitlist, We Will Verify Your Profile Shortly.
              </Text>
              <TouchableOpacity
                style={[styles.buttonContainer, { marginTop: "20%", width: "80%" }]}
                onPress={() => {
                  props.setVisible(false);
                  setAccount(false);
                  setFanAccount(false);
                  setPerformerAccount(false);
                  setEmailErrorMessage("");
                }}
              >
                <Text style={styles.buttonText}>Done</Text>
              </TouchableOpacity>
            </View> : (
              <View>
                {!account &&
                  <View style={styles.topContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        props.setVisible(false);
                        setAccount(false);
                        setFanAccount(false);
                        setPerformerAccount(false);
                        setEmailErrorMessage("");
                      }}
                    >
                      <Ionicons
                        name="arrow-back"
                        size={28}
                        color={global.color.primaryColors.main}
                      />
                    </TouchableOpacity>
                  </View>}
                {account &&
                  <View style={styles.topContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        setAccount(false);
                        setFanAccount(false);
                        setPerformerAccount(false);
                        setEmailErrorMessage("");
                      }}
                    >
                      <Ionicons
                        name="arrow-back"
                        size={28}
                        color={global.color.primaryColors.main}
                      />
                    </TouchableOpacity>
                  </View>}
                <KeyboardAwareScrollView>
                  {!account &&
                    <View style={{
                      alignSelf: "center",
                      marginVertical: "5%",
                    }}>
                      <Text style={styles.bigText}>
                        Choose an Account Type
                      </Text>
                    </View>}
                  {!account &&
                    <View style={{
                      borderWidth: 1,
                      alignItems: "center",
                      width: "90%",
                      alignSelf: "center",
                      borderRadius: 12,
                      borderColor: "#D9D9D9",
                      backgroundColor: "white",
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.22,
                      shadowRadius: 2.22,
                      padding: "5%"
                    }}>
                      <Text style={{ fontFamily: "Rubik-Medium", fontSize: 18 }}>
                        Live Music Fan
                      </Text>
                      <View style={{ marginVertical: "5%" }}>
                        <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16, textAlign: "center" }} >
                          Create
                          <Text style={{ fontFamily: "Rubik-SemiBold", fontSize: 16, color: global.color.primaryColors.main }}>
                            {" "}Fan{" "}
                          </Text>
                          account to interact with local performers.
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={[styles.buttonContainer, { marginTop: "10%", width: "70%" }]}
                        onPress={() => {
                          setFanAccount(!fanAccount);
                          setAccount(true);
                        }}
                      >
                        <Text style={styles.buttonText}>Continue</Text>
                      </TouchableOpacity>
                    </View>}
                  {!account &&
                    <View style={{
                      borderWidth: 1,
                      alignItems: "center",
                      width: "90%",
                      alignSelf: "center",
                      borderRadius: 12,
                      borderColor: "#D9D9D9",
                      backgroundColor: "white",
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.22,
                      shadowRadius: 2.22,
                      padding: "5%",
                      marginTop: "10%"
                    }}>
                      <Text style={{ fontFamily: "Rubik-Medium", fontSize: 18 }}>
                        Performer or Venue
                      </Text>
                      <View style={{ marginVertical: "5%" }}>
                        <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16, textAlign: "center", color: global.color.primaryColors.adjacent }} >
                          Verify yourself as a
                          <Text style={{ fontFamily: "Rubik-SemiBold", fontSize: 16, color: global.color.primaryColors.main }}>
                            {" "}Performer{" "}
                          </Text>
                          or <Text style={{ fontFamily: "Rubik-SemiBold", fontSize: 16, color: global.color.primaryColors.main }}>
                            Venue{" "}
                          </Text>
                          to get access to the entire Bukd platfrom.
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={[styles.buttonContainer, { marginTop: "10%", width: "70%" }]}
                        onPress={() => {
                          setPerformerAccount(!performerAccount);
                          setAccount(true);
                        }}
                      >
                        <Text style={styles.buttonText}>Continue</Text>
                      </TouchableOpacity>
                    </View>}
                  {fanAccount &&
                    <View>
                      <View style={{
                        alignSelf: "center",
                        marginVertical: "5%",
                      }}>
                        <Text style={styles.bigText}>
                          Welcome, <Text style={{ color: global.color.secondaryColors.main }}>
                            Live Music Fan
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.inputContainer}>
                        <TextInput
                          inputMode={"text"}
                          keyboardType={"ascii-capable"}
                          style={styles.input}
                          placeholder="First Name"
                          placeholderTextColor={global.color.secondaryColors.placeHolderTextColor}
                          autoCorrect={false}
                          returnKeyType={"next"}
                          onChangeText={setFirstName}
                        />
                      </View>
                      <View style={styles.inputContainer}>
                        <TextInput
                          inputMode={"text"}
                          keyboardType={"ascii-capable"}
                          style={styles.input}
                          placeholder="Last Name"
                          placeholderTextColor={global.color.secondaryColors.placeHolderTextColor}
                          autoCorrect={false}
                          returnKeyType={"next"}
                          onChangeText={setLastName}
                        />
                      </View>
                      <View style={styles.inputContainer}>
                        <TextInput
                          keyboardType={"ascii-capable"}
                          style={styles.input}
                          placeholder="Email"
                          placeholderTextColor={global.color.secondaryColors.placeHolderTextColor}
                          autoCorrect={false}
                          autoCapitalize={false}
                          inputMode={"email"}
                          returnKeyType={"next"}
                          onChangeText={setEmail}
                        />
                      </View>
                      <View style={styles.passwordInfoContainer}>
                        <Text style={styles.passwordInfoText}>
                          Password must be at least 10 characters
                        </Text>
                      </View>
                      <View style={[styles.inputContainer, { marginTop: "2%" }]}>
                        <TextInput
                          style={styles.input}
                          placeholder="Password"
                          placeholderTextColor={global.color.secondaryColors.placeHolderTextColor}
                          secureTextEntry={true}
                          textContentType={"oneTimeCode"}
                          autoCapitalize={false}
                          returnKeyType={"next"}
                          onChangeText={setPassword}
                        />
                      </View>
                      <View style={styles.passwordInfoContainer}>
                        <Text style={styles.passwordInfoText}>Passwords must match</Text>
                      </View>
                      <View style={[styles.inputContainer, { marginTop: "2%" }]}>
                        <TextInput
                          style={styles.input}
                          placeholder="Confirm Password"
                          placeholderTextColor={global.color.secondaryColors.placeHolderTextColor}
                          secureTextEntry={true}
                          autoCapitalize={false}
                          returnKeyType={"next"}
                          textContentType={"oneTimeCode"}
                          onChangeText={setConfirmPassword}
                        />
                      </View>
                      <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{emailErrorMessage}</Text>
                      </View>
                      <TouchableOpacity
                        style={[styles.buttonContainer, { marginTop: "20%" }]}
                        onPress={() => {
                          checkInputs();
                        }}
                      >
                        {!isAuth ? (
                          <Text style={styles.buttonText}>Create Account</Text>
                        ) : (
                          <ActivityIndicator size={22} />
                        )}
                      </TouchableOpacity>
                    </View>}
                  {performerAccount &&
                    <View>
                      <View style={{
                        alignSelf: "center",
                        marginVertical: "5%",

                      }}>
                        <Text style={styles.bigText}>
                          Welcome, <Text style={{ color: global.color.secondaryColors.main }}>
                            Performer or Venue
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.passwordInfoContainer}>
                        <Text style={styles.passwordInfoText}>
                          Account Type
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                        <View style={[styles.inputContainer,
                        {
                          alignItems: "center", width: "30%",
                          backgroundColor: isPerformer == true ? global.color.secondaryColors.main : global.color.secondaryColors.adjacent,
                        }]}>
                          <TouchableOpacity
                            style={styles.input}
                            onPress={() => {
                              setIsPerformer(true)
                              setIsVenue(false);
                            }}
                          >
                            <Text style={[styles.input, { color: isPerformer == true ? "white" : "black" }]}>
                              Performer
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View style={[styles.inputContainer, {
                          alignItems: "center", width: "30%",
                          backgroundColor: isVenue == true ? global.color.secondaryColors.main : global.color.secondaryColors.adjacent
                        }]}>
                          <TouchableOpacity
                            style={[styles.input]}
                            onPress={() => {
                              setIsPerformer(false)
                              setIsVenue(true);
                            }}
                          >
                            <Text style={[styles.input, { color: isVenue == true ? "white" : "black" }]}>
                              Venue
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View style={styles.inputContainer}>
                        <TextInput
                          inputMode={"text"}
                          keyboardType={"ascii-capable"}
                          style={styles.input}
                          placeholder="First Name"
                          placeholderTextColor={global.color.secondaryColors.placeHolderTextColor}
                          autoCorrect={false}
                          returnKeyType={"next"}
                          onChangeText={setFirstName}
                        />
                      </View>
                      <View style={styles.inputContainer}>
                        <TextInput
                          inputMode={"text"}
                          keyboardType={"ascii-capable"}
                          style={styles.input}
                          placeholder="Last Name"
                          placeholderTextColor={global.color.secondaryColors.placeHolderTextColor}
                          autoCorrect={false}
                          returnKeyType={"next"}
                          onChangeText={setLastName}
                        />
                      </View>
                      <View style={styles.passwordInfoContainer}>
                        <Text style={styles.passwordInfoText}>
                          We recommend using your Performer/Venue name
                        </Text>
                      </View>
                      <View style={styles.inputContainer}>
                        <TextInput
                          inputMode={"text"}
                          keyboardType={"ascii-capable"}
                          style={styles.input}
                          placeholder="Profile Name"
                          placeholderTextColor={global.color.secondaryColors.placeHolderTextColor}
                          autoCorrect={false}
                          autoCapitalize={false}
                          returnKeyType={"next"}
                          onChangeText={setProfileName}
                        />
                      </View>

                      <View style={styles.inputContainer}>
                        <TextInput
                          keyboardType={"ascii-capable"}
                          style={styles.input}
                          placeholder="Email"
                          placeholderTextColor={global.color.secondaryColors.placeHolderTextColor}
                          autoCorrect={false}
                          autoCapitalize={false}
                          inputMode={"email"}
                          returnKeyType={"next"}
                          onChangeText={setPerformerEmail}
                        />
                      </View>
                      <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{emailErrorMessage}</Text>
                      </View>
                      <TouchableOpacity
                        style={[styles.buttonContainer, { marginTop: "20%" }]}
                        onPress={() => {
                          checkInputsPerformer();
                        }}
                      >
                        {!isAuth ? (
                          <Text style={styles.buttonText}>Create Account</Text>
                        ) : (
                          <ActivityIndicator size={22} />
                        )}
                      </TouchableOpacity>
                    </View>}
                </KeyboardAwareScrollView>
              </View>
            )}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SignupScreen;
