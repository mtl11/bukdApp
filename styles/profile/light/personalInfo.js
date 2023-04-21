import colors from "../../global";

export default {
    iconColor: colors.color.secondaryColors.iconColor,
    textInputsContanier: {
      marginVertical: "10%",
    },
    container: {
      flex: 1,
      backgroundColor: colors.color.secondaryColors.background,
    },
    largeText: {
      fontSize: 20,
      fontFamily: "Rubik-SemiBold",
      color: colors.color.secondaryColors.text,
    },
    largeContainer: {
      width: "90%",
      justifyContent: "center",
      alignItems: "center",
    },
    inputHeader: {
      color: colors.color.secondaryColors.headerText,
      fontFamily: "Rubik-Regular",
    },
    inputHeaderContainer: {
      marginHorizontal: "8%",
    },
    input: {
      paddingVertical: "5%",
      marginHorizontal: "5%",
      fontSize: 16,
      fontFamily: "Rubik-Regular",
      color: colors.color.secondaryColors.text,
    },
    inputContainer: {
      borderRadius: 12,
      marginHorizontal: "8%",
      marginTop: "5%",
      backgroundColor: colors.color.secondaryColors.adjacent,
    },
    topIconContainer: {
      marginHorizontal: "8%",
      flexDirection: "row",
      // marginTop: "5%"
    },
    headerText: {
      fontFamily: "Rubik-SemiBold",
      fontSize: 18,
    },
    smallerText: {
      fontFamily: "Rubik-Regular",
      fontSize: 16,
      color: "#757575",
      marginTop: 10,
    },
    sectionHeaderContainer: {
      borderBottomWidth: 1,
      margin: 10,
      paddingLeft: 30,
      paddingBottom: 10,
      marginTop: 40,
      flexDirection: "row",
      borderColor: "#757575",
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "center",
      padding: 16,
      marginHorizontal: "8%",
      backgroundColor: colors.color.secondaryColors.main,
      borderRadius: 12,
      marginTop: "90%",
    },
    buttonText: {
      fontFamily: "Rubik-Medium",
      color: "white",
      fontSize: 18,
    },
  }