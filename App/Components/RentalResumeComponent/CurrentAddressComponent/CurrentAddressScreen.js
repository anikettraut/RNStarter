import React,{Component} from 'react';
import { connect } from 'react-redux';
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
} from 'react-native';

import {        
    clearGetTenantCurrentResidentialResponse,
    clearAddUpdateTenantCurrentResidentialResponse
} from './CurrentAddressAction';


import {    
    getTenantCurrentResidential,
    addUpdateTenantCurrentResidential,
} from "../../../Action/ActionCreators";


import {        
    refreshRentalResumeMenu
} from '../RentalResumeMenu/RentalResumeMenuAction';

import{ Actions}    from 'react-native-router-flux';

import Colors       from '../../../Constants/Colors';
import Strings      from '../../../Constants/Strings';
import styles       from './CurrentAddressStyle';
import CommonStyles from '../../../CommonStyle/CommonStyle';

import checkImage   from '../../../Assets/check_selected.png';
import uncheckImage from '../../../Assets/check.png';
import calendarImage from '../../../Assets/calendar.png';

import leftArrowImage from '../../../Assets/leftArrow.png';
import rightArrowImage from '../../../Assets/rightArrow.png';

import TextField    from 'react-native-material-textfield';
import MaterialTextInput from 'react-native-material-textinput';
import { Dropdown } from 'react-native-material-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker';
import * as Progress from 'react-native-progress';
import Moment from 'moment';

const window = Dimensions.get('window');
let data = [{
      value: '1',
    }, {
      value: '2',
    }, {
      value: '3',
    }];

let years = [{value: '2018'}, {value: '2017'}, { value: '2016'}, {value: '2015'}, {value: '2014'}, {value: '2013'}, {value: '2012'}, {value: '2011'},
{value: '2010'}, {value: '2009'}, {value: '2008'}, {value: '2007'}, {value: '2006'}, {value: '2005'}, {value: '2004'}, {value: '2003'},
{value: '2002'}, {value: '2001'}, {value: '2000'}, {value: '1999'}, {value: '1998'}, {value: '1997'}, {value: '1996'}, {value: '1995'},
{value: '1994'}, {value: '1993'}, {value: '1992'}, {value: '1991'}, {value: '1990'}, {value: '1989'}, {value: '1988'}];

let months = [{value: 'January'}, { value: 'February'}, {value: 'March'}, {value: 'April'}, {value: 'May'}, {value: 'June'},
{value: 'July'},{value: 'August'}, {value: 'September'}, {value: 'October'}, {value: 'November'}, {value: 'December'}];


var monthIndex = 0;

// let livingArrangmentsData = [{
//       value: 'Renting through an agent',
//     }, {
//       value: 'Renting from owner',
//     }, {
//       value: 'Living with parents',
//     }, {
//       value: 'Sharing with others',
//     }, {
//       value: 'Living in a home I own',
//     }, {
//       value: 'Recently moved to Australia',
//     }];

let livingArrangmentsData = [{
      value: 'Rented',
    }, {
      value: 'owned',
    }, {
      value: 'Other',
    }];

var radio_props = [
  {label: 'Rented     ', value: 0 },
  {label: 'Owned      ', value: 1 },
  {label: 'Other', value: 2 }
];

// var bondRefund_radio_props = [
//   {label: 'Yes', value: 0 },
//   {label: 'No', value: 1 },
//   {label: 'I didnt pay bond', value: 2 },
//   {label: 'Not sure yet', value: 3 }
// ];

var bondRefund_radio_props = [
  {label: 'Yes', value: 0 },
  {label: 'No', value: 1 },  
];

class CurrentAddressScreen extends Component{


    constructor() {

        super();
            this.state = {
                isScreenLoading: false,
                showLandLordInfo:1,
                showOtherDetailScreen:0, 

                minDate: Moment().subtract(100,'y').format('DD-MM-YYYY'),
                maxDate: Moment().format('DD-MM-YYYY'),               
                
                typeLivingArrangment:'',
                currentAddress:'',
                suburb:'',
                postalCode:'',
                reasonLeavingAddress:'',   
                dateMovedIn:'',  
                landlordName:'',
                landlordContact:'',
                landlordAddress:'',
                landlordEmail:'',                
                weeklyRent:'',
                details:'',

                yearSelected:'',
                monthSelected:'',

                otherDetails:'',

                livingType:0,
                bondRefund:0,
                
                loggedInUserData:'',
                currentAddressInformation:'',

                
                detailsError:'',
                currentAddressError:'',
                suburbError:'',
                postalCodeError:'',
                reasonLeavingAddressError:'',   
                dateMovedInError:'',  
                landlordNameError:'',
                landlordContactError:'',
                landlordAddressError:'',
                landlordEmailError:'',
                weeklyRentError:'', 
                monthSelectedError:'',
                typeLivingArrangmentError:'',

                showComponent : 1,        
            };   
            
    }
    
    componentWillMount() {
            AsyncStorage.getItem("loggedInUserInfo").then((value) => {
                if(value) {                
                    var loggedInUserData = JSON.parse(value);                
                    this.setState({loggedInUserData: loggedInUserData});
                    this.callGetTenantCurrentResidentialWebService(loggedInUserData.ID)             
                }            
            }).done();
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {    

        });        
    } 


    componentWillReceiveProps(nextProps) {
        // Handle getTenantCurrentResidential service response
        if(nextProps.tenantCurrentResidentInfoResponse != undefined && nextProps.tenantCurrentResidentInfoResponse != ''){

            this.setState({isScreenLoading:false});            

            if(nextProps.tenantCurrentResidentInfoResponse.headerResponse.status == 200){  
                if(nextProps.tenantCurrentResidentInfoResponse.data.Content != null){
                    this.setState({currentAddressInformation :  nextProps.tenantCurrentResidentInfoResponse.data.Content});
                    this.fillUserInfo(nextProps.tenantCurrentResidentInfoResponse.data.Content);
                }
                // else{
                //     alert(nextProps.tenantCurrentResidentInfoResponse.data.ReturnMessage[0]);
                // }                                
            }
            else if(nextProps.tenantCurrentResidentInfoResponse.headerResponse.status == 400){
                alert(nextProps.tenantCurrentResidentInfoResponse.data.error_description);
            }
            else if(nextProps.tenantCurrentResidentInfoResponse.headerResponse.status == 500){
                alert('Internal Server Error');
            }
        }

        // Handle addUpdateTenantCurrentResidential service response
        if(nextProps.updateTenantCurrentResidentInfoResponse != undefined && nextProps.updateTenantCurrentResidentInfoResponse != ''){

            this.setState({isScreenLoading:false});            

            if(nextProps.updateTenantCurrentResidentInfoResponse.headerResponse.status == 200){  
                if(nextProps.updateTenantCurrentResidentInfoResponse.data.IsSuccess){
                    //Actions.popTo('RentalResumeMenu');
                    if(this.state.showComponent == 1){
                        if(this.state.typeLivingArrangment == 'Rented' || this.state.typeLivingArrangment == 'rented'){
                            this.setState({showComponent:2});    
                        }
                        else{
                            this.props.refreshRentalResumeMenu(1); 
                            //Actions.popTo('RentalResumeMenu');
                            Actions.PreviousResidentialAddressScreen();
                        }
                    }
                    else if(this.state.showComponent == 2){
                        this.props.refreshRentalResumeMenu(1); 
                        //Actions.popTo('RentalResumeMenu');
                        Actions.PreviousResidentialAddressScreen();
                    }
                }else{
                    alert(nextProps.updateTenantCurrentResidentInfoResponse.data.ReturnMessage[0]);
                }                                
            }
            else if(nextProps.updateTenantCurrentResidentInfoResponse.headerResponse.status == 400){
                alert(nextProps.updateTenantCurrentResidentInfoResponse.data.error_description);
            }
            else if(nextProps.updateTenantCurrentResidentInfoResponse.headerResponse.status == 500){
                alert('Internal Server Error');
            }
        }
    }

    componentDidUpdate() { 
        if(this.props.tenantCurrentResidentInfoResponse != undefined && this.props.tenantCurrentResidentInfoResponse != ''){  
            this.props.clearGetTenantCurrentResidentialResponse();   
        }

        if(this.props.updateTenantCurrentResidentInfoResponse != undefined && this.props.updateTenantCurrentResidentInfoResponse != ''){  
            this.props.clearAddUpdateTenantCurrentResidentialResponse();
        }

    }

    componentWillUnmount() {        
        
        this.setState({
            currentAddress: '',
            suburb: '',
            postalCode: '',
            reasonLeavingAddress: '',
            dateMovedIn: '',
            livingType: 0,
            landlordName: '',
            landlordContact: '',
            landlordAddress: '',
            bondRefund: 0,
            weeklyRent: '',
            showLandLordInfo:0,
            showOtherDetailScreen:0
        });        
    }

    callGetTenantCurrentResidentialWebService(userID) {
        /***************** Call getTenantCurrentResidential WebService ****************/            
            this.setState({isScreenLoading:true}); 
            var postData = {
                UserId: userID
            }                    
            this.props.getTenantCurrentResidential(postData);            
        /*************************************************************************/
    }

    fillUserInfo(userInfo){ 

        var date = Moment(userInfo.DateMovedIn).format('DD-MM-YYYY');
        var dateMovedIn = date?date:'';

        if(userInfo.LivingTypeId==0){
            this.setState({showLandLordInfo:1, showOtherDetailScreen:0});
        }
        else if(userInfo.LivingTypeId==2){
            this.setState({showLandLordInfo:0, showOtherDetailScreen:1});
        }
        else{
            this.setState({showLandLordInfo:0, showOtherDetailScreen:0});   
        }

        if(userInfo.Years == 0){
            this.setState({yearSelected: ''});
        }  
        else{
            this.setState({yearSelected: userInfo.Years});
        }

        if(userInfo.Months == 0){
            this.setState({monthSelected: ''});
            monthIndex = 0;
        }  
        else{
            this.setState({ monthSelected: months[userInfo.Months].value });
            monthIndex = userInfo.Months;
        }    

        this.setState({            
            currentAddress: userInfo.Address?userInfo.Address:'',
            suburb: userInfo.Suburb?userInfo.Suburb:'',
            postalCode: userInfo.PostalCode?userInfo.PostalCode:'',
            reasonLeavingAddress: userInfo.LeavingReason?userInfo.LeavingReason:'',
            dateMovedIn: dateMovedIn,
            livingType: userInfo.LivingTypeId?userInfo.LivingTypeId:0,
            landlordName: userInfo.RefereeName?userInfo.RefereeName:'',
            landlordContact: userInfo.RefereePhoneNo?userInfo.RefereePhoneNo:'',
            landlordAddress: userInfo.LandlordAddress?userInfo.LandlordAddress:'',
            landlordEmail: userInfo.RefereeEmail?userInfo.RefereeEmail:'',
            bondRefund: userInfo.BondRefund?0:1,
            weeklyRent: userInfo.WeeklyRent?userInfo.WeeklyRent.toString():'',
            typeLivingArrangment: userInfo.LivingArrangement?userInfo.LivingArrangement:''
        });
    }  


    updateCurrentAddressInfo() {

        var errors = [];  

        var checkCurrentAddress = this.state.currentAddress.replace(/\s/g,"");
        var checkReasonLeavingAddress = this.state.reasonLeavingAddress.replace(/\s/g,"");
        var checkmonthSelected = this.state.monthSelected.replace(/\s/g,"");
        var typeLivingArrangmentSelected = this.state.typeLivingArrangment.replace(/\s/g,"");
            


        // var checkSuburb = this.state.suburb.replace(/\s/g,"");
        // var checkPostalCode = this.state.postalCode.replace(/\s/g,"");        
        // var checkDateMovedIn = this.state.dateMovedIn.replace(/\s/g,"");

        // var checkLandlordName = this.state.landlordName.replace(/\s/g,"");
        // var checkLandlordContact = this.state.landlordContact.replace(/\s/g,"");
        // var checkLandlordAddress = this.state.landlordAddress.replace(/\s/g,"");
        // var checkWeeklyRent = this.state.weeklyRent.replace(/\s/g,"");                

        if(checkCurrentAddress.length == 0){
            this.setState({currentAddressError:Strings.ERROR_EMPTY_ADDRESS})
            errors.push('currentAddressError');
        }else{
            this.setState({currentAddressError:''})
        }

        if(checkmonthSelected.length == 0){
            this.setState({monthSelectedError:'Please select month'})
            errors.push('monthSelectedError');
        }else{
            this.setState({monthSelectedError:''})
        }

        if(checkReasonLeavingAddress.length == 0){
            this.setState({reasonLeavingAddressError:Strings.ERROR_EMPTY_LEAVING_REASON})
            errors.push('reasonLeavingAddressError');
        }else{
            this.setState({reasonLeavingAddressError:''})
        }

        if(typeLivingArrangmentSelected.length == 0){
            this.setState({typeLivingArrangmentError:'Please select property type'})
            errors.push('typeLivingArrangmentError');
        }else{
            this.setState({typeLivingArrangmentError:''})
        }

        // if(checkSuburb.length == 0){
        //     this.setState({suburbError:Strings.ERROR_EMPTY_SUBURB})
        //     errors.push('suburbError');
        // }else{
        //     this.setState({suburbError:''})
        // }

        // if(checkPostalCode.length == 0){
        //     this.setState({postalCodeError:Strings.ERROR_EMPTY_POSTALCODE})
        //     errors.push('postalCodeError');
        // }else{
        //     this.setState({postalCodeError:''})
        // }

        

        // if(checkDateMovedIn.length == 0){
        //     this.setState({dateMovedInError:Strings.ERROR_EMPTY_MOVED_IN_DATE})
        //     errors.push('dateMovedInError');
        // }else{
        //     this.setState({dateMovedInError:''})
        // }

        // if(checkLandlordName.length == 0){
        //     this.setState({landlordNameError:Strings.ERROR_EMPTY_LANDLORD_NAME})
        //     errors.push('landlordNameError');
        // }else{
        //     this.setState({landlordNameError:''})
        // }

        // if(checkLandlordContact.length == 0){
        //     this.setState({landlordContactError:Strings.ERROR_EMPTY_LANDLORD_CONTACT})
        //     errors.push('landlordContactError');
        // }else{
        //     this.setState({landlordContactError:''})
        // }

        // if(checkLandlordAddress.length == 0){
        //     this.setState({landlordAddressError:Strings.ERROR_EMPTY_ADDRESS})
        //     errors.push('landlordAddressError');
        // }else{
        //     this.setState({landlordAddressError:''})
        // }

        // if(checkWeeklyRent.length == 0){
        //     this.setState({weeklyRentError:Strings.ERROR_EMPTY_WEEKLY_RENT})
        //     errors.push('weeklyRentError');
        // }else{
        //     this.setState({weeklyRentError:''})
        // }             

        if(errors.length > 0){
            return;
        }
        else{            

            console.log("this.state.dateMovedIn"+this.state.dateMovedIn);
            var postData = {
                UserId: this.state.loggedInUserData.ID,                                
                Address: this.state.currentAddress,
                Suburb: this.state.suburb,
                PostalCode: this.state.postalCode,                
                Months: monthIndex,
                Years: this.state.yearSelected,
                LivingArrangement: this.state.typeLivingArrangment
            }

            if(this.state.livingType == 0){                
                postData.LeavingReason = this.state.reasonLeavingAddress;
                postData.LivingTypeId = this.state.livingType;
                postData.RefereeName = this.state.landlordName;
                postData.LandlordAddress = this.state.landlordAddress;
                postData.RefereePhoneNo = this.state.landlordContact;
                postData.RefereeEmail = this.state.landlordEmail;
                postData.WeeklyRent = this.state.weeklyRent;
                postData.BondRefund = (this.state.bondRefund==0)?1:0;
                postData.BondReason = '';
            }
            else if(this.state.livingType == 2){
                postData.OtherDetails = this.state.otherDetails;
            }

            /********* Call addUpdateTenantCurrentResidential WebService *********/            
                this.setState({isScreenLoading:true});                                 
                this.props.addUpdateTenantCurrentResidential(postData);            
            /*********************************************************************/

        }        

    } 

    onFrontClicked(componentID) {        

        if(componentID == 2){

            var errors = [];  

            var checkCurrentAddress = this.state.currentAddress.replace(/\s/g,"");
            var checkReasonLeavingAddress = this.state.reasonLeavingAddress.replace(/\s/g,"");
            var checkmonthSelected = this.state.monthSelected.replace(/\s/g,"");
            var typeLivingArrangmentSelected = this.state.typeLivingArrangment.replace(/\s/g,"");
                                

            if(checkCurrentAddress.length == 0){
                this.setState({currentAddressError:Strings.ERROR_EMPTY_ADDRESS})
                errors.push('currentAddressError');
            }else{
                this.setState({currentAddressError:''})
            }

            if(checkmonthSelected.length == 0){
                this.setState({monthSelectedError:'Please select month'})
                errors.push('monthSelectedError');
            }else{
                this.setState({monthSelectedError:''})
            }

            if(checkReasonLeavingAddress.length == 0){
                this.setState({reasonLeavingAddressError:Strings.ERROR_EMPTY_LEAVING_REASON})
                errors.push('reasonLeavingAddressError');
            }else{
                this.setState({reasonLeavingAddressError:''})
            }

            if(typeLivingArrangmentSelected.length == 0){
                this.setState({typeLivingArrangmentError:'Please select property type'})
                errors.push('typeLivingArrangmentError');
            }else{
                this.setState({typeLivingArrangmentError:''})
            }
            
            if(errors.length > 0){
                return;
            }
            else{            
                
                var postData = {
                    UserId: this.state.loggedInUserData.ID,                                
                    Address: this.state.currentAddress,
                    LeavingReason: this.state.reasonLeavingAddress,
                    Years: this.state.yearSelected,
                    Months: monthIndex,                    
                    LivingArrangement: this.state.typeLivingArrangment
                }
                
                // if(this.state.typeLivingArrangment == 'Rented' || this.state.typeLivingArrangment == 'rented'){
                //     postData.LandlordName = this.state.landlordName;
                //     postData.LandlordAddress = this.state.landlordAddress;
                //     postData.LandlordPhoneNo = this.state.landlordContact;
                //     postData.landlordEmail = this.state.landlordEmail;
                //     postData.WeeklyRent = this.state.weeklyRent;
                //     postData.BondRefund = (this.state.bondRefund==0)?1:0;
                //     postData.BondReason = '';
                // }
                // else if(this.state.typeLivingArrangment == 'Other' || this.state.typeLivingArrangment == 'other'){
                //     postData.OtherDetails = this.state.otherDetails;
                // }

                /********* Call addUpdateTenantCurrentResidential WebService *********/            
                    this.setState({isScreenLoading:true});                                 
                    this.props.addUpdateTenantCurrentResidential(postData);            
                /*********************************************************************/

            }   
        }

        //this.setState({showComponent:componentID});
    }

    onBackClicked(componentID) {
        this.setState({showComponent:componentID});
    }    

    onCurrentAddressChange(text) {
        this.setState({currentAddress:text, currentAddressError:''});
    }

    onSuburbChange(text) {
        this.setState({suburb:text, suburbError:''});
    }

    onPostalCodeChange(text) {
        this.setState({postalCode:text, postalCodeError:''});
    }

    onReasonLeavingAddressChange(text) {
        this.setState({reasonLeavingAddress:text, reasonLeavingAddressError:''});
    }

    onDetailsChange(text) {
        this.setState({details:text, detailsError:''});
    }

    onDateMovedInChange(text) {
        this.setState({ dateMovedIn: text, dateMovedInError:'' });
    }

    onLandlordNameChange(text) {
        this.setState({landlordName:text, landlordNameError:''});
    }

    onLandlordContactChange(text) {
        this.setState({landlordContact:text, landlordContactError:''});
    }

    onLandlordAddressChange(text) {
        this.setState({landlordAddress:text, landlordAddressError:''});
    }

    onLandlordEmailChange(text) {
        this.setState({landlordEmail:text, landlordEmailError:''});
    }

    onWeeklyRentChange(text) {
        this.setState({weeklyRent:text, weeklyRentError:''});
    }

    onOtherDetailsChange(text) {
        this.setState({otherDetails:text});
    }

    onYearChange(value, index, data) {        
        this.setState({yearSelected:value});
    }

    onMonthChange(value, index, data) {        
        this.setState({monthSelected:value, monthSelectedError:''});
        monthIndex = index;
    }

    isPropertyRentedClicked(value){   

        console.log("value>>>> "+value);     

        if(value==0){
            this.setState({showLandLordInfo:1, showOtherDetailScreen:0, livingType:value});
        }
        else if(value==2){
            this.setState({showLandLordInfo:0, showOtherDetailScreen:1, livingType:value});
        }
        else{
            this.setState({showLandLordInfo:0, showOtherDetailScreen:0, livingType:value});   
        }
    }

    isBondRefundSelected(value){
        if(value==0){
            this.setState({bondRefund:value});
        }
        else{
            this.setState({bondRefund:value});
        }   
    }

    onSaveAndExitClicked() {
        this.updateCurrentAddressInfo();
    }

    onNextClicked() {
        Actions.PreviousResidentialAddressScreen();
    }

    onLivingArrChange(value, index, data) {        
        this.setState({typeLivingArrangment:value, typeLivingArrangmentError:''});         
    }    

	render(){

        console.log("this.state.monthSelectedError>>> "+this.state.monthSelectedError);
    	return(
    		<View style={styles.container}> 
                <View style={{flex:1, alignItems:'center'}}>                 
                                              
                    <KeyboardAwareScrollView contentContainerStyle={{paddingBottom:60}} showsVerticalScrollIndicator={false}>                               
                        
                        {(this.state.showComponent == 1)?
                        <View style={{borderWidth:1, borderColor:Colors.DARK_GRAY_COLOR, width:window.width*0.95, marginTop:10, alignItems:'center'}}>
                        
                            <Text style={{fontSize:16, fontWeight:'500', margin:10, color:Colors.APP_THEME_RED_COLOR}}>
                                Details of Current Address
                            </Text>                            

                            <View style={{width:window.width*0.8}}>
                                <MaterialTextInput  label={Strings.WHAT_IS_YOUR_CURRENT_ADDRESS}
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
                                                    returnKeyType='next'
                                                    maxLength={100}
                                                    onChangeText={this.onCurrentAddressChange.bind(this)}
                                                    value={this.state.currentAddress}
                                />
                            </View>
                            {(this.state.currentAddressError == '')?null:
                                <Text style={CommonStyles.errorText}>{this.state.currentAddressError}</Text>                                
                            } 

                            {/*
                                <View style={{width:window.width*0.8}}>
                                    <MaterialTextInput  label={Strings.WEEKLY_RENT+' ($)'}
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
                                                        onChangeText={this.onWeeklyRentChange.bind(this)}
                                                        value={this.state.weeklyRent}
                                    />
                                </View>
                                {(this.state.weeklyRentError == '')?null:
                                    <Text style={CommonStyles.errorText}>{this.state.weeklyRentError}</Text>                                
                                }
                            */}

                            {/*
                                <View style={{width:window.width*0.8, flexDirection:'row', alignItems:'center', borderBottomWidth:0.5, borderBottomColor:Colors.TEXT_INPUT_LABEL_COLOR, marginTop:30}}>                        
                                    <DatePicker
                                        style={{width: window.width*0.7}}
                                        date={this.state.dateMovedIn}
                                        mode="date"
                                        placeholder={Strings.DATE_MOVED_IN}
                                        format="DD-MM-YYYY"                            
                                        minDate={this.state.minDate}
                                        maxDate={this.state.maxDate}
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        iconSource={calendarImage}
                                        customStyles={{
                                            dateIcon: {
                                                position: 'absolute',
                                                left: 0,
                                                top: 10,
                                                marginLeft: 10,
                                                height:20,
                                                width:20
                                            },
                                            dateInput: {                                                                     
                                                borderBottomWidth:0,
                                                borderTopWidth:0,
                                                borderLeftWidth:0,
                                                borderRightWidth:0,                                                                       
                                            },
                                            dateText:
                                            {
                                                color: Colors.INPUT_COLOR_GRAY,
                                                fontSize: 14,
                                                fontWeight: '500',
                                                paddingLeft: 40,
                                                paddingTop: 8,
                                                paddingBottom: 10,
                                                alignSelf: 'flex-start'

                                            },
                                            placeholderText:
                                            {
                                                color: Colors.INPUT_COLOR_GRAY,
                                                fontSize: 14,
                                                paddingLeft: 40,
                                                paddingTop: 8,
                                                paddingBottom: 10,
                                                alignSelf: 'flex-start'
                                            }                              
                                        }}                            
                                        onDateChange={this.onDateMovedInChange.bind(this)}
                                    />                        
                                </View>
                                {(this.state.dateMovedInError == '')?null:
                                    <Text style={CommonStyles.errorText}>{this.state.dateMovedInError}</Text>                                
                                }
                            */}


                            <View style={{width:window.width*0.8, flexDirection:'row', justifyContent:'space-between'}}>                            
                                <View>
                                    <Dropdown
                                        containerStyle={{width:window.width*0.45}}
                                        label={'Month (Moved In)'}
                                        data={months}
                                        onChangeText={this.onMonthChange.bind(this)}
                                        value={this.state.monthSelected}
                                    />
                                    {(this.state.monthSelectedError == '')?null:
                                        <Text style={CommonStyles.errorText}>{this.state.monthSelectedError}</Text>                                
                                    }
                                </View>
                                <Dropdown
                                    containerStyle={{width:window.width*0.25}}
                                    label={'Year'}
                                    data={years}
                                    onChangeText={this.onYearChange.bind(this)}
                                    value={this.state.yearSelected}
                                />
                            </View>


                            <View style={{width:window.width*0.8}}>                            
                                <MaterialTextInput  label={Strings.WHY_ARE_YOU_LEAVING_THIS_ADDRESS}
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
                                                    multiline={true}
                                                    maxLength={200}
                                                    onChangeText={this.onReasonLeavingAddressChange.bind(this)}
                                                    value={this.state.reasonLeavingAddress}
                                />
                            </View> 
                            {(this.state.reasonLeavingAddressError == '')?null:
                                <Text style={CommonStyles.errorText}>{this.state.reasonLeavingAddressError}</Text>                                
                            } 


                            <View>
                                <Dropdown
                                        containerStyle={{width:window.width*0.8, height:65}}
                                        label={'Property Type'}
                                        data={livingArrangmentsData}
                                        onChangeText={this.onLivingArrChange.bind(this)}
                                        value={this.state.typeLivingArrangment}
                                />
                                {(this.state.typeLivingArrangmentError == '')?null:
                                    <Text style={CommonStyles.errorText}>{this.state.typeLivingArrangmentError}</Text>                                
                                }
                            </View>

                            {(this.state.typeLivingArrangment == 'Other')?
                                <View style={{width:window.width*0.8}}>                            
                                    <MaterialTextInput  label={'Details'}
                                                        labelColor={Colors.BLACK}
                                                        activeColor={Colors.BLACK}
                                                        color={Colors.BLACK}
                                                        fontSize={14}
                                                        marginTop={20}                                                    
                                                        labelActiveTop={-30}
                                                        underlineColor={Colors.BLACK}
                                                        underlineActiveColor={Colors.BLACK}
                                                        underlineHeight={0.5}
                                                        underlineActiveHeight={0.5}
                                                        autoCapitalize='none'
                                                        autoCorrect={false}
                                                        underlineColorAndroid='transparent'
                                                        returnKeyType='done'
                                                        onChangeText={this.onDetailsChange.bind(this)}
                                                        value={this.state.details}
                                    />
                                </View> 
                                :null
                            } 

                            {/*
                                <View style={{width:window.width*0.8}}>                         
                                    <Text style={{ marginTop:40, color:Colors.BLACK }}>{'Do you expect the bond to be refunded?'}</Text>
                                    <View style={{marginTop:15, alignItems:'flex-start'}}>
                                        <RadioForm
                                            radio_props={bondRefund_radio_props}
                                            initial={this.state.bondRefund}                                        
                                            buttonColor={'red'}
                                            buttonSize={10}
                                            labelStyle={{width:300}}
                                            buttonOuterSize={20}                                                        
                                            onPress={this.isBondRefundSelected.bind(this)}
                                        />
                                    </View> 
                                </View>
                            */}
                            
                            <View style={{width:window.width*0.8, alignItems:'center', margin:20}}>                            

                                

                                {(this.state.typeLivingArrangment == 'Rented' || this.state.typeLivingArrangment == 'rented')?
                                                                        
                                    <TouchableOpacity 
                                        onPress={() => this.onFrontClicked(2)}
                                        style={{backgroundColor:Colors.APP_THEME_RED_COLOR,height:40,width:70,alignItems:'center',justifyContent:'center'}}
                                    > 
                                            <Image
                                                style={{width:20, height:20}}
                                                source={rightArrowImage}
                                            ></Image>
                                    </TouchableOpacity>

                                    :

                                    <TouchableOpacity 
                                        onPress={() => this.onSaveAndExitClicked()}
                                        style={{backgroundColor:Colors.APP_THEME_RED_COLOR,height:40,width:window.width*0.35,alignItems:'center',justifyContent:'center'}}
                                    > 
                                            <Text style={{color:'#ffffff'}}>Save</Text>
                                    </TouchableOpacity>
                                }

                            </View>

                        </View>
                        :null
                        }

                        {(this.state.showComponent == 2)?
                        <View style={{borderWidth:1, borderColor:Colors.DARK_GRAY_COLOR, width:window.width*0.95, marginTop:10, alignItems:'center'}}>
                        
                            <Text style={{fontSize:16, fontWeight:'500', margin:10, color:Colors.APP_THEME_RED_COLOR}}>
                                Current Address Reference (Optional)
                            </Text>

                            <View style={{width:window.width*0.8}}>
                                <MaterialTextInput  label={Strings.LANDLORD_NAME}
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
                                                    returnKeyType='next'
                                                    maxLength={30}
                                                    onChangeText={this.onLandlordNameChange.bind(this)}
                                                    value={this.state.landlordName}
                                />
                            </View>
                            {(this.state.landlordNameError == '')?null:
                                <Text style={CommonStyles.errorText}>{this.state.landlordNameError}</Text>                                
                            }

                            <View style={{width:window.width*0.8}}>                                
                                <MaterialTextInput  label={Strings.LANDLORD_CONTACT_NUMBER}
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
                                                    keyboardType='phone-pad'
                                                    returnKeyType='next'
                                                    maxLength={10}
                                                    onChangeText={this.onLandlordContactChange.bind(this)}
                                                    value={this.state.landlordContact}
                                />
                            </View>
                            {(this.state.landlordContactError == '')?null:
                                <Text style={CommonStyles.errorText}>{this.state.landlordContactError}</Text>                                
                            }

                            <View style={{width:window.width*0.8}}>                              
                                <MaterialTextInput  label={Strings.LANDLORD_ADDRESS}
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
                                                    maxLength={30}
                                                    onChangeText={this.onLandlordAddressChange.bind(this)}
                                                    value={this.state.landlordAddress}
                                />
                            </View>
                            {(this.state.landlordAddressError == '')?null:
                                <Text style={CommonStyles.errorText}>{this.state.landlordAddressError}</Text>                                
                            }


                            <View style={{width:window.width*0.8}}>                              
                                <MaterialTextInput  label={Strings.LANDLORD_EMAIL}
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
                                                    maxLength={30}
                                                    onChangeText={this.onLandlordEmailChange.bind(this)}
                                                    value={this.state.landlordEmail}
                                />
                            </View>
                            {(this.state.landlordEmailError == '')?null:
                                <Text style={CommonStyles.errorText}>{this.state.landlordEmailError}</Text>                                
                            }

                            <View style={{width:window.width*0.8}}>
                                <MaterialTextInput  label={Strings.WEEKLY_RENT+' ($)'}
                                                    labelColor={Colors.BLACK}
                                                    activeColor={Colors.BLACK}
                                                    color={Colors.BLACK}
                                                    fontSize={14}
                                                    marginTop={20}                                                    
                                                    labelActiveTop={-30}
                                                    underlineColor={Colors.BLACK}
                                                    underlineActiveColor={Colors.BLACK}
                                                    underlineHeight={0.5}
                                                    underlineActiveHeight={0.5}
                                                    autoCapitalize='none'
                                                    autoCorrect={false}
                                                    underlineColorAndroid='transparent'
                                                    returnKeyType='done'
                                                    maxLength={10}
                                                    onChangeText={this.onWeeklyRentChange.bind(this)}
                                                    value={this.state.weeklyRent}
                                />
                            </View>
                            {(this.state.weeklyRentError == '')?null:
                                <Text style={CommonStyles.errorText}>{this.state.weeklyRentError}</Text>                                
                            }

                            <View style={{width:window.width*0.8}}>                         
                                <Text style={{ marginTop:40, color:Colors.BLACK }}>{'Do you expect the bond to be refunded?'}</Text>
                                <View style={{marginTop:15, alignItems:'flex-start'}}>
                                    <RadioForm
                                        radio_props={bondRefund_radio_props}
                                        initial={this.state.bondRefund}                                        
                                        buttonColor={'red'}
                                        buttonSize={10}
                                        labelStyle={{width:300}}
                                        buttonOuterSize={20}                                                        
                                        onPress={this.isBondRefundSelected.bind(this)}
                                    />
                                </View> 
                            </View>

                            <View style={{width:window.width*0.8, flexDirection:'row', justifyContent:'space-between', margin:20}}>

                                <TouchableOpacity 
                                    onPress={() => this.onBackClicked(1)}
                                    style={{backgroundColor:Colors.APP_THEME_RED_COLOR,height:40,width:70,alignItems:'center',justifyContent:'center'}}
                                > 
                                        <Image
                                            style={{width:20, height:20}}
                                            source={leftArrowImage}
                                        ></Image>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    onPress={() => this.onSaveAndExitClicked()}
                                    style={{backgroundColor:Colors.APP_THEME_RED_COLOR,height:40,width:window.width*0.35,alignItems:'center',justifyContent:'center'}}
                                > 
                                        <Text style={{color:'#ffffff'}}>Save</Text>
                                </TouchableOpacity>

                            </View> 

                        </View>
                        :null
                        }
                

                    </KeyboardAwareScrollView>

                </View>
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

const mapStateToProps = ({ currentAddressReducer }) => {

  const {
    tenantCurrentResidentInfoResponse,
    updateTenantCurrentResidentInfoResponse
  } = currentAddressReducer;
  
  return {
    tenantCurrentResidentInfoResponse: tenantCurrentResidentInfoResponse,
    updateTenantCurrentResidentInfoResponse: updateTenantCurrentResidentInfoResponse
  }
}

export default connect(mapStateToProps,{
    getTenantCurrentResidential,
    addUpdateTenantCurrentResidential,
    clearGetTenantCurrentResidentialResponse,
    clearAddUpdateTenantCurrentResidentialResponse,
    refreshRentalResumeMenu
})(CurrentAddressScreen);
