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
  Picker,
  FlatList,
  ScrollView,
  TouchableHighlight,
  RefreshControl,
  AsyncStorage
} from "react-native";

import { connect } from "react-redux";
import { clearInspectionsResponse } from "./PropertyInspectionAction";
import { getInspections } from "../../Action/ActionCreators";
import { Actions } from "react-native-router-flux";

import Colors from "../../Constants/Colors";
import Strings from "../../Constants/Strings";
import styles from "./PropertyInspectionStyle";
import CommonStyles from '../../CommonStyle/CommonStyle';

import * as Progress from "react-native-progress";
import moment from "moment";
import { Dropdown } from 'react-native-material-dropdown';

import reschedule from "../../Assets/reschedule.png";
import coverImage from "../../Assets/maintenance_check.jpg";
import cancelImage from "../../Assets/ic_cancel.png";

let inspectionType = [{
      value: 'Scheduled Inspection',
    }, {
      value: 'Non Scheduled Inspection',
    }];

class PropertyInspectionComponent extends Component {
  constructor() {
    super();
    this.state = {
      inspectionList: [],
      isScreenLoading: false,
      UserId: "",
      listType: 'Scheduled Inspection' // 0 for scheduled and 1 for not scheduled
    };
  }

  callGetInspectionsWebService(userID) {
    this.setState({ isScreenLoading: true });

    var postData = {
      UserId: userID
    };
    this.props.getInspections(postData);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.inspectionList != undefined &&
      nextProps.inspectionList != ""
    ) {
      this.setState({ isScreenLoading: false });
      if (nextProps.inspectionList.headerResponse.status == 200) {
        if (this.state.listType == 0) {
          this.setState({
            inspectionList:
              nextProps.inspectionList.data.Content.data.BookedShedule
          });
        } else if (this.state.listType == 1) {
          this.setState({
            inspectionList:
              nextProps.inspectionList.data.Content.data.BookedNotShedule
          });
        }
      }
    } else if (nextProps.inspectionList.headerResponse.status == 400) {
      alert(nextProps.inspectionList.data.error_description);
    } else if (nextProps.inspectionList.headerResponse.status == 500) {
      alert("Internal Server Error");
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      AsyncStorage.getItem("loggedInUserInfo")
        .then(value => {
          if (value) {
            var loggedInUserData = JSON.parse(value);
            this.setState({ UserId: loggedInUserData.ID });
            this.callGetInspectionsWebService(loggedInUserData.ID);
          }
        })
        .done();
    });
  }
  _onPressReschedule = () => {};

  renderItem = ({ item, index }) => {
    var inspectionDate = moment(item.InspectionDate).format("DD/MM/YYYY");
    var beginTime = moment(item.BeginTime).format("hh:mm A");
    var endTime = moment(item.EndTime).format("hh:mm A");

    return (
      <View style={styles.row}>
        <View style={styles.listRowContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Property Name</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.normalText}>{item.PropertyHeading}</Text>
          </View>
        </View>

        <View style={styles.listRowContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Inspection Date</Text>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Text style={styles.normalText}>
              {inspectionDate == "Invalid date" ? "Not yet Scheduled" : inspectionDate}
            </Text>

            <TouchableOpacity
              style={{
                position: "absolute",
                bottom: 0,
                right: 0
              }}
              onPress={this._onPressReschedule}
            >
              {inspectionDate != "Invalid date" ? (
                <Image
                  source={this.state.listType == 'Scheduled Inspection' ? cancelImage : reschedule}
                  style={{
                    width: 24,
                    height: 24,
                    padding: 5
                  }}
                />
              ) : null}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.listRowContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Inspection Time</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.normalText}>
              {beginTime == "Invalid date" ? "" : beginTime} -{" "}
              {endTime == "Invalid date" ? "" : endTime}
            </Text>
          </View>
        </View>

        <View style={styles.listRowContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Distance</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.normalText}>{item.distance}</Text>
          </View>
        </View>

        <View style={styles.listRowContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Time Required</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.normalText}>{item.Timerequire}</Text>
          </View>
        </View>
      </View>
    );
  };


  onInspectionSelected(value, index, data) {        
      
        this.setState({ listType: value });
        
        if (this.props.inspectionList.headerResponse.status == 200) {
          if (index == 0) {
            this.setState({ inspectionList: this.props.inspectionList.data.Content.data.BookedShedule});
          } else {
            this.setState({ inspectionList: this.props.inspectionList.data.Content.data .BookedNotShedule});
          }
        }
    }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 1
          }}
        >
          {/*    <Image
            resizeMode="cover"
            style={{ width: "100%", height: 175 }}
            source={coverImage}
          /> */}
          {/*<Picker
                      style={{
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 10,
                        
                      }}
                      selectedValue={this.state.listType}
                      mode="dropdown"
                      onValueChange={(itemValue, itemIndex) =>
                        this.onInspectionSelected(itemValue)
                      }
                    >
                      <Picker.Item label="Scheduled Inspection" value="0" />
                      <Picker.Item label="Non Scheduled Inspection" value="1" />
                    </Picker>*/}

          <View style={{marginLeft: 30, marginRight: 30}}>
              <Dropdown
                      containerStyle={{width:window.width*0.7, height:65}}                      
                      data={inspectionType}
                      onChangeText={this.onInspectionSelected.bind(this)}
                      value={this.state.listType}
              />
              {(this.state.titleError == '')?null:
                  <Text style={CommonStyles.errorText}>{this.state.titleError}</Text>                                
              }
          </View>
          <FlatList
            style={styles.container}
            data={this.state.inspectionList}
            renderItem={this.renderItem}
            extraData={this.state}
          />
        </View>

        {this.state.isScreenLoading ? (
          <View style={styles.circles}>
            <Progress.CircleSnail color={["#000000", "#000000", "#000000"]} />
          </View>
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = ({ propertyInspectionReducer }) => {
  const { inspectionList } = propertyInspectionReducer;
  return {
    inspectionList: inspectionList
  };
};

export default connect(mapStateToProps, {
  getInspections
})(PropertyInspectionComponent);
