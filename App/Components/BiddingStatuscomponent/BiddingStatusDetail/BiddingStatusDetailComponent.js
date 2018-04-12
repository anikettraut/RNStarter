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

import { getTopBiddingDetails } from "../../../Action/ActionCreators";

import { clearGetTopBiddingDetailsResponse } from "./BiddingStatusDetailAction";

import { Actions } from "react-native-router-flux";
import Colors from "../../../Constants/Colors";
import Strings from "../../../Constants/Strings";
import styles from "./BiddingStatusDetailStyle";

import * as Progress from "react-native-progress";
import Moment from "moment";

import check_selected from "../../../Assets/check_selected.png";
import meterImage from "../../../Assets/meter.png";

const window = Dimensions.get("window");

class BiddingStatusDetailComponent extends Component {
  constructor() {
    super();
    this.state = {
      accessToken: "",
      tenantBids: [],
      tenantBid: 0,
      loggedInUserData: "",
      lastBidedAmount: "",
      basePrice: "",
      incrementAmount: "",
      PropertyHeading: ""
    };
  }

  componentWillMount() {
    AsyncStorage.getItem("loggedInUserInfo")
      .then(value => {
        if (value) {
          var loggedInUserData = JSON.parse(value);
          this.setState({ loggedInUserData: loggedInUserData });
          //   alert(JSON.stringify(this.state.loggedInUserData));
          var postData = {
            PropertyInfoId: this.props.topBiddingDetails.PropertyInfoId,
            userId: this.state.loggedInUserData.ID
          };
          this.callGetTopBiddingDetailsWebService(postData);
        }
      })
      .done();
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {});
  }

  componentWillReceiveProps(nextProps) {
    // Handle getTopBiddingDetails service response
    if (
      nextProps.topBiddingDetailsResponse != undefined &&
      nextProps.topBiddingDetailsResponse != ""
    ) {
      this.setState({ isScreenLoading: false });

      if (nextProps.topBiddingDetailsResponse.headerResponse.status == 200) {
        if (nextProps.topBiddingDetailsResponse.data.Content != null) {
          this.setState({
            tenantBids: nextProps.topBiddingDetailsResponse.data.Content
          });
          //todo
          this.setState({
            lastBidedAmount:
              nextProps.topBiddingDetailsResponse.data.Content.Content
                .PropertyDetails[0].LastBid,
            basePrice:
              nextProps.topBiddingDetailsResponse.data.Content.Content
                .PropertyDetails[0].MinPrice,

            incrementAmount:
              nextProps.topBiddingDetailsResponse.data.Content.Content
                .PropertyDetails[0].IncrementAmount,

            PropertyHeading:
              nextProps.topBiddingDetailsResponse.data.Content.Content
                .PropertyDetails[0].PropertyHeading,

            tenantBid:
              nextProps.topBiddingDetailsResponse.data.Content.Content
                .PropertyDetails[0].LastBid +
              nextProps.topBiddingDetailsResponse.data.Content.Content
                .PropertyDetails[0].IncrementAmount,

            tenantBids:
              nextProps.topBiddingDetailsResponse.data.Content.Content
                .TopBidList
          });
          /*  alert(
            JSON.stringify(
              nextProps.topBiddingDetailsResponse.data.Content.Content
                .PropertyDetails[0]
            ) */
        } else {
          alert(nextProps.topBiddingDetailsResponse.data.ReturnMessage[0]);
        }
      } else if (
        nextProps.topBiddingDetailsResponse.headerResponse.status == 400
      ) {
        alert(nextProps.topBiddingDetailsResponse.data.error_description);
      } else if (
        nextProps.topBiddingDetailsResponse.headerResponse.status == 500
      ) {
        alert("Internal Server Error");
      }
    }
  }

  componentDidUpdate() {
    if (
      this.props.topBiddingDetailsResponse != undefined &&
      this.props.topBiddingDetailsResponse != ""
    ) {
      this.props.clearGetTopBiddingDetailsResponse();
    }
  }

  componentWillUnmount() {}

  callGetTopBiddingDetailsWebService(postData) {
    /***************** Call getTopBiddingDetails WebService ****************/

    this.setState({ isScreenLoading: true });
    this.props.getTopBiddingDetails(postData);
    /*************************************************************************/
  }

  decrementBid() {
    try {
      if (this.state.tenantBid > 0) {
        var currentBid = this.state.tenantBid;
        var minBid = this.state.lastBidedAmount + this.state.incrementAmount;
        if (this.state.tenantBid > minBid) {
          currentBid = currentBid - this.state.incrementAmount;
          this.setState({ tenantBid: currentBid });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  incrementBid() {
    try {
      var currentBid = this.state.tenantBid;
    currentBid = currentBid + this.state.incrementAmount;
    this.setState({ tenantBid: currentBid });
    } catch (error) {
      console.log(error);
    }
  }

  onSaveClicked() {}

  renderItem({ item, index }) {
    // var nameOfTenant = item.FirstName + " " + item.LastName;
    var nameOfTenant = item.TenantName;

    var appliedDate = Moment(item.BidTime).format("DD/MM/YYYY hh:mm A");

    return (
      <View style={{ flex: 1, justifyContent: "center", margin: 10 }}>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              width: 130,
              fontSize: 14,
              marginRight: 20
            }}
          >
            {"Name:"}
          </Text>
          <Text style={{ fontSize: 14, marginRight: 20 }}>
            {nameOfTenant}
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              width: 130,
              fontSize: 14,
              marginRight: 20
            }}
          >
            {"Tenant Bid Amount:"}
          </Text>
          <Text style={{ fontSize: 14 ,marginRight: 20 }}>
            {"$" + item.TenantBidAmount}
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              width: 130,
              fontSize: 14,
              marginRight: 20
            }}
          >
            {"Applied Date:"}
          </Text>
          <Text style={{ fontSize: 14,  marginRight: 20 }}>
            {appliedDate}
          </Text>
        </View>

        <View style={styles.seperatorLine} />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={{ justifyContent: "center", margin: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "700", marginRight: 20 }}>
            {"Bid for Property: " + this.state.PropertyHeading}
          </Text>
          <Text style={{ fontSize: 12, fontWeight: "500", marginRight: 20 }}>
            {this.props.topBiddingDetails.PropertyName}
          </Text>

          <View style={styles.seperatorLine} />

          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              marginRight: 20,
              marginTop: 0
            }}
          >
            {"LandLord Price"}
          </Text>

          <Text
            style={{
              fontSize: 14,
              marginRight: 20,
              marginTop: 5
            }}
          >
            {"Last Bidded Amount: $" + this.state.lastBidedAmount}
          </Text>
          <Text style={{ fontSize: 14,  marginRight: 20 }}>
            {"Base Price: $" + this.state.basePrice}
          </Text>
          <Text style={{ fontSize: 14, marginRight: 20 }}>
            {"Increment Amount By: $" + this.state.incrementAmount}
          </Text>

          <View style={styles.seperatorLine} />

          <View style={styles.sectionContainer}>
            <Text style={{ fontSize: 16, fontWeight: "700", marginRight: 20 }}>
              {"Your Offer"}
            </Text>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: window.width * 0.9
              }}
            >
              <Text style={{ marginTop: 0 }}> Bid Price </Text>
            </View>

            <View style={styles.stepperView}>
              <TouchableOpacity onPress={() => this.decrementBid()}>
                <Text
                  style={{
                    fontSize: 24,
                    color: "red",
                    margin: 10,
                    fontWeight: "bold"
                  }}
                >
                  {" "}
                  -{" "}
                </Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 20 }}>{this.state.tenantBid}</Text>
              <TouchableOpacity onPress={() => this.incrementBid()}>
                <Text style={{ fontSize: 24, color: "red", margin: 10 }}>
                  {" "}
                  +{" "}
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: window.width * 0.9
              }}
            >
              <Text style={{ marginTop: 10 }}>
                {"The maximum Bid Amount for this Property is " +
                  this.state.tenantBid}
              </Text>
            </View>
          </View>

          <View
            style={{
              width: window.width,
              alignItems: "center",
              marginTop: 12
            }}
          >
            <TouchableOpacity
              onPress={() => this.onSaveClicked()}
              style={{
                backgroundColor: Colors.APP_THEME_RED_COLOR,
                height: 40,
                width: 100,
                marginRight: 30,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={{ color: "#ffffff" }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.seperatorLine} />

        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              marginRight: 20,
              marginLeft: 10
            }}
          >
            {"Top 10 Bidders"}
          </Text>
        </View>

        {this.state.tenantBids.length == 0 ? (
          <View
            style={{
              height: 100,
              width: window.width,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "700" }}>
              No offers has been done yet
            </Text>
          </View>
        ) : (
          <FlatList
            data={this.state.tenantBids}
            renderItem={this.renderItem}
            extraData={this.state}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = ({ biddingStatusDetailReducer }) => {
  const { topBiddingDetailsResponse } = biddingStatusDetailReducer;

  return {
    topBiddingDetailsResponse: topBiddingDetailsResponse
  };
};

export default connect(mapStateToProps, {
  getTopBiddingDetails,
  clearGetTopBiddingDetailsResponse
})(BiddingStatusDetailComponent);
