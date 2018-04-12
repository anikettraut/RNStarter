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
  InteractionManager,
  Modal
} from "react-native";

import {
  getTenantBidDetails,
  cancelBid,
  getBidUserDetails,
  getBidTenantDetails
} from "../../../Action/ActionCreators";

import {
  clearGetTenantBidDetailsResponse,
  clearBidTenantDetailResponse,
  clearBidUserDetailResponse
} from "./BiddingStatusListingAction";

import { Actions } from "react-native-router-flux";
import Colors from "../../../Constants/Colors";
import Strings from "../../../Constants/Strings";
import styles from "./BiddingStatusListingStyle";

import * as Progress from "react-native-progress";
import Moment from "moment";

import check_selected from "../../../Assets/check_selected.png";
import meterImage from "../../../Assets/meter.png";

const window = Dimensions.get("window");
var self;

class BiddingStatusListingComponent extends Component {
  constructor() {
    super();
    this.state = {
      isScreenLoading: false,
      loggedInUserData: "",
      tenantBiddings: [],
      bidUserlist: [],
      showTotalBidModel: false,
      modalTitle: "Numbers of Tenant Bid"
    };
    self = this;
  }

  componentWillMount() {
    AsyncStorage.getItem("loggedInUserInfo")
      .then(value => {
        if (value) {
          var loggedInUserData = JSON.parse(value);
          this.setState({ loggedInUserData: loggedInUserData });
          this.callGetTenantBidDetailsWebService(loggedInUserData.ID);
        }
      })
      .done();
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {});
  }

  componentWillReceiveProps(nextProps) {
    // Handle getTenantBidDetails service response
    if (
      nextProps.bidTenantDetailResponse != undefined &&
      nextProps.bidTenantDetailResponse != ""
    ) {
      this.setState({ isScreenLoading: false });

      if (nextProps.bidTenantDetailResponse.headerResponse.status == 200) {
        if (nextProps.bidTenantDetailResponse.data.Content != null) {
          this.setState({ showTotalBidModel: true });

          nextProps.bidTenantDetailResponse.data.Content.sort(function(a, b) {
            var nameA = a.TenantBidAmount,
              nameB = b.TenantBidAmount;
            if (nameA > nameB)
              //sort string descending
              return -1;
            if (nameA < nameB) return 1;
            return 0; //default return value (no sorting)
          });

          this.setState({
            bidUserlist: nextProps.bidTenantDetailResponse.data.Content
          });
        } else {
          // alert(nextProps.bidTenantDetailResponse.data.ReturnMessage[0]);
        }
      } else if (
        nextProps.bidTenantDetailResponse.headerResponse.status == 400
      ) {
        alert(nextProps.bidTenantDetailResponse.data.error_description);
      } else if (
        nextProps.bidTenantDetailResponse.headerResponse.status == 500
      ) {
        alert("Internal Server Error");
      }
    }

    //************************************************** */

    // Handle getTenantBidDetails service response
    if (
      nextProps.tenantBidDetailResponse != undefined &&
      nextProps.tenantBidDetailResponse != ""
    ) {
      this.setState({ isScreenLoading: false });
      console.log(
        "nextProps.tenantBidDetailResponse.data.Content.Content.data.BiddingList>>> " +
          JSON.stringify(
            nextProps.tenantBidDetailResponse.data.Content.Content.data
              .BiddingList
          )
      );
      if (nextProps.tenantBidDetailResponse.headerResponse.status == 200) {
        if (nextProps.tenantBidDetailResponse.data.Content != null) {
          this.setState({
            tenantBiddings:
              nextProps.tenantBidDetailResponse.data.Content.Content.data
                .BiddingList
          });
        } else {
          //   alert(nextProps.tenantBidDetailResponse.data.ReturnMessage[0]);
        }
      } else if (
        nextProps.tenantBidDetailResponse.headerResponse.status == 400
      ) {
        alert(nextProps.tenantBidDetailResponse.data.error_description);
      } else if (
        nextProps.tenantBidDetailResponse.headerResponse.status == 500
      ) {
        alert("Internal Server Error");
      }
    }

    // Handle cancelBid service response
    if (
      nextProps.cancelBidResponse != undefined &&
      nextProps.cancelBidResponse != ""
    ) {
      this.setState({ isScreenLoading: false });

      if (nextProps.cancelBidResponse.headerResponse.status == 200) {
        if (nextProps.cancelBidResponse.data.Content != null) {
          this.callGetTenantBidDetailsWebService(
            this.state.loggedInUserData.ID
          );
        } else {
          alert(nextProps.cancelBidResponse.data.ReturnMessage[0]);
        }
      } else if (nextProps.cancelBidResponse.headerResponse.status == 400) {
        alert(nextProps.cancelBidResponse.data.error_description);
      } else if (nextProps.cancelBidResponse.headerResponse.status == 500) {
        alert("Internal Server Error");
      }
    }

    // Handle getBidUserDetails service response
    if (
      nextProps.bidUserDetailResponse != undefined &&
      nextProps.bidUserDetailResponse != ""
    ) {
      this.setState({ isScreenLoading: false });

      if (nextProps.bidUserDetailResponse.headerResponse.status == 200) {
        if (nextProps.bidUserDetailResponse.data.Content != null) {
          this.setState({ showTotalBidModel: true });
          nextProps.bidUserDetailResponse.data.Content.sort(function(a, b) {
            var nameA = a.TenantBidAmount,
              nameB = b.TenantBidAmount;
            if (nameA > nameB) return -1;
            if (nameA < nameB) return 1;
            return 0;
          });
          this.setState({
            bidUserlist: nextProps.bidUserDetailResponse.data.Content
          });
        } else {
          alert(nextProps.bidUserDetailResponse.data.ReturnMessage[0]);
        }
      } else if (nextProps.bidUserDetailResponse.headerResponse.status == 400) {
        alert(nextProps.bidUserDetailResponse.data.error_description);
      } else if (nextProps.bidUserDetailResponse.headerResponse.status == 500) {
        alert("Internal Server Error");
      }
    }
  }

  componentDidUpdate() {
    if (
      this.props.tenantBidDetailResponse != undefined &&
      this.props.tenantBidDetailResponse != ""
    ) {
      this.props.clearGetTenantBidDetailsResponse();
    }

    if (
      this.props.bidTenantDetailResponse != undefined &&
      this.props.bidTenantDetailResponse != ""
    ) {
      this.props.clearBidTenantDetailResponse();
    }

    if (
      this.props.bidUserDetailResponse != undefined &&
      this.props.bidUserDetailResponse != ""
    ) {
      this.props.clearBidUserDetailResponse();
    }
  }

  componentWillUnmount() {}

  callGetTenantBidDetailsWebService(userID) {
    /***************** Call getTenantBidDetails WebService ****************/

    this.setState({ isScreenLoading: true });
    var postData = {
      UserId: userID
    };
    this.props.getTenantBidDetails(postData);
    /**********************************************************************/
  }

  callCancelBidWebService(userID, AuctionId) {
    /***************** Call cancelBid WebService ****************/

    this.setState({ isScreenLoading: true });
    var postData = {
      UserId: userID,
      AuctionId: AuctionId
    };
    this.props.cancelBid(postData);
    /************************************************************/
  }

  callGetBidUserDetailsWebService(AuctionId) {
    /***************** Call getBidUserDetails WebService ****************/

    this.setState({ isScreenLoading: true });
    this.props.getBidUserDetails(AuctionId);
    /********************************************************************/
  }

  callGetBidTenantDetails(AuctionId) {
    this.setState({ isScreenLoading: true });
    var postData = {
      UserId: this.state.loggedInUserData.ID,
      AuctionId: AuctionId
    };
    // alert(JSON.stringify(postData))
    this.props.getBidTenantDetails(postData);
  }

  onRebidClicked(index) {
    Actions.BiddingStatusDetailComponent({
      topBiddingDetails: this.state.tenantBiddings[index]
    });
  }

  onCancelBidClicked(index) {
    Alert.alert(
      "LeaseAgent",
      Strings.CANCEL_BID_CONFIRMATION_MSG,
      [
        {
          text: "Yes",
          onPress: () =>
            this.callCancelBidWebService(
              this.state.loggedInUserData.ID,
              this.state.tenantBiddings[index].AuctionId
            )
        },
        { text: "No", onPress: () => console.log("CancelBid Denied") }
      ],
      { cancelable: false }
    );
  }

  viewTotalBidDetailsClicked(index) {
    this.setState({
      bidUserlist: []
    });
    this.state.modalTitle = "Numbers of Bid";

    this.callGetBidUserDetailsWebService(
      this.state.tenantBiddings[index].auctionid
    );
  }

  viewTenantTotalBidDetailsClicked(index) {
    this.setState({
      bidUserlist: []
    });
    this.state.modalTitle = "Numbers of Tenant Bid";
    this.callGetBidTenantDetails(this.state.tenantBiddings[index].auctionid);
  }

  renderItem({ item, index }) {
    var bidDate = Moment(item.BidTime).format("DD-MM-YYYY");

    return (
      <View style={{ flex: 1, justifyContent: "center", marginLeft:10, marginRight:10,marginTop:10, padding:10, backgroundColor:'#FFF' }}>
        <Text style={{ fontSize: 12, fontWeight: "700", marginRight: 20 }}>
          {"Property Name:"}
        </Text>
        <Text style={{ fontSize: 12, fontWeight: "500", marginRight: 20 }}>
          {item.PropertyHeading}
        </Text>

        <Text
          style={{
            fontSize: 12,
            fontWeight: "700",
            marginRight: 20,
            marginTop: 10
          }}
        >
          {"Last Bid Amount: " + item.LastBidamount}
        </Text>

        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "700",
              width: window.width * 0.5,
              marginRight: 20,
              marginTop: 10
            }}
          >
            {"Tenant Total Bid: " + item.TenantTotalBid}
          </Text>
          <TouchableOpacity
            onPress={() => self.viewTenantTotalBidDetailsClicked(index)}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "700",
                marginRight: 20,
                marginTop: 10,
                width: window.width * 0.5,
                color: "blue"
              }}
            >
              View Details
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "700",
              marginRight: 20,
              width: window.width * 0.5,
              marginTop: 10
            }}
          >
            {"Total Bid: " + item.Totalbidreceived}
          </Text>
          <TouchableOpacity
            onPress={() => self.viewTotalBidDetailsClicked(index)}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "700",
                width: window.width * 0.5,
                marginRight: 20,
                marginTop: 10,
                color: "blue"
              }}
            >
              View Details
            </Text>
          </TouchableOpacity>
        </View>

        {/*<View style={{flexDirection:'row', justifyContent:'space-between', marginTop:10}}>
                                            <View style={{width: (window.width*0.33)-5}}>
                                                <Text style={{fontSize:12, fontWeight:'700'}}>No. Of Bid</Text>
                                                <Text style={{fontSize:12, fontWeight:'500'}}>{item.TenantTotalBid}</Text>                  
                                            </View>
                    
                                            <View style={{width: (window.width*0.33)-5}}>
                                                <Text style={{fontSize:12, fontWeight:'700'}}>Max Bid</Text>
                                                <Text style={{width:window.width*0.3, fontSize:12, fontWeight:'500'}}>{item.MaxBid}</Text>                  
                                            </View>
                    
                                            <View style={{width: (window.width*0.33)-5}}>
                                                <Text style={{fontSize:12, fontWeight:'700'}}>Tenant Bid</Text>
                                                <Text style={{width:window.width*0.3, fontSize:12, fontWeight:'500'}}>{item.BidAmount}</Text>                  
                                            </View>
                                        </View>*/}

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20
          }}
        >
          <View
            style={{
              width: window.width * 0.7,
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <TouchableOpacity
              onPress={() => self.onRebidClicked(index)}
              style={{
                backgroundColor: "green",
                height: window.width * 0.2 / 2,
                width: window.width * 0.3,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={{ color: "#ffffff" }}>Rebid</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => self.onCancelBidClicked(index)}
              style={{
                backgroundColor: "red",
                height: window.width * 0.2 / 2,
                width: window.width * 0.3,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={{ color: "#ffffff" }}>Cancel Bid</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.seperatorLine} />
      </View>
    );
  }

  renderBidUserItem({ item, index }) {
    var name = item.FirstName + " " + item.LastName;

    return (
      <View>
        <View style={{ width: window.width * 0.8, flexDirection: "row" }}>
          <Text
            style={{ color: "black", width: window.width * 0.5, margin: 10 }}
          >
            {name}
          </Text>
          <Text
            style={{ color: "black", width: window.width * 0.5, margin: 10 }}
          >
            ${item.TenantBidAmount}
          </Text>
        </View>
        <View style={styles.seperatorLine} />
      </View>
    );
  }

  closeModalview() {
    this.setState({ showTotalBidModel: false });
    (this.props.bidTenantDetailResponse = ""),
      (this.props.bidUserDetailResponse = "");
    this.state.bidUserlist = [];
    this.setState({
      bidUserlist: []
    });
    this.props.clearBidTenantDetailResponse();
    this.props.clearBidUserDetailResponse();
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        {this.state.tenantBiddings.length == 0 ? (
          <View
            style={{
              height: 100,
              width: window.width,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "700" }}>
              No bidding has been done yet
            </Text>
          </View>
        ) : (
          <FlatList
            data={this.state.tenantBiddings}
            renderItem={this.renderItem}
            extraData={this.state}
          />
        )}
        {this.state.showTotalBidModel ? (
          <Modal transparent>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: Colors.TRANSLUCENT_BLACK_DARK
              }}
            >
              <View
                style={{
                  marginTop: 20,
                  height: window.height * 0.8,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: Colors.WHITE
                }}
              >
                <View
                  style={{
                    width: window.width * 0.8,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row"
                  }}
                >
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 14,
                      fontWeight: "700",
                      alignItems: "center"
                    }}
                  >
                    {this.state.modalTitle}
                  </Text>
                  <TouchableOpacity
                    onPress={() => this.closeModalview()}
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: 40,
                      height: 40,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Text
                      style={{ fontSize: 15, fontWeight: "700", color: "gray" }}
                    >
                      {"X"}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.titleSeperatorLine} />
                <View
                  style={{
                    height: 35,
                    width: window.width * 0.65,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      color: Colors.APP_THEME_RED_COLOR,
                      fontSize: 14,
                      fontWeight: "700"
                    }}
                  >
                    Name
                  </Text>
                  <Text
                    style={{
                      color: Colors.APP_THEME_RED_COLOR,
                      fontSize: 14,
                      fontWeight: "700"
                    }}
                  >
                    Bid Amount
                  </Text>
                </View>
                <FlatList
                  data={this.state.bidUserlist}
                  renderItem={this.renderBidUserItem}
                  extraData={this.state}
                />
              </View>
            </View>
          </Modal>
        ) : null}
        {this.state.isScreenLoading ? (
          <View style={styles.circles}>
            <Progress.CircleSnail color={["#000000", "#000000", "#000000"]} />
          </View>
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = ({ biddingStatusListingReducer }) => {
  const {
    tenantBidDetailResponse,
    cancelBidResponse,
    bidUserDetailResponse,
    bidTenantDetailResponse
  } = biddingStatusListingReducer;

  return {
    tenantBidDetailResponse: tenantBidDetailResponse,
    cancelBidResponse: cancelBidResponse,
    bidUserDetailResponse: bidUserDetailResponse,
    bidTenantDetailResponse: bidTenantDetailResponse
  };
};

export default connect(mapStateToProps, {
  getTenantBidDetails,
  clearGetTenantBidDetailsResponse,
  clearBidTenantDetailResponse,
  clearBidUserDetailResponse,
  cancelBid,
  getBidUserDetails,
  getBidTenantDetails
})(BiddingStatusListingComponent);
