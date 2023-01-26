import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Icon,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import styles from "../../styles/auth/signupScreen";
import global from "../../styles/global";
const SignupScreen = (props) => {
  const [value, setValue] = useState("User Type");
  const [placeholder, setPlaceHolder] = useState(true);
  const [profileType, setProfileType] = useState("");
  const [focus, setFocus] = useState(true);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.pop();
          }}
        >
          <FontAwesome5
            name="chevron-left"
            size={32}
            color={global.color.primaryColors.main}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignSelf: "center",
          marginVertical: "10%",
        }}
      >
        <Text style={styles.bigText}>We are so happy you are here.</Text>
        <Text style={styles.bigText}>Let’s get you set up!</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor={global.color.primaryColors.placeHolderTextColor}
          autoCorrect={false}
          autoCapitalize={false}
          returnKeyType={"done"}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor={global.color.primaryColors.placeHolderTextColor}
          autoCorrect={false}
          autoCapitalize={false}
          returnKeyType={"done"}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor={global.color.primaryColors.placeHolderTextColor}
          autoCorrect={false}
          autoCapitalize={false}
          returnKeyType={"done"}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={global.color.primaryColors.placeHolderTextColor}
          autoCorrect={false}
          autoCapitalize={false}
          inputMode={"email"}
          returnKeyType={"done"}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={global.color.primaryColors.placeHolderTextColor}
          secureTextEntry={true}
          textContentType={"oneTimeCode"}
          autoCapitalize={false}
          returnKeyType={"done"}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor={global.color.primaryColors.placeHolderTextColor}
          secureTextEntry={true}
          autoCapitalize={false}
          returnKeyType={"done"}
          textContentType={"oneTimeCode"}
        />
      </View>
      {/* <View>
        <TouchableOpacity
          style={[
            styles.inputContainer,
            !focus && {
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              borderWidth: 2,
              borderColor: global.color.primaryColors.main,
            },
          ]}
          onPress={() => {
            setFocus(!focus);
          }}
        >
          <Text
            style={[
              styles.input,
              placeholder && {
                color: global.color.primaryColors.placeHolderTextColor,
              },
            ]}
          >
            {value}
          </Text>
        </TouchableOpacity>
        {focus ? (
          <View></View>
        ) : (
          <View>
            <TouchableOpacity
              style={[
                styles.inputContainer2,
                {
                  borderLeftWidth: 2,
                  borderRightWidth: 2,
                  borderColor: "white",
                  borderColor: global.color.primaryColors.main,
                },
              ]}
              onPress={() => {
                setValue("Performer");
                setProfileType("Performer");
                setFocus(!focus);
                setPlaceHolder(false);
              }}
            >
              <Text style={styles.input}>Performer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.inputContainer2,
                {
                  borderBottomLeftRadius: 12,
                  borderBottomRightRadius: 12,
                  borderWidth: 2,
                  borderColor: global.color.primaryColors.main,
                },
              ]}
              onPress={() => {
                setValue("Live Music Fan");
                setFocus(!focus);
                setPlaceHolder(false);
              }}
            >
              <Text style={styles.input}>Live Music Fan</Text>
            </TouchableOpacity>
          </View> 
        )}
      </View>*/}
      <TouchableOpacity
        style={[styles.buttonContainer, {marginTop:"20%"}]}
        onPress={() => {
          props.navigation.navigate("TabNav");
          // if (profileType == "Performer") {
            // props.navigation.navigate("ArtistSetup", {
            //   profileType: profileType,
            // });
          // }
          // if (profileType == "Venue/Business") {
          //   props.navigation.navigate("VenueSetup", {
          //     profileType: profileType,
          //   });
          // }
        }}
        
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignupScreen;
