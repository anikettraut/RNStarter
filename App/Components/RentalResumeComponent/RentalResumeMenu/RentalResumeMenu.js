import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Image,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  Platform,
  ScrollView,
  AsyncStorage,
  Dimensions,
  InteractionManager
} from "react-native";

import {
  clearGetRentalResumeStatesResponse,
  stopRefreshRentalResumeMenu
} from "./RentalResumeMenuAction";

import { getRentalResumeStates } from "../../../Action/ActionCreators";

import { Actions } from "react-native-router-flux";

import Colors from "../../../Constants/Colors";
import Strings from "../../../Constants/Strings";
import styles from "./RentalResumeStyle";
import CommonStyles from "../../../CommonStyle/CommonStyle";

import ImageSlider from "react-native-image-slider";
import * as Progress from "react-native-progress";
import * as Animatable from 'react-native-animatable';

import appLogoImage from "../../../Assets/logo.png";
import checkImage from "../../../Assets/check_selected.png";
import uncheckImage from "../../../Assets/check.png";

import home_selectedImage from "../../../Assets/home_selected.png";
import home_unselectedImage from "../../../Assets/home_unselected.png";

import pets_selectedImage from "../../../Assets/pets_selected.png";
import pets_unselectedImage from "../../../Assets/pets_unselected.png";

import resident_selectedImage from "../../../Assets/resident_selected.png";
import resident_unselectedImage from "../../../Assets/resident_unselected.png";

import user_selectedImage from "../../../Assets/user_selected.png";
import user_unselectedImage from "../../../Assets/user_unselected.png";

import bond_selectedImage from "../../../Assets/bond_selected.png";
import bond_unselectedImage from "../../../Assets/bond_unselected.png";

import contact_selectedImage from "../../../Assets/contact_selected.png";
import contact_unselectedImage from "../../../Assets/contact_unselected.png";

import employement_selectedImage from "../../../Assets/employement_selected.png";
import employement_unselectedImage from "../../../Assets/employement_unselected.png";

import file_selectedImage from "../../../Assets/file_selected.png";
import file_unselectedImage from "../../../Assets/file_unselected.png";

import history_selectedImage from "../../../Assets/history_selected.png";
import history_unselectedImage from "../../../Assets/history_unselected.png";

import id_selectedImage from "../../../Assets/id_selected.png";
import id_unselectedImage from "../../../Assets/id_unselected.png";

import reference_selectedImage from "../../../Assets/reference_selected.png";
import reference_unselectedImage from "../../../Assets/reference_unselected.png";

const window = Dimensions.get("window");

class RentalResumeMenu extends Component {
  constructor() {
    super();
    this.state = {
      isScreenLoading: false,
      loggedInUserData: "",

      rentalstatespercent: "",

      rentalResumeGuide:
        "Your Rental Resume looks incomplete, please fill it today!",
      buttonTitle: "Continue where you left off",

      BasicProfile: false,
      OtherResidents: false,
      Pets: false,
      ResidentialHistory: false,
      PreviousAddress: false,
      Employment: false,
      PreEmployment: false,
      IDDocuments: false,
      SuppDocuments: false,
      PersonalReference: false
    };
  }

  componentWillMount() {
    AsyncStorage.getItem("loggedInUserInfo")
      .then(value => {
        if (value) {
          var loggedInUserData = JSON.parse(value);

          this.setState({ loggedInUserData: loggedInUserData });
          this.callGetRentalResumeStatesWebService(loggedInUserData.ID);
        }
      })
      .done();
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {});
  }

  componentWillReceiveProps(nextProps) {
    // Handle getRentalResumeStates service response
    if (
      nextProps.rentalResumeStates != undefined &&
      nextProps.rentalResumeStates != ""
    ) {
      this.setState({ isScreenLoading: false });

      if (nextProps.rentalResumeStates.headerResponse.status == 200) {
        if (nextProps.rentalResumeStates.data.Content != null) {
          this.setState({
            rentalstatespercent: nextProps.rentalResumeStates.data.Content
              .rentalstatespercent
              ? nextProps.rentalResumeStates.data.Content.rentalstatespercent
              : "",
            BasicProfile: nextProps.rentalResumeStates.data.Content.rentalstates
              .BasicProfile
              ? nextProps.rentalResumeStates.data.Content.rentalstates
                  .BasicProfile
              : false,
            OtherResidents: nextProps.rentalResumeStates.data.Content
              .rentalstates.OtherResidents
              ? nextProps.rentalResumeStates.data.Content.rentalstates
                  .OtherResidents
              : false,
            Pets: nextProps.rentalResumeStates.data.Content.rentalstates.Pets
              ? nextProps.rentalResumeStates.data.Content.rentalstates.Pets
              : false,
            ResidentialHistory: nextProps.rentalResumeStates.data.Content
              .rentalstates.ResidentialHistory
              ? nextProps.rentalResumeStates.data.Content.rentalstates
                  .ResidentialHistory
              : false,
            PreviousAddress: nextProps.rentalResumeStates.data.Content
              .rentalstates.PreviousAddress
              ? nextProps.rentalResumeStates.data.Content.rentalstates
                  .PreviousAddress
              : false,
            Employment: nextProps.rentalResumeStates.data.Content.rentalstates
              .Employment
              ? nextProps.rentalResumeStates.data.Content.rentalstates
                  .Employment
              : false,
            PreEmployment: nextProps.rentalResumeStates.data.Content
              .rentalstates.PreviousEmployment
              ? nextProps.rentalResumeStates.data.Content.rentalstates
                  .PreviousEmployment
              : false,
            IDDocuments: nextProps.rentalResumeStates.data.Content.rentalstates
              .IDDocuments
              ? nextProps.rentalResumeStates.data.Content.rentalstates
                  .IDDocuments
              : false,
            SuppDocuments: nextProps.rentalResumeStates.data.Content
              .rentalstates.SuppDocuments
              ? nextProps.rentalResumeStates.data.Content.rentalstates
                  .SuppDocuments
              : false,
            PersonalReference: nextProps.rentalResumeStates.data.Content
              .rentalstates.PersonalReference
              ? nextProps.rentalResumeStates.data.Content.rentalstates
                  .PersonalReference
              : false
          });

          if (
            nextProps.rentalResumeStates.data.Content.rentalstatespercent
              .PercentComplete == 0
          ) {
            this.setState({
              buttonTitle: "Start filling Rental Resume",
              rentalResumeGuide: Strings.RENTAL_RESUME_GUIDE_FIRST
            });
          } else if (
            nextProps.rentalResumeStates.data.Content.rentalstatespercent
              .PercentComplete == 100
          ) {
            this.setState({
              buttonTitle: "View as PDF",
              rentalResumeGuide: Strings.RENTAL_RESUME_GUIDE_THIRD
            });
          } else {
            this.setState({
              buttonTitle: "Continue where you left off",
              rentalResumeGuide: Strings.RENTAL_RESUME_GUIDE_SECOND
            });
          }
        } else {
          alert(nextProps.rentalResumeStates.data.ReturnMessage[0]);
        }
      } else if (nextProps.rentalResumeStates.headerResponse.status == 400) {
        alert(nextProps.rentalResumeStates.data.error_description);
      } else if (nextProps.rentalResumeStates.headerResponse.status == 500) {
        alert("Internal Server Error");
      }
    }

    // Handle refreshRentalResumeMenu Action
    if (
      nextProps.isRefreshRentalResumeMenu != undefined &&
      nextProps.isRefreshRentalResumeMenu != ""
    ) {
      if (nextProps.isRefreshRentalResumeMenu == 1) {
        this.callGetRentalResumeStatesWebService(
          this.state.loggedInUserData.ID
        );
      }
    }
  }

  componentDidUpdate() {
    if (
      this.props.rentalResumeStates != undefined &&
      this.props.rentalResumeStates != ""
    ) {
      this.props.clearGetRentalResumeStatesResponse();
    }

    if (
      this.props.isRefreshRentalResumeMenu != undefined &&
      this.props.isRefreshRentalResumeMenu != ""
    ) {
      this.props.stopRefreshRentalResumeMenu();
    }
  }

  componentWillUnmount() {}

  callGetRentalResumeStatesWebService(userID) {
    /***************** Call getRentalResumeStates WebService ****************/

    this.setState({ isScreenLoading: true });
    var postData = {
      UserId: userID
    };
    this.props.getRentalResumeStates(postData);
    /*************************************************************************/
  }

  onGeneralInfoClicked() {
    Actions.GeneralInfoScreen({ showComponent: 0 });
  }

  onOtherInformationClicked() {
    Actions.OtherInformationScreen({ showComponent: 0 });
  }

  onPetsClicked() {
    Actions.PetsScreen();
  }

  onCurrentAddressClicked() {
    //Actions.OtherResidentScreen();
    Actions.CurrentAddressScreen();
  }

  onPreResidentialAddressClicked() {
    Actions.PreviousResidentialAddressScreen();
  }

  onEmploymentHistoryClicked() {
    Actions.EmploymentHistoryScreen();
  }

  onPreEmploymentDetailClicked() {
    Actions.PreviousEmploymentDetails();
  }

  onIdentificationDocClicked() {
    Actions.IdentificationDocScreen();
  }

  onSupportiveDocClicked() {
    Actions.SupportiveDocScreen();
  }

  onContRefClicked() {
    Actions.ContactReferenceScreen();
  }

  continueWhereLeft() {
    if (this.state.rentalstatespercent == 0) {
      Actions.GeneralInfoScreen({ showComponent: 1 });
      return;
    }

    if (this.state.rentalstatespercent.PercentComplete == 100) {
      // Actions.LAWebView({webViewTitle:'ABC', webURL:'https://www.google.co.in'});

      if (this.state.loggedInUserData.IsRentalResumeCompleted) {
        Actions.LAWebView({
          userID: this.state.loggedInUserData.ID,
          webViewTitle: "Rental Resume"
        });
      } else {
        alert(Strings.ERROR_INCOMPLETE_RESUME);
      }

      return;
    }

    if (this.state.rentalstatespercent != "") {
      if (
        this.state.rentalstatespercent.Currentpage != undefined &&
        this.state.rentalstatespercent.Currentpage != ""
      ) {
        if (this.state.rentalstatespercent.Currentpage == "BasicDetail") {
          Actions.GeneralInfoScreen({ showComponent: 1 });
        } else if (this.state.rentalstatespercent.Currentpage == "contact") {
          Actions.GeneralInfoScreen({ showComponent: 2 });
        } else if (
          this.state.rentalstatespercent.Currentpage == "driving-lic"
        ) {
          Actions.GeneralInfoScreen({ showComponent: 3 });
        } else if (this.state.rentalstatespercent.Currentpage == "Adult") {
          Actions.OtherInformationScreen({ showComponent: 1 });
        } else if (this.state.rentalstatespercent.Currentpage == "Children") {
          Actions.OtherInformationScreen({ showComponent: 2 });
        } else if (this.state.rentalstatespercent.Currentpage == "Vehicles") {
          Actions.OtherInformationScreen({ showComponent: 3 });
        } else if (this.state.rentalstatespercent.Currentpage == "Pet") {
          Actions.PetsScreen();
        } else if (
          this.state.rentalstatespercent.Currentpage == "CurrentAddresses"
        ) {
          Actions.CurrentAddressScreen();
        } else if (
          this.state.rentalstatespercent.Currentpage == "Previous Address"
        ) {
          Actions.PreviousResidentialAddressScreen();
        } else if (this.state.rentalstatespercent.Currentpage == "Employment") {
          Actions.EmploymentHistoryScreen();
        } else if (
          this.state.rentalstatespercent.Currentpage ==
          "IdentificationDocuments"
        ) {
          Actions.IdentificationDocScreen();
        } else if (
          this.state.rentalstatespercent.Currentpage == "supportingDocuments"
        ) {
          Actions.SupportiveDocScreen();
        } else if (
          this.state.rentalstatespercent.Currentpage ==
          "TenantPersonalReferences"
        ) {
          Actions.ContactReferenceScreen();
        } else {
        }
      }
    }
  }

  render() {
    var percentageFilled = 0.0;
    if (this.state.rentalstatespercent != "") {
      if (
        this.state.rentalstatespercent.PercentComplete != undefined &&
        this.state.rentalstatespercent.PercentComplete != ""
      ) {
        percentageFilled = this.state.rentalstatespercent.PercentComplete / 100;
      }
    }

    return (
      <View style={styles.container}>
        <View style={{ margin: 20, alignItems: "center" }}>
          <Text style={{ textAlign: "center", fontSize: 20, margin: 5 }}>
            {this.state.loggedInUserData.FirstName}
          </Text>
          <Text style={{ fontSize: 12, color: Colors.APP_THEME_RED_COLOR }}>
            {percentageFilled * 100 + "%"}
          </Text>
          <Progress.Bar
            progress={percentageFilled}
            width={window.width * 0.8}
            color={Colors.APP_THEME_RED_COLOR}
          />
        </View>
        <Text
          style={{
            textAlign: "center",
            width: window.width * 0.95,
            fontSize: 16
          }}
        >
          {this.state.rentalResumeGuide}
        </Text>
        <View
          style={{
            width: window.width * 0.8,
            alignItems: "center",
            margin: 20
          }}
        >
          <TouchableOpacity
            onPress={() => this.continueWhereLeft()}
            style={{
              borderRadius: 6,
              backgroundColor: Colors.APP_THEME_RED_COLOR,
              height: 40,
              width: window.width * 0.6,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={{ color: "#ffffff" }}>{this.state.buttonTitle}</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >

        <Animatable.View animation="fadeIn">
          <TouchableOpacity
            style={{ width: window.width, marginTop: 30, flexDirection: "row" }}
            onPress={() => this.onGeneralInfoClicked()}
          >
            <Image
              style={{ marginLeft: 10 }}
              source={
                this.state.BasicProfile
                  ? user_selectedImage
                  : user_unselectedImage
              }
            />
            <Text
              style={{
                width: window.width * 0.7,
                color: this.state.BasicProfile
                  ? Colors.ACTIVE_GREEN
                  : Colors.GRAY_COLOR,
                fontSize: 16,
                marginLeft: 10
              }}
            >
              {Strings.GENERAL_INFO}
            </Text>
            {this.state.BasicProfile ? (
              <Image style={{ marginLeft: 10 }} source={checkImage} />
            ) : null}
          </TouchableOpacity>
          </Animatable.View>

          <Animatable.View animation="fadeInDown">
          <TouchableOpacity
            style={{ width: window.width, marginTop: 30, flexDirection: "row" }}
            onPress={() => this.onOtherInformationClicked()}
          >
            <Image
              style={{ marginLeft: 10, marginLeft: 10 }}
              source={
                this.state.OtherResidents
                  ? resident_selectedImage
                  : resident_unselectedImage
              }
            />
            <Text
              style={{
                width: window.width * 0.7,
                color: this.state.OtherResidents
                  ? Colors.ACTIVE_GREEN
                  : Colors.GRAY_COLOR,
                fontSize: 16,
                marginLeft: 10
              }}
            >
              {Strings.OTHER_INFORMATION}
            </Text>
            {this.state.OtherResidents ? (
              <Image style={{ marginLeft: 10 }} source={checkImage} />
            ) : null}
          </TouchableOpacity>
          </Animatable.View>

          <Animatable.View animation="fadeInDownBig">
          <TouchableOpacity
            style={{ width: window.width, marginTop: 30, flexDirection: "row" }}
            onPress={() => this.onCurrentAddressClicked()}
          >
            <Image
              style={{ marginLeft: 10 }}
              source={
                this.state.ResidentialHistory
                  ? home_selectedImage
                  : home_unselectedImage
              }
            />
            <Text
              style={{
                width: window.width * 0.7,
                color: this.state.ResidentialHistory
                  ? Colors.ACTIVE_GREEN
                  : Colors.GRAY_COLOR,
                fontSize: 16,
                marginLeft: 10
              }}
            >
              {Strings.CURRENT_ADDRESS}
            </Text>
            {this.state.ResidentialHistory ? (
              <Image style={{ marginLeft: 10 }} source={checkImage} />
            ) : null}
          </TouchableOpacity>
          </Animatable.View>

          <Animatable.View animation="fadeInRightBig">
          <TouchableOpacity
            style={{ width: window.width, marginTop: 30, flexDirection: "row" }}
            onPress={() => this.onEmploymentHistoryClicked()}
          >
            <Image
              style={{ marginLeft: 10 }}
              source={
                this.state.Employment
                  ? employement_unselectedImage
                  : employement_selectedImage
              }
            />
            <Text
              style={{
                width: window.width * 0.7,
                color: this.state.Employment
                  ? Colors.ACTIVE_GREEN
                  : Colors.GRAY_COLOR,
                fontSize: 16,
                marginLeft: 10
              }}
            >
              {Strings.EMPLOYMENT_HISTORY}
            </Text>
            {this.state.Employment ? (
              <Image style={{ marginLeft: 10 }} source={checkImage} />
            ) : null}
          </TouchableOpacity>
          </Animatable.View>

          <Animatable.View animation="fadeInLeftBig">
          <TouchableOpacity
            style={{ width: window.width, marginTop: 30, flexDirection: "row" }}
            onPress={() => this.onIdentificationDocClicked()}
          >
            <Image
              style={{ marginLeft: 10 }}
              source={
                this.state.IDDocuments
                  ? file_selectedImage
                  : file_unselectedImage
              }
            />
            <Text
              style={{
                width: window.width * 0.7,
                color: this.state.IDDocuments
                  ? Colors.ACTIVE_GREEN
                  : Colors.GRAY_COLOR,
                fontSize: 16,
                marginLeft: 10
              }}
            >
              {Strings.IDENTIFICATION_DOC}
            </Text>
            {this.state.IDDocuments ? (
              <Image style={{ marginLeft: 10 }} source={checkImage} />
            ) : null}
          </TouchableOpacity>
          </Animatable.View>

          {/*<TouchableOpacity
                                            style={{width:window.width, marginTop:30, flexDirection:'row'}}
                                            onPress={() => this.onSupportiveDocClicked()}                        
                                            >
                                            <Image style={{marginLeft:10}} source={this.state.SuppDocuments?file_selectedImage:file_unselectedImage} />
                                            <Text style={{width:window.width*0.7, color:this.state.SuppDocuments?Colors.ACTIVE_GREEN:Colors.GRAY_COLOR, fontSize:16, marginLeft:10}}>{Strings.SUPPORTIVE_DOC}</Text>
                                            {this.state.SuppDocuments?
                                                <Image style={{marginLeft:10}} source={checkImage} />
                                                :null
                                            }
                                        </TouchableOpacity>*/}


          <Animatable.View animation="fadeInUp">
          <TouchableOpacity
            style={{ width: window.width, marginTop: 30, flexDirection: "row" }}
            onPress={() => this.onContRefClicked()}
          >
            <Image
              style={{ marginLeft: 10 }}
              source={
                this.state.PersonalReference
                  ? reference_selectedImage
                  : reference_unselectedImage
              }
            />
            <Text
              style={{
                width: window.width * 0.7,
                color: this.state.PersonalReference
                  ? Colors.ACTIVE_GREEN
                  : Colors.GRAY_COLOR,
                fontSize: 16,
                marginLeft: 10
              }}
            >
              {Strings.CONTACTS_REF}
            </Text>
            {this.state.PersonalReference ? (
              <Image style={{ marginLeft: 10 }} source={checkImage} />
            ) : null}
          </TouchableOpacity>
          </Animatable.View>

          {/*<TouchableOpacity
                                            style={{width:window.width, marginTop:30, flexDirection:'row'}}
                                            onPress={() => this.onPreResidentialAddressClicked()}
                                            >
                                            <Image style={{marginLeft:10}} source={this.state.PreviousAddress?history_selectedImage:history_unselectedImage} />
                                            <Text style={{width:window.width*0.7, color:this.state.PreviousAddress?Colors.ACTIVE_GREEN:Colors.GRAY_COLOR, fontSize:16, marginLeft:10}}>{Strings.PREVIOUS_RESIDENTIAL_ADDRESS}</Text>
                                            {this.state.PreviousAddress?
                                                <Image style={{marginLeft:10}} source={checkImage} />
                                                :null
                                            }
                                        </TouchableOpacity>*/}

          {/*<TouchableOpacity
                                            style={{width:window.width, marginTop:30, flexDirection:'row'}}
                                            onPress={() => this.onPreEmploymentDetailClicked()}
                                            >
                                            <Image style={{marginLeft:10}} source={this.state.PreEmployment?employement_unselectedImage:employement_selectedImage} />
                                            <Text style={{width:window.width*0.7, color:this.state.PreEmployment?Colors.ACTIVE_GREEN:Colors.GRAY_COLOR, fontSize:16, marginLeft:10}}>{Strings.PREVIOUS_EMPLOYMENT_DETAILS}</Text>
                                            {this.state.PreEmployment?
                                                <Image style={{marginLeft:10}} source={checkImage} />
                                                :null
                                            }
                                        </TouchableOpacity>*/}

          <Animatable.View animation="fadeInUp">
          <TouchableOpacity
            style={{ width: window.width, marginTop: 30, flexDirection: "row" }}
            onPress={() => this.onPetsClicked()}
          >
            <Image
              style={{ marginLeft: 10 }}
              source={
                this.state.Pets ? pets_selectedImage : pets_unselectedImage
              }
            />
            <Text
              style={{
                width: window.width * 0.7,
                color: this.state.Pets
                  ? Colors.ACTIVE_GREEN
                  : Colors.GRAY_COLOR,
                fontSize: 16,
                marginLeft: 10
              }}
            >
              {Strings.PETS}
            </Text>
            {this.state.Pets ? (
              <Image style={{ marginLeft: 10 }} source={checkImage} />
            ) : null}
          </TouchableOpacity>
          </Animatable.View>
        </ScrollView>
        {this.state.isScreenLoading ? (
          <View style={styles.circles}>
            <Progress.CircleSnail color={["#000000", "#000000", "#000000"]} />
          </View>
        ) : null}
      </View>
    );
  }
}

// export default RentalResumeMenu;

const mapStateToProps = ({ rentalResumeMenuReducer }) => {
  const {
    rentalResumeStates,
    isRefreshRentalResumeMenu
  } = rentalResumeMenuReducer;

  return {
    rentalResumeStates: rentalResumeStates,
    isRefreshRentalResumeMenu: isRefreshRentalResumeMenu
  };
};

export default connect(mapStateToProps, {
  getRentalResumeStates,
  clearGetRentalResumeStatesResponse,
  stopRefreshRentalResumeMenu
})(RentalResumeMenu);
