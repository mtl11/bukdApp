import global from "../../global";
export default {
    iconColor: global.color.secondaryColors.buttonAccent,
    infoIconColor: "black",
    buttonContainer: {
        alignItems: "center",
        padding: 16,
        marginHorizontal: "8%",
        backgroundColor: global.color.secondaryColors.main,
        borderRadius: 12,
        marginTop: "20%"
    },
    buttonText: {
        fontFamily: "Rubik-Medium",
        color: "white",
        fontSize: 18,
    },
    textContainer: {
        marginHorizontal: 30
    },
    smallerText: {
        fontFamily: "Rubik-Regular",
        color: global.color.secondaryColors.text,
        fontSize: 18,
        lineHeight: 25,
        textAlign:"center"
    },
    bigText: {
        fontFamily: "Rubik-SemiBold",
        fontSize: 32, color: global.color.secondaryColors.headerText
    },
    headerContainer: {
        flexDirection: "row",
        marginTop: "7%"
        // alignItems: "center" 
    },
    headerText: {
        fontFamily: "Rubik-SemiBold",
        color: global.color.secondaryColors.text,
        fontSize: 18,
        lineHeight: 25
    },
    regularText: {
        fontFamily: "Rubik-Regular",
        color: global.color.secondaryColors.text,
        fontSize: 18,
        lineHeight: 25,
    },
    modalView: {

        backgroundColor: global.color.secondaryColors.background,
        height: "100%",
    },

}