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
import global from "../styles/global";

const EditProfileArtist = (props) => {
  return (
    <Modal
      visible={props.visible}
      style={{ backgroundColor: "white", height: "100%" }}
      animationType="slide"
    >
      <SafeAreaView
        style={{
          backgroundColor: global.color.primaryColors.background,
          height: "100%",
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            marginHorizontal: "8%",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              props.setModalVisible(false);
            }}
          >
            <Text
              style={{
                color: global.color.primaryColors.text,
                fontSize: 18,
                fontFamily: "Rubik-Regular",
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Rubik-Regular",
              color: global.color.primaryColors.text,
            }}
          >
            Edit Profile
          </Text>
          <TouchableOpacity
            onPress={() => {
              props.setModalVisible(false);
            }}
          >
            <Text
              style={{
                color: global.color.primaryColors.main,
                fontSize: 18,
                fontFamily: "Rubik-Regular",
              }}
            >
              Done
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={"Profile Name"}
              placeholderTextColor={global.color.primaryColors.main}
            />
          </View>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>About</Text>
          </View>
          <View style={[styles.inputContainer, { marginTop: 0 }]}>
            <TextInput
              style={styles.input}
              placeholder={"Location"}
              placeholderTextColor={global.color.primaryColors.main}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={"Category"}
              placeholderTextColor={global.color.primaryColors.main}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={"Genre"}
              placeholderTextColor={global.color.primaryColors.main}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, { marginTop: 10 }]}
              multiline={true}
              placeholder={"Bio"}
              placeholderTextColor={global.color.primaryColors.main}
              maxLength={10}
            />
          </View>
          <View>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Availability</Text>
            </View>
            <View style={styles.timeRow}>
              <View style={styles.timeContainer}>
                <Text style={styles.timeText}>Morning</Text>
              </View>
              <View style={styles.timeContainer}>
                <Text style={styles.timeText}>Afternoon</Text>
              </View>
            </View>
            <View style={[styles.timeRow, { marginTop: "5%" }]}>
              <View style={styles.timeContainer}>
                <Text style={styles.timeText}>Evening</Text>
              </View>
              <View style={styles.timeContainer}>
                <Text style={styles.timeText}>Late Night</Text>
              </View>
            </View>
          </View>
          <View>
            <View style={[styles.dayRow, { marginTop: "10%" }]}>
              <View style={styles.dayContainer}>
                <Text style={styles.timeText}>Mon</Text>
              </View>
              <View style={styles.dayContainer}>
                <Text style={styles.timeText}>Tue</Text>
              </View>
              <View style={styles.dayContainer}>
                <Text style={styles.timeText}>Wed</Text>
              </View>
            </View>
            <View style={[styles.dayRow, { marginTop: "5%" }]}>
              <View style={styles.dayContainer}>
                <Text style={styles.timeText}>Thu</Text>
              </View>
              <View style={styles.dayContainer}>
                <Text style={styles.timeText}>Fri</Text>
              </View>
              <View style={styles.dayContainer}>
                <Text style={styles.timeText}>Sat</Text>
              </View>
            </View>
            <View style={[styles.dayRow, { marginTop: "5%" }]}>
              <View style={styles.dayContainer}>
                <Text style={styles.timeText}>Sun</Text>
              </View>
            </View>
          </View>
          <View>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Social Media Links</Text>
            </View>
            <View style={[styles.inputContainerSocial, { marginTop: 0 }]}>
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
  dayContainer: {
    width: "29%",
    borderColor: global.color.primaryColors.main,
    alignItems: "center",
    padding: "5%",
    borderRadius: 12,
    backgroundColor: global.color.primaryColors.adjacent,
  },
  dayRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "10%",
    borderColor: "white",
  },
  timeText: {
    fontFamily: "Rubik-Regular",
    color: global.color.primaryColors.main,
    fontSize: 16,
  },
  timeContainer: {
    width: "47%",
    borderColor: global.color.primaryColors.main,
    alignItems: "center",
    padding: "5%",
    borderRadius: 12,
    backgroundColor: global.color.primaryColors.adjacent,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "10%",
    borderColor: "white",
  },
  headerText: {
    fontFamily: "Rubik-Regular",
    fontSize: 20,
    color: global.color.primaryColors.text,
  },
  headerContainer: {
    margin: "8%",
  },
  input: {
    paddingVertical: "5%",
    marginHorizontal: "5%",
    fontSize: 16,
    fontFamily: "Rubik-Regular",
    color: global.color.primaryColors.text,
  },
  inputContainerSocial: {
    marginHorizontal: "8%",
    marginTop: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputSocial: {
    fontSize: 16,
    fontFamily: "Rubik-Regular",
    padding: "5%",
    marginTop: 5,
    width: "85%",
    borderRadius: 12,
    marginHorizontal: "8%",
    backgroundColor: global.color.primaryColors.adjacent,
  },
  inputContainer: {
    borderRadius: 12,
    marginHorizontal: "8%",
    marginTop: "5%",
    backgroundColor: global.color.primaryColors.adjacent,
  },
  inputHeader: {
    color: "#757575",
    fontFamily: "Rubik-Regular",
  },
});
export default EditProfileArtist;
