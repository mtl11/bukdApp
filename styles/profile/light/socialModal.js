import colors from "../../global";

export default {
    iconColor: colors.color.secondaryColors.iconColor,
    placeHolderTextColor: colors.color.secondaryColors.placeHolderTextColor,
    text: {
        fontSize: 18,
        marginLeft: 40,
        marginRight: 40,
        alignSelf: "center",
        fontFamily: "Rubik-SemiBold",
        color: colors.color.secondaryColors.main,
      },
      topIconContainer: {
        marginHorizontal: "8%",
        marginTop: "7%",
        flexDirection: "row",
      },
      container: {
        flex: 1,
        backgroundColor: colors.color.secondaryColors.background,
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