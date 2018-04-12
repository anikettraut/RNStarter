import React,{Component} from 'react';
import { connect } from 'react-redux';
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
    ListView,
    InteractionManager,
    Navigator
} from 'react-native';


import{ Actions}    from 'react-native-router-flux';
import Colors       from '../../Constants/Colors';
import Strings      from '../../Constants/Strings';
import styles       from './WeatherUpdatesStyle';

import check_selected from '../../Assets/check_selected.png';

import Moment from 'moment';
import RNLocalNotifications from 'react-native-local-notifications';

import {    
    getWeatherUpdates,    
} from "../../Action/ActionCreators";

import {    
    clearWeatherUpdates
} from './WeatherUpdatesAction';

var self;
const window = Dimensions.get('window');

class WeatherUpdates extends Component{

    constructor() {

        super();
        this.state = {
            weatherData : '',
            weatherDateWiseList: [], 
            initialPosition: 'unknown',
            lastPosition: 'unknown',
            lat:21.146633,
            long:79.088860,           
        };   
        self = this;
    }
    
    componentWillMount() { 

        var postData = {
            lat: this.state.lat?this.state.lat:21.146633,
            long: this.state.long?this.state.long:79.088860,
        }        
        this.callGetWeatherUpdatesWebService(postData);
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {                        
            (Platform.OS === 'ios') ? this.iOSLoaction():this.androidLocation(); 
        });   
    }
    
    componentWillUnmount(){   

        (Platform.OS === 'ios') ?
        navigator.geolocation.clearWatch(this.watchID)
        :
        console.log("Unmount location for android"); 
    }

    componentWillReceiveProps(nextProps) {
        
        // Handle getWeatherUpdates service response
        if(nextProps.weatherUpdatesResponse != undefined && nextProps.weatherUpdatesResponse != ''){

            this.setState({isScreenLoading:false});            

            var now = Moment('yyyy-mm-dd hh:mm');
            RNLocalNotifications.createNotification(1, 'Some text', now, 'default');

            if(nextProps.weatherUpdatesResponse.headerResponse.status == 200){                  
                this.setState({weatherData :  nextProps.weatherUpdatesResponse.data});

                var tempWeatherList = [];

                var tempDate = Moment(nextProps.weatherUpdatesResponse.data.list[0].dt_txt);
                var dayOfDate = tempDate.format('DD');
                var tempPreviousdate = dayOfDate;
                tempWeatherList.push(nextProps.weatherUpdatesResponse.data.list[0]);

                nextProps.weatherUpdatesResponse.data.list.map((data, index)=>{
                        
                        tempDate = Moment(data.dt_txt);                        
                        dayOfDate = tempDate.format('DD');

                        console.log("dt_txt>>> "+data.dt_txt)
                        console.log("dayOfDate>>> "+dayOfDate)
                        

                        if(dayOfDate != tempPreviousdate){                                                        
                            console.log("tempPreviousdate>>> "+tempPreviousdate)
                            var IDDD = index+5
                            console.log("index>>> "+IDDD)
                            tempPreviousdate = dayOfDate; 
                            tempWeatherList.push(nextProps.weatherUpdatesResponse.data.list[IDDD]); 
                            console.log("pushed Data: "+JSON.stringify(nextProps.weatherUpdatesResponse.data.list[IDDD]));                                              
                        }                        
                })
                console.log("tempWeatherList: "+JSON.stringify(tempWeatherList));  
                this.setState({weatherDateWiseList:tempWeatherList});               

            }
            else if(nextProps.weatherUpdatesResponse.headerResponse.status == 400){
                alert(nextProps.weatherUpdatesResponse.data.error_description);
            }
            else if(nextProps.weatherUpdatesResponse.headerResponse.status == 500){
                alert('Internal Server Error');
            }
        }
    }

    componentDidUpdate() {           
        if(this.props.weatherUpdatesResponse != undefined && this.props.weatherUpdatesResponse != ''){  
            this.props.clearWeatherUpdates();
        }
    }

    watchID: ?number = null;
    iOSLoaction(){
        navigator.geolocation.getCurrentPosition(
             (position) => {
                const initialPosition = JSON.stringify(position);
                this.setState({ initialPosition });
                let address = JSON.parse(initialPosition);
                console.log("address>>>> ", JSON.stringify(address));
                this.setState({lat: address.coords.latitude, long: address.coords.longitude}); 

                var postData = {
                    lat: address.coords.latitude?address.coords.latitude:21.146633,
                    long: address.coords.longitude?address.coords.longitude:79.088860,
                } 
                this.callGetWeatherUpdatesWebService(postData);
             },
             (error) => alert(error.message),
             { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
        
        this.watchID = navigator.geolocation.watchPosition((position) => {
            const lastPosition = JSON.stringify(position);
            this.setState({ lastPosition });
        });
    }


    androidLocation(){

    }

    callGetWeatherUpdatesWebService(postData) {
        
        this.setState({isScreenLoading:true});                                       
        this.props.getWeatherUpdates(postData);            
        
    }

    showDetails(data) {        
        
    }

    render(){

        var day1Temp, day2Temp, day3Temp, day4Temp, day5Temp;
        var day1, day2, day3, day4, day5;
        var day1Humidity, day2Humidity, day3Humidity, day4Humidity, day5Humidity;
        var day1Pressure;
        var day1MinTemp, day1MaxTemp;

        var now = Moment();

        day1 = now.format('dddd'); day1Temp = ''; day1Humidity = ''; day1Pressure = ''; day1MinTemp = '', day1MaxTemp = '',
        day2 = (now.add(1, 'days')).format('dddd'); day2Temp = ''; day2Humidity = '';
        day3 = (now.add(1, 'days')).format('dddd'); day3Temp = ''; day3Humidity = '';
        day4 = (now.add(1, 'days')).format('dddd'); day4Temp = ''; day4Humidity = '';
        day5 = (now.add(1, 'days')).format('dddd'); day5Temp = ''; day5Humidity = '';

        
            if(this.state.weatherDateWiseList.length > 0){
                day1Temp =  parseFloat((this.state.weatherDateWiseList[0].main.temp) - 273.15).toFixed(2);
                day1Humidity = this.state.weatherDateWiseList[0].main.humidity
                day1Pressure = this.state.weatherDateWiseList[0].main.pressure
                day1MinTemp = parseFloat((this.state.weatherDateWiseList[0].main.temp_min) - 273.15).toFixed(2);
                day1MaxTemp = parseFloat((this.state.weatherDateWiseList[0].main.temp_max) - 273.15).toFixed(2);
            }
            if(this.state.weatherDateWiseList.length > 1){
                day2Temp =  parseFloat((this.state.weatherDateWiseList[1].main.temp) - 273.15).toFixed(2);
                day2Humidity = this.state.weatherDateWiseList[1].main.humidity
            }
            if(this.state.weatherDateWiseList.length > 2){
                day3Temp =  parseFloat((this.state.weatherDateWiseList[2].main.temp) - 273.15).toFixed(2);
                day3Humidity = this.state.weatherDateWiseList[2].main.humidity
            }
            if(this.state.weatherDateWiseList.length > 3){
                day4Temp =  parseFloat((this.state.weatherData.list[3].main.temp) - 273.15).toFixed(2);
                day4Humidity = this.state.weatherDateWiseList[3].main.humidity
            }
            if(this.state.weatherDateWiseList.length > 4){
                day5Temp =  parseFloat((this.state.weatherData.list[4].main.temp) - 273.15).toFixed(2);
                day5Humidity = this.state.weatherDateWiseList[4].main.humidity
            }
        

        return(
            <View style={styles.container}>  

                <ScrollView>
                {this.state.weatherData.list?
                    <View style={styles.detailContainer}>

                        <View style={{ height:window.height*0.3 }}>
                            <View style={styles.dayViewContainer}>                        
                                    <Text style={styles.todayTemprature}>{day1Temp}</Text>
                                    <Text style={styles.degreeSign}>{'o'}</Text>                                                
                            </View>
                            <Text style={styles.todayHumidity}>{'('+day1+')'}</Text>
                            <Text style={styles.todayHumidity}>{'Humidity: '+day1Humidity}</Text>
                            <Text style={styles.todayHumidity}>{'Pressure: '+day1Pressure}</Text>                            
                            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:30}}>                        
                                    <Text style={styles.minMaxTemprature}>{'Minimum Temp: '+day1MinTemp}</Text>
                                    <Text style={styles.minMaxTemprature}>{'Maximum Temp: '+day1MaxTemp}</Text>
                            </View>
                        </View>
                        

                        <View style={{flexDirection:'row', marginTop:20, justifyContent:'space-between',marginTop:20, width:window.width*0.95}}>
                            <View style={styles.otherDayViewContainer}>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={styles.otherTemprature}>{day2Temp}</Text>
                                    <Text style={styles.smallDegreeSign}>{'o'}</Text>
                                </View>
                                <Text>{'('+day2+')'}</Text>
                            </View>

                            <View style={styles.otherDayViewContainer}>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={styles.otherTemprature}>{day3Temp}</Text>
                                    <Text style={styles.smallDegreeSign}>{'o'}</Text>
                                </View>
                                <Text>{'('+day3+')'}</Text>
                            </View>                            
                        </View>

                        <View style={{flexDirection:'row', marginTop:20, justifyContent:'space-between',marginTop:20, width:window.width*0.95}}>
                            

                            <View style={styles.otherDayViewContainer}>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={styles.otherTemprature}>{day4Temp}</Text>
                                    <Text style={styles.smallDegreeSign}>{'o'}</Text>
                                </View>
                                <Text>{'('+day4+')'}</Text>
                            </View>

                            <View style={styles.otherDayViewContainer}>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={styles.otherTemprature}>{day5Temp}</Text>
                                    <Text style={styles.smallDegreeSign}>{'o'}</Text>
                                </View>
                                <Text>{'('+day5+')'}</Text>
                            </View>
                            
                        </View>
                        
                    </View>
                    :null
                }
                </ScrollView>
                
            </View>
        );
    }

}

const mapStateToProps = ({ weatherUpdatesReducer }) => {

  const {
    weatherUpdatesResponse,
  } = weatherUpdatesReducer;
  
  return {
    weatherUpdatesResponse: weatherUpdatesResponse,
  }
}

module.exports = connect(mapStateToProps,{
    getWeatherUpdates,
    clearWeatherUpdates
})(WeatherUpdates);
