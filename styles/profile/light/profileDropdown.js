import global from "../../global"

export default {
    activeColor:global.color.secondaryColors.adjacent,
    textColor: "black",
    topContainer: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      // marginTop: 10,
    },
    dropContainer: {
      backgroundColor: global.color.secondaryColors.adjacent,
      borderColor: global.color.secondaryColors.adjacent,
      borderRadius: 12,
      paddingBottom: 10,
    },
    item: {
      backgroundColor: global.color.secondaryColors.adjacent,
      borderRadius: 12,
    },
    textItem: {
      color: global.color.secondaryColors.text,
      fontSize: 16,
      padding: 20,
      fontFamily: "Rubik-Regular",
    },
    dropdown: {
      width: "84%",
      paddingHorizontal: "5%",
      paddingVertical: "2.5%",
      marginHorizontal: "5%",
      borderColor: global.color.secondaryColors.buttonAccent,
      borderRadius: 12,
      marginHorizontal: "8%",
      backgroundColor: global.color.secondaryColors.adjacent,
    },
  
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 16,
      color: global.color.secondaryColors.placeHolderTextColor,
    },
    selectedTextStyle: {
      fontSize: 16,
      color: "black",
    },
    iconStyle: {
      width: 18,
      height: 18,
    },
    inputSearchStyle: {
      fontSize: 16,
      color: global.color.secondaryColors.text,
      backgroundColor: global.color.secondaryColors.adjacent,
      borderColor: global.color.secondaryColors.adjacent,
    },
  }