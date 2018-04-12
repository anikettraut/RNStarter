import { StyleSheet, Platform, Dimensions } from "react-native";
import Colors from "../../../Constants/Colors";

const window = Dimensions.get("window");

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#E1E1E1"
  },

  seperatorLine: {
    width: window.width * 0.8,
    height: 0,
    backgroundColor: "#E1E1E1",
    marginLeft: 10,
    marginTop: 0,
    margin: 10
  },

  titleSeperatorLine: {
    width: window.width * 0.8,
    height: 2,
    backgroundColor: "#E1E1E1",
    marginLeft: 10,
    margin: 10
  },

  circles: {
    flex: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.TRANSPARENT,
    width: null,
    height: null
  }
});
