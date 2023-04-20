
import global from "../../global";

export default {
    list: {
        alignItems: "center",
        paddingVertical: "10%",
    },
    socialContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 12,
        width: "80%",
        marginBottom: "5%",
        padding: 10,
        paddingHorizontal: "5%",
        backgroundColor: global.color.primaryColors.adjacent,
    },
    socialLogo: {
        height: 40,
        width: 40,
    },
    socialText: {
        fontFamily: "Rubik-Regular",
        fontSize: 18,
        color: global.color.primaryColors.text,
    },
}