import React,{Component} from 'react';
import { connect } from 'react-redux';
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
    RefreshControl,
    AsyncStorage,
    Dimensions,
    InteractionManager
} from 'react-native';

import {    
    userAuthenticated
} from '../LoginComponent/LoginAction';

import {        
    clearGetPropertyInfoBySearchResponse,
    clearSaveFavouritePropertyResponse,
} from './PropertyListingAction';

import {    
    getPropertyInfoBySearch,    
    saveFavouriteProperty,
} from "../../Action/ActionCreators";

import{ Actions}    from 'react-native-router-flux';

import * as Progress from 'react-native-progress';
import * as Animatable from 'react-native-animatable';

import Colors       from '../../Constants/Colors';
import Strings      from '../../Constants/Strings';
import styles       from './PropertyListingStyle';
import CommonStyles from '../../CommonStyle/CommonStyle';
import DynamicListRow from '../CommonComponent/DynamicListRow';

import appLogoImage from '../../Assets/logo.png';
import homebgImage from '../../Assets/homebg.png';
import searchImage from '../../Assets/search.png';
import arrowImage from '../../Assets/arrow.png';
import clockImage from '../../Assets/clock.png';

import bathImage from '../../Assets/bath.png';
import bedImage from '../../Assets/bed.png';
import favImage from '../../Assets/fav.png';
import parkingImage from '../../Assets/parking.png';

import starWhiteImage from '../../Assets/starWhite.png';
import starYellowImage from '../../Assets/starYellow.png';

const window = Dimensions.get('window');
var tempPropertyList = [];
var markers = [];

class PropertyListing extends Component{


    constructor() {        

        super();
            this.state = {
                isScreenLoading:false,
                dataSource  : new ListView.DataSource({
                    rowHasChanged : (row1, row2) => true
                }),
                responseData: [],
                propertyArray: [], 
                noPropertyMessage : '',  
                loggedInUserData:'',                            
            };  
    }
    
    componentWillMount() {        
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {            
            //Actions.refresh({renderRightButton:  this.renderRightText});
            this._loadData();
            this.callGetPropertyInfoBySearchWebService();
        });   
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.userAuthorize){ 
            console.log("userAuthorize>>>> "+nextProps.userAuthorize);
            this.setState({showSignINButton:false})
        }

        // Handle getPropertyInfoBySearch service response
        if(nextProps.propertyListResponse != undefined && nextProps.propertyListResponse != ''){

            this.setState({isScreenLoading:false});            

            if(nextProps.propertyListResponse.headerResponse.status == 200){                
                
                if(nextProps.propertyListResponse.data.Content != null){
                    tempPropertyList = [];
                    nextProps.propertyListResponse.data.Content.map((data, index)=>{
                        data.isFavourite = 0;
                        tempPropertyList.push(data);
                        var LatLng = {
                            latitude: data.Latitude,
                            longitude: data.Longitude
                        };
                        var marker = {                            
                            LatLng: LatLng,
                            title: data.Address,
                            description: data.landlordName,
                            detail: data,
                        };
                        markers.push(marker);
                    })
                    if(tempPropertyList.length == 0){
                        this.setState({noPropertyMessage:'Sorry, no such property exist.'});
                    }
                    console.log("tempPropertyList: "+JSON.stringify(tempPropertyList));
                    this.dataLoadSuccess({data :  tempPropertyList});
                }else{
                    if(nextProps.propertyListResponse.data.ReturnMessage.length > 0){
                        alert(nextProps.propertyListResponse.data.ReturnMessage[0]);
                    }
                    else{

                    }
                } 
            }
            else if(nextProps.propertyListResponse.headerResponse.status == 400){
                alert(nextProps.propertyListResponse.data.error_description);
            }
            else if(nextProps.propertyListResponse.headerResponse.status == 500){
                alert('Internal Server Error');
            }
        }



        // Handle saveFavouriteProperty service response
        if(nextProps.saveFavPropertyResponse != undefined && nextProps.saveFavPropertyResponse != ''){

            this.setState({isScreenLoading:false});            

            if(nextProps.saveFavPropertyResponse.headerResponse.status == 200){                
                
                if(nextProps.saveFavPropertyResponse.data.Content != null){
                    
                }else{
                    if(nextProps.saveFavPropertyResponse.data.ReturnMessage.length > 0){
                        alert(nextProps.saveFavPropertyResponse.data.ReturnMessage[0]);
                    }
                    else{

                    }
                } 
            }
            else if(nextProps.saveFavPropertyResponse.headerResponse.status == 400){
                alert(nextProps.saveFavPropertyResponse.data.error_description);
            }
            else if(nextProps.saveFavPropertyResponse.headerResponse.status == 500){
                alert('Internal Server Error');
            }
        }
    }

    componentDidUpdate() {   

        if(this.props.userAuthorize != undefined && this.props.userAuthorize != ''){  
            //Actions.refresh({renderRightButton:  this.renderRightText});          
        }

        if(this.props.userAuthorize){
            this.props.userAuthenticated(false);
        }

        if(this.props.propertyListResponse != undefined && this.props.propertyListResponse != ''){  
            this.props.clearGetPropertyInfoBySearchResponse();     
        }

        if(this.props.saveFavPropertyResponse != undefined && this.props.saveFavPropertyResponse != ''){  
            this.props.clearSaveFavouritePropertyResponse();
        }

    }

    componentWillUnmount() {        
        this.setState({
            responseData:[],
            noPropertyMessage:'',
        });
    }

    callGetPropertyInfoBySearchWebService() {

        var suburbArray = [];
        var postCodeArray = [];
        this.props.selectedPlace.map((data, index)=>{
                var addressBifocated = data.place.split(',');
                suburbArray.push(addressBifocated[0]);
                var checkPostCode = addressBifocated[1].replace(/\s/g,"");
                postCodeArray.push(checkPostCode)
        })        

        var maximumBed = '';
        if(this.props.filterData.MaxBed > 2){
            maximumBed = this.props.filterData.MaxBed - 2;
        }
        else{
            maximumBed = 0;
        }

        var bathrooms = '';
        if(this.props.filterData.Bathrooms > 1){
            bathrooms = this.props.filterData.Bathrooms - 1;
        }
        else{
            bathrooms = 0;
        }

        var carSpace = '';
        if(this.props.filterData.ParkingSpaces > 1){
            carSpace = this.props.filterData.ParkingSpaces - 1;
        }
        else{
            carSpace = 0;
        }

        var propertyArray = [];
        if(this.props.filterData.PropertyType == 2){
            propertyArray.push('House');
        }
        else if(this.props.filterData.PropertyType == 3){
            propertyArray.push('Apartment');
        }
        else if(this.props.filterData.PropertyType == 4){
            propertyArray.push('Townhouse');
        }
        else if(this.props.filterData.PropertyType == 5){
            propertyArray.push('Villa');
        }
        else if(this.props.filterData.PropertyType == 6){
            propertyArray.push('Acreage');
        }
        else if(this.props.filterData.PropertyType == 7){
            propertyArray.push('Block of Units');
        }
        else if(this.props.filterData.PropertyType == 8){
            propertyArray.push('Retirement Living');
        }

        /***************** Call getPropertyInfoBySearch WebService ****************/            
            this.setState({isScreenLoading:true});
            var postData = {                  
                Suburb: suburbArray,
                PostCode: postCodeArray,
                PropertyType: propertyArray,
                IncludeSuburb: this.props.filterData.IncludeSuburb,
                MinPrice: 0,
                MaxPrice: this.props.filterData.MaxPrice,
                MinBed: 0,
                MaxBed: maximumBed,
                Bathrooms: bathrooms,
                ParkingSpaces: carSpace,                
                Keyword: this.props.filterData.Keyword,
                PetsAllowed: this.props.filterData.PetsAllowed,
                SmokeAllowed: this.props.filterData.SmokeAllowed,
                PremierProperty: this.props.filterData.PremierProperty,
                Furnished: this.props.filterData.Furnished,
                Established: this.props.filterData.Established,
                page: 1,
                PageSize: 10                  
            } 

            var indoorList = [];
            this.props.filterData.Indoorfeatures.map((data, index)=>{                
                    indoorList.push(data.id)
            })

            var outdoorList = [];
            this.props.filterData.Outdoorfeatures.map((data, index)=>{                
                    outdoorList.push(data.id)
            })

            if(indoorList.length > 0){
                postData.Indoorfeatures = indoorList;
            }        
            if(outdoorList.length > 0){
                postData.Outdoorfeatures = outdoorList;
            }


            AsyncStorage.getItem("loggedInUserInfo").then((value) => {
                if(value) {                
                    var loggedInUserData = JSON.parse(value);                
                    this.setState({loggedInUserData: loggedInUserData});                    
                    postData.UserId = loggedInUserData.ID;            
                    this.props.getPropertyInfoBySearch( postData);            
                } 
                else{
                    this.props.getPropertyInfoBySearch( postData); 
                }           
            }).done();
            
        /*************************************************************************/

        
    }


    callSaveFavouritePropertyWebService(userId, propertyId) {
        
        /***************** Call saveFavouriteProperty WebService ****************/            
            this.setState({isScreenLoading:true});
            var postData = {                  
                UserId: userId,
                PropertyId: propertyId,                              
            }             

            this.props.saveFavouriteProperty( postData);            
        /*************************************************************************/
        
    }


    renderRightText = () => {
      return (
        <View>
        {this.state.showSignINButton?
            <TouchableOpacity onPress={this.onSignINClick.bind(this)} >
                <View>
                    <Text style={CommonStyles.navigationBarRightUpdateButtonStyle}>Sign In</Text>
                </View>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={this.onProfileClick.bind(this)} >
                <View>
                    <Text style={CommonStyles.navigationBarRightUpdateButtonStyle}>Profile</Text>
                </View>
            </TouchableOpacity>
        }
        </View>
      )
    }

    _loadData(refresh) {
            refresh && this.setState({
                    refreshing : true
            });

            this.dataLoadSuccess({data :  this.state.responseData});
    }

    dataLoadSuccess(result) {

            this._data = result.data;

            let ds = this.state.dataSource.cloneWithRows(this._data);

            this.setState({
                    loading     : false,
                    refreshing  : false,
                    dataSource  : ds
            });
    }

    _onRefereshCall(refresh) {
        
        refresh && this.setState({
            refreshing: true
        });
        
        
        this.callGetPropertyInfoBySearchWebService();
    }

    onSignINClick(){        
        Actions.Login({userType: Strings.kTENANT});            
    }

    onProfileClick(){
        Actions.TenantProfileDashboard();   
    }

    onSortClicked() {
        
    }

    onMapClicked() {
        Actions.MapScreen({markers:markers});   
    }

    onFilterClicked() {
        Actions.pop();
    }

    onListItemClicked(data) {
        Actions.PropertyDetailScreen({propertyInfo: data})
    }

    onStarClicked(selectedProperty, row) {

            AsyncStorage.getItem("loggedInUserInfo").then((value) => {
                if(value) {                
                    var loggedInUserData = JSON.parse(value);                
                    this.setState({loggedInUserData: loggedInUserData});
                    this.callSaveFavouritePropertyWebService(loggedInUserData.ID, selectedProperty.PropertyInfoId);

                    selectedProperty.isFavourite = 1;
                    tempPropertyList[row] = selectedProperty;
                    console.log("tempPropertyList>>>> "+JSON.stringify(tempPropertyList));
                    this.dataLoadSuccess({data :  tempPropertyList});
                } 
                else{
                    alert("Please LogIn to save this property as your favourite property.");
                }           
            }).done();

    }

    _renderRow(rowData, sectionID, rowID) {

        var imageUrl = '';

        if(rowData.PropertyImages.length > 0){
            if(rowData.PropertyImages[0].PhotoPath){
                imageUrl = 'http://108.168.203.227:9095/'+rowData.PropertyImages[0].PhotoPath.substr(3);
            }
        }

        return (
            <DynamicListRow>   
                <Animatable.View animation="flipInY" style={{flex:1, backgroundColor:'black'}}>                  
                <TouchableOpacity style={{backgroundColor:'#ffffff', marginTop:10}} onPress={() => this.onListItemClicked(rowData)}>
                    <Image style={styles.propertyImageStyle} source={{uri:imageUrl}} />
                    <TouchableOpacity
                        onPress={() => this.onStarClicked(rowData, rowID)}
                        style={{height:40, width:40, position: 'absolute', top: 0, left: 0, justifyContent:'center', alignItems:'center'}}
                    >
                        <Image source={rowData.isFavourite?starYellowImage:starWhiteImage}/>
                    </TouchableOpacity>
                   {/* <View style={{height:50, width:100, backgroundColor:'#d72614', position: 'absolute', top: 0, right: 0, alignItems:'center', justifyContent:'center'}}>
                                           <Text style={{fontSize:13, color:'#ffffff'}}>
                                               {'Inspection time'}
                                           </Text>
                                           <Text style={{fontSize:16, color:'#ffffff'}}>
                                               {'10:35 AM'}
                                           </Text>
                                       </View>*/}
                    <View style={{flexDirection:'row', height:40, width:window.width, position: 'absolute', bottom: 131, alignItems:'center', backgroundColor:'#ffffff'}}>                                                
                        <Text style={{fontSize:14, fontWeight:'bold', color:'#000000', marginLeft:10,}}>
                            Base Rent PW: ${rowData.MaxPrice?rowData.MaxPrice:''}
                        </Text>
                    </View>

                    <View style={{height:window.width*0.3, width:window.width*0.3, position: 'absolute', right: 0, bottom: 60, alignItems:'center', justifyContent:'center', backgroundColor:'transparent'}}>
                        <Image style={{width:80, height:80, borderRadius:80/2, borderWidth:2, borderColor:'#d72614'}} source={{uri:'https://placeimg.com/640/480/people/grayscale'}} />
                        <Text style={{fontSize:16, fontWeight:'500', marginTop:5}}>
                            {rowData.landlordName?rowData.landlordName:''}
                        </Text>
                    </View>

                    <View style={{width:window.width*0.7, height:60}}>
                        <Text style={{marginLeft:10, fontSize:15, fontWeight:'bold'}}>
                            {'Property Name'}
                        </Text>
                        <Text style={{marginTop:5, marginLeft:10, width:window.width*0.5, fontSize:14, fontWeight:'500', color:'gray'}}>
                            {rowData.Address?rowData.Address:''}
                        </Text>
                    </View>
                    <View style={{width:window.width, height:60, alignItems:'center', justifyContent:'space-between', flexDirection:'row'}}>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', width:window.width*0.3, height:50}}>                                                        
                            <Image source={bedImage} style={{width:20, height:20}}/>
                            <Text textAlign='center' style={{margin:8, fontSize:14, fontWeight:'500'}}>{rowData.Bedrooms?rowData.Bedrooms:''}</Text>
                        </View>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', width:window.width*0.3, height:50}}>                                                        
                            <Image source={bathImage} style={{width:20, height:20}}/>
                            <Text textAlign='center' style={{margin:8, fontSize:14, fontWeight:'500'}}>{rowData.Bathrooms?rowData.Bathrooms:''}</Text>
                        </View>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', width:window.width*0.3, height:50}}>                                                        
                            <Image source={parkingImage} style={{width:20, height:20}}/>
                            <Text textAlign='center' style={{margin:8, fontSize:14, fontWeight:'500'}}>3</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                </Animatable.View>                 
            </DynamicListRow>
        );
    }

	render(){
    	return(
    		<View style={styles.container}> 
                <View style={{width:window.width, height:60, alignItems:'center', justifyContent:'space-between', flexDirection:'row', backgroundColor:'#000000'}}>
                    <TouchableOpacity onPress={() => this.onSortClicked()} style={{alignItems:'center', justifyContent:'center', width:window.width*0.3, height:50}}>                                                                                
                        <Text textAlign='center' style={{margin:8, color:'#ffffff', fontSize:14, fontWeight:'500'}}>Sort</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onMapClicked()} style={{alignItems:'center', justifyContent:'center', width:window.width*0.3, height:50}}>                                                                                
                        <Text textAlign='center' style={{margin:8, color:'#ffffff', fontSize:14, fontWeight:'500'}}>Map</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onFilterClicked()} style={{alignItems:'center', justifyContent:'center', width:window.width*0.3, height:50}}>                                                                                
                        <Text textAlign='center' style={{margin:8, color:'#ffffff', fontSize:14, fontWeight:'500'}}>Filters</Text>
                    </TouchableOpacity>
                </View> 
                {tempPropertyList.length? 
                    <ListView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefereshCall.bind(this, true)}
                            />
                        }
                        contentContainerStyle={{ paddingBottom: 56 }}
                        enableEmptySections={true}
                        dataSource={this.state.dataSource}
                        renderRow={this._renderRow.bind(this)}
                        renderSeparator={this._renderSeparator}                                        
                    />
                    :
                    <View style={{marginTop:20, alignItems:'center', justifyContent:'center'}}>
                        <Text style={{fontSize:14, fontWeight:'bold'}}>
                            {this.state.noPropertyMessage}  
                        </Text>
                    </View>
                }
                {this.state.isScreenLoading?
                    <View style={styles.circles}>
                        <Progress.CircleSnail color={['#000000', '#000000', '#000000']} />
                    </View>
                    :null
                }
    		</View>
    	);
	}

}

const mapStateToProps = ({ loginReducer, propertyListingReducer }) => {

  const {
    userAuthorize,
  } = loginReducer;

  const {
    propertyListResponse,
    saveFavPropertyResponse
  } = propertyListingReducer;  
  
  return {
    userAuthorize: userAuthorize,
    propertyListResponse: propertyListResponse,
    saveFavPropertyResponse: saveFavPropertyResponse
  }
}

export default connect(mapStateToProps,{
    userAuthenticated,
    getPropertyInfoBySearch,
    saveFavouriteProperty,
    clearGetPropertyInfoBySearchResponse,
    clearSaveFavouritePropertyResponse,
})(PropertyListing);
