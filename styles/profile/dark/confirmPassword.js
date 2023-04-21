import colors from "../../global";
export default{container: {
  flex: 1,
  backgroundColor: colors.color.primaryColors.background,
},
  placeHolderTextColor: colors.color.primaryColors.placeHolderTextColor,
  iconColor: colors.color.primaryColors.iconColor,
    largeText: {
      fontSize: 20,
      fontFamily: "Rubik-SemiBold",
      color: colors.color.primaryColors.text,
    },
    largeContainer: {
      width: "90%",
      justifyContent: "center",
      alignItems: "center",
    },
    topIconContainer: {
      marginHorizontal: "8%",
      flexDirection: "row",
    },
    input: {
      paddingVertical: "5%",
      marginHorizontal: "5%",
      fontSize: 16,
      fontFamily: "Rubik-Regular",
      color: colors.color.primaryColors.text,
    },
    inputContainer: {
      borderRadius: 12,
      marginHorizontal: "8%",
      marginTop: "8%",
      backgroundColor: colors.color.primaryColors.adjacent,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "center",
      padding: 16,
      marginHorizontal: "8%",
      backgroundColor: colors.color.primaryColors.main,
      borderRadius: 12,
      marginTop: "80%",
    },
    buttonText: {
      fontFamily: "Rubik-Medium",
      color: "white",
      fontSize: 18,
    },
    smallText: {
      fontSize: 18,
      marginHorizontal: "8%",
      alignSelf: "center",
      fontFamily: "Rubik-SemiBold",
      color: colors.color.primaryColors.main,
    },
  }