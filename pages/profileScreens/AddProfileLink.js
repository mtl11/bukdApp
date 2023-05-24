import React, { useState, useContext, useEffect } from "react";
import {
    Modal,
    View,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Text,
    TextInput,
    ActivityIndicator,
    Keyboard, TouchableWithoutFeedback
} from "react-native";
import colors from "../../styles/global";
import { SocialLinks } from "social-links";
import { Ionicons } from "@expo/vector-icons";
import { setSocial, getAccessToken, setProfileLink, } from "../../util/profile";
import { ProfileContext } from "../../store/profileContext.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../store/authContext";
import light from "../../styles/profile/light/socialModal";
import dark from "../../styles/profile/dark/socialModal";

const AddProfileLink = (props) => {
    const authCTX = useContext(AuthContext);
    const styles = authCTX.mode === "light" ? light : dark;

    const profileCTX = useContext(ProfileContext);
    const [isAuth, setIsAuth] = useState(false);
    const [link, setLink] = useState(profileCTX.profileLink);
    const [valid, setValid] = useState(false);

    const isValidUrl = urlString => {
        var urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
        return !!urlPattern.test(urlString);
    }

    async function updateSocial() {
        const localId = await AsyncStorage.getItem("localId");
        const accessToken = await getAccessToken();
        setIsAuth(true);
        await setProfileLink(link, localId, accessToken);
        profileCTX.updateProfileLink(link);
        setIsAuth(false);
        props.navigation.pop();
    }
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };
    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <SafeAreaView style={styles.container}>
                <View style={styles.topIconContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.pop();
                        }}
                    >
                        <Ionicons
                            name="arrow-back"
                            size={28}
                            color={styles.iconColor}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: "8%" }}>
                    <Text style={{
                        fontSize: 18,
                        alignSelf: "center",
                        fontFamily: "Rubik-SemiBold",
                        color: colors.color.secondaryColors.main,
                    }}>
                        Enter link to be displayed in your profile.

                    </Text>
                    <Text style={{ color: "black", fontSize: 14, fontFamily: "Rubik-Regular", alignSelf: "center", padding: "5%", textAlign: "center" }}>
                        We recommend to add social media links (Instagram, YouTube, etc)
                        under the Social Media section when editing your profile.
                    </Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        autoCapitalize={"none"}
                        keyboardType="url"
                        placeholder="Link"
                        maxLength={100}
                        placeholderTextColor={styles.placeHolderTextColor}
                        onChangeText={setLink}
                        value={link}
                    />
                </View>
                {valid ? (
                    <View style={{ alignSelf: "center" }}>
                        <Text
                            style={{
                                color: colors.color.primaryColors.errorText,
                                fontFamily: "Rubik-Regular",
                            }}
                        >
                            Link is invalid
                        </Text>
                    </View>
                ) : (
                    <View></View>
                )}
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => {
                        const val = isValidUrl(link);
                        setValid(!val);
                        if (val) {
                            updateSocial();
                        }
                    }}
                >
                    {!isAuth ? (
                        <Text style={styles.buttonText}>Add</Text>
                    ) : (
                        <ActivityIndicator size={22} />
                    )}
                </TouchableOpacity>

            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

export default AddProfileLink;
