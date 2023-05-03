import global from "../../global"
export default {
    iconColor: "white",
    editProfileText: {
        color: "white",
        fontFamily: "Rubik-Medium",
        fontSize: 18,
    },
    tabView: {
        borderBottomWidth: 1,
        marginTop: 10,
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
        color: global.color.secondaryColors.placeHolderTextColor,
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
        // overflow: 'hidden'
    },
    topIconContainer: {
        alignSelf: "flex-end",
        marginHorizontal: 30,
    },
    container: {
        backgroundColor: "#FCFCFF",
        height: "100%",
    },
    iconContainer: {
        justifyContent: "center",
    },
    profilePicContainer: {
        alignItems: "center",
        overflow: 'hidden',
        flex:1,
        borderRadius: 100,
        marginTop: 50,
        justifyContent: "center",
        borderWidth: 3,
        borderColor: global.color.secondaryColors.main,
    },
    usernameContainer: {
        // marginTop: 5,
    },
    usernameText: {
        fontFamily: "Rubik-SemiBold",
        fontSize: 20,
        color: global.color.secondaryColors.text,
    },
}