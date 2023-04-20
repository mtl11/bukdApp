import global from "../../global"
export default {
    iconColor: global.color.secondaryColors.iconColor,
    editProfileText: {
        color: "white",
        fontFamily: "Rubik-Medium",
        fontSize: 18,
    },
    tabView: {
        borderBottomWidth: 1,
        marginTop: 5,
        alignItems: "center",
        borderColor: global.color.secondaryColors.adjacent,
    },
    tabTextContainer: {
        paddingHorizontal: 15,
        borderRadius: 10,
        paddingBottom: 10,
    },
    tabContainer: {
        width: "50%",
        alignItems: "center",
    },
    tabBottomBar: {
        borderWidth: 2.5,
        borderRadius: 12,
        borderColor: global.color.secondaryColors.main,
        backgroundColor: global.color.secondaryColors.main,
    },
    tabText: {
        color: global.color.secondaryColors.text,
        fontFamily: "Rubik-Regular",
        fontSize: 16,
    },
    socialLogo: {
        height: 30,
        width: 30,
    },
    profilePic: {
        width: 120,
        height: 120,
        borderRadius: 100,
    },
    topIconContainer: {
        alignSelf: "flex-end",
        marginHorizontal: 30,
    },
    container: {
        backgroundColor: global.color.secondaryColors.background,
        height: "100%",
    },
    iconContainer: {
        justifyContent: "center",
    },
    profilePicContainer: {
        alignSelf: "center",
        borderRadius: 100,
        // marginTop: "3%",
        justifyContent: "center",
        borderWidth: 3,
        borderColor: "black",
        // shadowColor: "#000",
        // shadowOffset: { width: 0, height: 0 },
        // shadowOpacity: 0.41,
        // shadowRadius: 4,
    },
    usernameContainer: {
        alignSelf: "center",
        marginTop: 5,
    },
    usernameText: {
        fontFamily: "Rubik-SemiBold",
        fontSize: 24,
        color: global.color.secondaryColors.text,
    },
}