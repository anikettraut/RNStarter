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
  Dimensions
} from "react-native";

//import CacheStore from 'react-native-cache-store';

import { Actions } from "react-native-router-flux";
import Colors from "../../Constants/Colors";
import Strings from "../../Constants/Strings";
import styles from "./TenantProfileScreenStyle";
import defualtUserProfile from "../../Assets/userAvtar.png";
import profileStatus from "../../Assets/profile_status.png";
import rentalResume from "../../Assets/rental_resume.png";
import mySearches from "../../Assets/my_searches.png";
import vettingStatus from "../../Assets/vetting_status.png";
import biddingStatus from "../../Assets/bidding_status.png";
import viewPDF from "../../Assets/view_as_pdf.png";
import logoutIcon from "../../Assets/white_logout.png";
import transactions from "../../Assets/transaction.png";
import APIUrls from "../../Constants/APIUrls";
import propertyInspection from "../../Assets/property_inspection.png";
import appIcon from "../../Assets/app_icon.png";
import homebg from "../../Assets/homebg.png";
import logo from "../../Assets/logo.png";

const window = Dimensions.get("window");

import * as Animatable from 'react-native-animatable';

class TenantProfileScreen extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    console.log(
      "loggedInUserData>>>> " + JSON.stringify(this.props.loggedInUserData)
    );
  }

  componentWillUnmount() {}

  onRentalResumeClick() {
    Actions.RentalResumeMenu();
  }

  onProfileStatusClick() {
    Actions.ProfileStatusScreen({
      loggedInUserData: this.props.loggedInUserData
    });
  }

  onMySearchesClick() {
    Actions.SavedSearchesScreen();
  }

  onMyTransactionsClick() {
    Actions.Transactions();
  }

  onBiddingStatusClick() {
    Actions.BiddingStatusListingComponent();
  }

  onInspectionsClick() {
    Actions.Inspections();
  }

  onLogoutClick() {
    Alert.alert(
      "LeaseAgent",
      Strings.LOGOUT_CONFIRMATION_MSG,
      [
        { text: "Yes", onPress: () => this.callUserLogoutWebService() },
        { text: "No", onPress: () => console.log("Logout Denied") }
      ],
      { cancelable: false }
    );
  }

  callUserLogoutWebService() {
    AsyncStorage.clear();
    //CacheStore.flush();
    Actions.pop();
  }

  onViewPDFClick() {
    if (this.props.loggedInUserData.IsRentalResumeCompleted) {
      Actions.LAWebView({
        userID: this.props.loggedInUserData.ID,
        webViewTitle: "Rental Resume"
      });
    } else {
      alert(Strings.ERROR_INCOMPLETE_RESUME);
    }
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.profileImageContainer}>
          <View style={styles.userImageViewStyle}>
            <Image style={styles.userImageStyle} source={appIcon} />
          </View>
          <TouchableOpacity
            onPress={() => this.onLogoutClick()}
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              alignItems: "center"
            }}
          >
            <Image source={logoutIcon} style={{ height: 18, width: 18 }} />

            {/* <Text style={{ color: "red", fontSize: 12 }}>Logout</Text> */}
          </TouchableOpacity>
          <View style={styles.userInfoViewStyle}>
            <Text style={styles.textColorStyle}>
              {this.props.loggedInUserData.FirstName
                ? this.props.loggedInUserData.FirstName
                : ""}
            </Text>
            <Text style={styles.textColorStyle}>
              {this.props.loggedInUserData.Email
                ? this.props.loggedInUserData.Email
                : ""}
            </Text>
          </View>
        </View>

        {this.props.loggedInUserData.IsRentalResumeCompleted ? null : (
          <View style={{ height: 100 }}>
            <View
              style={{
                height: 50,
                backgroundColor: Colors.APP_THEME_RED_COLOR,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: "#ffffff",
                  fontWeight: "bold",
                  width: window.width * 0.95
                }}
              >
                {Strings.RENTAL_RESUME_ALERT_TITLE}
              </Text>
            </View>
            <View
              style={{
                height: 50,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: "#000000",
                  fontWeight: "bold",
                  width: window.width * 0.9
                }}
              >
                {Strings.RENTAL_RESUME_ALERT_MESSAGE}
              </Text>
            </View>
          </View>
        )}

        <ScrollView>
          <View
            style={{
              flex: 1,
              backgroundColor: "#EFEFEF",
              paddingLeft: 20,
              paddingRight: 20,
              paddingBottom: 68
            }}
          >
            <View style={styles.tabViewStyle}>
              <TouchableOpacity onPress={() => this.onProfileStatusClick()}>
                <Animatable.View animation="flipInY" style={styles.cardViewStyle}>
                  <Image source={profileStatus} />
                  <Text style={{ marginTop: 10 }}>Profile Status</Text>
                </Animatable.View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.onRentalResumeClick()}>
                <Animatable.View animation="flipInY" style={styles.cardViewStyle}>
                  <Image source={rentalResume} />
                  <Text style={{ marginTop: 10 }}>Rental Resume</Text>
                </Animatable.View>
              </TouchableOpacity>
            </View>

            <View style={styles.tabViewStyle}>
              <TouchableOpacity onPress={() => this.onMySearchesClick()}>
                <Animatable.View animation="flipInY" style={styles.cardViewStyle}>
                  <Image source={mySearches} />
                  <Text style={{ marginTop: 10 }}>My Searches</Text>
                </Animatable.View>
              </TouchableOpacity>

              {/*<TouchableOpacity >   
                                                            <View style={styles.cardViewStyle}>
                                                                <Image source={vettingStatus} ></Image>
                                                                <Text style={{marginTop:10}}>Vetting Status</Text>
                                                            </View>
                                                        </TouchableOpacity>*/}
              <TouchableOpacity onPress={() => this.onMyTransactionsClick()}>
                <Animatable.View animation="flipInY" style={styles.cardViewStyle}>
                  <Image
                    style={{ width: 70, height: 70 }}
                    source={transactions}
                  />
                  <Text>Transactions</Text>
                </Animatable.View>
              </TouchableOpacity>
            </View>

            <View style={styles.tabViewStyle}>
              <TouchableOpacity onPress={() => this.onBiddingStatusClick()}>
                <Animatable.View animation="flipInY" style={styles.cardViewStyle}>
                  <Image source={biddingStatus} />
                  <Text style={{ marginTop: 10 }}>Bidding Status</Text>
                </Animatable.View>
              </TouchableOpacity>

              {/*    <TouchableOpacity onPress={() => this.onViewPDFClick()}>
                <View style={styles.cardViewStyle}>
                  <Image source={viewPDF} />
                  <Text style={{ marginTop: 10 }}>View as PDF</Text>
                </View>
              </TouchableOpacity> */}

              <TouchableOpacity onPress={() => this.onInspectionsClick()}>
                <Animatable.View animation="flipInY" style={styles.cardViewStyle}>
                  <Image
                    style={{ width: 70, height: 70 }}
                    source={propertyInspection}
                  />
                  <Text style={{ marginTop: 10 }}>Inspections</Text>
                </Animatable.View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

module.exports = TenantProfileScreen;
