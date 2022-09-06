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
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import styles from "../../styles/auth/artistSetupScreen";

const ArtistSetupScreen = (props) => {
  const [image, setImage] = useState(null);
  const [value, setValue] = useState(null);
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
    <SafeAreaView style={styles.container}>
        <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => {
          props.navigation.navigate("Setup");
        }}
      >
        <FontAwesome5 name="arrow-left" size={28} color="white" />
      </TouchableOpacity>
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
            <FontAwesome name="camera" size={24} color="black" />
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.imageText} onPress={pickImage}>
        <Text
          style={{
            fontFamily: "Rubik-Regular",
            color: "#FDF6F0",
          }}
        >
          {"Change Profile Pic"}
          
        </Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Stage Name"
        placeholderTextColor={"rgba(9, 93, 106, .6)"}
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
          placeholder="What is your speciality?"
          value={value}
          onChange={(item) => {
            setValue(item.value);
          }}
        />
      </View>
      <TextInput
        style={[styles.input,{paddingTop:15}]}
        placeholder="Bio"
        placeholderTextColor={"rgba(9, 93, 106, .6)"}
        multiline={true}
      />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          props.navigation.navigate("Setup");
        }}
      >
        <Text style={styles.titleText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ArtistSetupScreen;
