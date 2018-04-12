//PreviousResidentialAddressComponent

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
    clearGetTenantPreviousResidentialResponse,
    clearAddUpdateTenantPreviousResidentialResponse
} from './PreviousResidentialAddressAction';

import {    
    getTenantPreviousResidential,
    addUpdateTenantPreviousResidential,
} from "../../../Action/ActionCreators";

import {        
    refreshRentalResumeMenu
} from '../RentalResumeMenu/RentalResumeMenuAction';

import{ Actions}    from 'react-native-router-flux';

import Colors       from '../../../Constants/Colors';
import Strings      from '../../../Constants/Strings';
import styles       from './PreviousResidentialAddressStyle';
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

var radio_props = [
  {label: 'Rented     ', value: 0 },
  {label: 'Owned      ', value: 1 },
  {label: 'Other', value: 2 }
];

var bondRefund_radio_props = [
  {label: 'Yes     ', value: 0 },
  {label: 'No      ', value: 1 }
];


let yearsIn = [{value: '2018'}, {value: '2017'}, { value: '2016'}, {value: '2015'}, {value: '2014'}, {value: '2013'}, {value: '2012'}, {value: '2011'},
{value: '2010'}, {value: '2009'}, {value: '2008'}, {value: '2007'}, {value: '2006'}, {value: '2005'}, {value: '2004'}, {value: '2003'},
{value: '2002'}, {value: '2001'}, {value: '2000'}, {value: '1999'}, {value: '1998'}, {value: '1997'}, {value: '1996'}, {value: '1995'},
{value: '1994'}, {value: '1993'}, {value: '1992'}, {value: '1991'}, {value: '1990'}, {value: '1989'}, {value: '1988'}];

let monthsIn = [{value: 'January'}, { value: 'February'}, {value: 'March'}, {value: 'April'}, {value: 'May'}, {value: 'June'},
{value: 'July'},{value: 'August'}, {value: 'September'}, {value: 'October'}, {value: 'November'}, {value: 'December'}];

let yearsOut = [{value: '2018'}, {value: '2017'}, { value: '2016'}, {value: '2015'}, {value: '2014'}, {value: '2013'}, {value: '2012'}, {value: '2011'},
{value: '2010'}, {value: '2009'}, {value: '2008'}, {value: '2007'}, {value: '2006'}, {value: '2005'}, {value: '2004'}, {value: '2003'},
{value: '2002'}, {value: '2001'}, {value: '2000'}, {value: '1999'}, {value: '1998'}, {value: '1997'}, {value: '1996'}, {value: '1995'},
{value: '1994'}, {value: '1993'}, {value: '1992'}, {value: '1991'}, {value: '1990'}, {value: '1989'}, {value: '1988'}];

let monthsOut = [{value: 'January'}, { value: 'February'}, {value: 'March'}, {value: 'April'}, {value: 'May'}, {value: 'June'},
{value: 'July'},{value: 'August'}, {value: 'September'}, {value: 'October'}, {value: 'November'}, {value: 'December'}];

var propertyType = -1;
var monthInIndex = 0;
var monthOutIndex = 0;

class PreviousResidentialAddressScreen extends Component{


    constructor() {

        super();
            this.state = {
                isScreenLoading: false,
                showLandLordInfo:1,
                showOtherDetailScreen:0,                
                residentialAddress:'',
                yearInSelected:'',
                monthInSelected:'',
                yearOutSelected:'',
                monthOutSelected:'',
                suburb:'',
                postalCode:'',
                reasonLeavingAddress:'',   
                dateMovedIn:'',
                dateMovedOut:'',  
                landlordName:'',
                landlordContact:'',
                landlordAddress:'',
                landlordEmail:'',
                weeklyRent:'',
                otherDetails:'',
                livingType:0,
                bondRefund:0,
                bondRefundReason:'',
                
                loggedInUserData:'',
                preAddressInformation:'',

                residentialAddressError:'',
                suburbError:'',
                postalCodeError:'',
                reasonLeavingAddressError:'',   
                dateMovedInError:'',  
                dateMovedOutError:'',
                landlordNameError:'',
                landlordContactError:'',
                landlordAddressError:'',
                landlordEmailError:'',
                weeklyRentError:'',

                showComponent : 1,

                
            };   
            
    }
    
    componentWillMount() {
        
            AsyncStorage.getItem("loggedInUserInfo").then((value) => {
                if(value) {                
                    var loggedInUserData = JSON.parse(value);                
                    this.setState({loggedInUserData: loggedInUserData});
                    this.callGetTenantPreviousResidentialWebService(loggedInUserData.ID)             
                }            
            }).done();
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {                                         

        });        
    }

    componentWillReceiveProps(nextProps) {
        // Handle getTenantCurrentResidential service response
        if(nextProps.tenantPreResidentInfoResponse != undefined && nextProps.tenantPreResidentInfoResponse != ''){

            this.setState({isScreenLoading:false});            

            if(nextProps.tenantPreResidentInfoResponse.headerResponse.status == 200){  
                if(nextProps.tenantPreResidentInfoResponse.data.Content != null){
                    this.setState({preAddressInformation :  nextProps.tenantPreResidentInfoResponse.data.Content});
                    this.fillUserInfo(nextProps.tenantPreResidentInfoResponse.data.Content);
                }
                else{
                    if(nextProps.tenantPreResidentInfoResponse.data.ReturnStatus[0]){
                        alert(nextProps.tenantPreResidentInfoResponse.data.ReturnStatus[0]);
                    }
                }

                // else{
                //     alert(nextProps.tenantPreResidentInfoResponse.data.ReturnMessage[0]);
                // }                                
            }
            else if(nextProps.tenantPreResidentInfoResponse.headerResponse.status == 400){
                alert(nextProps.tenantPreResidentInfoResponse.data.error_description);
            }
            else if(nextProps.tenantPreResidentInfoResponse.headerResponse.status == 500){
                alert('Internal Server Error');
            }
        }

        // Handle addUpdateTenantPreviousResidential service response
        if(nextProps.updateTenantPreResidentInfoResponse != undefined && nextProps.updateTenantPreResidentInfoResponse != ''){

            this.setState({isScreenLoading:false});            

            if(nextProps.updateTenantPreResidentInfoResponse.headerResponse.status == 200){  
                if(nextProps.updateTenantPreResidentInfoResponse.data.Content != null){
                    
                    if(this.state.showComponent == 1){
                        if(propertyType == 0){
                            this.setState({showComponent:2});
                        }
                        else{
                            this.props.refreshRentalResumeMenu(1); 
                            Actions.popTo('RentalResumeMenu');    
                        }
                    }
                    else{
                        this.props.refreshRentalResumeMenu(1); 
                        Actions.popTo('RentalResumeMenu');
                    }

                }else{
                    alert(nextProps.updateTenantPreResidentInfoResponse.data.ReturnMessage[0]);
                }                                
            }
            else if(nextProps.updateTenantPreResidentInfoResponse.headerResponse.status == 400){
                alert(nextProps.updateTenantPreResidentInfoResponse.data.error_description);
            }
            else if(nextProps.updateTenantPreResidentInfoResponse.headerResponse.status == 500){
                alert('Internal Server Error');
            }
        }
    }

    componentDidUpdate() { 
        if(this.props.tenantPreResidentInfoResponse != undefined && this.props.tenantPreResidentInfoResponse != ''){  
            this.props.clearGetTenantPreviousResidentialResponse();
        }

        if(this.props.updateTenantPreResidentInfoResponse != undefined && this.props.updateTenantPreResidentInfoResponse != ''){  
            this.props.clearAddUpdateTenantPreviousResidentialResponse();               
        }
    }

    

    componentWillUnmount() {        
        
        this.setState({
            residentialAddress: '',
            suburb: '',
            postalCode: '',
            reasonLeavingAddress: '',
            dateMovedIn: '',
            dateMovedOut: '',            
            livingType: 0,
            landlordName: '',
            landlordContact: '',
            landlordAddress: '',
            landlordEmail: '',
            bondRefund: 0,
            weeklyRent: '',
            showLandLordInfo:0,
            showOtherDetailScreen:0
        });        
    }

    callGetTenantPreviousResidentialWebService(userID) {
        /***************** Call getTenantCurrentResidential WebService ****************/            
            this.setState({isScreenLoading:true}); 
            var postData = {
                UserId: userID
            }                    
            this.props.getTenantPreviousResidential(postData);            
        /*************************************************************************/
    }

    fillUserInfo(userInfo){ 

        if(userInfo.LivingArrangement=='rented'){
            propertyType = 0;
            this.setState({showLandLordInfo:1, showOtherDetailScreen:0});
        }
        else if(userInfo.LivingArrangement=='owned'){
            propertyType = 1;
            this.setState({showLandLordInfo:0, showOtherDetailScreen:0});
        }
        else if(userInfo.LivingArrangement=='other'){
            propertyType = 2;
            this.setState({showLandLordInfo:0, showOtherDetailScreen:1});               
        } 
        else{
            propertyType = 1;
            this.setState({showLandLordInfo:0, showOtherDetailScreen:0});   
        }

        if(userInfo.MovedInYears == 0){
            this.setState({yearInSelected: ''});
        }  
        else{
            this.setState({yearInSelected: userInfo.MovedInYears});
        }

        if(userInfo.MovedOutYears == 0){
            this.setState({yearOutSelected: ''});
        }  
        else{
            this.setState({yearOutSelected: userInfo.MovedOutYears});
        }

        if(userInfo.MovesInMonths == 0){
            this.setState({monthInSelected: ''});
            monthInIndex = 0;
        }  
        else{
            this.setState({ monthInSelected: monthsIn[userInfo.MovesInMonths].value });
            monthInIndex = userInfo.MovesInMonths;
        } 

        if(userInfo.MovesOutMonths == 0){
            this.setState({monthOutSelected: ''});
            monthOutIndex = 0;
        }  
        else{
            this.setState({ monthOutSelected: monthsOut[userInfo.MovesOutMonths].value });
            monthOutIndex = userInfo.MovesOutMonths;
        }        

        this.setState({            
            residentialAddress: userInfo.Address?userInfo.Address:'',
            postalCode: userInfo.PostalCode?userInfo.PostalCode:'',
            reasonLeavingAddress: userInfo.LeavingReason?userInfo.LeavingReason:'',
            livingType: userInfo.LivingTypeId?(userInfo.LivingTypeId-1):0,
            landlordName: userInfo.LandlordName?userInfo.LandlordName:'',
            landlordContact: userInfo.LandlordPhoneNo?userInfo.LandlordPhoneNo:'',
            landlordAddress: userInfo.LandlordAddress?userInfo.LandlordAddress:'',
            landlordEmail: userInfo.LandlordAddress?userInfo.LandlordAddress:'',
            bondRefund: userInfo.BondRefund?0:1,
            bondRefundReason: userInfo.BondReason?userInfo.BondReason:'',
            weeklyRent: userInfo.WeeklyRent?userInfo.WeeklyRent.toString():'',

            otherDetails: userInfo.OtherDetails?userInfo.OtherDetails:'',
        });

        // monthInSelected: userInfo.MovesInMonths?monthsIn[userInfo.MovesInMonths].value:'',
        //     yearInSelected: userInfo.MovedInYears?userInfo.MovedInYears:'',

        //     monthOutSelected: userInfo.MovesOutMonths?monthsOut[userInfo.MovesOutMonths].value:'',
        //     yearOutSelected: userInfo.MovedOutYears?userInfo.MovedOutYears:'',
    } 

    updatePreResidentialAddressInfo() {

        var errors = [];  

        var checkResidentialAddress = this.state.residentialAddress.replace(/\s/g,"");
        var checkPostalCode = this.state.postalCode.replace(/\s/g,"");
        var checkReasonLeavingAddress = this.state.reasonLeavingAddress.replace(/\s/g,"");
        var checkLandlordName = this.state.landlordName.replace(/\s/g,"");
        var checkLandlordContact = this.state.landlordContact.replace(/\s/g,"");
        var checkLandlordAddress = this.state.landlordAddress.replace(/\s/g,"");
        var checkWeeklyRent = this.state.weeklyRent.replace(/\s/g,"");

        if(checkResidentialAddress.length == 0){
            this.setState({residentialAddressError:Strings.ERROR_EMPTY_ADDRESS})
            errors.push('residentialAddressError');
        }else{
            this.setState({residentialAddressError:''})
        }

        
        if(checkReasonLeavingAddress.length == 0){
            this.setState({reasonLeavingAddressError:Strings.ERROR_EMPTY_LEAVING_REASON})
            errors.push('reasonLeavingAddressError');
        }else{
            this.setState({reasonLeavingAddressError:''})
        }

        if(this.state.showLandLordInfo == 1){

            if(checkLandlordName.length == 0){
                this.setState({landlordNameError:Strings.ERROR_EMPTY_LANDLORD_NAME})
                errors.push('landlordNameError');
            }else{
                this.setState({landlordNameError:''})
            }

            if(checkLandlordContact.length == 0){
                this.setState({landlordContactError:Strings.ERROR_EMPTY_LANDLORD_CONTACT})
                errors.push('landlordContactError');
            }else{
                this.setState({landlordContactError:''})
            }

            if(checkLandlordAddress.length == 0){
                this.setState({landlordAddressError:Strings.ERROR_EMPTY_ADDRESS})
                errors.push('landlordAddressError');
            }else{
                this.setState({landlordAddressError:''})
            }

            if(checkWeeklyRent.length == 0){
                this.setState({weeklyRentError:Strings.ERROR_EMPTY_WEEKLY_RENT})
                errors.push('weeklyRentError');
            }else{
                this.setState({weeklyRentError:''})
            } 

        }

        

                    

        if(errors.length > 0){
            return;
        }
        else{            

            var postData = {
                UserId: this.state.loggedInUserData.ID,                                
                Address: this.state.residentialAddress,                
                MovesInMonths: monthInIndex,
                MovesOutMonths: monthOutIndex,
            }

            if(this.state.livingType == 0){                
                postData.LeavingReason = this.state.reasonLeavingAddress;
                postData.LivingTypeId = this.state.livingType;
                postData.LandlordName = this.state.landlordName;
                postData.LandlordAddress = this.state.landlordAddress;
                postData.LandlordPhoneNo = this.state.landlordContact;
                postData.WeeklyRent = this.state.weeklyRent;
                postData.BondRefund = (this.state.bondRefund==0)?1:0;
                postData.BondReason = this.state.bondRefundReason;
            }
            else if(this.state.livingType == 2){
                postData.OtherDetails = this.state.otherDetails;
            }

            /********* Call addUpdateTenantPreviousResidential WebService *********/            
                this.setState({isScreenLoading:true});                                 
                this.props.addUpdateTenantPreviousResidential(postData);            
            /*********************************************************************/

        }        

    }     

    onResidentialAddressChange(text) {
        this.setState({residentialAddress:text, residentialAddressError:''});
    }

    onYearInChange(value, index, data) {        
        this.setState({yearInSelected:value});
    }

    onMonthInChange(value, index, data) {        
        this.setState({monthInSelected:value});
        monthInIndex = index;
    }

    onYearOutChange(value, index, data) {        
        this.setState({yearOutSelected:value});
    }

    onMonthOutChange(value, index, data) {        
        this.setState({monthOutSelected:value});
        monthOutIndex = index;
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

    onDateMovedInChange(text) {
        this.setState({ dateMovedIn: text, dateMovedInError:'' });
    }

    onDateMovedOutChange(text) {
        this.setState({ dateMovedOut: text, dateMovedOutError:'' });
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

    onBondRefundReasonChange(text) {
        this.setState({bondRefundReason:text});
    }

    onOtherDetailsChange(text) {
        this.setState({otherDetails:text});
    }

    isPropertyRentedClicked(value){        
        
        if(value==0){
            propertyType = 0;
            this.setState({showLandLordInfo:1, showOtherDetailScreen:0});
        }
        else if(value==2){
            propertyType = 1;
            this.setState({showLandLordInfo:0, showOtherDetailScreen:1});
        }
        else{
            propertyType = 2;
            this.setState({showLandLordInfo:0, showOtherDetailScreen:0});   
        }
    }

    isBondRefundSelected(value){
        // if(value==0){
            
        // }
        // else{
            
        // }

        this.setState({bondRefund:value});
    }

    onSaveAndExitClicked() {
        this.updatePreResidentialAddressInfo();        
    }

    onNextClicked() {
        Actions.EmploymentHistoryScreen();
    }

    onBackClicked(componentID) {
        this.setState({showComponent:componentID});
    }

    onSkipClicked() {
        Actions.popTo('RentalResumeMenu');
    }

    onFrontClicked(componentID) {
        //this.setState({showComponent:componentID});

        var errors = [];  

        var checkResidentialAddress = this.state.residentialAddress.replace(/\s/g,"");
        var checkReasonLeavingAddress = this.state.reasonLeavingAddress.replace(/\s/g,"");

        if(checkResidentialAddress.length == 0){
            this.setState({residentialAddressError:Strings.ERROR_EMPTY_ADDRESS})
            errors.push('residentialAddressError');
        }else{
            this.setState({residentialAddressError:''})
        }

        if(checkReasonLeavingAddress.length == 0){
            this.setState({reasonLeavingAddressError:Strings.ERROR_EMPTY_LEAVING_REASON})
            errors.push('reasonLeavingAddressError');
        }else{
            this.setState({reasonLeavingAddressError:''})
        }
        
        if(errors.length > 0){
            return;
        }
        else{            

            var postData = {
                UserId: this.state.loggedInUserData.ID,                                
                Address: this.state.residentialAddress,
                MovesInMonths: monthInIndex,
                MovedInYears: this.state.yearInSelected,
                MovesOutMonths: monthOutIndex,
                MovedOutYears: this.state.yearOutSelected,
                LeavingReason: this.state.reasonLeavingAddress,
            }

            if(propertyType == 0){
                postData.LivingArrangement = 'rented'
            }
            else if(propertyType == 1){
                postData.LivingArrangement = 'owned'
            }
            else if(propertyType == 2){
                postData.LivingArrangement = 'other'
            }
            /********* Call addUpdateTenantPreviousResidential WebService *********/            
                this.setState({isScreenLoading:true});                                 
                this.props.addUpdateTenantPreviousResidential(postData);            
            /*********************************************************************/

        }   

    }

	render(){        

    	return(
    		<View style={styles.container}> 
                                          
                <KeyboardAwareScrollView contentContainerStyle={{paddingBottom:60}} showsVerticalScrollIndicator={false}>                               
                    
                    {(this.state.showComponent == 1)?
                    <View style={{borderWidth:1, borderColor:Colors.DARK_GRAY_COLOR, width:window.width*0.95, marginTop:10, alignItems:'center'}}>
                       
                        <Text style={{fontSize:16, fontWeight:'500', margin:10, color:Colors.APP_THEME_RED_COLOR}}>
                            {Strings.PREVIOUS_RESIDENTIAL_ADDRESS}
                        </Text>
                        <View style={{width:window.width*0.8}}>                             
                            <MaterialTextInput  label={'What was your previous address?'}
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
                                                maxLength={50}
                                                onChangeText={this.onResidentialAddressChange.bind(this)}
                                                value={this.state.residentialAddress}
                            />
                        </View>
                        {(this.state.residentialAddressError == '')?null:
                            <Text style={CommonStyles.errorText}>{this.state.residentialAddressError}</Text>                                
                        }

                        <View style={{width:window.width*0.8, flexDirection:'row', justifyContent:'space-between'}}>                            
                            <Dropdown
                                containerStyle={{width:window.width*0.45}}
                                label={'Month (Moved In)'}
                                data={monthsIn}
                                onChangeText={this.onMonthInChange.bind(this)}
                                value={this.state.monthInSelected}
                            />
                            <Dropdown
                                containerStyle={{width:window.width*0.25}}
                                label={'Year (Moved In)'}
                                data={yearsIn}
                                onChangeText={this.onYearInChange.bind(this)}
                                value={this.state.yearInSelected}
                            />
                        </View>


                        <View style={{width:window.width*0.8, flexDirection:'row', justifyContent:'space-between'}}>                            
                            <Dropdown
                                containerStyle={{width:window.width*0.45}}
                                label={'Month (Moved Out)'}
                                data={monthsOut}
                                onChangeText={this.onMonthOutChange.bind(this)}
                                value={this.state.monthOutSelected}
                            />
                            <Dropdown
                                containerStyle={{width:window.width*0.25}}
                                label={'Year (Moved Out)'}
                                data={yearsOut}
                                onChangeText={this.onYearOutChange.bind(this)}
                                value={this.state.yearOutSelected}
                            />
                        </View>

                        

                        <View style={{width:window.width*0.8}}>                             
                            <MaterialTextInput  label={Strings.WHY_DID_YOU_LEAVE_THIS_ADDRESS}
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
                                                maxLength={250}
                                                multiline={true}
                                                onChangeText={this.onReasonLeavingAddressChange.bind(this)}
                                                value={this.state.reasonLeavingAddress}
                            />
                        </View>
                        {(this.state.reasonLeavingAddressError == '')?null:
                            <Text style={CommonStyles.errorText}>{this.state.reasonLeavingAddressError}</Text>                                
                        }                        

                        

                        <View style={{width:window.width*0.8}}>
                            <Text style={{fontWeight:'500', marginTop:40}}>{Strings.IS_THE_PROPERTY_AT_THIS_ADDRESS}</Text>
                        </View>

                        {(propertyType == -1)?
                            null
                            :
                            <View style={{marginTop:15,marginLeft:10}}>
                                <RadioForm
                                    radio_props={radio_props}
                                    initial={propertyType}
                                    formHorizontal={true}
                                    labelHorizontal={true}
                                    buttonColor={'red'}
                                    buttonSize={10}
                                    buttonOuterSize={20}                                                        
                                    onPress={this.isPropertyRentedClicked.bind(this)}
                                />
                            </View>
                        }

                        {this.state.showOtherDetailScreen?
                            <View>
                                
                                <View style={{width:window.width*0.8}}>                                    
                                    <MaterialTextInput  label={Strings.PLEASE_PROVIDE_DETAILS}
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
                                                        onChangeText={this.onOtherDetailsChange.bind(this)}
                                                        value={this.state.otherDetails}
                                    />
                                </View>

                            </View>
                            :null
                        }

                        {this.state.showLandLordInfo?                                                    
                            <View style={{width:window.width*0.8, alignItems:'center', margin:20}}>                            

                                <TouchableOpacity 
                                    onPress={() => this.onFrontClicked(2)}
                                    style={{backgroundColor:Colors.APP_THEME_RED_COLOR,height:40,width:70,alignItems:'center',justifyContent:'center'}}
                                > 
                                        <Image
                                            style={{width:20, height:20}}
                                            source={rightArrowImage}
                                        ></Image>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    onPress={() => this.onSkipClicked()}
                                    style={{marginTop:10, height:40,width:70,alignItems:'center',justifyContent:'center'}}
                                > 
                                        <Text>Skip</Text>
                                </TouchableOpacity>

                            </View>
                            :
                            <View style={{width:window.width*0.8, alignItems:'center', margin:50}}>                            

                                <TouchableOpacity 
                                    onPress={() => this.onSaveAndExitClicked()}
                                    style={{backgroundColor:Colors.APP_THEME_RED_COLOR,height:40,width:window.width*0.35,alignItems:'center',justifyContent:'center'}}
                                > 
                                        <Text style={{color:'#ffffff'}}>Save</Text>
                                </TouchableOpacity>

                            </View>
                        }
                    </View>
                        :null
                    }


                    
                        {(this.state.showComponent == 2)?
                            <View style={{borderWidth:1, borderColor:Colors.DARK_GRAY_COLOR, width:window.width*0.95, marginTop:10, alignItems:'center'}}>

                                
                                <Text style={{fontSize:16, fontWeight:'500', margin:10, color:Colors.APP_THEME_RED_COLOR}}>
                                    {Strings.LANDLORD_DETAILS}
                                </Text>
                                <View style={{width:window.width*0.8}}>                                   
                                    <MaterialTextInput  label={Strings.LANDLORD_NAME}
                                                        labelColor={Colors.BLACK}
                                                        activeColor={Colors.BLACK}
                                                        color={Colors.BLACK}
                                                        fontSize={14}
                                                        marginTop={10}                                                    
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
                                                        maxLength={50}
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
                                                        maxLength={50}
                                                        onChangeText={this.onLandlordEmailChange.bind(this)}
                                                        value={this.state.landlordEmail}
                                    />
                                </View>
                                {(this.state.landlordEmailError == '')?null:
                                    <Text style={CommonStyles.errorText}>{this.state.landlordEmailError}</Text>                                
                                }


                                <View style={{width:window.width*0.8}}>                                    
                                    <MaterialTextInput  label={Strings.WEEKLY_RENT}
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
                                                        maxLength={6}
                                                        onChangeText={this.onWeeklyRentChange.bind(this)}
                                                        value={this.state.weeklyRent}
                                    />
                                </View>
                                {(this.state.weeklyRentError == '')?null:
                                    <Text style={CommonStyles.errorText}>{this.state.weeklyRentError}</Text>                                
                                }

                                <Text style={{fontWeight:'500', marginTop:40, color:Colors.TEXT_INPUT_LABEL_COLOR }}>{'Do you expect the bond to be refunded?'}</Text>
                                <View style={{marginTop:15,marginLeft:10}}>
                                    <RadioForm
                                        radio_props={bondRefund_radio_props}
                                        initial={this.state.bondRefund}
                                        formHorizontal={true}
                                        labelHorizontal={true}
                                        buttonColor={'red'}
                                        buttonSize={10}
                                        buttonOuterSize={20}                                                        
                                        onPress={this.isBondRefundSelected.bind(this)}
                                    />
                                </View>


                                {this.state.bondRefund?
                                    <View style={{width:window.width*0.8}}>                                    
                                        <MaterialTextInput  label={"Reason"}
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
                                                            maxLength={250}
                                                            onChangeText={this.onBondRefundReasonChange.bind(this)}
                                                            value={this.state.bondRefundReason}
                                        />
                                    </View>
                                    :null
                                }

                                

                                {/*<View style={{marginTop:40}}>
                                                                     <View style={{flexDirection:'row' ,justifyContent:'space-between'}}>
                                                                        <TouchableOpacity 
                                                                            onPress={() => this.onSaveAndExitClicked()}
                                                                            style={{backgroundColor:'#333333',height:window.width*0.25/2,width:window.width*0.35,alignItems:'center',justifyContent:'center'}}
                                                                        >
                                                                            <Text style={{color:'#ffffff'}}>SAVE & EXIT</Text>
                                                                        </TouchableOpacity>
                                
                                                                        <TouchableOpacity 
                                                                            onPress={() => this.onNextClicked()}
                                                                            style={{backgroundColor:Colors.APP_THEME_RED_COLOR,height:window.width*0.25/2,width:window.width*0.35,alignItems:'center',justifyContent:'center'}}
                                                                        >
                                                                            <Text style={{color:'#ffffff'}}>NEXT</Text>
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                </View>*/}

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

const mapStateToProps = ({ previousResidentialAddressReducer }) => {

  const {
    tenantPreResidentInfoResponse,
    updateTenantPreResidentInfoResponse
  } = previousResidentialAddressReducer;
  
  return {
    tenantPreResidentInfoResponse: tenantPreResidentInfoResponse,
    updateTenantPreResidentInfoResponse: updateTenantPreResidentInfoResponse,
  }
}

export default connect(mapStateToProps,{
    getTenantPreviousResidential,
    addUpdateTenantPreviousResidential,
    clearGetTenantPreviousResidentialResponse,
    clearAddUpdateTenantPreviousResidentialResponse,
    refreshRentalResumeMenu
})(PreviousResidentialAddressScreen);
