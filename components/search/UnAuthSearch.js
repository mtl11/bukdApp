import React, { useContext, useEffect, useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    StyleSheet, TextInput, Modal
} from "react-native";
import global from "../../styles/global";
import { authenticateUser } from "../../util/auth";
import { AuthContext } from "../../store/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ForgetPasswordScreen from "../../pages/authScreens/ForgetPasswordScreen";
import SignupScreen from "../../pages/authScreens/SignupScreen";
import { Ionicons } from '@expo/vector-icons';
import InfoModal from "../auth/InfoModal";

const UnAuthSearch = (props) => {
    const authCTX = useContext(AuthContext);
    const [passwordDontMatch, setPasswordDontMatch] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAuth, setIsAuth] = useState(false);
    const [visible, setVisible] = useState(visible);
    async function authenticateHandler() {
        try {
            const token = await authenticateUser(email, password);
            console.log("test");
            setPasswordDontMatch(false);
            AsyncStorage.setItem("email", email);
            authCTX.authenticate(token);
        } catch (error) {
            setPasswordDontMatch(true);
            setIsAuth(false);
        }
    }
    const [forgotPassVisible, setForgotPassVisible] = useState(false);
    const [signupVisible, setSignupVisible] = useState(false);
    const [infoModalVisible, setInfoModalVisible] = useState(false);
    return (
        <Modal animationType="slide" visible={props.visible}>
            <ForgetPasswordScreen visible={forgotPassVisible} setVisible={setForgotPassVisible} />
            <SignupScreen visible={signupVisible} setVisible={setSignupVisible} />
            <InfoModal visible={infoModalVisible} setVisible={setInfoModalVisible}/>
            <SafeAreaView >
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <TouchableOpacity
                        style={{ marginHorizontal: 30 }}
                        onPress={() => { props.setVisible(false); setPasswordDontMatch(false); }}
                    >
                        <Text style={{ fontSize: 18 }}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ marginHorizontal: 30 }}
                        onPress={() => { setInfoModalVisible(!infoModalVisible); }}
                    >
                        <Ionicons name="information-circle-outline" size={30} color="black" />
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignSelf: "center",
                        marginTop: "5%",
                        marginBottom: 12
                    }}
                >
                    <Image
                        source={require("../../assets/bukdImage.png")}
                        style={styles.image}
                    />
                </View>
                <Text style={{ alignSelf: "center", marginBottom: "18%", fontFamily: "Rubik-Regular", fontSize: 16 }}>
                    Login with your email and password.
                </Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        autoCapitalize={"none"}
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor={styles.placeHolderTextColor}
                        onChangeText={(text) => {
                            setEmail(text);
                            setPasswordDontMatch(false);
                        }}
                        autoCorrect={false}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder="Password"
                        placeholderTextColor={styles.placeHolderTextColor}
                        onChangeText={(text) => {
                            setPassword(text);
                            setPasswordDontMatch(false);
                        }}
                    />
                </View>
                <TouchableOpacity
                    style={styles.forgotPasswordContainer}
                    onPress={() => {
                        setForgotPassVisible(true);
                    }}
                >
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => {
                        setIsAuth(true);
                        authenticateHandler();
                    }}
                >
                    {!isAuth ? (
                        <Text style={styles.buttonText}>Login</Text>
                    ) : (
                        <ActivityIndicator size={22} />
                    )}
                </TouchableOpacity>
                {passwordDontMatch &&
                    <View style={{ alignSelf: "center" }}>
                        <Text style={{
                            color: global.color.primaryColors.errorText,
                            fontFamily: "Rubik-Regular", fontSize: 16, textAlign: "center", marginTop: 10
                        }}>
                            Entered email and password do not match our records.
                        </Text>
                    </View>}
                <View style={styles.newAccountContainer}>
                    <Text style={styles.newAccountText}>Don't have an account?</Text>
                    <TouchableOpacity
                        onPress={() => {
                            setSignupVisible(true);

                        }}
                    >
                        <Text style={styles.buttonTextSignUp}> Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </Modal>)
}
const styles = StyleSheet.create({
    iconColor: global.color.secondaryColors.buttonAccent,
    placeHolderTextColor: global.color.secondaryColors.placeHolderTextColor,
    imageContainer: {
        flexDirection: "row",
        justifyContent: "center",
    },
    welcomeText: {
        fontSize: 24,
        fontFamily: "Rubik-Medium",
        color: global.color.secondaryColors.main
    },
    welcomeContainer: {
        alignSelf: "center",
        marginBottom: "10%",
        marginTop: "10%"
    },
    stripedImage: {
        alignSelf: "center",
        width: 50,
        height: 26,
        resizeMode: "contain",

    },
    logoImage: {
        width: 60,
        height: 45,
        resizeMode: "contain",
        marginHorizontal: "1%"
    },
    image: {
        // alignSelf: "center",
        // marginTop: "30%",
        width: 125,
        height: 125,
        resizeMode: "contain",
        marginHorizontal: "1%"
    },
    forgotPasswordContainer: {
        alignSelf: "flex-end",
        marginHorizontal: "8%",
        marginTop: 10,
        marginBottom: 20,
    },
    container: {
        backgroundColor: global.color.secondaryColors.background,
        height: "50%",
    },
    forgotPasswordText: {
        fontFamily: "Rubik-Medium",
        color: global.color.secondaryColors.main,
        fontSize: 16,
    },
    input: {
        paddingVertical: "5%",
        marginHorizontal: "5%",
        fontSize: 16,
        fontFamily: "Rubik-Regular",
        color: global.color.secondaryColors.text
    },
    inputContainer: {
        borderRadius: 12,
        marginHorizontal: "8%",
        marginTop: "5%",
        backgroundColor: global.color.secondaryColors.adjacent,
    },
    buttonContainer: {
        alignItems: "center",
        padding: 16,
        marginHorizontal: "8%",
        backgroundColor: global.color.secondaryColors.main,
        borderRadius: 12,
        marginTop: "7%"
    },
    buttonTextSignUp: {
        fontFamily: "Rubik-Medium",
        fontSize: 18,
        color: global.color.secondaryColors.main,
    },
    buttonText: {
        fontFamily: "Rubik-Medium",
        color: "white",
        fontSize: 18,
    },
    newAccountContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: "33%"
    },
    newAccountText: {
        fontFamily: "Rubik-Regular",
        fontSize: 18,
        color: "black"
    }
})
export default UnAuthSearch;