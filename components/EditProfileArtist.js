import React, { useState } from "react";
import { View, Modal, Text, SafeAreaView, Touchable, TouchableOpacity } from "react-native";

const EditProfileArtist = (props) => {
  return (
    <Modal visible={props.visible}
    style={{backgroundColor: "white", height: "100%"}}
    animationType="slide"
    >
      <SafeAreaView style={{backgroundColor: "white", height: "100%"}}>
        <View style={{alignItems: "center", justifyContent:"space-between", flexDirection: "row", marginHorizontal: 20}}>
            <TouchableOpacity onPress={()=>{props.setModalVisible(false)}}>
                <Text style={{color:"red", fontSize: 16, fontFamily: "Rubik-Regular"}}>Cancel</Text>
            </TouchableOpacity>
            <Text style={{fontSize: 17, fontFamily: "Rubik-Regular"}}>Edit Profile</Text>
            <TouchableOpacity>
                <Text style={{color: "#2A51DB", fontSize: 16, fontFamily: "Rubik-Regular"}}>Done</Text>
            </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default EditProfileArtist;
