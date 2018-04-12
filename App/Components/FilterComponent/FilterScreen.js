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
    AsyncStorage,
    Dimensions,
    InteractionManager,
    Modal,
    FlatList
} from 'react-native';

import {    
    userAuthenticated
} from '../LoginComponent/LoginAction';

import {    
    clearGetIndoorFeatureListResponse,
    clearGetOutdoorFeatureListResponse
} from './FilterAction';

import {    
    getIndoorFeatureList,    
    getOutdoorFeatureList,
    saveSearchProperty,    
} from "../../Action/ActionCreators";


import{ Actions}    from 'react-native-router-flux';

import { Slider } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Switch } from 'react-native-switch';
import { Dropdown } from 'react-native-material-dropdown';
import TextField from 'react-native-material-textfield';
import MaterialTextInput from 'react-native-material-textinput';
import * as Progress from 'react-native-progress';

import Colors       from '../../Constants/Colors';
import Strings      from '../../Constants/Strings';
import styles       from './FilterStyle';
import CommonStyles from '../../CommonStyle/CommonStyle';
import DynamicListRow from '../CommonComponent/DynamicListRow';

import appLogoImage from '../../Assets/logo.png';
import homebgImage from '../../Assets/homebg.png';
import searchImage from '../../Assets/search.png';
import arrowImage from '../../Assets/arrow.png';
import clockImage from '../../Assets/clock.png';

import apartmentImage from '../../Assets/apartment&unit.png';
import houseImage from '../../Assets/house.png';
import townhouseImage from '../../Assets/townhouse.png';

import acreageImage from '../../Assets/acreage.png';
import blockofunitsImage from '../../Assets/blockofunits.png';
import retirementlivingImage from '../../Assets/retirementliving.png';
import villaImage from '../../Assets/villa.png';

import checkImage from '../../Assets/check_selected.png';
import uncheckImage from '../../Assets/check.png';
import addImage from '../../Assets/add.png';

import starWhiteImage from '../../Assets/starWhite.png';
import starYellowImage from '../../Assets/starYellow.png';

const window = Dimensions.get('window');

var propertyData = [
    {
        value:'Any',
        isSelected:0,
    },
    {
        value:'House',
        isSelected:0,
    },
    {
        value:'Apartment',
        isSelected:0,
    },
    {
        value:'Townhouse',
        isSelected:0,
    },
    {
        value:'Villa',
        isSelected:0,
    },
    {
        value:'Acreage',
        isSelected:0,
    },
    {
        value:'Block of Units',
        isSelected:0,
    },
    {
        value:'Retirement Living',
        isSelected:0,
    }
];

let data = [{
      value: 'Any',
    }, {
      value: 'New Construction',
    }, {
      value: 'Established property',
    }];

var indoorFeatures = [
    {
        value:'Any',
        isSelected:0,
    },
    {
        value:'Alarm System',
        isSelected:0,
    },
    {
        value:'Intercom',
        isSelected:0,
    },
    {
        value:'Ensuite',
        isSelected:0,
    },
    {
        value:'Study',
        isSelected:0,
    },
    {
        value:'Dishwasher',
        isSelected:0,
    },
    {
        value:'Ducted vacuum system',
        isSelected:0,
    },
    {
        value:'Gym',
        isSelected:0,
    },
    {
        value:'Workshop',
        isSelected:0,
    },
    {
        value:'Indoor spa',
        isSelected:0,
    },
    {
        value:'Rumpus room',
        isSelected:0,
    },
    {
        value:'Floorboards',
        isSelected:0,
    },
    {
        value:'Broadband internet available',
        isSelected:0,
    },
    {
        value:'Pay TV access',
        isSelected:0,
    },
    {
        value:'Open fireplace',
        isSelected:0,
    },
    {
        value:'Ducted heating',
        isSelected:0,
    },
    {
        value:'Ducted cooling',
        isSelected:0,
    },
    {
        value:'Split-system heating',
        isSelected:0,
    },
    {
        value:'Hydronic heating',
        isSelected:0,
    },
    {
        value:'Split-system air conditioning',
        isSelected:0,
    },
    {
        value:'Air conditioning',
        isSelected:0,
    },
    {
        value:'Gas heating',
        isSelected:0,
    },
    {
        value:'Reverse cycle air conditioning',
        isSelected:0,
    },
    {
        value:'Evaporative cooling',
        isSelected:0,
    }
];


var outdoorFeatures = [
    {
        value:'Any',
        isSelected:0,
    },
    {
        value:'Carport',
        isSelected:0,
    },
    {
        value:'Garage',
        isSelected:0,
    },
    {
        value:'Open car spaces',
        isSelected:0,
    },
    {
        value:'Remote garage',
        isSelected:0,
    },
    {
        value:'Secure parking',
        isSelected:0,
    },
    {
        value:'Swimming pool - Above ground',
        isSelected:0,
    },
    {
        value:'Swimming pool - in ground',
        isSelected:0,
    },
    {
        value:'Outside spa',
        isSelected:0,
    },
    {
        value:'Tennis court',
        isSelected:0,
    },
    {
        value:'Balcony',
        isSelected:0,
    },
    {
        value:'Deck',
        isSelected:0,
    },
    {
        value:'Courtyard',
        isSelected:0,
    },
    {
        value:'Outdoor entertaining area',
        isSelected:0,
    },
    {
        value:'Shed',
        isSelected:0,
    },
    {
        value:'Fully fenced',
        isSelected:0,
    }
];


var ecoFriendlyItems = [
    {
        value:'Any',
        isSelected:0,
    },
    {
        value:'Solar panels',
        isSelected:0,
    },
    {
        value:'Solar hot water',
        isSelected:0,
    },
    {
        value:'Water tank',
        isSelected:0,
    },
    {
        value:'Grey water system',
        isSelected:0,
    },
    {
        value:'Energy efficiency rating - High',
        isSelected:0,
    },
    {
        value:'Energy efficiency rating - Medium',
        isSelected:0,
    },
    {
        value:'Energy efficiency rating - Low',
        isSelected:0,
    }
];

let alertMeData = [{
      value: 'immediately',
    }, {
      value: 'Daily',
    }, {
      value: 'Weekly',
    }, {
      value: 'Monthly',
    }, {
      value: 'Never',
    }];

var self;

class FilterScreen extends Component{


    constructor() {        

        super();
            this.state = {
                isScreenLoading:false,
                dataSource  : new ListView.DataSource({
                    rowHasChanged : (row1, row2) => true
                }),

                loggedInUserData:'',

                responseData:[],
                propertyTypes : propertyData,
                propertyTypeSelected:'1',
                bedroomSelected:'1',
                bathroomSelected:'1',
                carSpaceSelected:'1',
                
                priceRangeValue:0.00,  

                keywords:'', 

                establishOrNew:'',               
                
                showIndoorFeatureModal:0,
                showOutdoorFeatureModal:0,
                showEcoFriendlyItemsModal:0,
                showSaveSearchPropertyModal:0,

                indoorFeaturesList : indoorFeatures,
                selectedFeaturelist : [],

                outdoorFeaturesList : outdoorFeatures,
                selectedOutdoorFeaturelist : [],

                ecoFriendlyItemList : ecoFriendlyItems,
                selectedEcoFriendlyItemList : [], 

                isSearchOnlyPremierProperties: false,
                isPetsAllowed: false,
                isFurnished: false,
                isSmokingPermitted: false,
                isIncludeSurroundingSuburbs: false,    
                isSearchSaved: false,     

                searchName: '',  
                alertMeFrequency: '',
            };  

        self = this;        
    }
    
    componentWillMount() {        
        this.props.getIndoorFeatureList();
        //this.props.getOutdoorFeatureList();
    }

    componentDidMount() {

        AsyncStorage.getItem("loggedInUserInfo").then((value) => {
            if(value) {                
                var loggedInUserData = JSON.parse(value);                
                this.setState({loggedInUserData: loggedInUserData})                
            }            
        }).done();

    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.userAuthorize){             
            this.setState({showSignINButton:false})
        }

        // Handle saveSearchProperty service response
        if(nextProps.saveSearchPropertyResponse != undefined && nextProps.saveSearchPropertyResponse != ''){

            this.setState({isScreenLoading:false});            

            if(nextProps.saveSearchPropertyResponse.headerResponse.status == 200){                                
                console.log("saveSearchPropertyResponse: "+JSON.stringify(nextProps.saveSearchPropertyResponse));                
            }
            else if(nextProps.saveSearchPropertyResponse.headerResponse.status == 400){
                alert(nextProps.saveSearchPropertyResponse.data.error_description);
            }
            else if(nextProps.saveSearchPropertyResponse.headerResponse.status == 500){
                alert('Internal Server Error');
            }
        }

        // Handle getIndoorFeatureList service response
        if(nextProps.indoorFeatureListResponse != undefined && nextProps.indoorFeatureListResponse != ''){

            this.setState({isScreenLoading:false});            

            if(nextProps.indoorFeatureListResponse.headerResponse.status == 200){ 
                                
                var tempArray = [];
                nextProps.indoorFeatureListResponse.data.Content.map((data, index)=>{
                    indoorData = {
                        id: data.ID,
                        value: data.FeatureName,
                        isSelected: 0,                        
                    }                           
                    tempArray.push(indoorData);                    
                })
                indoorFeatures = tempArray;                
                this.setState({indoorFeaturesList: tempArray});                                
               
            }
            else if(nextProps.indoorFeatureListResponse.headerResponse.status == 400){
                alert(nextProps.indoorFeatureListResponse.data.error_description);
            }
            else if(nextProps.indoorFeatureListResponse.headerResponse.status == 500){
                alert('Internal Server Error');
            }
        }

        // Handle getOutdoorFeatureList service response
        if(nextProps.outdoorFeatureListResponse != undefined && nextProps.outdoorFeatureListResponse != ''){

            this.setState({isScreenLoading:false});            

            if(nextProps.outdoorFeatureListResponse.headerResponse.status == 200){                                
                
                var tempArray = [];
                nextProps.outdoorFeatureListResponse.data.Content.map((data, index)=>{
                    outdoorData = {
                        id: data.ID,
                        value: data.FeatureName,
                        isSelected: 0,                        
                    }                           
                    tempArray.push(outdoorData);                    
                })
                outdoorFeatures = tempArray;
                this.setState({outdoorFeaturesList: tempArray});                

            }
            else if(nextProps.outdoorFeatureListResponse.headerResponse.status == 400){
                alert(nextProps.outdoorFeatureListResponse.data.error_description);
            }
            else if(nextProps.outdoorFeatureListResponse.headerResponse.status == 500){
                alert('Internal Server Error');
            }
        }

    }

    componentDidUpdate() {           

        if(this.props.userAuthorize){
            this.props.userAuthenticated(false);
        }

        if(this.props.indoorFeatureListResponse != undefined && this.props.indoorFeatureListResponse != ''){              
            this.props.clearGetIndoorFeatureListResponse();        
        }

        if(this.props.outdoorFeatureListResponse != undefined && this.props.outdoorFeatureListResponse != ''){              
            this.props.clearGetOutdoorFeatureListResponse();        
        }

    }

    componentWillUnmount() {
        this.setState({responseData:[]});
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

    onKeywordsChange(text) {
        this.setState({keywords:text});
    }

    onResetFilterClicked() {

        var emptyArray = [];        

        this.setState({
            propertyTypeSelected:'1',
            bedroomSelected:'1',
            bathroomSelected:'1',
            carSpaceSelected:'1',
            
            priceRangeValue:0.00,

            selectedFeaturelist: emptyArray,
            selectedOutdoorFeaturelist: emptyArray,
            selectedEcoFriendlyItemList: emptyArray,
            
            keywords:'',
                       
        });

        this.setState({isSearchOnlyPremierProperties:false});
        this.setState({isPetsAllowed:false});
        this.setState({isFurnished:false});
        this.setState({isSmokingPermitted:false});
        this.setState({isIncludeSurroundingSuburbs:false});

        this.state.indoorFeaturesList.map((data, index)=>{
            if(data.isSelected){
                data.isSelected = 0;
            }        
        })

        this.state.outdoorFeaturesList.map((data, index)=>{
            if(data.isSelected){
                data.isSelected = 0;
            }        
        })

        this.state.ecoFriendlyItemList.map((data, index)=>{
            if(data.isSelected){
                data.isSelected = 0;
            }        
        })
        
    }

    onSearchClicked() {

        var filterData = {            
            MaxPrice: this.state.priceRangeValue,
            PropertyType: this.state.propertyTypeSelected,            
            MaxBed: this.state.bedroomSelected,
            Bathrooms: this.state.bathroomSelected,
            ParkingSpaces: this.state.carSpaceSelected,
            Indoorfeatures: this.state.selectedFeaturelist,
            Outdoorfeatures: this.state.selectedOutdoorFeaturelist,
            Keyword: this.state.keywords,
            PetsAllowed: this.state.isPetsAllowed,
            SmokeAllowed: this.state.isSmokingPermitted,
            IncludeSuburb : this.state.isIncludeSurroundingSuburbs,
            PremierProperty: this.state.isSearchOnlyPremierProperties,
            Furnished: this.state.isFurnished,
            Established: this.state.establishOrNew,
        }

        Actions.PropertyListing({selectedPlace : this.props.selectedPlace, filterData: filterData});
    }

    onPropertyTypeSelect(item) {
        this.setState({propertyTypeSelected:item});        
    }

    onBedroomSelect(item) {
        this.setState({bedroomSelected:item});
    }

    onBathroomSelect(item) {
        this.setState({bathroomSelected:item});
    }

    onCarSpaceSelect(item) {
        this.setState({carSpaceSelected:item});
    }
    
    onEstablishChange(value, index, data) {        
        this.setState({establishOrNew:value});        
    }

    showIndoorFeatures(){
        this.setState({showIndoorFeatureModal:!this.state.showIndoorFeatureModal});
    }

    showOutdoorFeatures(){
        this.setState({showOutdoorFeatureModal:!this.state.showOutdoorFeatureModal});
    }

    showEcoFriendlyItems(){
        this.setState({showEcoFriendlyItemsModal:!this.state.showEcoFriendlyItemsModal});
    }

    doneIndoorFeatures(){
        this.setState({showIndoorFeatureModal:!this.state.showIndoorFeatureModal});

        var tempArray = [];
        this.state.indoorFeaturesList.map((data, index)=>{
            if(data.isSelected){
                tempArray.push(data);
            }        
        })
        
        this.setState({selectedFeaturelist:tempArray});

    }

    doneOutdoorFeatures(){
        this.setState({showOutdoorFeatureModal:!this.state.showOutdoorFeatureModal});

        var tempArray = [];
        this.state.outdoorFeaturesList.map((data, index)=>{
            if(data.isSelected){
                tempArray.push(data);
            }        
        })
        
        this.setState({selectedOutdoorFeaturelist:tempArray});

    }

    doneEcoFriendlyItems(){
        this.setState({showEcoFriendlyItemsModal:!this.state.showEcoFriendlyItemsModal});

        var tempArray = [];
        this.state.ecoFriendlyItemList.map((data, index)=>{
            if(data.isSelected){
                tempArray.push(data);
            }        
        })
        
        this.setState({selectedEcoFriendlyItemList:tempArray});

    }

    onIndoorFeatureSelected(index) {

        var tempArray = this.state.indoorFeaturesList;
        
        var item = tempArray[index];
        item.isSelected = !item.isSelected;
        tempArray[index] = item;

        this.setState({indoorFeaturesList:tempArray});
    }

    onOutdoorFeatureSelected(index) {

        var tempArray = this.state.outdoorFeaturesList;
        
        var item = tempArray[index];
        item.isSelected = !item.isSelected;
        tempArray[index] = item;

        this.setState({outdoorFeaturesList:tempArray});
    }

    onEcoFriendlyItemsSelected(index) {

        var tempArray = this.state.ecoFriendlyItemList;
        
        var item = tempArray[index];
        item.isSelected = !item.isSelected;
        tempArray[index] = item;

        this.setState({ecoFriendlyItemList:tempArray});
    }


    onSearchOnlyPremierPropertiesSwitchValueChange() {        
        this.setState({ isSearchOnlyPremierProperties: !this.state.isSearchOnlyPremierProperties });
    }

    onPetsAllowedSwitchValueChange() {        
        this.setState({ isPetsAllowed: !this.state.isPetsAllowed });
    }

    onFurnishedSwitchValueChange() {        
        this.setState({ isFurnished: !this.state.isFurnished });
    }

    onSmokingPermittedSwitchValueChange() {        
        this.setState({ isSmokingPermitted: !this.state.isSmokingPermitted });
    }

    onIncludeSurroundingSwitchValueChange() {        
        this.setState({ isIncludeSurroundingSuburbs: !this.state.isIncludeSurroundingSuburbs });
    }


    onStarClicked() {
        this.setState({isSearchSaved:!this.state.isSearchSaved, showSaveSearchPropertyModal:1});                
    }

    onAlertMeChange(value, index, data) {        
        this.setState({alertMeFrequency:value});
    }

    cancelSaveSearchPropertyModal() {
        this.setState({isSearchSaved:!this.state.isSearchSaved, showSaveSearchPropertyModal:0});
    }

    callSaveSearchPropertyWebService() {

        if(this.state.loggedInUserData != ''){                            

            var addresses = '';

            this.props.selectedPlace.map((data, index)=>{
               addresses = addresses+data.place+';'
            })

            /***************** Call saveSearchProperty WebService ****************/            
                this.setState({isScreenLoading:true});
                
                var postData = {  
                    TenantId: this.state.loggedInUserData.ID,              
                    NameSearch: this.state.searchName,
                    Address: addresses,
                    alert: this.state.alertMeFrequency,
                    PropertyType: '',
                    MinPrice: 0,
                    MaxPrice: 0,
                    Bedrooms: 0,
                    Bathrooms: 0,                
                }                     

                this.props.saveSearchProperty( postData);            
            /*************************************************************************/

        }else{
            alert("You need to login to save your search");
        }
    }

    onSearchNameChange(text) {
        this.setState({searchName:text});
    }

    onSearchNameSaveClicked() {
        this.setState({ showSaveSearchPropertyModal:0});        
        this.callSaveSearchPropertyWebService();
    }


    _renderTags(tags, index) {
        return(
            <TouchableOpacity style={styles.tags} key={index}>
                <Text style={{margin:5}}>
                    {tags.place}
                </Text>
            </TouchableOpacity>
        );
    }

    _renderIndoorFeaturesTags(tags, index) {
        return(
            <TouchableOpacity style={styles.tags} key={index}>
                <Text style={{margin:5}}>
                    {tags.value}
                </Text>
            </TouchableOpacity>
        );
    }


    _renderOutdoorFeaturesTags(tags, index) {
        return(
            <TouchableOpacity style={styles.tags} key={index}>
                <Text style={{margin:5}}>
                    {tags.value}
                </Text>
            </TouchableOpacity>
        );
    }

    _renderEcoFriendlyItemTags(tags, index) {
        return(
            <TouchableOpacity style={styles.tags} key={index}>
                <Text style={{margin:5}}>
                    {tags.value}
                </Text>
            </TouchableOpacity>
        );
    }


    renderItem({ item, index }) {

        return(
                <View style={styles.listItemContainer}>

                    <TouchableOpacity 
                        onPress={() => self.onIndoorFeatureSelected(index)}
                        style={{flexDirection:'row'}}
                        key={index}
                    >
                        <Image style={styles.listItemImage} source={item.isSelected?checkImage:uncheckImage} />
                        <Text style={styles.listItemText}>{item.value}</Text>
                    </TouchableOpacity>

                </View>
            );
    }


    renderOutdoorItem({ item, index }) {

        return(
                <View style={styles.listItemContainer}>

                    <TouchableOpacity 
                        onPress={() => self.onOutdoorFeatureSelected(index)}
                        style={{flexDirection:'row'}}
                        key={index}
                    >
                        <Image style={styles.listItemImage} source={item.isSelected?checkImage:uncheckImage} />
                        <Text style={styles.listItemText}>{item.value}</Text>
                    </TouchableOpacity>

                </View>
            );
    }

    renderEcoFriendlyItem({ item, index }) {

        return(
                <View style={styles.listItemContainer}>

                    <TouchableOpacity 
                        onPress={() => self.onEcoFriendlyItemsSelected(index)}
                        style={{flexDirection:'row'}}
                        key={index}
                    >
                        <Image style={styles.listItemImage} source={item.isSelected?checkImage:uncheckImage} />
                        <Text style={styles.listItemText}>{item.value}</Text>
                    </TouchableOpacity>

                </View>
            );
    }


	render(){

        var priceValue = '0';

        if(this.state.priceRangeValue){
            priceValue = this.state.priceRangeValue.toFixed(2);
        }

    	return(
    		<View style={styles.container}>

                <View style={styles.searchOverlayViewStyle}>
                    <View style={styles.overlayInnerViewStyle}>                                    
                        <Image style={styles.searchImageStyle} source={searchImage} />

                        <View style={styles.tagContainer}>
                        {this.props.selectedPlace.length?                            
                            <ScrollView contentContainerStyle={{ flexDirection:'row'}} horizontal={true} showsHorizontalScrollIndicator={false}>
                                {
                                    this.props.selectedPlace.map((data, index)=>{
                                       return this._renderTags(data, index);
                                    })
                                }                                            
                            </ScrollView>
                            :null
                        }
                        </View> 

                        <TouchableOpacity
                            onPress={() => this.onStarClicked()}
                            style={styles.starIconStyle}
                        >
                            <Image source={this.state.isSearchSaved?starYellowImage:starWhiteImage}/>
                        </TouchableOpacity>


                    </View>
                </View>

                <View style={styles.resetFilterContainer}>
                    <TouchableOpacity onPress={() => this.onResetFilterClicked()} style={styles.resetButtonContainer}>                                                        
                        <Text textAlign='center'>Reset Filters</Text>
                    </TouchableOpacity> 
                </View>
                
                <KeyboardAwareScrollView contentContainerStyle={{paddingBottom:60}}>
                    <View style={{alignItems:'center'}}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{flexDirection:'row'}}>
                                <TouchableOpacity onPress={() => this.onPropertyTypeSelect('1')} style={{margin:3, alignItems:'center', justifyContent:'center', height:(window.width/4)-6, width:(window.width/4)-6, borderWidth:1, borderRadius:5, borderColor:(this.state.propertyTypeSelected=='1')?'#d72614':'#000000', backgroundColor:(this.state.propertyTypeSelected=='1')?'#d72614':'#ffffff'}}>
                                    <Text textAlign='center' style={{color:(this.state.propertyTypeSelected=='1')?'#ffffff':'#000000', fontWeight:'bold'}}>All Types</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.onPropertyTypeSelect('2')} style={{margin:3, alignItems:'center', justifyContent:'center', height:(window.width/4)-6, width:(window.width/4)-6, borderWidth:1, borderRadius:5, borderColor:(this.state.propertyTypeSelected=='2')?'#d72614':'#000000', backgroundColor:(this.state.propertyTypeSelected=='2')?'#d72614':'#ffffff'}}>
                                    <Image  source={houseImage} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.onPropertyTypeSelect('3')} style={{margin:3, alignItems:'center', justifyContent:'center', height:(window.width/4)-6, width:(window.width/4)-6, borderWidth:1, borderRadius:5, borderColor:(this.state.propertyTypeSelected=='3')?'#d72614':'#000000', backgroundColor:(this.state.propertyTypeSelected=='3')?'#d72614':'#ffffff'}}>
                                    <Image  source={apartmentImage} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.onPropertyTypeSelect('4')} style={{margin:3, alignItems:'center', justifyContent:'center', height:(window.width/4)-6, width:(window.width/4)-6, borderWidth:1, borderRadius:5,  borderColor:(this.state.propertyTypeSelected=='4')?'#d72614':'#000000', backgroundColor:(this.state.propertyTypeSelected=='4')?'#d72614':'#ffffff'}}>
                                    <Image  source={townhouseImage} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.onPropertyTypeSelect('5')} style={{margin:3, alignItems:'center', justifyContent:'center', height:(window.width/4)-6, width:(window.width/4)-6, borderWidth:1, borderRadius:5,  borderColor:(this.state.propertyTypeSelected=='5')?'#d72614':'#000000', backgroundColor:(this.state.propertyTypeSelected=='5')?'#d72614':'#ffffff'}}>
                                    <Image  source={villaImage} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.onPropertyTypeSelect('6')} style={{margin:3, alignItems:'center', justifyContent:'center', height:(window.width/4)-6, width:(window.width/4)-6, borderWidth:1, borderRadius:5,  borderColor:(this.state.propertyTypeSelected=='6')?'#d72614':'#000000', backgroundColor:(this.state.propertyTypeSelected=='6')?'#d72614':'#ffffff'}}>
                                    <Image  source={acreageImage} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.onPropertyTypeSelect('7')} style={{margin:3, alignItems:'center', justifyContent:'center', height:(window.width/4)-6, width:(window.width/4)-6, borderWidth:1, borderRadius:5,  borderColor:(this.state.propertyTypeSelected=='7')?'#d72614':'#000000', backgroundColor:(this.state.propertyTypeSelected=='7')?'#d72614':'#ffffff'}}>
                                    <Image  source={blockofunitsImage} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.onPropertyTypeSelect('8')} style={{margin:3, alignItems:'center', justifyContent:'center', height:(window.width/4)-6, width:(window.width/4)-6, borderWidth:1, borderRadius:5,  borderColor:(this.state.propertyTypeSelected=='8')?'#d72614':'#000000', backgroundColor:(this.state.propertyTypeSelected=='8')?'#d72614':'#ffffff'}}>
                                    <Image  source={retirementlivingImage} />
                                </TouchableOpacity>

                        </ScrollView>

                        <View style={styles.priceRangeContainer}>                    
                            <View style={styles.priceRangeTextContainer}>
                                <Text textAlign='center' style={styles.priceRangeText}>Price Range</Text>
                            </View>
                            <View style={styles.priceRangeAttributes}>
                                <Text textAlign='center' style={styles.priceRangeAttributesText}>$0</Text>
                                <Text textAlign='center' style={styles.priceRangeAttributesText}>${priceValue}</Text>                    
                                <Text textAlign='center' style={styles.priceRangeAttributesText}>$5000</Text>
                            </View>
                            <Slider
                                minimumValue={0}
                                maximumValue={5000}                       
                                value={this.state.priceRangeValue}
                                onValueChange={(priceRangeValue) => this.setState({priceRangeValue})}
                            />
                        </View>

                                            
                        <Text textAlign='center' style={styles.filterAttributeText}>Bedrooms</Text>                        
                        <View style={styles.bedroomTypesContainer}>
                            <TouchableOpacity onPress={() => this.onBedroomSelect('1')} style={{alignItems:'center', justifyContent:'center', height:35, borderWidth:1, borderColor:(this.state.bedroomSelected=='1')?'#d72614':'#000000', backgroundColor:(this.state.bedroomSelected=='1')?'#d72614':'#ffffff'}}>                                                        
                                <Text textAlign='center' style={{color:(this.state.bedroomSelected=='1')?'#ffffff':'#000000', margin:12}}>Any</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.onBedroomSelect('2')} style={{alignItems:'center', justifyContent:'center', height:35, borderWidth:1, borderColor:(this.state.bedroomSelected=='2')?'#d72614':'#000000', backgroundColor:(this.state.bedroomSelected=='2')?'#d72614':'#ffffff'}}>                                                        
                                <Text textAlign='center' style={{color:(this.state.bedroomSelected=='2')?'#ffffff':'#000000', margin:12}}>{'Studio +'}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.onBedroomSelect('3')} style={{alignItems:'center', justifyContent:'center', height:35, borderWidth:1, borderColor:(this.state.bedroomSelected=='3')?'#d72614':'#000000', backgroundColor:(this.state.bedroomSelected=='3')?'#d72614':'#ffffff'}}>                                                                                                                
                                <Text textAlign='center' style={{color:(this.state.bedroomSelected=='3')?'#ffffff':'#000000', margin:12}}>{'1+'}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.onBedroomSelect('4')} style={{alignItems:'center', justifyContent:'center', height:35, borderWidth:1, borderColor:(this.state.bedroomSelected=='4')?'#d72614':'#000000', backgroundColor:(this.state.bedroomSelected=='4')?'#d72614':'#ffffff'}}>                                                                                                                
                                <Text textAlign='center' style={{color:(this.state.bedroomSelected=='4')?'#ffffff':'#000000', margin:12}}>{'2+'}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.onBedroomSelect('5')} style={{alignItems:'center', justifyContent:'center', height:35, borderWidth:1, borderColor:(this.state.bedroomSelected=='5')?'#d72614':'#000000', backgroundColor:(this.state.bedroomSelected=='5')?'#d72614':'#ffffff'}}>                                                                                                              
                                <Text textAlign='center' style={{color:(this.state.bedroomSelected=='5')?'#ffffff':'#000000', margin:12}}>{'3+'}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.onBedroomSelect('6')} style={{alignItems:'center', justifyContent:'center', height:35, borderWidth:1, borderColor:(this.state.bedroomSelected=='6')?'#d72614':'#000000', backgroundColor:(this.state.bedroomSelected=='6')?'#d72614':'#ffffff'}}>                                                                                                            
                                <Text textAlign='center' style={{color:(this.state.bedroomSelected=='6')?'#ffffff':'#000000', margin:12}}>{'4+'}</Text>
                            </TouchableOpacity>                    

                            <TouchableOpacity onPress={() => this.onBedroomSelect('7')} style={{alignItems:'center', justifyContent:'center', height:35, borderWidth:1, borderColor:(this.state.bedroomSelected=='7')?'#d72614':'#000000', backgroundColor:(this.state.bedroomSelected=='7')?'#d72614':'#ffffff'}}>                                                                                                                
                                <Text textAlign='center' style={{color:(this.state.bedroomSelected=='7')?'#ffffff':'#000000', margin:12}}>{'5+'}</Text>
                            </TouchableOpacity>

                        </View>

                        <View style={{marginTop:20}}>
                            <Text textAlign='center' style={styles.filterAttributeText}>Bathrooms</Text>
                        </View>
                        <View style={{width:window.width*0.9, height:60, alignItems:'center', justifyContent:'space-between', flexDirection:'row'}}>
                            <TouchableOpacity onPress={() => this.onBathroomSelect('1')} style={{alignItems:'center', justifyContent:'center', height:35, borderWidth:1, borderColor:(this.state.bathroomSelected=='1')?'#d72614':'#000000', backgroundColor:(this.state.bathroomSelected=='1')?'#d72614':'#ffffff'}}>                                                        
                                <Text textAlign='center' style={{color:(this.state.bathroomSelected=='1')?'#ffffff':'#000000', margin:12}}>Any</Text>
                            </TouchableOpacity>                            

                            <TouchableOpacity onPress={() => this.onBathroomSelect('2')} style={{alignItems:'center', justifyContent:'center', height:35, borderWidth:1, borderColor:(this.state.bathroomSelected=='2')?'#d72614':'#000000', backgroundColor:(this.state.bathroomSelected=='2')?'#d72614':'#ffffff'}}>                                                        
                                <Text textAlign='center' style={{color:(this.state.bathroomSelected=='2')?'#ffffff':'#000000', margin:12}}>{'1+'}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.onBathroomSelect('3')} style={{alignItems:'center', justifyContent:'center', height:35, borderWidth:1, borderColor:(this.state.bathroomSelected=='3')?'#d72614':'#000000', backgroundColor:(this.state.bathroomSelected=='3')?'#d72614':'#ffffff'}}>                                                        
                                <Text textAlign='center' style={{color:(this.state.bathroomSelected=='3')?'#ffffff':'#000000', margin:12}}>{'2+'}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.onBathroomSelect('4')} style={{alignItems:'center', justifyContent:'center', height:35, borderWidth:1, borderColor:(this.state.bathroomSelected=='4')?'#d72614':'#000000', backgroundColor:(this.state.bathroomSelected=='4')?'#d72614':'#ffffff'}}>                                                        
                                <Text textAlign='center' style={{color:(this.state.bathroomSelected=='4')?'#ffffff':'#000000', margin:12}}>{'3+'}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.onBathroomSelect('5')} style={{alignItems:'center', justifyContent:'center', height:35, borderWidth:1, borderColor:(this.state.bathroomSelected=='5')?'#d72614':'#000000', backgroundColor:(this.state.bathroomSelected=='5')?'#d72614':'#ffffff'}}>                                                        
                                <Text textAlign='center' style={{color:(this.state.bathroomSelected=='5')?'#ffffff':'#000000', margin:12}}>{'4+'}</Text>
                            </TouchableOpacity>                    

                            <TouchableOpacity onPress={() => this.onBathroomSelect('6')} style={{alignItems:'center', justifyContent:'center', height:35, borderWidth:1, borderColor:(this.state.bathroomSelected=='6')?'#d72614':'#000000', backgroundColor:(this.state.bathroomSelected=='6')?'#d72614':'#ffffff'}}>                                                        
                                <Text textAlign='center' style={{color:(this.state.bathroomSelected=='6')?'#ffffff':'#000000', margin:12}}>{'5+'}</Text>
                            </TouchableOpacity>

                        </View>

                        <View style={{marginTop:20}}>
                            <Text textAlign='center' style={styles.filterAttributeText}>Car Spaces</Text>
                        </View>
                        <View style={{width:window.width*0.9, height:60, alignItems:'center', justifyContent:'space-between', flexDirection:'row'}}>
                            <TouchableOpacity onPress={() => this.onCarSpaceSelect('1')} style={{alignItems:'center', justifyContent:'center', height:35, borderWidth:1, borderColor:(this.state.carSpaceSelected=='1')?'#d72614':'#000000', backgroundColor:(this.state.carSpaceSelected=='1')?'#d72614':'#ffffff'}}>
                                <Text textAlign='center' style={{color:(this.state.carSpaceSelected=='1')?'#ffffff':'#000000', margin:12}}>Any</Text>
                            </TouchableOpacity>                            

                            <TouchableOpacity onPress={() => this.onCarSpaceSelect('2')} style={{alignItems:'center', justifyContent:'center', height:35, borderWidth:1, borderColor:(this.state.carSpaceSelected=='2')?'#d72614':'#000000', backgroundColor:(this.state.carSpaceSelected=='2')?'#d72614':'#ffffff'}}>
                                <Text textAlign='center' style={{color:(this.state.carSpaceSelected=='2')?'#ffffff':'#000000', margin:12}}>{'1+'}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.onCarSpaceSelect('3')} style={{alignItems:'center', justifyContent:'center', height:35, borderWidth:1, borderColor:(this.state.carSpaceSelected=='3')?'#d72614':'#000000', backgroundColor:(this.state.carSpaceSelected=='3')?'#d72614':'#ffffff'}}>
                                <Text textAlign='center' style={{color:(this.state.carSpaceSelected=='3')?'#ffffff':'#000000', margin:12}}>{'2+'}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.onCarSpaceSelect('4')} style={{alignItems:'center', justifyContent:'center', height:35, borderWidth:1, borderColor:(this.state.carSpaceSelected=='4')?'#d72614':'#000000', backgroundColor:(this.state.carSpaceSelected=='4')?'#d72614':'#ffffff'}}>
                                <Text textAlign='center' style={{color:(this.state.carSpaceSelected=='4')?'#ffffff':'#000000', margin:12}}>{'3+'}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.onCarSpaceSelect('5')} style={{alignItems:'center', justifyContent:'center', height:35, borderWidth:1, borderColor:(this.state.carSpaceSelected=='5')?'#d72614':'#000000', backgroundColor:(this.state.carSpaceSelected=='5')?'#d72614':'#ffffff'}}>
                                <Text textAlign='center' style={{color:(this.state.carSpaceSelected=='5')?'#ffffff':'#000000', margin:12}}>{'4+'}</Text>
                            </TouchableOpacity>                    

                            <TouchableOpacity onPress={() => this.onCarSpaceSelect('6')} style={{alignItems:'center', justifyContent:'center', height:35, borderWidth:1, borderColor:(this.state.carSpaceSelected=='6')?'#d72614':'#000000', backgroundColor:(this.state.carSpaceSelected=='6')?'#d72614':'#ffffff'}}>                                                        
                                <Text textAlign='center' style={{color:(this.state.carSpaceSelected=='6')?'#ffffff':'#000000', margin:12}}>{'5+'}</Text>
                            </TouchableOpacity>

                        </View>

                        

                        <View style={{marginTop:50}}>
                            <Text textAlign='center' style={styles.filterAttributeText}>Keywords</Text>
                        </View>
                        <View style={{height:30, alignItems:'center'}}>                            
                            <View style={{width:window.width*0.9, borderBottomColor: 'gray', borderBottomWidth:1}}>
                                <TextInput  
                                    style={{width:window.width*0.9, height:40}}  
                                    underlineColorAndroid='transparent'                                
                                    onChangeText={this.onKeywordsChange.bind(this)}
                                    value={this.state.keywords}  
                                    placeholder={'e.g Pool, Garage'}                                                                      
                                />
                            </View>                            
                        </View>

                        <View style={{marginTop:50}}>
                            <Text textAlign='center' style={styles.filterAttributeText}>More Refinements</Text>
                        </View> 
                        <Dropdown
                            containerStyle={{width:window.width*0.9}}
                            label={Strings.NEW_OR_ESTABLISHED}
                            data={data}
                            onChangeText={this.onEstablishChange.bind(this)}
                            value={this.state.establishOrNew}
                        /> 

                        <Text style={{color:'#000000', fontSize:14, width:window.width*0.9, fontWeight:'bold', marginTop:20}}>{Strings.INDOOR_FEATURES}</Text>

                        <TouchableOpacity onPress={() => this.showIndoorFeatures()} style={{flexDirection:'row', marginTop:10}}>
                            <Image style={{width:20, height:20}} source={addImage} />
                            <Text style={{color:'#000000', fontSize:14, width:window.width*0.8, fontWeight:'500', marginLeft:10}}>Select Indoor Features</Text>                            
                        </TouchableOpacity> 

                        {this.state.selectedFeaturelist.length?

                            <View style={{backgroundColor:'#ffffff', height:40, width:window.width*0.88, justifyContent:'center', borderColor: '#FFF', borderRadius:5, marginTop:10}}>
                                <ScrollView contentContainerStyle={{ flexDirection:'row'}} horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {
                                        this.state.selectedFeaturelist.map((data, index)=>{
                                           return this._renderIndoorFeaturesTags(data, index);
                                        })
                                    }                                            
                                </ScrollView>
                            </View> 

                            :null
                        } 

                        {this.state.showIndoorFeatureModal?

                        
                            <Modal transparent>

                                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                                    <View style={{height:window.height*0.8, width:window.width*0.9, backgroundColor:'#ffffff', borderColor:'gray', borderWidth:0.5, borderRadius:10}}>        
                                        <View style={{height:40, backgroundColor:Colors.BLACK, justifyContent:'center', alignItems:'center'}}>
                                            <Text style={{color:'#ffffff', fontSize:14, fontWeight:'bold'}}>Indoor Features</Text>
                                            <TouchableOpacity 
                                                onPress={() => this.doneIndoorFeatures()}
                                                style={{position:'absolute', right:10}}
                                            >
                                                <Text style={{color:Colors.APP_THEME_RED_COLOR, fontSize:14, fontWeight:'bold'}}>Done</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <FlatList                        
                                            data={this.state.indoorFeaturesList}
                                            renderItem={this.renderItem}
                                            extraData={this.state}
                                        />
                                    </View> 
                                </View>

                            </Modal>
                            

                            :null
                        }  


                        <Text style={{color:'#000000', fontSize:14, width:window.width*0.9, fontWeight:'bold', marginTop:20}}>{Strings.OUTDOOR_FEATURES}</Text>

                        <TouchableOpacity onPress={() => this.showOutdoorFeatures()} style={{flexDirection:'row', marginTop:10}}>
                            <Image style={{width:20, height:20}} source={addImage} />
                            <Text style={{color:'#000000', fontSize:14, width:window.width*0.8, fontWeight:'500', marginLeft:10}}>Select Outdoor Features</Text>                            
                        </TouchableOpacity> 

                        {this.state.selectedOutdoorFeaturelist.length?

                            <View style={{backgroundColor:'#ffffff', height:40, width:window.width*0.88, justifyContent:'center', borderColor: '#FFF', borderRadius:5, marginTop:10}}>
                                <ScrollView contentContainerStyle={{ flexDirection:'row'}} horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {
                                        this.state.selectedOutdoorFeaturelist.map((data, index)=>{
                                           return this._renderIndoorFeaturesTags(data, index);
                                        })
                                    }                                            
                                </ScrollView>
                            </View> 

                            :null
                        } 

                        {this.state.showOutdoorFeatureModal?

                        
                            <Modal transparent>

                                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                                    <View style={{height:window.height*0.8, width:window.width*0.9, backgroundColor:'#ffffff', borderColor:'gray', borderWidth:0.5, borderRadius:10}}>        
                                        <View style={{height:40, backgroundColor:Colors.BLACK, justifyContent:'center', alignItems:'center'}}>
                                            <Text style={{color:'#ffffff', fontSize:14, fontWeight:'bold'}}>{Strings.OUTDOOR_FEATURES}</Text>
                                            <TouchableOpacity 
                                                onPress={() => this.doneOutdoorFeatures()}
                                                style={{position:'absolute', right:10}}
                                            >
                                                <Text style={{color:Colors.APP_THEME_RED_COLOR, fontSize:14, fontWeight:'bold'}}>Done</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <FlatList                        
                                            data={this.state.outdoorFeaturesList}
                                            renderItem={this.renderOutdoorItem}
                                            extraData={this.state}
                                        />
                                    </View> 
                                </View>

                            </Modal>
                            

                            :null
                        }    



                        <Text style={{color:'#000000', fontSize:14, width:window.width*0.9, fontWeight:'bold', marginTop:20}}>{Strings.ECO_FRIENDLY}</Text>

                        <TouchableOpacity onPress={() => this.showEcoFriendlyItems()} style={{flexDirection:'row', marginTop:10}}>
                            <Image style={{width:20, height:20}} source={addImage} />
                            <Text style={{color:'#000000', fontSize:14, width:window.width*0.8, fontWeight:'500', marginLeft:10}}>Select Eco-Friendly Features</Text>                            
                        </TouchableOpacity> 

                        {this.state.selectedEcoFriendlyItemList.length?

                            <View style={{backgroundColor:'#ffffff', height:40, width:window.width*0.88, justifyContent:'center', borderColor: '#FFF', borderRadius:5, marginTop:10}}>
                                <ScrollView contentContainerStyle={{ flexDirection:'row'}} horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {
                                        this.state.selectedEcoFriendlyItemList.map((data, index)=>{
                                           return this._renderEcoFriendlyItemTags(data, index);
                                        })
                                    }                                            
                                </ScrollView>
                            </View> 

                            :null
                        } 

                        {this.state.showEcoFriendlyItemsModal?

                        
                            <Modal transparent>

                                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                                    <View style={{height:window.height*0.8, width:window.width*0.9, backgroundColor:'#ffffff', borderColor:'gray', borderWidth:0.5, borderRadius:10}}>        
                                        <View style={{height:40, backgroundColor:Colors.BLACK, justifyContent:'center', alignItems:'center'}}>
                                            <Text style={{color:'#ffffff', fontSize:14, fontWeight:'bold'}}>{Strings.ECO_FRIENDLY}</Text>
                                            <TouchableOpacity 
                                                onPress={() => this.doneEcoFriendlyItems()}
                                                style={{position:'absolute', right:10}}
                                            >
                                                <Text style={{color:Colors.APP_THEME_RED_COLOR, fontSize:14, fontWeight:'bold'}}>Done</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <FlatList                        
                                            data={this.state.ecoFriendlyItemList}
                                            renderItem={this.renderEcoFriendlyItem}
                                            extraData={this.state}
                                        />
                                    </View> 
                                </View>

                            </Modal>
                            

                            :null
                        } 


                        <Text style={{color:'#000000', fontSize:14, width:window.width*0.9, fontWeight:'bold', marginTop:20}}>{Strings.MORE_FEATURES}</Text>                      

                        <View style={{width:window.width*0.9, flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:20}}>
                            <Text style={{color:'#000000', fontSize:16}}>{Strings.SEARCH_ONLY_PREMIERE_PROPERTIES}</Text>
                            <Switch
                                value={this.state.isSearchOnlyPremierProperties}
                                onValueChange={this.onSearchOnlyPremierPropertiesSwitchValueChange.bind(this)}
                                disabled={false}
                                activeText={''}
                                inActiveText={''}
                                circleSize={30}
                                barHeight={30}
                                circleBorderWidth={1}
                                backgroundActive={'#67d361'}
                                backgroundInactive={'#cccccc'}
                                circleActiveColor={'#ffffff'}
                                circleInActiveColor={'#ffffff'}
                            />
                        </View>

                        <View style={{width:window.width*0.9, flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:20}}>
                            <Text style={{color:'#000000', fontSize:16}}>{Strings.PETS_ALLOWED}</Text>
                            <Switch
                                value={this.state.isPetsAllowed}
                                onValueChange={this.onPetsAllowedSwitchValueChange.bind(this)}
                                disabled={false}
                                activeText={''}
                                inActiveText={''}
                                circleSize={30}
                                barHeight={30}
                                circleBorderWidth={1}
                                backgroundActive={'#67d361'}
                                backgroundInactive={'#cccccc'}
                                circleActiveColor={'#ffffff'}
                                circleInActiveColor={'#ffffff'}
                            />
                        </View>

                        <View style={{width:window.width*0.9, flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:20}}>
                            <Text style={{color:'#000000', fontSize:16}}>{Strings.FURNISHED}</Text>
                            <Switch
                                value={this.state.isFurnished}
                                onValueChange={this.onFurnishedSwitchValueChange.bind(this)}
                                disabled={false}
                                activeText={''}
                                inActiveText={''}
                                circleSize={30}
                                barHeight={30}
                                circleBorderWidth={1}
                                backgroundActive={'#67d361'}
                                backgroundInactive={'#cccccc'}
                                circleActiveColor={'#ffffff'}
                                circleInActiveColor={'#ffffff'}
                            />
                        </View>

                        <View style={{width:window.width*0.9, flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:20}}>
                            <Text style={{color:'#000000', fontSize:16}}>{Strings.SMOKING_PERMITTED}</Text>
                            <Switch
                                value={this.state.isSmokingPermitted}
                                onValueChange={this.onSmokingPermittedSwitchValueChange.bind(this)}
                                disabled={false}
                                activeText={''}
                                inActiveText={''}
                                circleSize={30}
                                barHeight={30}
                                circleBorderWidth={1}
                                backgroundActive={'#67d361'}
                                backgroundInactive={'#cccccc'}
                                circleActiveColor={'#ffffff'}
                                circleInActiveColor={'#ffffff'}
                            />
                        </View>

                        <View style={{width:window.width*0.9, flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:20}}>
                            <Text style={{color:'#000000', fontSize:16}}>{Strings.INCLUDE_SURROUNDING_SUBURBS}</Text>
                            <Switch
                                value={this.state.isIncludeSurroundingSuburbs}
                                onValueChange={this.onIncludeSurroundingSwitchValueChange.bind(this)}
                                disabled={false}
                                activeText={''}
                                inActiveText={''}
                                circleSize={30}
                                barHeight={30}
                                circleBorderWidth={1}
                                backgroundActive={'#67d361'}
                                backgroundInactive={'#cccccc'}
                                circleActiveColor={'#ffffff'}
                                circleInActiveColor={'#ffffff'}
                            />
                        </View>
                        

                    </View>

                    

                </KeyboardAwareScrollView>
                
                <TouchableOpacity onPress={() => this.onSearchClicked()}
                    style={{ flexDirection: "row", position: "absolute", bottom: 0, alignItems: "center", justifyContent: "center",
                                width: window.width,
                                height: 44,
                                backgroundColor: "#000000"
                            }}
                >
                    <Image source={searchImage} />
                        <Text
                            style={{
                            color: "#FFF",
                            marginLeft: 10,
                            fontSize: 16,
            
                            }}
                        >
                            Search..
                        </Text>
                </TouchableOpacity>

                {this.state.showSaveSearchPropertyModal?

                    <Modal transparent>

                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <View style={{width:window.width*0.9, backgroundColor:'#ffffff', borderColor:'gray', borderWidth:0.5, borderRadius:10}}>        
                                
                                <View style={{height:40, backgroundColor:Colors.BLACK, justifyContent:'center', alignItems:'center'}}>
                                    <Text style={{color:'#ffffff', fontSize:14, fontWeight:'bold'}}>{'Save and Subscribe'}</Text>
                                    <TouchableOpacity 
                                        onPress={() => this.cancelSaveSearchPropertyModal()}
                                        style={{position:'absolute', right:10}}
                                    >
                                        <Text style={{color:Colors.APP_THEME_RED_COLOR, fontSize:14, fontWeight:'bold'}}>cancel</Text>
                                    </TouchableOpacity>
                                </View>

                                <Text style={{fontWeight:'500', marginTop:20, marginLeft:10}}>Properties for Rent in</Text>

                                
                                <View style={{width:window.width*0.8, margin:10}}>
                                    {/*<TextField  label={Strings.NAME_THIS_SEARCH} 
                                                                                    labelStyle={styles.regisLabelStyle}
                                                                                    inputStyle={styles.regisLabelStyle}  
                                                                                    highlightColor={Colors.BLACK}
                                                                                    labelColor={Colors.TEXT_INPUT_LABEL_COLOR}
                                                                                    textColor={Colors.TEXT_INPUT_LABEL_COLOR}
                                                                                    borderColor={Colors.FORGOT_TEXT_COLOR}
                                                                                    selectionColor={Colors.BLACK}
                                                                                    returnKeyType='done'
                                                                                    autoCapitalize='none'
                                                                                    autoCorrect={false}                                                
                                                                                    onChangeText={this.onSearchNameChange.bind(this)}
                                                                                    value={this.state.searchName}
                                                                        />*/}
                                        <MaterialTextInput  label={Strings.NAME_THIS_SEARCH}
                                                    labelColor={Colors.BLACK}
                                                    activeColor={Colors.BLACK}
                                                    color={Colors.BLACK}
                                                    fontSize={14}
                                                    marginTop={30}                                                    
                                                    labelActiveTop={-30}
                                                    underlineColor={Colors.BLACK}
                                                    underlineActiveColor={Colors.BLACK}
                                                    underlineHeight={0.5}
                                                    underlineActiveHeight={0.5}
                                                    autoCapitalize='none'
                                                    autoCorrect={false}
                                                    underlineColorAndroid='transparent'
                                                    returnKeyType='done'
                                                    maxLength={20}
                                                    onChangeText={this.onSearchNameChange.bind(this)}
                                                    value={this.state.searchName}
                                        />

                                    <Dropdown
                                        containerStyle={{width:window.width*0.6}}
                                        label={Strings.ALERT_ME}
                                        data={alertMeData}
                                        onChangeText={this.onAlertMeChange.bind(this)}
                                        value={this.state.alertMeFrequency}
                                    />                                    

                                    <View>
                                        <TouchableOpacity
                                            onPress={() => this.onSearchNameSaveClicked()} 
                                            style={{backgroundColor:Colors.APP_THEME_RED_COLOR,height:40,width:window.width*0.6,alignItems:'center',justifyContent:'center', margin:30}}
                                        >
                                            <Text style={{color:'#ffffff'}}>SAVE</Text>
                                        </TouchableOpacity>                                        
                                    </View> 

                                </View> 
                            </View> 
                        </View>

                    </Modal>
                    

                    :null
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

const mapStateToProps = ({ loginReducer, filterReducer }) => {

    const {
        userAuthorize,
    } = loginReducer;

    const {
        saveSearchPropertyResponse,
        indoorFeatureListResponse,
        outdoorFeatureListResponse
    } = filterReducer;
  
    return {
        userAuthorize: userAuthorize,
        saveSearchPropertyResponse: saveSearchPropertyResponse,
        indoorFeatureListResponse: indoorFeatureListResponse,
        outdoorFeatureListResponse: outdoorFeatureListResponse
    }
}

export default connect(mapStateToProps,{
    userAuthenticated,
    saveSearchProperty,
    getIndoorFeatureList,
    getOutdoorFeatureList,
    clearGetIndoorFeatureListResponse,
    clearGetOutdoorFeatureListResponse
})(FilterScreen);

