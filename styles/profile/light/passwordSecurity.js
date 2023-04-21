import colors from "../../global";

export default {
    placeHolderTextColor: colors.color.secondaryColors.placeHolderTextColor,
    iconColor: colors.color.secondaryColors.iconColor,
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
    topIconContainer: {
        marginHorizontal: "8%",
        flexDirection: "row",
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
        marginTop: "8%",
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
    smallText: {
        fontSize: 18,
        marginHorizontal: "8%",
        alignSelf: "center",
        fontFamily: "Rubik-SemiBold",
        color: colors.color.secondaryColors.main,
    },
}