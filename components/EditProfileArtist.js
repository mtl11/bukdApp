import React, { useState } from "react";
import {
  View,
  Modal,
  Text,
  SafeAreaView,
  Touchable,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
const EditProfileArtist = (props) => {
  return (
    <Modal
      visible={props.visible}
      style={{ backgroundColor: "white", height: "100%" }}
      animationType="slide"
    >
      <SafeAreaView style={{ backgroundColor: "white", height: "100%" }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            marginHorizontal: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              props.setModalVisible(false);
            }}
          >
            <Text
              style={{
                color: "red",
                fontSize: 16,
                fontFamily: "Rubik-Regular",
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
          {/* <Text style={{fontSize: 17, fontFamily: "Rubik-Regular"}}>Edit Profile</Text> */}
          <TouchableOpacity>
            <Text
              style={{
                color: "#2A51DB",
                fontSize: 16,
                fontFamily: "Rubik-Regular",
              }}
            >
              Done
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            margin: 10,
            paddingLeft: 30,
            paddingBottom: 10,
            marginTop: 30,
            flexDirection: "row",
            borderColor: "#757575",
          }}
        >
          <FontAwesome5 name="user-alt" size={22} color="black" />
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Rubik-SemiBold",
              marginHorizontal: 15,
            }}
          >
            Profile
          </Text>
        </View>
        <ScrollView
          style={{ marginTop: 10, marginBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.inputContainer, { marginTop: 10 }]}>
            <Text style={styles.inputHeader}>Profile Name</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeader}>Location</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeader}>Genre</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeader}>Subgenre</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeader}>Bio</Text>
            <TextInput
              style={[styles.input, { height: 90 }]}
              multiline={true}
            />
          </View>
          <View>
            <View style={[styles.inputContainer]}>
              <Text style={styles.inputHeader}>Social Media Links</Text>
            </View>
            <View style={styles.inputContainerSocial}>
              <Image
                source={require("../assets/soundcloud.png")}
                style={{ width: 32, height: 32 }}
              />
              <TextInput style={styles.inputSocial} />
            </View>
            <View style={styles.inputContainerSocial}>
              <Image
                source={require("../assets/tiktok.png")}
                style={{ width: 32, height: 32 }}
              />
              <TextInput style={styles.inputSocial} />
            </View>
            <View style={styles.inputContainerSocial}>
              <Image
                source={require("../assets/insta.png")}
                style={{ width: 32, height: 32 }}
              />
              <TextInput style={styles.inputSocial} />
            </View>
            <View style={styles.inputContainerSocial}>
              <Image
                source={require("../assets/youtube.png")}
                style={{ width: 32, height: 32 }}
              />
              <TextInput style={styles.inputSocial} />
            </View>
            <View style={styles.inputContainerSocial}>
              <Image
                source={require("../assets/spotify.png")}
                style={{ width: 32, height: 32 }}
              />
              <TextInput style={styles.inputSocial} />
            </View>
            <View style={styles.inputContainerSocial}>
              <Image
                source={require("../assets/facebook.png")}
                style={{ width: 32, height: 32 }}
              />
              <TextInput style={styles.inputSocial} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 12,
    fontSize: 16,
    fontFamily: "Rubik-Regular",
    padding: 10,
    borderColor: "#757575",
    marginTop: 5,
  },
  inputContainerSocial: {
    marginHorizontal: 35,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputSocial: {
    borderWidth: 1,
    borderRadius: 12,
    fontSize: 16,
    fontFamily: "Rubik-Regular",
    padding: 10,
    borderColor: "#757575",
    marginTop: 5,
    width: "85%",
  },
  inputContainer: {
    marginHorizontal: 35,
    marginTop: 25,
  },
  inputHeader: {
    color: "#757575",
  },
});
export default EditProfileArtist;
