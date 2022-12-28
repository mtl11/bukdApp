import React, { useState } from "react";
import {
  Keyboard,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Icon,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  KeyboardAvoidingView
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import styles from "../../styles/auth/artistSetupScreen";
import { Feather } from "@expo/vector-icons";

const ArtistSetupScreen = (props) => {
  const [image, setImage] = useState(null);
  const [value, setValue] = useState(null);
  const bioMargin = 15;
  const data = [
    { label: "DJ", value: "1" },
    { label: "Rapper", value: "2" },
  ];
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex:1}}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.profileText}>Profile Set Up</Text>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => {
              props.navigation.navigate("Signup", { profileType: "Performer" });
            }}
          >
            <Feather name="x" size={32} color="#2A51DB" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{
                width: 148,
                height: 148,
                borderRadius: 100,
                overflow: "hidden",
              }}
            />
          ) : (
            <View>
              <FontAwesome name="camera" size={30} color="#BDBDBD" />
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Profile Name"
          placeholderTextColor={"#BDBDBD"}
          autoCapitalize={false}
          autoCorrect={false}
          autoComplete={false}
        />
        <View>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={data}
            labelField="label"
            valueField="value"
            placeholder="Genre"
            value={value}
            onChange={(item) => {
              setValue(item.value);
            }}
          />
        </View>
        <TextInput
          onPressIn={()=>{console.log("hi")}}
          style={[styles.input, { paddingTop: 15, height: 188}]}
          placeholder="Bio"
          placeholderTextColor={"#BDBDBD"}
          multiline={true}
        />
        <TouchableOpacity
          style={[styles.buttonContainer,{marginTop:"18%"}]}
          onPress={() => {
            props.navigation.navigate("ArtistSocial");
          }}
        >
          <Text style={styles.titleText}>Next</Text>
        </TouchableOpacity>
        <View style={{padding: 3000}}>
          <Text>
            hi
          </Text>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>

    </KeyboardAvoidingView>
  );
};

export default ArtistSetupScreen;
