import global from "../../global";

export default {
  headerTextColor: "black",
  singleContainer: {
    marginTop: "8%",
    backgroundColor: "white",
    // borderWidth:1,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    marginHorizontal: "8%",

  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: "1%",
    
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    // alignItems: "center",
    marginTop: "5%",
  },
  boxContainer: {
    // // borderTopWidth: 0,
    // borderWidth: 1,
    // borderRadius: 12,
    paddingHorizontal: "5%",
    paddingBottom: "5%",
    borderColor: global.color.secondaryColors.adjacent,
    alignItems: "center",
  },
  container: {
    // marginHorizontal: "8%",
    marginBottom: 120
    // flex:1
  },
  headerText: {
    fontFamily: "Rubik-Medium",
    fontSize: 16,
    color: global.color.secondaryColors.text,
    marginLeft: 10,
  },
  bigText: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    color: global.color.secondaryColors.text,
  }
}