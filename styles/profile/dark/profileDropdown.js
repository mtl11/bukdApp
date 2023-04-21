import global from "../../global"

export default {
    activeColor: global.color.primaryColors.adjacent,
    textColor: "white",
    topContainer: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      // marginTop: 10,
    },
    dropContainer: {
      backgroundColor: global.color.primaryColors.adjacent,
      borderColor: global.color.primaryColors.adjacent,
      borderRadius: 12,
      paddingBottom: 10,
    },
    item: {
      backgroundColor: global.color.primaryColors.adjacent,
      borderRadius: 12,
    },
    textItem: {
      color: global.color.primaryColors.text,
      fontSize: 16,
      padding: 20,
      fontFamily: "Rubik-Regular",
    },
    dropdown: {
      width: "84%",
      paddingHorizontal: "5%",
      paddingVertical: "2.5%",
      marginHorizontal: "5%",
      borderColor: global.color.primaryColors.buttonAccent,
      borderRadius: 12,
      marginHorizontal: "8%",
      backgroundColor: global.color.primaryColors.adjacent,
    },
  
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 16,
      color: global.color.primaryColors.placeHolderTextColor,
    },
    selectedTextStyle: {
      fontSize: 16,
      color: global.color.primaryColors.buttonAccent,
    },
    iconStyle: {
      width: 18,
      height: 18,
    },
    inputSearchStyle: {
      fontSize: 16,
      color: global.color.primaryColors.text,
      backgroundColor: global.color.primaryColors.adjacent,
      borderColor: global.color.primaryColors.adjacent,
    },
  }