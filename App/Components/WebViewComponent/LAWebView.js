import React, { Component } from "react";

import { connect } from "react-redux";

import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  View,
  Platform,
  WebView,
  Text
} from "react-native";

import { Actions } from "react-native-router-flux";
import styles from "./LAWebViewStyle";
import Colors from "../../Constants/Colors";
import Strings from "../../Constants/Strings";
import CommonStyles from "../../CommonStyle/CommonStyle";
import { BASE_URL } from "../../Constants/APIUrls";
import * as Progress from "react-native-progress";
import APIUrls from "../../Constants/APIUrls";

export default class LAWebView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      webviewLoaded: false,
      userID: this.props.userID,
      pdfURL: ""
    };
  }

  componentDidMount() {
    this.getRentalResumePDFAsync();
  }

  getRentalResumePDFAsync() {
    try {
      fetch(APIUrls.GET_RENTAL_RESUME_PDF + "?userid=" + this.props.userID, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userid: this.props.userID })
      })
        .then(res => res.json())
        .then(res =>
          this.setState({
            webviewLoaded: false,
            pdfURL: APIUrls.GOOGLE_DOCS_VIEWER + BASE_URL + res.Content
          })
        // alert(APIUrls.GOOGLE_DOCS_VIEWER + BASE_URL + res.Content.substring(1))
        ); //console.log(res)
    } catch (error) {
      console.error(error);
    }
  }

  componentWillUnmount() {}

  _onLoadEnd() {
    this.setState({ webviewLoaded: true });
  }

  render() {
    return (
      <View style={styles.container}>
        
        <WebView
          source={{ uri: this.state.pdfURL }}
          scalesPageToFit={true}
          onLoadEnd={this._onLoadEnd.bind(this)}
        />
        {this.state.webviewLoaded ? null : (
          <View style={styles.circles}>
            <Progress.CircleSnail color={["#000000", "#000000", "#000000"]} />
          </View>
        )}
      </View>
    );
  }
}
