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

const ArtistSetupScreen = (props) => {
  const [image, setImage] = useState(null);
  const [value, setValue] = useState(null);
  const data = [
    { label: "DJ", value: "1" }, 
    { label: "Rapper", value: "2" },
  ];
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#095D6A",
    height: "100%",
  },
  imageContainer: {
    borderRadius: 100,
    borderWidth: 2,
    width: 150,
    height: 150,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "#FBBC58",
    borderColor: "#FBBC58",
    marginTop: 40,
  },
  imageText: {
    marginTop: 10,
    alignSelf: "center",
  },
  iconContainer: { marginHorizontal: "5%" },
  textContainer: {
    alignSelf: "center",
  },
  image: {
    alignSelf: "center",
    marginTop: "5%",
    resizeMode: "contain",
    height: 120,
    width: 120,
  },
  buttonContainer: {
    marginTop: "50%",
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: "10%",
    paddingVertical: 20,
    backgroundColor: "#F57B51",
    borderRadius: 4,
  },
  titleText: {
    color: "#FDF6F0",
    fontSize: 16,
  },
  iconContainer: { marginHorizontal: "5%" },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 18,
    backgroundColor: "rgba(253, 246, 240, 0.6)",
    marginHorizontal: "10%",
    borderRadius: 4,
    fontSize: 14,
    fontFamily: "Rubik-Regular",
    marginTop: 25,
    color: "#FDF6F0",
  },
  dropdown: {
    paddingVertical: 5,
    paddingHorizontal: 18,
    backgroundColor: "rgba(253, 246, 240, 0.6)",
    marginHorizontal: "10%",
    borderRadius: 4,
    fontSize: 14,
    marginTop: 25,
    color: "#FDF6F0",
  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: "Rubik-Regular",
    color: "rgba(9, 93, 106, .6)",
  },
  selectedTextStyle: {
    fontSize: 14,
    fontFamily: "Rubik-Regular",
    color: "#FDF6F0",
  },
});

export default ArtistSetupScreen;
