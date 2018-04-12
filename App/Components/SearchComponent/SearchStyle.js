import { StyleSheet, Platform, Dimensions } from "react-native";
import Colors from "../../Constants/Colors";
const window = Dimensions.get("window");
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE
  },

  autocompleteView: {
    width: window.width * 0.85,
    height: 40,
    marginLeft: 5,
    marginTop: 20,
    backgroundColor: "#FFF",
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 5
  },

  autocomplete: {
    alignSelf: "stretch",
    marginLeft: 5,
    height: 30,
    backgroundColor: "#FFF",
    borderBottomLeftRadius: 5
  },

  titlelineTextStyle: {
    color: Colors.BLACK,
    fontSize: 18,
    marginLeft: 20
  },

  titlelineContainerViewStyle: {
    backgroundColor: Colors.TRANSPARENT,
    marginTop: 20,
    height: 44,
    justifyContent: "center"
  },

  listViewStyle: {
    marginTop: 0,
    backgroundColor: Colors.WHITE,
    height: window.height * 0.55
  },

  list: {
    paddingBottom: 20
  },

  listRowContainerStyle: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 20,
    marginBottom: 10,
    alignItems: "center"
  },

  propertyImageStyle: {
    width: 130,
    height: 130,
    marginTop: 10,
    marginBottom: 10
  },

  propertyDetailViewStyle: {
    paddingLeft: 12,
    justifyContent: "center",
    width: window.width * 0.55
  },

  propertyNameTextStyle: {
    color: Colors.BLACK,
    fontSize: 18,
    marginBottom: 10
  },

  propertyAttributeTextStyle: {
    color: Colors.BLACK,
    fontSize: 11,
    fontWeight: "bold",
    width: window.width * 0.35
  },

  propertyValueBoldTextStyle: {
    color: Colors.BLACK,
    fontSize: 11,
    fontWeight: "bold"
  },

  propertyValueTextStyle: {
    color: Colors.BLACK,
    fontSize: 11
  },

  propertyAttributeViewStyle: {
    marginBottom: 5,
    flexDirection: "row",
    width: window.width * 0.45
  },

  clockImageStyle: {
    marginLeft: 5
  },

  cell: {
    flex: 1,
    height: 60,
    justifyContent: "center"
  },

  cellText: {
    color: "#4c4c4c",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 20
  },

  imageContainerStyle: {
    marginTop: Platform.OS === "ios" ? 50 : 0,
    width: window.width,
    height: Platform.OS === "ios" ? window.height * 0.4 : window.height * 0.99,
    backgroundColor: Colors.BLACK,
    alignItems: Platform.OS === "ios" ? "center" : "center",
    alignSelf: "center",
    justifyContent: "center"
  },

  imageSliderStyle: {
    marginTop: Platform.OS === "ios" ? 50 : 80,
    width: window.width,
    height: Platform.OS === "ios" ? window.height * 0.4 : window.height * 0.4,
    backgroundColor: Colors.BLACK,
    alignItems: Platform.OS === "ios" ? "center" : "stretch",
    alignSelf: "center",
    justifyContent: "center"
  },

  labelContainerStyle: {
    width: window.width,
    backgroundColor: Colors.BLACK,
    alignItems: "center",
    justifyContent: "center"
  },

  findARentalTitle: {
    position: "absolute",
    top: 0,
    fontSize: 22,
    fontWeight: "700",
    color: "#ffffff",
    backgroundColor: Colors.TRANSPARENT
  },

  getTheRightHomeTitle: {
    position: "absolute",
    top: 30,
    fontSize: 15,
    color: "#ffffff",
    backgroundColor: Colors.TRANSPARENT
  },

  welcomeTitle: {
    fontSize: 22,
    color: "#ffffff",
    marginTop: 5
  },

  leaseAgentDiscTitle: {
    fontSize: 14,
    color: "#ffffff",
    margin: 20,
    textAlign: "justify",
    paddingBottom: 20
  },

  copyrightTitle: {
    fontSize: 12,
    color: Colors.GRAY_COLOR,
    paddingTop: 25,
    paddingTop: Platform.OS === "ios" ? 15 : 5,
    paddingBottom: Platform.OS === "ios" ? 20 : 220,
    backgroundColor: Colors.TRANSPARENT
  }
});
