import React, { Component } from "react";
import { connect } from "react-redux";
import {
  AppRegistry,
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
  ListView,
  AsyncStorage,
  Dimensions,
  InteractionManager,
  Navigator,
  FlatList
} from "react-native";

import { userAuthenticated } from "../LoginComponent/LoginAction";

import { Actions } from "react-native-router-flux";

import Colors from "../../Constants/Colors";
import Strings from "../../Constants/Strings";
import styles from "./SearchStyle";
import CommonStyles from "../../CommonStyle/CommonStyle";
import DynamicListRow from "../CommonComponent/DynamicListRow";

import ImageSlider from "react-native-image-slider";
import AutoComplete from "react-native-autocomplete";

import appLogoImage from "../../Assets/logo.png";
import homebgImage from "../../Assets/homebg.png";
import searchImage from "../../Assets/search.png";
import arrowImage from "../../Assets/arrow.png";
import clockImage from "../../Assets/clock.png";

const window = Dimensions.get("window");

const homePlace = {
  description: "Home",
  geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }
};
const workPlace = {
  description: "Work",
  geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }
};

const GOOGLE_PLACES_API_KEY = "AIzaSyD5jldFuY0WbJUaRTQ_BxgmdbOPjn01xlU";
var Countries = [];
var savedSearches = [];

var self;

const CustomCell = ({ data }) => (
  <View
    style={{
      flex: 1,
      height: data.initialSavedItem ? 140 : 60,
      justifyContent: "center"
    }}
  >
    {data.initialSavedItem ? (
      <Text
        style={{
          fontSize: 10,
          marginLeft: 20,
          color: "gray",
          marginBottom: 10
        }}
      >
        RECENT LOCATIONS
      </Text>
    ) : null}
    <Text style={styles.cellText}>{data.place ? data.place : ""}</Text>
  </View>
);

class SearchScreen extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => true
      }),
      responseData: [],
      position: 1,
      interval: null,
      searchKeyword: "",
      showSignINButton: true,
      suggestionData: [],
      copySuggestionData: [],
      tags: [],
      showListView: 1,
      initialPosition: "unknown",
      lastPosition: "unknown",
      lat: 25.4405158,
      long: -80.501887,
      searchText: "",
      sliderImages: []
    };

    self = this;
    this.onTyping = this.onTyping.bind(this);
  }

  componentWillMount() {
    var imageURLs = [
      "http://108.168.203.227:9095/images/slide1.jpg",
      "http://108.168.203.227:9095/images/slide2.jpg",
      "http://108.168.203.227:9095/images/slide3.jpg"
    ];

    this.setState({ sliderImages: imageURLs });

    this.setState({
      interval: setInterval(() => {
        this.setState({
          position: this.state.position === 2 ? 0 : this.state.position + 1
        });
      }, 5000)
    });
  }

  componentDidMount() {
    Platform.OS === "ios" ? this.iOSLoaction() : this.androidLocation();

    InteractionManager.runAfterInteractions(() => {});

    AsyncStorage.getItem("kSavedPlaces")
      .then(value => {
        if (value) {
          var places = JSON.parse(value);
          if (places.length > 0) {
            savedSearches = places;

            if (savedSearches.length > 0) {
              var savedListData = [];
              savedSearches.map((data, index) => {
                console.log("data>>>> ", JSON.stringify(data));
                var jsonData = {
                  place: data.placeName + ", " + data.postalCode,
                  initialSavedItem: data.initialSavedItem,
                  isSavedSearch: 1
                };
                savedListData.push(jsonData);
              });
              Countries = savedListData;
            }
            console.log("savedSearches>>>>> " + JSON.stringify(savedSearches));
            this.setState({
              suggestionData: Countries,
              copySuggestionData: savedSearches
            });
            this._loadData(this.state.suggestionData);
          }
        }
      })
      .done();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userAuthorize) {
      console.log("userAuthorize>>>> " + nextProps.userAuthorize);
      this.setState({ showSignINButton: false });
    }
  }

  componentDidUpdate() {
    if (this.props.userAuthorize) {
      this.props.userAuthenticated(false);
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
    this.setState({ responseData: [] });

    Platform.OS === "ios"
      ? navigator.geolocation.clearWatch(this.watchID)
      : console.log("Unmount location for android");
  }

  watchID: ?number = null;

  iOSLoaction() {
    navigator.geolocation.getCurrentPosition(
      position => {
        const initialPosition = JSON.stringify(position);
        this.setState({ initialPosition });
        let address = JSON.parse(initialPosition);
        console.log("address>>>> ", JSON.stringify(address));
        this.setState({
          lat: address.coords.latitude,
          long: address.coords.longitude
        });
      },
      error => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    this.watchID = navigator.geolocation.watchPosition(position => {
      const lastPosition = JSON.stringify(position);
      this.setState({ lastPosition });
    });
  }

  androidLocation() {}

  onTyping(text) {
    this.fetchRelatedAddress(text);
  }

  onSearchLocationType(text) {
    this.setState({ searchText: text });
    this.fetchRelatedAddress(text);
  }

  fetchRelatedAddress(text) {
    //var serviceURL = 'http://v0.postcodeapi.com.au/suburbs/'+text+'.json';
    var isnum = /^\d+$/.test(text);

    var paramName = "";
    if (isnum) {
      paramName = "postalcode_startsWith";
    } else {
      paramName = "placename_startsWith";
    }

    var serviceURL =
      "http://api.geonames.org/postalCodeSearchJSON?" +
      paramName +
      "=" +
      text +
      "&country=AU&maxRows=10&username=smarttest";

    console.log("===========fetchRelatedSuburbs==============");
    console.log(serviceURL);
    console.log("============================================");

    var getSuburbsHeaderResponse = {};

    //call the API and use the promise to check the response
    // in response callBack .then() call the dispatcher.

    fetch(serviceURL, {
      method: "GET",
      headers: {
        Accept: "application/json;"
      }
    })
      .then(response => {
        console.log("*********************************************");
        console.log("Received response fetchRelatedAddress API: ", response);
        console.log("*********************************************");
        getSuburbsHeaderResponse = response;
        return response.json();
      })
      .then(responseJSON => {
        console.log("*********************************************");
        console.log(
          "JSON response from fetchRelatedAddress API: ",
          responseJSON
        );
        console.log("*********************************************");
        var responseData = {
          data: responseJSON,
          headerResponse: getSuburbsHeaderResponse
        };
        console.log(
          "JSON headerResponse from fetchRelatedAddress API: ",
          JSON.stringify(responseData)
        );

        var listData = [];
        var copyListData = [];
        responseData.data.postalCodes.map((data, index) => {
          var jsonData = {
            place: data.placeName + ", " + data.postalCode,
            initialSavedItem: 0,
            isSavedSearch: 0
          };
          listData.push(jsonData);

          data.initialSavedItem = 0;
          data.isSavedSearch = 0;
          copyListData.push(data);
        });
        Countries = listData;

        // If there is any saved locations merge it to show in Searhing Dropdown.
        if (savedSearches.length > 0) {
          var savedListData = [];
          savedSearches.map((data, index) => {
            var jsonData = {
              place: data.placeName + ", " + data.postalCode,
              initialSavedItem: data.initialSavedItem,
              isSavedSearch: 1
            };
            savedListData.push(jsonData);
          });

          var mergeArray = [...listData, ...savedListData];
          Countries = mergeArray;
        }

        this.setState({
          suggestionData: Countries,
          copySuggestionData: copyListData,
          showListView: 0
        });
      })
      .catch(e => {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        console.log("Error: " + e);
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      });
  }

  rescentSearchesClicked(rescentPlace) {
    this.setState({ searchText: "" });
    // if(self.state.tags.includes(rescentPlace)){

    // }
    // else{
    //     var tempTags = self.state.tags;
    //     tempTags.push(rescentPlace);
    //     self.setState({tags:tempTags});
    // }

    this.onSelect(rescentPlace);
  }

  onSelect(selectedPlace) {
    console.log("selectedPlace>>>>> " + JSON.stringify(selectedPlace));

    if (self.state.tags.includes(selectedPlace)) {
    } else {
      var tempTags = self.state.tags;
      tempTags.push(selectedPlace);
      self.setState({ tags: tempTags });

      if (!selectedPlace.isSavedSearch) {
        var selectedLocation = "";
        self.state.copySuggestionData.map((value, index) => {
          var formattedString = value.placeName + ", " + value.postalCode;
          if (selectedPlace.place == formattedString) {
            selectedLocation = value;
          }
        });

        AsyncStorage.getItem("kSavedPlaces")
          .then(value => {
            if (value) {
              var places = JSON.parse(value);
              selectedLocation.isSavedSearch = 1;
              savedSearches.push(selectedLocation);
              places.push(selectedLocation);
              self.saveSelectedData(places);
            } else {
              var places = [];
              selectedLocation.initialSavedItem = 1;
              selectedLocation.isSavedSearch = 1;
              savedSearches.push(selectedLocation);
              places.push(selectedLocation);
              self.saveSelectedData(places);
            }
          })
          .done();
      }
      self.setState({ showListView: 1 });
    }
  }

  saveSelectedData(data) {
    AsyncStorage.setItem("kSavedPlaces", JSON.stringify(data));
  }

  _loadData(arrayData) {
    this.dataLoadSuccess({ data: arrayData });
  }

  dataLoadSuccess(result) {
    this._data = result.data;

    let ds = this.state.dataSource.cloneWithRows(this._data);

    this.setState({
      loading: false,
      refreshing: false,
      dataSource: ds
    });
  }

  onSignINClick() {
    Actions.Login({ userType: Strings.kTENANT });
  }

  onProfileClick() {
    Actions.TenantProfileDashboard();
  }

  onSearchClicked() {
    if (this.state.tags.length) {
      Actions.FilterScreen({
        userType: Strings.kTENANT,
        selectedPlace: this.state.tags
      });
    } else {
      alert("Please select a suburb to view available properties.");
    }
  }

  _removeSelectedTag(tag, index) {
    var tempTags = self.state.tags;
    tempTags.splice(index, 1);
    self.setState({ tags: tempTags });
  }

  _renderRow(rowData, sectionID, rowID) {
    return (
      <DynamicListRow>
        <TouchableOpacity
          style={{
            height: rowData.initialSavedItem ? 100 : 50,
            justifyContent: "center"
          }}
          onPress={this.rescentSearchesClicked.bind(this, rowData)}
          key={rowID}
        >
          {rowData.initialSavedItem ? (
            <Text
              style={{
                height: 30,
                fontSize: 10,
                marginLeft: 20,
                color: "gray",
                marginBottom: 10
              }}
            >
              RECENT LOCATIONS
            </Text>
          ) : null}
          <Text style={styles.cellText}>
            {rowData.place ? rowData.place : ""}
          </Text>
        </TouchableOpacity>
      </DynamicListRow>
    );
  }

  _renderSuggestionsForAndroid({ item, index }) {
    console.log("item>>>>> " + JSON.stringify(item));

    return (
      <DynamicListRow>
        <TouchableOpacity
          style={{
            height: item.initialSavedItem ? 100 : 50,
            justifyContent: "center"
          }}
          key={index}
          onPress={() => self.rescentSearchesClicked(item)}
        >
          {item.initialSavedItem ? (
            <Text
              style={{
                height: 30,
                fontSize: 10,
                marginLeft: 20,
                color: "gray",
                marginBottom: 10
              }}
            >
              RECENT LOCATIONS
            </Text>
          ) : null}
          <Text style={styles.cellText}>{item.place ? item.place : ""}</Text>
        </TouchableOpacity>
      </DynamicListRow>
    );
  }

  _renderTags(tags, index) {
    return (
      <TouchableOpacity
        style={{ backgroundColor: "#dedede", margin: 5, borderRadius: 5 }}
        onPress={this._removeSelectedTag.bind(tags, index)}
        key={index}
      >
        <Text style={{ margin: 5 }}>{tags.place}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            width: window.width,
            height: this.state.tags.length ? 160 : 90,
            backgroundColor: Colors.BLACK,
            justifyContent: "center",
            flexDirection: "row"
          }}
        >
          <View>
            <View
              style={{
                width: window.width * 0.85,
                height:
                  Platform.OS === "android"
                    ? this.state.tags.length ? 120 : 40
                    : 40,
                marginLeft: 5,
                marginTop: 20,
                backgroundColor: "#FFF",
                borderColor: "#000000",
                borderWidth: 1,
                borderRadius: 5,
                borderBottomLeftRadius: 5,
                borderTopRightRadius: 5
              }}
            >
              {this.state.tags.length ? (
                <View
                  style={{
                    backgroundColor: "#ffffff",
                    alignSelf: "stretch",
                    width: window.width * 0.845,
                    height: 80,
                    justifyContent: "center",
                    borderWidth: 1,
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5,
                    borderColor: "#FFF"
                  }}
                >
                  <ScrollView
                    ref="scrollView"
                    onContentSizeChange={(width, height) =>
                      this.refs.scrollView.scrollTo({ y: height - 80 })
                    }
                    contentContainerStyle={{
                      flexDirection: "row",
                      flexWrap: "wrap"
                    }}
                  >
                    {this.state.tags.map((data, index) => {
                      return this._renderTags(data, index);
                    })}
                  </ScrollView>
                </View>
              ) : null}

              <View style={{ backgroundColor: "#FFF" }}>
                <View style={{ height: 40, backgroundColor: "#ffffff" }}>
                  <TextInput
                    style={{
                      height: 40,
                      backgroundColor: "#ffffff",
                      paddingLeft: 4
                    }}
                    underlineColorAndroid="transparent"
                    onChangeText={this.onSearchLocationType.bind(this)}
                    value={this.state.searchText}
                    placeholder=" Search by suburb or postal code"
                    returnKeyType="done"
                  />
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={{ marginLeft: 10, marginTop: 30 }}
            onPress={this.onSearchClicked.bind(this)}
          >
            <Image style={{alignItems: 'center',justifyContent:'center'}} source={searchImage} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: window.width * 0.9,
            backgroundColor: "#ffffff",
            marginTop: this.state.suggestionData.length > 0 ? 30 : 0
          }}
        >
          <FlatList
            data={this.state.suggestionData}
            renderItem={this._renderSuggestionsForAndroid}
            extraData={this.state}
            showsVerticalScrollIndicator={false}
          />
        </View>
        {this.state.suggestionData.length == 0 ? (
          <View style={styles.imageContainerStyle}>
            <View style={styles.imageSliderStyle}>
              <ImageSlider
                style={{
                  backgroundColor: Colors.BLACK,
                  height: 600
                }}
                images={this.state.sliderImages}
                position={this.state.position}
                onPositionChanged={position => this.setState({ position })}
              />
            </View>
            <Text style={styles.findARentalTitle}>
              Find a rental, find a home.
            </Text>
            <Text style={styles.getTheRightHomeTitle}>Get the right home</Text>
            <View style={styles.labelContainerStyle}>
              <Text style={styles.welcomeTitle}>Welcome</Text>
              <Text style={styles.leaseAgentDiscTitle}>
                At LeaseAgent we believe in giving you real service, real
                people, real conversations and real outcomes, we listen to you
                and focus on exactly what it is you need.
              </Text>
            </View>
            <Text style={styles.copyrightTitle}>
              Copyright ©2017 LeaseAgent. All rights reserved.
            </Text>
          </View>
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = ({ loginReducer }) => {
  const { userAuthorize } = loginReducer;

  return {
    userAuthorize: userAuthorize
  };
};

module.exports = connect(mapStateToProps, {
  userAuthenticated
})(SearchScreen);

AppRegistry.registerComponent("CustomCell", () => CustomCell);
