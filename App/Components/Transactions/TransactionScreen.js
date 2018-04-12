import React, { Component } from "react";

import {
  Image,
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Alert,
  InteractionManager,
  Platform,
  FlatList,
  ScrollView,
  RefreshControl,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux";
import { clearTransactionsResponse } from "./TransactionAction";
import { getTransactions } from "../../Action/ActionCreators";
import { Actions } from "react-native-router-flux";
import Colors from "../../Constants/Colors";
import Strings from "../../Constants/Strings";
import styles from "./TransactionStyle";
import * as Progress from "react-native-progress";
import moment from "moment";
import * as Animatable from 'react-native-animatable';

class TransactionScreen extends Component {
  constructor() {
    super();
    this.state = {
      transactionList: [],
      isScreenLoading: false,
      UserId: ""
    };
  }

  callGetTransactionsWebService(userID) {
    this.setState({ isScreenLoading: true });

    var postData = {
      UserId: userID
    };
    this.props.getTransactions(postData);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.transactionList != undefined &&
      nextProps.transactionList != ""
    ) {
      this.setState({ isScreenLoading: false });      
      if (nextProps.transactionList.headerResponse.status == 200) {
        this.setState({
          transactionList: nextProps.transactionList.data.Content
        });
      } else if (nextProps.transactionList.headerResponse.status == 400) {
        alert(nextProps.transactionList.data.error_description);
      } else if (nextProps.transactionList.headerResponse.status == 500) {
        alert("Internal Server Error");
      }
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      AsyncStorage.getItem("loggedInUserInfo")
        .then(value => {
          if (value) {
            var loggedInUserData = JSON.parse(value);
            this.setState({ UserId: loggedInUserData.ID });

            this.callGetTransactionsWebService(loggedInUserData.ID);
          }
        })
        .done();
    });
  }

  renderItem = ({ item, index }) => {
    var createdTime = moment(item.PaidDate).format("DD/MM/YYYY hh:mm A");
    return (
      <Animatable.View animation="fadeInDown" style={styles.row}>
        <View style={styles.listRowContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Transaction ID</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.normalText}>{item.TransactionId}</Text>
          </View>
        </View>

        <View style={styles.listRowContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Payment Method</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.normalText}>Paypal</Text>
          </View>
        </View>

        <View style={styles.listRowContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Invoice Number</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.normalText}>{item.InvoiceNo}</Text>
          </View>
        </View>

        <View style={styles.listRowContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Total Amount</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.normalText}>${item.TotalAmount}</Text>
          </View>
        </View>

        <View style={styles.listRowContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Total Paid Amount</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.normalText}>${item.PaidAmount}</Text>
          </View>
        </View>

        <View style={styles.listRowContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Transaction State</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.normalText}>Completed</Text>
          </View>
        </View>

        <View style={styles.listRowContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Create Time</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text numberOfLines={1} style={styles.normalText}>
              {createdTime}
            </Text>
          </View>
        </View>
      </Animatable.View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.isScreenLoading ? (
          <View style={styles.circles}>
            <Progress.CircleSnail color={["#000000", "#000000", "#000000"]} />
          </View>
        ) : (
          <FlatList
            style={styles.container}
            data={this.state.transactionList}
            renderItem={this.renderItem}
            extraData={this.state}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = ({ transactionReducer }) => {
  const { transactionList } = transactionReducer;
  return {
    transactionList: transactionList
  };
};

export default connect(mapStateToProps, {
  getTransactions
})(TransactionScreen);
