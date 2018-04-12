import { StyleSheet, Platform } from "react-native";
import Colors from "../../Constants/Colors";
export default StyleSheet.create({
  container: {
    flex: 1
  },

  mainContainer: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover"
  },
  row: {
    padding: 15,
    marginLeft: 6,
    marginRight: 6,
    marginTop: 8,
    backgroundColor: "#F5FCFF"
  },
  listRowContainer: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  title: {
    color: "black",
    fontSize: 16,
    paddingLeft: 10
  },
  normalText: {
    color: "gray",
    fontSize: 16,
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
