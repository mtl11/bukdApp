import global from "../../global"

export default {
    iconColor: "white",
    placeHolderColor: global.color.primaryColors.placeHolderTextColor,
    container: {
        height: "100%",
        backgroundColor: global.color.primaryColors.background,
    },
    backButtonContainer: {
        marginLeft: "8%",
        alignSelf: "flex-start"
    },
    headerText:{
        fontSize: 32,
        marginLeft: 40,
        marginRight: 40,
        alignSelf: "center",
        fontFamily: "Rubik-SemiBold",
        color: global.color.primaryColors.headerText,
    },
    smallText: {
        fontSize: 18,
        marginLeft: 40,
        marginRight: 40,
        alignSelf: "center",
        fontFamily: "Rubik-SemiBold",
        color: global.color.primaryColors.main,
        lineHeight: 25,
        textAlign:"center"
    },
    input: {
        paddingVertical: "5%",
        marginHorizontal: "5%",
        fontSize: 16,
        fontFamily: "Rubik-Regular",
        color: global.color.primaryColors.text,
    },
    inputContainer: {
        borderRadius: 12,
        marginHorizontal: "8%",
        marginTop: "5%",
        backgroundColor: global.color.primaryColors.adjacent,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        padding: 16,
        marginHorizontal: "8%",
        backgroundColor: global.color.primaryColors.main,
        borderRadius: 12,
        marginTop: "80%",
    },
    buttonText: {
        fontFamily: "Rubik-Medium",
        color: "white",
        fontSize: 18,
    },
}