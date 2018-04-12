import React, { Component } from "react";

import {
  Image,
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Alert,
  Platform,
  ScrollView,
  AsyncStorage,
  StatusBar
} from "react-native";

import { Actions } from "react-native-router-flux";
import Colors from "../../Constants/Colors";
import Strings from "../../Constants/Strings";
import styles from "./SplashScreenStyle";

import splashImage from "../../Assets/splash.png";

class SplashScreen extends Component {
  constructor() {
    super();
    this.state = {
      accessToken: ""
    };
  }

  componentWillMount() {
    setTimeout(() => {
      Actions.HomeScreen({ type: "reset" });

      // AsyncStorage.getItem("kUserInfo").then((data) => {
      //     if(data) {
      //         var userData = JSON.parse(data);
      //         if(userData.token){
      //             Actions.HomeScreen({type: "reset"});
      //         }else{
      //             Actions.WelcomeScreen({type: "reset"});
      //         }
      //     }else{
      //         Actions.WelcomeScreen({type: "reset"});
      //     }
      // }).done();
    }, 2000);
  }

  componentWillUnmount() {}

  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <StatusBar backgroundColor={Colors.BLACK} barStyle="light-content" />
        <Image source={splashImage} style={styles.mainContainer} />
      </View>
    );
  }
}

export default SplashScreen;
