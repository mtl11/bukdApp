import global from "../../global";

export default {
    headerTextColor: "black", 
    singleContainer: {
      marginTop: "8%",
    },
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      margin: "1%",
    },
    timeContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "5%",
    },
    boxContainer: {
      borderTopWidth: 0,
      borderWidth: 1,
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
      paddingHorizontal: "5%",
      paddingBottom: "5%",
      borderColor: global.color.secondaryColors.adjacent,
      // backgroundColor: global.color.secondaryColors.buttonBackground
    },
    container: {
      marginHorizontal: "8%",
      // flex:1
    },
    headerText: {
      fontFamily: "Rubik-Regular",
      fontSize: 16,
      color: global.color.secondaryColors.main,
      marginLeft: 10,
    },
    bigText: {
      fontFamily: "Rubik-SemiBold",
      fontSize: 20,
      color: global.color.secondaryColors.text,
    },
  }