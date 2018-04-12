import React, { Component } from "react";
import { connect } from "react-redux";
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
  Dimensions,
  FlatList,
  ListView,
  InteractionManager,
  Modal
} from "react-native";

import {
  clearGetPropertyDetailsResponse,
  clearSaveFavouritePropertyResponse
} from "./PropertyDetailAction";

import {
  getPropertyDetails,
  saveFavouritePropertyDetail
} from "../../Action/ActionCreators";

import ImageSlider from "react-native-image-slider";
import Moment from "moment";
import * as Progress from "react-native-progress";
import { Actions } from "react-native-router-flux";
import Colors from "../../Constants/Colors";
import Strings from "../../Constants/Strings";
import styles from "./PropertyDetailScreenStyle";
import DynamicListRow from "../CommonComponent/DynamicListRow";
import Carousel from "react-native-snap-carousel";
import ImageZoom from "react-native-image-pan-zoom";
import { validateEmail } from "../../Constants/CommonFunctions";
import bathImage from "../../Assets/bath.png";
import bedImage from "../../Assets/bed.png";
import favImage from "../../Assets/fav.png";
import parkingImage from "../../Assets/parking.png";
import bidImage from "../../Assets/bid.png";
import callSmallImage from "../../Assets/call_small.png";
import callImage from "../../Assets/call.png";
import smsImage from "../../Assets/sms.png";
import inspectionDateImage from "../../Assets/inspection_date.png";
import starWhiteImage from "../../Assets/starWhite.png";
import starYellowImage from "../../Assets/starYellow.png";
import MaterialTextInput from "react-native-material-textinput";
import errorInputImage from "../../Assets/error.png";
import userInputImage from "../../Assets/user.png";
import userNameInputImage from "../../Assets/email.png";
import blackCheckImage from "../../Assets/blackCheck.png";
import blackUnCheckImage from "../../Assets/blackUnCheck.png";
import CommonStyles from "../../CommonStyle/CommonStyle";

var self;
const window = Dimensions.get("window");
const extractKey = ({ id }) => id;
var regExp = /^[0][0-9]/;

class PropertyDetailScreen extends Component {
  constructor() {
    super();
    this.state = {
      position: 0,
      interval: null,
      propertyImages: [],
      propertyDetails: "",
      showCarousel: 0,
      biddingDate: "",
      nearbySchools: [],
      isAbove18: 0,
      phone: "",
      name: "",
      email: "",
      comment: "",
      Availabledate: false,
      lengthofLease: false,
      inspection: false,
      rentalApplication: false,
      PropertyInfoId: "4",
      errorMsg: "",
      errorOnTextField: 0
    };
    self = this;
  }

  renderNearbyItem = ({ item, index }) => {
    return (
      <View style={styles.row}>
        <View style={styles.listRowContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>School Name</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.normalText}>{item.SchoolName}</Text>
          </View>
        </View>

        <View style={styles.listRowContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Type</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.normalText}>{item.Type}</Text>
          </View>
        </View>

        <View style={styles.listRowContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Sector</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.normalText}>{item.Sector}</Text>
          </View>
        </View>
      </View>
    );
  };

  componentWillMount() {
    this.callGetPropertyDetailsWebService(
      this.props.propertyInfo.PropertyInfoId
    );

    if (this.props.propertyInfo.PropertyImages.length > 0) {
      var imageArray = [];
      this.props.propertyInfo.PropertyImages.map((data, index) => {
        var imageUrl =
          "http://108.168.203.227:9095/" + data.PhotoPath.substr(3);
        imageArray.push(imageUrl);
      });

      this.setState({ propertyImages: imageArray });
    }

    if (this.props.propertyInfo.PropertyImages.length != 1) {
      this.setState({
        interval: setInterval(() => {
          this.setState({
            position: this.state.position === 2 ? 0 : this.state.position + 1
          });
        }, 2000)
      });
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {});
  }

  onSendClicked() {
    if (this.state.name == "") {
      this.setState({ errorMsg: Strings.ERROR_EMPTY_NAME });
      this.setState({ errorOnTextField: 0 });
    } else if (this.state.email == "") {
      this.setState({ errorMsg: Strings.ERROR_EMPTY_EMAIL });
      this.setState({ errorOnTextField: 1 });
    } else if (!validateEmail(this.state.email)) {
      this.setState({ errorMsg: Strings.ERROR_INVALID_EMAIL });
      this.setState({ errorOnTextField: 1 });
    } else if (this.state.phone == "") {
      this.setState({ errorMsg: Strings.ERROR_EMPTY_MOBILE_NO });
      this.setState({ errorOnTextField: 2 });
    } else if (!regExp.test(this.state.phone)) {
      this.setState({ errorMsg: Strings.ERROR_INVALID_MOBILE_NO });
      this.setState({ errorOnTextField: 2 });
    } else if (this.state.phone.length < 10) {
      this.setState({ errorMsg: Strings.ERROR_INVALID_MOBILE });
      this.setState({ errorOnTextField: 2 });
    } else {
      this.setState({ errorMsg: "" });
      /********************** Call sendMail WebService **********************/
      this.setState({ isScreenLoading: true });

      /***********************************************************************/
    }
  }

  componentWillReceiveProps(nextProps) {
    try {
      // Handle getPropertyDetails service response
      if (
        nextProps.propertyDetailsResponse != undefined &&
        nextProps.propertyDetailsResponse != ""
      ) {
        this.setState({ isScreenLoading: false });

        if (nextProps.propertyDetailsResponse.headerResponse.status == 200) {
          if (nextProps.propertyDetailsResponse.data.Content != null) {

            
            if(nextProps.propertyDetailsResponse.data.Content[0].Nearbyschool && nextProps.propertyDetailsResponse.data.Content[0].Nearbyschool.length > 5) { 
              nextProps.propertyDetailsResponse.data.Content[0].Nearbyschool = nextProps.propertyDetailsResponse.data.Content[0].Nearbyschool.slice(0,5) 
            }
            

            this.setState({
              propertyDetails:
                nextProps.propertyDetailsResponse.data.Content[0],
              nearbySchools:
                nextProps.propertyDetailsResponse.data.Content[0].Nearbyschool
            });

            try {
              var auctionBeginDate = Moment(
                nextProps.propertyDetailsResponse.data.Content[0].AuctionInfo[0]
                  .AuctionBeginDate
              ).format("MMM DD, YYYY");

              var auctionEndDate = Moment(
                nextProps.propertyDetailsResponse.data.Content[0].AuctionInfo[0]
                  .AuctionEndDate
              ).format("MMM DD, YYYY");
              this.setState({
                biddingDate: auctionBeginDate + " - " + auctionEndDate,
                nearbySchools:
                  nextProps.propertyDetailsResponse.data.Content[0].Nearbyschool
              });
            } catch (error) {}

            // alert(JSON.stringify(nextProps.propertyDetailsResponse.data.Content[0].AuctionInfo[0].AuctionBeginDate))
          } else {
            alert(nextProps.propertyDetailsResponse.data.ReturnMessage[0]);
          }
        } else if (
          nextProps.propertyDetailsResponse.headerResponse.status == 400
        ) {
          alert(nextProps.propertyDetailsResponse.data.error_description);
        } else if (
          nextProps.propertyDetailsResponse.headerResponse.status == 500
        ) {
          alert("Internal Server Error");
        }
      }

      // Handle saveFavouriteProperty service response
      if (
        nextProps.saveFavPropertyResponse != undefined &&
        nextProps.saveFavPropertyResponse != ""
      ) {
        this.setState({ isScreenLoading: false });

        if (nextProps.saveFavPropertyResponse.headerResponse.status == 200) {
          if (nextProps.saveFavPropertyResponse.data.Content != null) {
          } else {
            if (
              nextProps.saveFavPropertyResponse.data.ReturnMessage.length > 0
            ) {
              alert(nextProps.saveFavPropertyResponse.data.ReturnMessage[0]);
            } else {
            }
          }
        } else if (
          nextProps.saveFavPropertyResponse.headerResponse.status == 400
        ) {
          alert(nextProps.saveFavPropertyResponse.data.error_description);
        } else if (
          nextProps.saveFavPropertyResponse.headerResponse.status == 500
        ) {
          alert("Internal Server Error");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate() {
    if (
      this.props.propertyDetailsResponse != undefined &&
      this.props.propertyDetailsResponse != ""
    ) {
      this.props.clearGetPropertyDetailsResponse();
    }

    if (
      this.props.saveFavPropertyResponse != undefined &&
      this.props.saveFavPropertyResponse != ""
    ) {
      this.props.clearSaveFavouritePropertyResponse();
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  callGetPropertyDetailsWebService(propertyID) {
    /***************** Call getPropertyDetails WebService ****************/

    this.setState({ isScreenLoading: true });
    var postData = {
      PropertyId: propertyID
    };
    AsyncStorage.getItem("loggedInUserInfo")
      .then(value => {
        if (value) {
          var loggedInUserData = JSON.parse(value);
          this.setState({ loggedInUserData: loggedInUserData });
          postData.UserId = loggedInUserData.ID;
          this.props.getPropertyDetails(postData);
        } else {
          this.props.getPropertyDetails(postData);
        }
      })
      .done();

    /*************************************************************************/
  }

  callSaveFavouritePropertyWebService(userId, propertyId) {
    /***************** Call saveFavouriteProperty WebService ****************/

    this.setState({ isScreenLoading: true });
    var postData = {
      UserId: userId,
      PropertyId: propertyId
    };

    this.props.saveFavouritePropertyDetail(postData);
    /*************************************************************************/
  }

  onImageSliderClick() {
    console.log(
      "propertyImages>>> " + JSON.stringify(this.state.propertyImages)
    );
    if (this.state.propertyImages.length > 0) {
      this.setState({ showCarousel: 1 });
    }
  }

  onStarClicked() {
    AsyncStorage.getItem("loggedInUserInfo")
      .then(value => {
        if (value) {
          var loggedInUserData = JSON.parse(value);
          this.setState({ loggedInUserData: loggedInUserData });
          this.callSaveFavouritePropertyWebService(
            loggedInUserData.ID,
            this.state.propertyDetails.PropertyInfoId
          );

          var tempPropertyInfo = this.state.propertyDetails;
          tempPropertyInfo.isFavourite = 1;
          this.setState({ propertyDetails: tempPropertyInfo });
        } else {
          alert(
            "Please LogIn to save this property as your favourite property."
          );
        }
      })
      .done();
  }

  openBiddingClicked() {
    Actions.BiddingDetailScreen();
  }

  _renderIndoorFeaturesTags(tags, index) {
    return (
      <TouchableOpacity style={styles.tags} key={index}>
        <Text style={{ margin: 5 }}>{tags.FeatureName}</Text>
      </TouchableOpacity>
    );
  }

  _renderOutdoorFeaturesTags(tags, index) {
    return (
      <TouchableOpacity style={styles.tags} key={index}>
        <Text style={{ margin: 5 }}>{tags.FeatureName}</Text>
      </TouchableOpacity>
    );
  }

  _renderInspectionsList(propertyInspections) {
    var date = Moment(propertyInspections.InspectionDate).format(
      "MMM DD, YYYY"
    );
    var bTime = Moment(propertyInspections.BeginTime).format("hh:mm A");
    var endtime = Moment(propertyInspections.EndTime).format("hh:mm A");

    return (
      <View style={styles.inspectionListItemContainer}>
        <Text>{date}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ paddingRight: 30 }}>{bTime + " - " + endtime}</Text>
          <Image source={inspectionDateImage} />
        </View>
      </View>
    );
  }

  onCloseClicked() {
    this.setState({ showCarousel: 0 });
  }

  _renderItem({ item, index }) {
    return (
      <View style={styles.carouselItemContainer}>
        <View style={styles.carouselInnerView}>
          <ImageZoom
            cropWidth={Dimensions.get("window").width}
            cropHeight={Dimensions.get("window").height}
            imageWidth={window.width * 0.9}
            imageHeight={window.width * 0.9}
          >
            <Image
              style={{
                width: window.width * 0.9,
                height: window.width * 0.9,
                resizeMode: "contain"
              }}
              source={{ uri: item }}
            />
            <TouchableOpacity
              onPress={() => self.onCloseClicked()}
              style={styles.closeButtonContainer}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </ImageZoom>
        </View>
      </View>
    );
  }

  availableDateClicked() {
    this.setState({ Availabledate: !this.state.Availabledate });
  }

  lengthOfLeaseClicked() {
    this.setState({ lengthofLease: !this.state.lengthofLease });
  }

  inspectionClicked() {
    this.setState({ inspection: !this.state.inspection });
  }

  rentalApplicationClicked() {
    this.setState({ rentalApplication: !this.state.rentalApplication });
  }

  render() {
    var landordName = "";

    if (this.state.propertyDetails.LandlordetailsList) {
      var firstname = this.state.propertyDetails.LandlordetailsList[0].FirstName
        ? this.state.propertyDetails.LandlordetailsList[0].FirstName
        : "";
      var lastname = this.state.propertyDetails.LandlordetailsList[0].LastName
        ? this.state.propertyDetails.LandlordetailsList[0].LastName
        : "";

      landordName = firstname + " " + lastname;
    }

    var landlordEmail = "";
    if (this.state.propertyDetails.LandlordetailsList) {
      landlordEmail = this.state.propertyDetails.LandlordetailsList[0].Email
        ? this.state.propertyDetails.LandlordetailsList[0].Email
        : "";
    }
    var landlordContactNumber = "";
    if (this.state.propertyDetails.LandlordetailsList) {
      landlordContactNumber = this.state.propertyDetails.LandlordetailsList[0]
        .Mobile
        ? this.state.propertyDetails.LandlordetailsList[0].Mobile
        : "";
    }

    var propertyInspectionTime = "";
    if (this.state.propertyDetails.PropertyInspections) {
      if (this.state.propertyDetails.PropertyInspections.length > 0) {
        propertyInspectionTime = this.state.propertyDetails
          .PropertyInspections[0].BeginTime
          ? this.state.propertyDetails.PropertyInspections[0].BeginTime
          : "";
      }
    }

    return (
      <View style={styles.mainContainer}>
        {this.state.showCarousel ? (
          <Modal transparent>
            <Carousel
              ref={c => {
                this._carousel = c;
              }}
              data={this.state.propertyImages}
              renderItem={this._renderItem}
              sliderWidth={window.width}
              itemWidth={window.width}
            />
          </Modal>
        ) : null}

        <ScrollView>
          <View style={styles.imageContainerStyle}>
            <TouchableOpacity
              style={styles.imageContainerStyle}
              onPress={() => this.onImageSliderClick()}
            >
              <ImageSlider
                images={this.state.propertyImages}
                position={this.state.position}
                onPositionChanged={position => this.setState({ position })}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.onStarClicked()}
              style={styles.starContainer}
            >
              <Image
                source={
                  this.state.propertyDetails.isFavourite
                    ? starYellowImage
                    : starWhiteImage
                }
              />
            </TouchableOpacity>

            {/*<View style={styles.inspectionFloatView}>
                  <Text style={styles.inspectionTitle}>{"Inspection time"}</Text>
                  <Text style={styles.inspectionTime}>
                    {propertyInspectionTime}
                  </Text>
                </View>*/}
          </View>

          <View style={{ padding: 10 }}>
            <Text style={styles.propertyTitleText}>
              {this.state.propertyDetails.propertyinfoes
                ? this.state.propertyDetails.propertyinfoes[0].PropertyHeading
                : ""}
            </Text>
            <Text style={{ paddingTop: 10 }}>
              {this.state.propertyDetails.propertyinfoes
                ? this.state.propertyDetails.propertyinfoes[0].PropertyType
                : ""}
            </Text>
            <Text style={{ paddingTop: 10 }}>
              {this.state.propertyDetails.propertyinfoes
                ? this.state.propertyDetails.propertyinfoes[0].Address
                : ""}
            </Text>

            <View style={styles.propertyIconContainer}>
              <View style={{ flexDirection: "row" }}>
                <Image style={styles.propertyIcon} source={bedImage} />
                <Text style={{ paddingLeft: 10 }}>
                  {this.state.propertyDetails.PropertyFeatures
                    ? this.state.propertyDetails.PropertyFeatures[0].Bedrooms
                    : "0"}
                </Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Image style={styles.propertyIcon} source={bathImage} />
                <Text style={{ paddingLeft: 10 }}>
                  {this.state.propertyDetails.PropertyFeatures
                    ? this.state.propertyDetails.PropertyFeatures[0].Bathrooms
                    : "0"}
                </Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Image style={styles.propertyIcon} source={parkingImage} />
                <Text style={{ paddingLeft: 10 }}>
                  {this.state.propertyDetails.PropertyFeatures
                    ? this.state.propertyDetails.PropertyFeatures[0]
                        .ParkingSpaces
                    : "0"}
                </Text>
              </View>
            </View>

            <Text style={{ fontWeight: "bold", paddingTop: 10 }}>
              Bidding Date : {this.state.biddingDate}
            </Text>
          </View>
          <View style={styles.seperatorLine} />

          {/*
                  <View style={{flexDirection:'row',justifyContent:'space-between',paddingLeft:10,paddingTop:10,paddingRight:10}}>
                       <View>
                        <Text >Current Bid</Text>
                        <Text style={{fontWeight:'bold',paddingTop:5}}>$450</Text>
                       </View>
                        <View>
                        <Text >Number of Bid Received</Text>
                        <Text style={{fontWeight:'bold',paddingTop:5}}>250</Text>
                       </View>
                       <View style={{flexDirection:'row',height:40,width:100,alignItems:'center',justifyContent:'center',backgroundColor:'#000'}}>
                            <Image source={bidImage} >
                            </Image>
                            <Text style={{color:'#ffffff', fontWeight:'bold',paddingLeft:10}}>BID</Text>
                       </View>
                  </View>
                */}

          <View style={styles.biddingBaseRateView}>
            <View style={styles.biddingBaseRateInnerView}>
              <Text style={{ marginTop: 10 }}>Base Rent (pw)</Text>
              <Text style={styles.biddingBaseRate}>$600</Text>
              <TouchableOpacity
                style={styles.openView}
                onPress={() => this.openBiddingClicked()}
              >
                <Text>Open</Text>
              </TouchableOpacity>
              <View style={styles.biddingView}>
                <Text style={styles.biddingText}>BIDDING</Text>
              </View>
            </View>
          </View>

          <View style={styles.seperatorLine} />

          <View style={styles.discriptionTitleView}>
            <Text style={styles.discriptionTitle}>Description</Text>
            <Text
              adjustsFontSizeToFit={true}
              style={{ marginTop: 10, textAlign: "justify" }}
            >
              {this.state.propertyDetails.propertyinfoes
                ? this.state.propertyDetails.propertyinfoes[0].PropertyDescription.replace(
                    /\n/g,
                    ""
                  )
                : ""}
            </Text>
          </View>

          <View style={styles.seperatorLine} />

          <Text style={styles.propertyAttributeTitle}>Inspections</Text>
          {this.state.propertyDetails.PropertyInspections ? (
            <View style={{ paddingLeft: 10, paddingTop: 10, paddingRight: 10 }}>
              {this.state.propertyDetails.PropertyInspections.length > 0
                ? this.state.propertyDetails.PropertyInspections.map(
                    (data, index) => {
                      return this._renderInspectionsList(data);
                    }
                  )
                : null}
            </View>
          ) : null}

          <View style={styles.seperatorLine} />

          <Text style={styles.propertyAttributeTitle}>General Features</Text>
          {this.state.propertyDetails.PropertyFeatures ? (
            <View style={{ padding: 10 }}>
              <View style={styles.generalFeatureItemContainer}>
                <Text>Property Type</Text>
                <Text style={{ paddingRight: 10 }}>
                  {this.state.propertyDetails.propertyinfoes
                    ? this.state.propertyDetails.propertyinfoes[0].PropertyType
                    : ""}
                </Text>
              </View>
              {this.state.propertyDetails.PropertyFeatures.length > 0 ? (
                <View style={styles.generalFeatureItemContainer}>
                  <Text>Bedrooms</Text>
                  <Text style={{ paddingRight: 35 }}>
                    {this.state.propertyDetails.PropertyFeatures[0].Bedrooms}
                  </Text>
                </View>
              ) : null}

              {this.state.propertyDetails.PropertyFeatures.length > 0 ? (
                <View style={styles.generalFeatureItemContainer}>
                  <Text>Bathrooms</Text>
                  <Text style={{ paddingRight: 35 }}>
                    {this.state.propertyDetails.PropertyFeatures[0].Bathrooms}
                  </Text>
                </View>
              ) : null}

              {this.state.propertyDetails.PropertyFeatures.length > 0 ? (
                <View style={styles.generalFeatureItemContainer}>
                  <Text>ParkingSpaces</Text>
                  <Text style={{ paddingRight: 35 }}>
                    {
                      this.state.propertyDetails.PropertyFeatures[0]
                        .ParkingSpaces
                    }
                  </Text>
                </View>
              ) : null}

              {this.state.propertyDetails.PropertyFeatures.Cooking ? (
                <View style={styles.generalFeatureItemContainer}>
                  <Text>Cooking</Text>
                  <Text style={{ paddingRight: 35 }}>
                    {this.state.propertyDetails.PropertyFeatures.Cooking}
                  </Text>
                </View>
              ) : null}

              {this.state.propertyDetails.PropertyFeatures.Laundry ? (
                <View style={styles.generalFeatureItemContainer}>
                  <Text>Laundry</Text>
                  <Text style={{ paddingRight: 10 }}>
                    {this.state.propertyDetails.PropertyFeatures.Laundry
                      ? "YES"
                      : "NO"}
                  </Text>
                </View>
              ) : null}

              {this.state.propertyDetails.PropertyFeatures.Furnished ? (
                <View style={styles.generalFeatureItemContainer}>
                  <Text>Furnished</Text>
                  <Text style={{ paddingRight: 10 }}>
                    {this.state.propertyDetails.PropertyFeatures.Furnished
                      ? "YES"
                      : "NO"}
                  </Text>
                </View>
              ) : null}

              {this.state.propertyDetails.PropertyFeatures.Pool ? (
                <View style={styles.generalFeatureItemContainer}>
                  <Text>Pool</Text>
                  <Text style={{ paddingRight: 10 }}>
                    {this.state.propertyDetails.PropertyFeatures.Pool
                      ? "YES"
                      : "NO"}
                  </Text>
                </View>
              ) : null}

              {this.state.propertyDetails.PropertyFeatures.PetsAllowed ? (
                <View style={styles.generalFeatureItemContainer}>
                  <Text>Pets Allowed</Text>
                  <Text style={{ paddingRight: 10 }}>
                    {this.state.propertyDetails.PropertyFeatures.PetsAllowed
                      ? "YES"
                      : "NO"}
                  </Text>
                </View>
              ) : null}

              {this.state.propertyDetails.PropertyFeatures.Wardrobe ? (
                <View style={styles.generalFeatureItemContainer}>
                  <Text>Wardrobe</Text>
                  <Text style={{ paddingRight: 10 }}>
                    {this.state.propertyDetails.PropertyFeatures.Wardrobe
                      ? "YES"
                      : "NO"}
                  </Text>
                </View>
              ) : null}

              {this.state.propertyDetails.PropertyFeatures.SmokeAllowed ? (
                <View style={styles.generalFeatureItemContainer}>
                  <Text>Smoking Allowed</Text>
                  <Text style={{ paddingRight: 10 }}>
                    {this.state.propertyDetails.PropertyFeatures.SmokeAllowed
                      ? "YES"
                      : "NO"}
                  </Text>
                </View>
              ) : null}

              {this.state.propertyDetails.PropertyFeatures.PremierProperty ? (
                <View style={styles.generalFeatureItemContainer}>
                  <Text>Premier Property</Text>
                  <Text style={{ paddingRight: 10 }}>
                    {this.state.propertyDetails.PropertyFeatures.PremierProperty
                      ? "YES"
                      : "NO"}
                  </Text>
                </View>
              ) : null}
            </View>
          ) : (
            <Text style={{ marginLeft: 10, marginTop: 10 }}>
              No features added by landlord yet.
            </Text>
          )}

          <View style={{ paddingLeft: 10, paddingTop: 20 }}>
            <Text style={{ fontWeight: "bold" }}>{"Indoor Features"}</Text>

            {this.state.propertyDetails.PropertyIndoor ? (
              <View
                style={{
                  backgroundColor: "#ffffff",
                  height: 40,
                  width: window.width * 0.88,
                  justifyContent: "center",
                  borderColor: "#FFF",
                  borderRadius: 5,
                  marginTop: 10
                }}
              >
                {this.state.propertyDetails.PropertyIndoor.length ? (
                  <ScrollView
                    contentContainerStyle={{ flexDirection: "row" }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    {this.state.propertyDetails.PropertyIndoor.map(
                      (data, index) => {
                        return this._renderIndoorFeaturesTags(data, index);
                      }
                    )}
                  </ScrollView>
                ) : (
                  <Text>No features added by landlord yet.</Text>
                )}
              </View>
            ) : null}
          </View>

          <View style={{ paddingLeft: 10, paddingTop: 20 }}>
            <Text style={{ fontWeight: "bold" }}>{"Outdoor Features"}</Text>

            {this.state.propertyDetails.PropertyOutdoor ? (
              <View
                style={{
                  backgroundColor: "#ffffff",
                  height: 40,
                  width: window.width * 0.88,
                  justifyContent: "center",
                  borderColor: "#FFF",
                  borderRadius: 5,
                  marginTop: 10
                }}
              >
                {this.state.propertyDetails.PropertyOutdoor.length ? (
                  <ScrollView
                    contentContainerStyle={{ flexDirection: "row" }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    {this.state.propertyDetails.PropertyOutdoor.map(
                      (data, index) => {
                        return this._renderOutdoorFeaturesTags(data, index);
                      }
                    )}
                  </ScrollView>
                ) : (
                  <Text>No features added by landlord yet.</Text>
                )}
              </View>
            ) : null}
          </View>

          <View style={{ paddingLeft: 10, paddingTop: 20 }}>
            <Text style={{ fontWeight: "bold" }}>Nearby Schools</Text>

            <FlatList
              style={{
                margin: 5
              }}
              data={this.state.nearbySchools}
              renderItem={this.renderNearbyItem}
              extraData={this.state}
              keyExtractor={extractKey}
            />
          </View>

          <View style={{ paddingLeft: 10, paddingTop: 20 }}>
            <Text style={{ fontWeight: "bold" }}>Landlords Information</Text>
          </View>

          <View style={{ marginTop: 20, backgroundColor: "#E1E1E1" }}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#E1E1E1",
                margin: 10
              }}
            >
              <Image
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 80 / 2,
                  borderWidth: 2,
                  borderColor: "#d72614"
                }}
                source={{
                  uri: "https://placeimg.com/640/480/people/grayscale"
                }}
              />
              <Text style={{ fontSize: 16, fontWeight: "500", marginTop: 5 }}>
                {landordName ? landordName : ""}
              </Text>
              <Text style={{ fontSize: 12, fontWeight: "300", marginTop: 5 }}>
                {landlordEmail ? landlordEmail : ""}
              </Text>
              <Text style={{ fontSize: 12, fontWeight: "300", marginTop: 5 }}>
                {landlordContactNumber ? landlordContactNumber : ""}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={{
                    width: window.width * 0.25,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Image source={callImage} style={{ margin: 20 }} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: window.width * 0.25,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Image source={smsImage} style={{ margin: 20 }} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{ paddingLeft: 10, paddingTop: 20 }}>
            <Text style={{ fontWeight: "bold" }}>Contact Landlord Agent</Text>
          </View>
          <View style={styles.signInViewContainerStyle}>
            <View>
              <MaterialTextInput
                label={Strings.NAME}
                labelColor={Colors.BLACK}
                activeColor={Colors.BLACK}
                color={Colors.BLACK}
                fontSize={15}
                labelActiveTop={-30}
                onChangeText={text => this.setState({ name: text })}
                marginTop={15}
                underlineColor={Colors.BLACK}
                underlineActiveColor={Colors.BLACK}
                underlineHeight={1}
                underlineActiveHeight={0.5}
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid="transparent"
                returnKeyType="done"
              />
            </View>

            <View>
              {this.state.errorMsg != "" && this.state.errorOnTextField == 0 ? (
                <Text style={CommonStyles.errorText}>
                  {this.state.errorMsg}
                </Text>
              ) : null}
            </View>

            <View>
              <MaterialTextInput
                label={Strings.EMAIL_ADDRESS}
                labelColor={Colors.BLACK}
                activeColor={Colors.BLACK}
                color={Colors.BLACK}
                fontSize={15}
                marginTop={10}
                labelActiveTop={-30}
                underlineColor={Colors.BLACK}
                underlineActiveColor={Colors.BLACK}
                underlineHeight={1}
                underlineActiveHeight={0.5}
                autoCapitalize="none"
                onChangeText={text => this.setState({ email: text })}
                keyboardType="email-address"
                autoCorrect={false}
                underlineColorAndroid="transparent"
                returnKeyType="next"
              />
            </View>

            <View>
              {this.state.errorMsg != "" && this.state.errorOnTextField == 1 ? (
                <Text style={CommonStyles.errorText}>
                  {this.state.errorMsg}
                </Text>
              ) : null}
            </View>

            <View>
              <MaterialTextInput
                label={Strings.PHONE_NUMBER}
                labelColor={Colors.BLACK}
                marginTop={10}
                activeColor={Colors.BLACK}
                color={Colors.BLACK}
                onChangeText={text => this.setState({ phone: text })}
                fontSize={15}
                underlineColor={Colors.BLACK}
                underlineActiveColor={Colors.BLACK}
                underlineHeight={1}
                underlineActiveHeight={0.5}
                autoCapitalize="none"
                keyboardType="numeric"
                autoCorrect={false}
                underlineColorAndroid="transparent"
                returnKeyType="next"
              />
            </View>
            <View>
              {this.state.errorMsg != "" && this.state.errorOnTextField == 2 ? (
                <Text style={CommonStyles.errorText}>
                  {this.state.errorMsg}
                </Text>
              ) : null}
            </View>

            <View>
              <MaterialTextInput
                label={"Message to LandLord"}
                labelColor={Colors.BLACK}
                activeColor={Colors.BLACK}
                color={Colors.BLACK}
                onChangeText={text => this.setState({ comment: text })}
                fontSize={15}
                marginTop={10}
                labelActiveTop={-30}
                underlineColor={Colors.BLACK}
                underlineActiveColor={Colors.BLACK}
                underlineHeight={1}
                underlineActiveHeight={0.5}
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid="transparent"
                returnKeyType="next"
              />
            </View>

            <View>
              {this.state.errorMsg != "" && this.state.errorOnTextField == 3 ? (
                <Text style={CommonStyles.errorText}>
                  {this.state.errorMsg}
                </Text>
              ) : null}
            </View>

            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between"
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                  flex: 1,
                  alignItems: "center"
                }}
                onPress={() => this.availableDateClicked()}
              >
                <Image
                  style={{ height: 18, width: 18 }}
                  source={
                    this.state.Availabledate
                      ? blackCheckImage
                      : blackUnCheckImage
                  }
                />
                <Text style={CommonStyles.ageConfirmText}>Available date</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  flex: 1,
                  marginTop: 20,
                  alignItems: "center"
                }}
                onPress={() => this.lengthOfLeaseClicked()}
              >
                <Image
                  style={{ height: 18, width: 18 }}
                  source={
                    this.state.lengthofLease
                      ? blackCheckImage
                      : blackUnCheckImage
                  }
                />
                <Text style={CommonStyles.ageConfirmText}>Length of lease</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                  flex: 1,
                  alignItems: "center"
                }}
                onPress={() => this.inspectionClicked()}
              >
                <Image
                  style={{ height: 18, width: 18 }}
                  source={
                    this.state.inspection ? blackCheckImage : blackUnCheckImage
                  }
                />
                <Text style={CommonStyles.ageConfirmText}>Inspection</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: "row",
                  marginTop: 20,
                  alignItems: "center"
                }}
                onPress={() => this.rentalApplicationClicked()}
              >
                <Image
                  style={{ height: 18, width: 18 }}
                  source={
                    this.state.rentalApplication
                      ? blackCheckImage
                      : blackUnCheckImage
                  }
                />
                <Text style={CommonStyles.ageConfirmText}>
                  Rental application
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 40,
              marginBottom: 30
            }}
          >
            <TouchableOpacity
              onPress={() => this.onSendClicked()}
              style={{
                backgroundColor: "#d72614",
                height: window.width * 0.25 / 2,
                width: window.width * 0.9,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={{ color: "#ffffff" }}>SEND</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {/*  {this.state.isScreenLoading?
                        <View style={styles.circles}>
                            <Progress.CircleSnail color={['#000000', '#000000', '#000000']} />
                        </View>
                        :null
                    }   */}
      </View>
    );
  }
}

const mapStateToProps = ({ propertyDetailReducer }) => {
  const {
    propertyDetailsResponse,
    saveFavPropertyResponse
  } = propertyDetailReducer;

  return {
    propertyDetailsResponse: propertyDetailsResponse,
    saveFavPropertyResponse: saveFavPropertyResponse
  };
};

export default connect(mapStateToProps, {
  getPropertyDetails,
  clearGetPropertyDetailsResponse,
  saveFavouritePropertyDetail,
  clearSaveFavouritePropertyResponse
})(PropertyDetailScreen);
