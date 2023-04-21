import colors from "../../../styles/global";
export default {
    iconColor: colors.color.primaryColors.iconColor,
    copyrightColor: "white",
    container: {
        flex: 1,
        backgroundColor: colors.color.primaryColors.background,
    },
    copyrightContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
    },
    infoContainer: {
        alignItems: "center",
        //   marginTop: 60,
    },
    signOutText: {
        fontFamily: "Rubik-Regular",
        color: colors.color.primaryColors.main,
        fontSize: 20,
        marginHorizontal: 7.5,
    },
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
    signOutContainer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: "50%",
        marginVertical: "15%",
    },
    topIconContainer: {
        marginHorizontal: "8%",
        flexDirection: "row",
    },
    labelText: {
        fontFamily: "Rubik-Regular",
        fontSize: 20,
        color: colors.color.primaryColors.text,
    },
    labelContainer: {
        marginHorizontal: "8%",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "space-between",
        marginTop: "8%",
    },
    mainTextContainer: {
        marginLeft: "8%",
        marginTop: "10%",
    },
    headerText: {
        fontFamily: "Rubik-SemiBold",
        fontSize: 24,
        color: colors.color.primaryColors.main,
    },
    smallerText: {
        fontFamily: "Rubik-Regular",
        fontSize: 16,
        color: colors.color.primaryColors.text,
        marginTop: "2%",
    },
    sectionHeaderContainer: {
        borderBottomWidth: 1,
        margin: 10,
        paddingLeft: 30,
        paddingBottom: 10,
        marginTop: "10%",
        flexDirection: "row",
        borderColor: colors.color.primaryColors.adjacent,
    },
    sectionHeaderText: {
        fontSize: 20,
        fontFamily: "Rubik-SemiBold",
        marginHorizontal: 15,
        color: colors.color.primaryColors.main,
    },
}