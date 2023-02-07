import global from "../global";

export default {
  errorContainer:{
    flexDirection: "row",
    justifyContent: "center",
    padding: 16,
    marginHorizontal: "5%",
  },
  errorText:{
    color: global.color.primaryColors.errorText
  },
  passwordInfoContainer:{
    marginHorizontal: "8%",
    marginTop: "5%",
  },
  passwordInfoText:{
    fontFamily: "Rubik-Regular",
    fontSize:14,
    color: global.color.primaryColors.adjacent
  },
  container: {
    backgroundColor: global.color.primaryColors.background,
    flex:1
  },
  image: {
    alignSelf: "center",
    marginTop: "5%",
    resizeMode: "contain",
    width: 120,
    height: 120,
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
  inputContainer2:{
    marginHorizontal: "8%",
    backgroundColor: global.color.primaryColors.adjacent,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 16,
    marginHorizontal: "8%",
    backgroundColor: global.color.primaryColors.main,
    borderRadius: 12,
    marginTop: "25%",
  },
  buttonText: {
    fontFamily: "Rubik-Medium",
    color: "white",
    fontSize: 18,
  },
  dropdown: {
    paddingVertical: "2.5%",
    paddingHorizontal: "5%",
    alignContent: "center",
    borderRadius: 12,
    marginHorizontal: "8%",
    marginTop: "5%",
    backgroundColor: global.color.primaryColors.adjacent,
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: "Rubik-Regular",
    color: global.color.primaryColors.placeHolderTextColor,
  },
  selectedTextStyle: {
    fontSize: 20,
    fontFamily: "Rubik-Regular",
    marginBottom: 15,
    marginHorizontal: 8,
  },
  bigText: {
    fontSize: 20,
    marginHorizontal: "8%",
    fontFamily: "Rubik-SemiBold",
    color: global.color.primaryColors.main,
    alignSelf: "center"
  },
  itemContainerStyle: {
    backgroundColor: global.color.primaryColors.main,
    width: 1,
  },
  topContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: "8%",
    marginTop: "5%",
    alignItems:"center"
  },
  profileText: {
    fontSize: 24,
    fontFamily: "Rubik-Medium",
    color: "white"
  },
};
