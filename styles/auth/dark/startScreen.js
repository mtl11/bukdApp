import global from "../../global";

export default {
  iconColor: global.color.primaryColors.buttonAccent,
  placeHolderTextColor:global.color.primaryColors.placeHolderTextColor,
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: 20,
    fontFamily: "Rubik-Medium",
    color: global.color.primaryColors.main
  },
  welcomeContainer: {
    alignSelf: "center",
    marginBottom: "10%",
    marginTop: "10%"
  },
  stripedImage: {
    alignSelf: "center",
    width: 50,
    height: 26,
    resizeMode: "contain",
    
  },
  logoImage: {
    width: 60,
    height: 45,
    resizeMode: "contain",
    marginHorizontal: "1%"
  },
  image: {
    // alignSelf: "center",
    // marginTop: "30%",
    width: 125,
    height: 45,
    resizeMode: "contain",
    marginHorizontal: "1%"
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginHorizontal: "8%",
    marginTop: 10,
    marginBottom: 20,
  },
  container: {
    backgroundColor: global.color.primaryColors.background,
    height: "100%",
  },
  forgotPasswordText: {
    fontFamily: "Rubik-Medium",
    color: global.color.primaryColors.main,
    fontSize: 16,
  },
  input: {
    paddingVertical: "5%",
    marginHorizontal: "5%",
    fontSize: 16,
    fontFamily: "Rubik-Regular",
    color: global.color.primaryColors.text
  },
  inputContainer: {
    borderRadius:12,
    marginHorizontal: "8%",
    marginTop: "5%",
    backgroundColor: global.color.primaryColors.adjacent,
  },
  buttonContainer: {
    alignItems: "center",
    padding: 16,
    marginHorizontal: "8%",
    backgroundColor: global.color.primaryColors.main,
    borderRadius: 12,
    marginTop: "7%"
  },
  buttonTextSignUp: {
    fontFamily: "Rubik-Medium",
    fontSize: 18,
    color: global.color.primaryColors.main,
  },
  buttonText: {
    fontFamily: "Rubik-Medium",
    color: "white",
    fontSize: 18,
  },
  newAccountContainer:{
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "33%"
  },
  newAccountText:{
    fontFamily: "Rubik-Regular",
    fontSize: 18,
    color: global.color.primaryColors.buttonAccent
  }
};
