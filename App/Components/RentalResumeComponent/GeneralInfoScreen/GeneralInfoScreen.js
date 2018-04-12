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
    clearGetTenantDetailsResponse,
    clearUpdateTenantDetailsResponse,
    clearGetStatesListResponse,
    clearGetCountryListResponse    
} from './GeneralInfoAction';

import {    
    getStatesList,
    getCountryList,
    getTenantDetails,
    updateTenantDetails
} from "../../../Action/ActionCreators";

import {        
    refreshRentalResumeMenu
} from '../RentalResumeMenu/RentalResumeMenuAction';

import{ Actions}    from 'react-native-router-flux';

import Colors       from '../../../Constants/Colors';
import Strings      from '../../../Constants/Strings';
import styles       from './GeneralInfoStyle';
import CommonStyles from '../../../CommonStyle/CommonStyle';
import {validateEmail, validateMobileNumber} from '../../../Constants/CommonFunctions';

import TextField from 'react-native-material-textfield';
import MaterialTextInput from 'react-native-material-textinput';
import { Dropdown } from 'react-native-material-dropdown';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ActionSheet from 'react-native-actionsheet';
import * as Progress from 'react-native-progress';
import Moment from 'moment';

import appLogoImage from '../../../Assets/logo.png';
import checkImage from '../../../Assets/check_selected.png';
import uncheckImage from '../../../Assets/check.png';
import defualtUserProfile from '../../../Assets/userAvtar.png';
import calendarImage from '../../../Assets/calendar.png';
import callSmallImage from '../../../Assets/call_small.png';

import leftArrowImage from '../../../Assets/leftArrow.png';
import rightArrowImage from '../../../Assets/rightArrow.png';

const window = Dimensions.get('window');

const CANCEL_INDEX = 2
const DESTRUCTIVE_INDEX = 3
const actionOptions = ['Upload Photo', 'Take Photo', 'Cancel']

var radio_props = [
  {label: 'Male     ', value: 0 },
  {label: 'Female', value: 1 }
];

let data = [{
      value: 'Mr.',
    }, {
      value: 'Miss.',
    }, {
      value: 'Mrs.',
    }, {
      value: 'Other',
    }];


let licenseData = [{
      value: 'Do you have a Driving License',
    }, {
      value: 'Yes I have Driving License',
    }, {
      value: 'No I dont have Driving License',
    }];

let passportData = [{
      value: 'Do you have a Passport',
    }, {
      value: 'Yes I have Passport',
    }, {
      value: 'No I dont have Passport',
    }];

class GeneralInfoScreen extends Component{


    constructor() {

        super();
            this.state = {
                isScreenLoading: false,
                value:0,
                minDate: Moment().subtract(120,'y').format('DD-MM-YYYY'),
                maxDate: Moment().subtract(18,'y').format('DD-MM-YYYY'),
                minExpiryDate: Moment().format('DD-MM-YYYY'),
                maxExpiryDate: Moment().add(50,'y').format('DD-MM-YYYY'),
                dateOfBirth:'',
                haveDrivingLicense:'',
                havePassport:'',
                licenceExpiryDate:'',
                title:'',                
                surName:'',
                givenName:'',
                email:'',
                mobilePhone:'',
                workPhone:'',
                homePhone:'',
                driversLicenceNumber:'',
                driversLicenceState:'',
                passportNumber:'',
                passportCountry:'',

                loggedInUserData:'',
                generalInformation:'',

                titleError: '',
                surNameError: '',
                givenNameError: '',
                dateOfBirthError: '',
                emailError: '',
                mobilePhoneError: '',
                workPhoneError: '',
                homePhoneError: '',

                showDrivingDetail: false,
                showPassportDetail: false,
                haveDrivingLicenseError:'',
                havePassportError:'',
                driversLicenceNumberError:'',
                driversLicenceStateError:'',
                licenceExpiryDateError:'',
                passportNumberError:'',
                passportCountryError:'',

                showComponent : 1,

                stateList: [],
                countryList: [],
            };   
            this.handlePress = this.handlePress.bind(this)
    }
    
    componentWillMount() {            
        
            AsyncStorage.getItem("loggedInUserInfo").then((value) => {
                if(value) {                
                    var loggedInUserData = JSON.parse(value);                
                    this.setState({loggedInUserData: loggedInUserData});
                    this.callGetTenantDetailsWebService(loggedInUserData.ID)             
                }            
            }).done();
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {                                        
            this.props.getStatesList();
            this.props.getCountryList();
        });        
    }

    componentWillReceiveProps(nextProps) {
        // Handle getStatesList service response
        if(nextProps.stateListResponse != undefined && nextProps.stateListResponse != ''){

            this.setState({isScreenLoading:false});            

            if(nextProps.stateListResponse.headerResponse.status == 200){ 
                if(nextProps.stateListResponse.data.Content != null){
                    
                    var tempStateList = [];
                    nextProps.stateListResponse.data.Content.map((data, index)=>{                        
                        var stateValue = {
                            value: data.StateName,
                        };
                        tempStateList.push(stateValue);
                    })


                    this.setState({stateList :  tempStateList});                    
                }                        
            }
            else if(nextProps.stateListResponse.headerResponse.status == 400){
                alert(nextProps.stateListResponse.data.error_description);
            }
            else if(nextProps.stateListResponse.headerResponse.status == 500){
                alert('Internal Server Error');
            }
        }

        // Handle getCountryList service response
        if(nextProps.countryListResponse != undefined && nextProps.countryListResponse != ''){

            this.setState({isScreenLoading:false});            

            if(nextProps.countryListResponse.headerResponse.status == 200){ 
                if(nextProps.countryListResponse.data.Content != null){
                    
                    var tempCountryList = [];
                    nextProps.countryListResponse.data.Content.map((data, index)=>{                        
                        var stateValue = {
                            value: data.CountryName,
                        };
                        tempCountryList.push(stateValue);
                    })

                    this.setState({countryList :  tempCountryList});                    
                }                     
            }
            else if(nextProps.countryListResponse.headerResponse.status == 400){
                alert(nextProps.countryListResponse.data.error_description);
            }
            else if(nextProps.countryListResponse.headerResponse.status == 500){
                alert('Internal Server Error');
            }
        }

        // Handle getTenantDetails service response
        if(nextProps.tenantDetailResponse != undefined && nextProps.tenantDetailResponse != ''){

            this.setState({isScreenLoading:false});            

            if(nextProps.tenantDetailResponse.headerResponse.status == 200){ 
                if(nextProps.tenantDetailResponse.data.Content != null){
                    this.setState({generalInformation :  nextProps.tenantDetailResponse.data.Content});
                    this.fillUserInfo(nextProps.tenantDetailResponse.data.Content);
                }
                else{
                    alert(nextProps.tenantDetailResponse.data.ReturnMessage[0]);
                }                                 
            }
            else if(nextProps.tenantDetailResponse.headerResponse.status == 400){
                alert(nextProps.tenantDetailResponse.data.error_description);
            }
            else if(nextProps.tenantDetailResponse.headerResponse.status == 500){
                alert('Internal Server Error');
            }
        }

        // Handle updateTenantDetails service response
        if(nextProps.updateTenantDetailResponse != undefined && nextProps.updateTenantDetailResponse != ''){

            this.setState({isScreenLoading:false});            

            if(nextProps.updateTenantDetailResponse.headerResponse.status == 200){ 
                if(nextProps.updateTenantDetailResponse.data.IsSuccess){
                    // Actions.popTo('RentalResumeMenu');

                    
                    if(this.state.showComponent == 1){
                        this.setState({showComponent:2});    
                    }
                    else if(this.state.showComponent == 2){
                        this.setState({showComponent:3});    
                    }
                    else if(this.state.showComponent == 3){
                        if(this.state.showDrivingDetail){
                            this.props.refreshRentalResumeMenu(1);                            
                            Actions.popTo('RentalResumeMenu');
                        }
                        else{
                            this.setState({showComponent:4});
                        }                        
                    }
                    else{
                        this.props.refreshRentalResumeMenu(1);
                        // Actions.OtherInformationScreen();
                        Actions.popTo('RentalResumeMenu');
                    }                    
                }
                else{
                    alert(nextProps.updateTenantDetailResponse.data.ReturnMessage[0]);
                }                                 
            }
            else if(nextProps.updateTenantDetailResponse.headerResponse.status == 400){
                alert(nextProps.updateTenantDetailResponse.data.error_description);
            }
            else if(nextProps.updateTenantDetailResponse.headerResponse.status == 500){
                alert('Internal Server Error');
            }
        }
    }

    componentDidUpdate() { 
        if(this.props.stateListResponse != undefined && this.props.stateListResponse != ''){              
            this.props.clearGetStatesListResponse();        
        }

        if(this.props.countryListResponse != undefined && this.props.countryListResponse != ''){              
            this.props.clearGetCountryListResponse();        
        }

        if(this.props.tenantDetailResponse != undefined && this.props.tenantDetailResponse != ''){              
            this.props.clearGetTenantDetailsResponse();        
        }

        if(this.props.updateTenantDetailResponse != undefined && this.props.updateTenantDetailResponse != ''){              
            this.props.clearUpdateTenantDetailsResponse();        
        }
    }

    componentWillUnmount() {
        this.setState({surName:''});
        this.setState({givenName:''});
        this.setState({email:''});
        this.setState({mobilePhone:''});
        this.setState({workPhone:''});
        this.setState({homePhone:''});
        this.setState({driversLicenceNumber:''});
        this.setState({driversLicenceState:''});
        this.setState({passportNumber:''});
        this.setState({passportCountry:''});
    }

    callGetTenantDetailsWebService(userID) {
        /***************** Call getTenantDetails WebService ****************/            
            this.setState({isScreenLoading:true}); 
            var postData = {
                UserId: userID
            }                    
            this.props.getTenantDetails(postData);            
        /*************************************************************************/
    }

    fillUserInfo(userInfo){

        var date = ''
        if(userInfo.DOB){
            date = Moment(userInfo.DOB).format('DD-MM-YYYY');
        }        
        var birthDate = date?date:'';

        var licenceDate = '';
        if(userInfo.DrivingExpiryDate){
            licenceDate = Moment(userInfo.DrivingExpiryDate).format('DD-MM-YYYY');
        }
        
        var licenceExpDate = licenceDate?licenceDate:'';

        if(userInfo.DrivingLicenceNo != undefined && userInfo.DrivingLicenceNo != ''){        
            this.setState({showDrivingDetail:true, haveDrivingLicense:licenseData[1].value});
        }
        else if(userInfo.PassportNo != undefined && userInfo.PassportNo != ''){        
            this.setState({showPassportDetail:true, havePassport:passportData[1].value});
        }

        this.setState({
            title:userInfo.Title?userInfo.Title:'',
            email:userInfo.Email?userInfo.Email:'',
            surName:userInfo.LastName?userInfo.LastName:'',
            givenName:userInfo.FirstName?userInfo.FirstName:'',
            dateOfBirth:birthDate?birthDate:'',
            mobilePhone:userInfo.Mobile?userInfo.Mobile:'',
            workPhone:userInfo.WorkPhone?userInfo.WorkPhone:'',
            homePhone:userInfo.PhoneNumber?userInfo.PhoneNumber:'',
            
            driversLicenceNumber:userInfo.DrivingLicenceNo?userInfo.DrivingLicenceNo:'',
            driversLicenceState:userInfo.DrivingLicenceState?userInfo.DrivingLicenceState:'',
            licenceExpiryDate:licenceExpDate?licenceExpDate:'',
            
            passportNumber:userInfo.PassportNo?userInfo.PassportNo:'',
            passportCountry:userInfo.PassportCountry?userInfo.PassportCountry:'',
        });
    }

    updateGeneralInfo(componentID) {

        var errors = [];

        if(componentID == 4){
            if(this.state.showDrivingDetail){

                var checkDriversLicenceNumber = this.state.driversLicenceNumber.replace(/\s/g,"");
                var checkDriversLicenceState = this.state.driversLicenceState.replace(/\s/g,"");
                var checkLicenceExpiryDate = this.state.licenceExpiryDate.replace(/\s/g,"");

                if(checkDriversLicenceNumber.length == 0){
                    this.setState({driversLicenceNumberError:Strings.ERROR_DRIVER_LICENSE_NO})
                    errors.push('driversLicenceNumberError');
                }else{
                    this.setState({driversLicenceNumberError:''})
                }

                if(checkDriversLicenceState.length == 0){
                    this.setState({driversLicenceStateError:Strings.ERROR_DRIVER_LICENSE_STATE})
                    errors.push('driversLicenceStateError');
                }else{
                    this.setState({driversLicenceStateError:''})
                }

                if(checkLicenceExpiryDate.length == 0){
                    this.setState({licenceExpiryDateError:Strings.ERROR_DRIVER_LICENSE_EXP})
                    errors.push('licenceExpiryDateError');
                }else{
                    this.setState({licenceExpiryDateError:''})
                }

            }
        }
        
        if(componentID == 5){
            if(this.state.showPassportDetail){
                var checkPassportNumber = this.state.passportNumber.replace(/\s/g,"");
                var checkPassportCountry = this.state.passportCountry.replace(/\s/g,"");                

                if(checkPassportNumber.length == 0){
                    this.setState({passportNumberError:Strings.ERROR_PASSPORT_NO})
                    errors.push('passportNumberError');
                }else{
                    this.setState({passportNumberError:''})
                }

                if(checkPassportCountry.length == 0){
                    this.setState({passportCountryError:Strings.ERROR_PASSPORT_COUNTRY})
                    errors.push('passportCountryError');
                }else{
                    this.setState({passportCountryError:''})
                } 
            }
        }               

        if(errors.length > 0){
            return;
        }
        else{
            
            var dateOfBirthvalue = '';
            if(this.state.dateOfBirth.length > 0){
                var arrayDOB = this.state.dateOfBirth.split('-');            
                var dateOfBirthArray = [];
                dateOfBirthArray.push(arrayDOB[1]);
                dateOfBirthArray.push(arrayDOB[0]);
                dateOfBirthArray.push(arrayDOB[2]);
                dateOfBirthvalue = dateOfBirthArray.join('-');
            }

            var licenceExpiryvalue = '';
            if(this.state.licenceExpiryDate.length > 0){
                var arrayLicence = this.state.licenceExpiryDate.split('-');            
                var licenceExpiryArray = [];
                licenceExpiryArray.push(arrayLicence[1]);
                licenceExpiryArray.push(arrayLicence[0]);
                licenceExpiryArray.push(arrayLicence[2]);
                licenceExpiryvalue = licenceExpiryArray.join('-');
            }

            var postData = {
                UserId: this.state.loggedInUserData.ID,
                Title: this.state.title,
                Email: this.state.email,
                FirstName: this.state.givenName,
                LastName: this.state.surName,
                DOB: dateOfBirthvalue,
                PhotoPath: '',
                
                DrivingLicenceNo: this.state.driversLicenceNumber,
                DrivingLicenceState: this.state.driversLicenceState,
                DrivingExpiryDate: licenceExpiryvalue,
                
                PassportNo: this.state.passportNumber,
                PassportCountry: this.state.passportCountry,
                
                PhoneNumber: this.state.homePhone,
                Mobile: this.state.mobilePhone,
                WorkPhone: this.state.workPhone,            
            }

            /***************** Call updateTenantDetails WebService ***************/            
                this.setState({isScreenLoading:true});                                 
                this.props.updateTenantDetails(postData);            
            

        }        

    }

    onGeneralInfoClicked() {

    }

    onDrivingLicenseChange(value, index, data) {        
        this.setState({haveDrivingLicense:value, haveDrivingLicenseError:''});     
        if(index == 1) {
            this.setState({showDrivingDetail:true});
        }
        else{
            this.setState({showDrivingDetail:false, 
                    driversLicenceNumber:'', driversLicenceState:'', licenceExpiryDate:''});   
        }
    }

    onPassportChange(value, index, data) {        
        this.setState({havePassport:value, havePassportError:''});     
        if(index == 1) {
            this.setState({showPassportDetail:true});
        }
        else{
            this.setState({showPassportDetail:false});   
        }
    }

    onTitleChange(value, index, data) {        
        this.setState({title:value, titleError:''});        
    }

    onSurNameChange(text) {
        this.setState({surName:text, surNameError:''});
    }

    onGivenNameChange(text) {
        this.setState({givenName:text, givenNameError:''});
    }

    onDateOfBirthChange(text) {
        console.log("dateOfBirth>>> "+text);
        this.setState({ dateOfBirth: text, dateOfBirthError:'' });
    }    

    onEmailChange(text) {
        this.setState({email:text, emailError:''});
    }

    onMobilePhoneChange(text) {
        this.setState({mobilePhone:text, mobilePhoneError:''});
    }

    onWorkPhoneChange(text) {
        this.setState({workPhone:text, workPhoneError:''});
    }

    onHomePhoneChange(text) {
        this.setState({homePhone:text, homePhoneError:''});
    }

    onDriversLicenceNumberChange(text) {
        this.setState({driversLicenceNumber:text, driversLicenceNumberError:''});
    }

    // onDriversLicenceStateChange(text) {
    //     this.setState({driversLicenceState:text, driversLicenceStateError:''});
    // }

    onDriversLicenceStateChange(value, index, data) {        
        this.setState({driversLicenceState:value, driversLicenceStateError:''});             
    }

    onLicenceExpiryDateChange(text) {
        this.setState({ licenceExpiryDate: text, licenceExpiryDateError:''});
    }

    onPassportNumberChange(text) {
        this.setState({passportNumber:text, passportNumberError:''});
    }

    // onPassportCountryChange(text) {
    //     this.setState({passportCountry:text, passportCountryError:''});
    // } 

    onPassportCountryChange(value, index, data) {        
        this.setState({passportCountry:value, passportCountryError:''});             
    }   

    onSaveAndExitClicked(componentID) {
        this.updateGeneralInfo(componentID);        
    }

    onNextClicked() {
        Actions.OtherInformationScreen();
    }

    onBackClicked(componentID) {
        this.setState({showComponent:componentID});
    }

    onFrontClicked(componentID) {

        if(componentID == 2){
            var errors = [];

            var checkSurName = this.state.surName.replace(/\s/g,"");
            var checkGivenName = this.state.givenName.replace(/\s/g,"");
            var checkDateOfBirth = this.state.dateOfBirth.replace(/\s/g,"");                               

            if(checkSurName.length == 0){
                this.setState({surNameError:Strings.ERROR_EMPTY_SURNAME})
                errors.push('surNameError');
            }else{
                this.setState({surNameError:''})
            }

            if(checkGivenName.length == 0){
                this.setState({givenNameError:Strings.ERROR_EMPTY_GIVEN_NAME})
                errors.push('givenNameError');
            }else{
                this.setState({givenNameError:''})
            }

            if(checkDateOfBirth.length == 0){
                this.setState({dateOfBirthError:Strings.ERROR_EMPTY_DOB})
                errors.push('dateOfBirthError');
            }else{
                this.setState({dateOfBirthError:''})
            }

            if(errors.length > 0){
                return;
            }
            else{                
                this.updateGeneralInfo(componentID);       
            }
        }  

        if(componentID == 3){
            
            var errors = [];
            
            var checkMobilePhone = this.state.mobilePhone.replace(/\s/g,"");                      
            var checkEmail = this.state.email.replace(/\s/g,"");
                        
            if(checkMobilePhone.length == 0){
                this.setState({mobilePhoneError:Strings.ERROR_EMPTY_MOBILE_NO})
                errors.push('mobilePhoneError');
            }else{
                this.setState({mobilePhoneError:''})
            }

            if(checkEmail.length == 0){
                this.setState({emailError:Strings.ERROR_EMPTY_EMAIL})
                errors.push('emailError');
            }else{
                this.setState({emailError:''})
            }            

            if(!validateEmail(this.state.email)){
                            
                this.setState({emailError:Strings.ERROR_INVALID_EMAIL})
                errors.push('emailError');
            } 

            if(!validateMobileNumber(this.state.mobilePhone)){
                            
                this.setState({mobilePhoneError:Strings.ERROR_INVALID_MOBILE})
                errors.push('mobilePhoneError');
            }           

            if(errors.length > 0){
                return;
            }
            else{
                this.updateGeneralInfo(componentID);       
            }

        }    

        if(componentID == 4){

            var errors = [];

            if(this.state.showDrivingDetail){

                var checkDriversLicenceNumber = this.state.driversLicenceNumber.replace(/\s/g,"");
                var checkDriversLicenceState = this.state.driversLicenceState.replace(/\s/g,"");
                var checkLicenceExpiryDate = this.state.licenceExpiryDate.replace(/\s/g,"");

                if(checkDriversLicenceNumber.length == 0){
                    this.setState({driversLicenceNumberError:Strings.ERROR_DRIVER_LICENSE_NO})
                    errors.push('driversLicenceNumberError');
                }else{
                    this.setState({driversLicenceNumberError:''})
                }

                if(checkDriversLicenceState.length == 0){
                    this.setState({driversLicenceStateError:Strings.ERROR_DRIVER_LICENSE_STATE})
                    errors.push('driversLicenceStateError');
                }else{
                    this.setState({driversLicenceStateError:''})
                }

                if(checkLicenceExpiryDate.length == 0){
                    this.setState({licenceExpiryDateError:Strings.ERROR_DRIVER_LICENSE_EXP})
                    errors.push('licenceExpiryDateError');
                }else{
                    this.setState({licenceExpiryDateError:''})
                }

            }            

            if(errors.length > 0){
                return;
            }
            else{
                this.updateGeneralInfo(componentID);        
            }
        }  
        
    }

    showActionSheet() {
        this.ActionSheet.show();
    }

    handlePress(i) {
        if (i == 0) {
            //this.showImageLibrary();
        }
        else if (i == 1) {
            //this.showCamera();
        }
    }

	render(){
    	return(
    		<View style={styles.container}>

                <View style={{flex:1, alignItems:'center'}}>    
                    
                    <KeyboardAwareScrollView  contentContainerStyle={{paddingBottom:65}} showsVerticalScrollIndicator={false} >
                       
                    {(this.state.showComponent == 1)?
                    <View style={{borderWidth:1, borderColor:Colors.DARK_GRAY_COLOR, width:window.width*0.95, marginTop:10, alignItems:'center'}}>
                        
                        <Text style={{fontSize:16, fontWeight:'500', margin:10, color:Colors.APP_THEME_RED_COLOR}}>
                            Hey, come lets fill out some basic information first                        
                        </Text>                        

                        {/*<View style={styles.profileImageContainer}>
                                                    <TouchableOpacity 
                                                        onPress={() => this.showActionSheet()}
                                                        style={styles.userImageViewStyle}
                                                    >
                                                            <Image
                                                                    style={styles.userImageStyle}
                                                                    source={defualtUserProfile}
                                                            ></Image>
                                                    </TouchableOpacity>                        
                                                </View>*/}

                        <View style={{width:window.width*0.9, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                            
                            {/*<View>
                                <Dropdown
                                        containerStyle={{width:65, height:65}}
                                        label={Strings.TITLE}
                                        data={data}
                                        onChangeText={this.onTitleChange.bind(this)}
                                        value={this.state.title}
                                />
                                {(this.state.titleError == '')?null:
                                    <Text style={CommonStyles.errorText}>{this.state.titleError}</Text>                                
                                }
                            </View>*/}

                            <View style={{width:window.width*0.4}}>                                
                                <MaterialTextInput  label={Strings.GIVEN_NAME}
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
                                                    maxLength={20}
                                                    onChangeText={this.onGivenNameChange.bind(this)}
                                                    value={this.state.givenName}
                                />
                                {(this.state.givenNameError == '')?null:
                                    <Text style={CommonStyles.errorText}>{this.state.givenNameError}</Text>                                
                                }
                            </View>

                            
                            <View style={{width:window.width*0.4}}>
                                <MaterialTextInput  label={Strings.SURNAME}
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
                                                    maxLength={20}
                                                    onChangeText={this.onSurNameChange.bind(this)}
                                                    value={this.state.surName}
                                />
                                {(this.state.surNameError == '')?null:
                                    <Text style={CommonStyles.errorText}>{this.state.surNameError}</Text>                                
                                }
                            </View>
                        </View>

                        {/*<View style={{width:window.width*0.9, flexDirection:'row', alignItems:'center', marginTop:10}}>
                            <Text style={{fontSize:16, fontWeight:'500', marginTop:10, color:Colors.TEXT_INPUT_LABEL_COLOR}}>
                                Gender                        
                            </Text>
                            <View style={{marginTop:15,marginLeft:10}}>
                                 <RadioForm
                                  radio_props={radio_props}
                                  initial={0}
                                  formHorizontal={true}
                                  labelHorizontal={true}
                                  buttonColor={Colors.APP_THEME_RED_COLOR}
                                  buttonSize={10}
                                  buttonOuterSize={20}                          
                                  onPress={(value) => {this.setState({value:value})}}
                                />
                            </View>
                        </View>*/}

                       

                        <View style={{width:window.width*0.9, flexDirection:'row', alignItems:'center', borderBottomWidth:0.5, borderBottomColor:Colors.TEXT_INPUT_LABEL_COLOR, marginTop:30}}>                        
                            <DatePicker
                                style={{width: window.width*0.9}}
                                date={this.state.dateOfBirth}
                                mode="date"
                                placeholder={Strings.DATE_OF_BIRTH}
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
                                onDateChange={this.onDateOfBirthChange.bind(this)}
                            />                        
                        </View>
                        {(this.state.dateOfBirthError == '')?null:
                            <Text style={CommonStyles.errorText}>{this.state.dateOfBirthError}</Text>                                
                        } 

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

                        </View>

                    </View>
                    :null
                    }

                    {(this.state.showComponent == 2)?
                    <View style={{borderWidth:1, borderColor:Colors.DARK_GRAY_COLOR, width:window.width*0.95, marginTop:10, alignItems:'center'}}>

                        <Text style={{fontSize:16, fontWeight:'500', margin:10, color:Colors.APP_THEME_RED_COLOR}}>
                            Good going !!!                             
                        </Text>

                        <Text style={{fontSize:16, fontWeight:'500', color:Colors.APP_THEME_RED_COLOR}}>                        
                            Now please fill your contact information
                        </Text>

                        <View style={{width:window.width*0.8, flexDirection:'row', alignItems:'center'}}>
                            <View style={{borderBottomColor: Colors.BLACK, borderBottomWidth:0.5, width:38, height:52, marginTop:20, alignItems:'center', justifyContent:'center'}} >
                                <Image
                                    style={{width:20, height:20}}
                                    source={callSmallImage}
                                ></Image>
                            </View> 
                            <View style={{width:window.width*0.7}}>                           
                                <MaterialTextInput  label={Strings.MOBILE_PHONE_NUMBER}
                                                labelColor={Colors.BLACK}
                                                activeColor={Colors.BLACK}
                                                color={Colors.BLACK}
                                                fontSize={15}
                                                marginTop={30}
                                                labelActiveTop={-30}
                                                underlineColor={Colors.BLACK}
                                                underlineActiveColor={Colors.BLACK}
                                                underlineHeight={0.5}
                                                underlineActiveHeight={0.5}
                                                autoCapitalize='none'
                                                keyboardType='phone-pad'
                                                autoCorrect={false}
                                                underlineColorAndroid='transparent'
                                                returnKeyType='next'
                                                maxLength={10}
                                                onChangeText={this.onMobilePhoneChange.bind(this)}
                                                value={this.state.mobilePhone}
                                 />                        
                            </View>
                        </View>
                        {(this.state.mobilePhoneError == '')?null:
                            <Text style={CommonStyles.errorText}>{this.state.mobilePhoneError}</Text>                                
                        }

                        

                        <View style={{width:window.width*0.8, flexDirection:'row', alignItems:'center'}}>
                            <View style={{borderBottomColor: Colors.BLACK, borderBottomWidth:0.5, width:38, height:52, marginTop:20, alignItems:'center', justifyContent:'center'}} >
                                <Image
                                    style={{width:20, height:20}}
                                    source={callSmallImage}
                                ></Image>
                            </View> 
                            <View style={{width:window.width*0.7}}>                                                      
                                <MaterialTextInput  label={Strings.WORK_PHONE_NUMBER}
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
                                                keyboardType='phone-pad'
                                                autoCorrect={false}
                                                underlineColorAndroid='transparent'
                                                returnKeyType='next'
                                                maxLength={10}
                                                onChangeText={this.onWorkPhoneChange.bind(this)}
                                                value={this.state.workPhone}
                                />                        
                            </View>
                        </View>
                        {(this.state.workPhoneError == '')?null:
                            <Text style={CommonStyles.errorText}>{this.state.workPhoneError}</Text>                                
                        }

                        <View style={{width:window.width*0.8, flexDirection:'row', alignItems:'center'}}>
                            <View style={{borderBottomColor: Colors.BLACK, borderBottomWidth:0.5, width:38, height:52, marginTop:20, alignItems:'center', justifyContent:'center'}} >
                                <Image
                                    style={{width:20, height:20}}
                                    source={callSmallImage}
                                ></Image>
                            </View> 
                            <View style={{width:window.width*0.7}}>                                                      
                                <MaterialTextInput  label={Strings.HOME_PHONE_NUMBER}
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
                                                keyboardType='phone-pad'
                                                autoCorrect={false}
                                                underlineColorAndroid='transparent'
                                                returnKeyType='next'
                                                maxLength={10}
                                                onChangeText={this.onHomePhoneChange.bind(this)}
                                                value={this.state.homePhone}
                                />                       
                            </View>
                        </View>
                        {(this.state.homePhoneError == '')?null:
                            <Text style={CommonStyles.errorText}>{this.state.homePhoneError}</Text>                                
                        }

                        <View style={{width:window.width*0.8}}>                                                    
                            <MaterialTextInput  label={Strings.EMAIL_ADDRESS}
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
                                                keyboardType='email-address'
                                                autoCorrect={false}
                                                underlineColorAndroid='transparent'
                                                returnKeyType='next'
                                                onChangeText={this.onEmailChange.bind(this)}
                                                value={this.state.email}
                            />

                        </View>
                        {(this.state.emailError == '')?null:
                            <Text style={CommonStyles.errorText}>{this.state.emailError}</Text>                                
                        }

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
                                onPress={() => this.onFrontClicked(3)}
                                style={{backgroundColor:Colors.APP_THEME_RED_COLOR,height:40,width:70,alignItems:'center',justifyContent:'center'}}
                            > 
                                    <Image
                                        style={{width:20, height:20}}
                                        source={rightArrowImage}
                                    ></Image>
                            </TouchableOpacity>

                        </View> 

                        </View>
                        :null
                        }

                        {(this.state.showComponent == 3)?
                        <View style={{borderWidth:1, borderColor:Colors.DARK_GRAY_COLOR, width:window.width*0.95, marginTop:10, alignItems:'center'}}>

                            <Text style={{fontSize:16, fontWeight:'500', margin:10, color:Colors.APP_THEME_RED_COLOR}}>
                                {Strings.DRIVING_LICENCE_DETAILS}                        
                            </Text>                        

                            <View>
                                <Dropdown
                                        containerStyle={{width:window.width*0.8, height:65}}
                                        label={Strings.DRIVING_LICENCE_DETAILS}
                                        data={licenseData}
                                        onChangeText={this.onDrivingLicenseChange.bind(this)}
                                        value={this.state.haveDrivingLicense}
                                />
                                {(this.state.titleError == '')?null:
                                    <Text style={CommonStyles.errorText}>{this.state.titleError}</Text>                                
                                }
                            </View>

                            {this.state.showDrivingDetail?
                                <View style={{alignItems:'center'}}>
                                    <View style={{width:window.width*0.8}}>
                                                                    
                                        <MaterialTextInput  label={Strings.DRIVERS_LICENCE_NUMBER}
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
                                                            maxLength={20}
                                                            onChangeText={this.onDriversLicenceNumberChange.bind(this)}
                                                            value={this.state.driversLicenceNumber}
                                        />                        
                                    </View>
                                    {(this.state.driversLicenceNumberError == '')?null:
                                        <Text style={CommonStyles.errorText}>{this.state.driversLicenceNumberError}</Text>                                
                                    }

                                    

                                    <View>
                                        <Dropdown
                                                containerStyle={{width:window.width*0.8, height:65}}
                                                label={Strings.DRIVERS_LICENCE_STATE}
                                                data={this.state.stateList}
                                                onChangeText={this.onDriversLicenceStateChange.bind(this)}
                                                value={this.state.driversLicenceState}
                                        />                                        
                                        {(this.state.driversLicenceStateError == '')?null:
                                        <Text style={CommonStyles.errorText}>{this.state.driversLicenceStateError}</Text>                                
                                    }
                                    </View>
                                    

                                    <View style={{width:window.width*0.9, flexDirection:'row', alignItems:'center', borderBottomWidth:0.5, borderBottomColor:Colors.TEXT_INPUT_LABEL_COLOR, marginTop:30}}>                        
                                        <DatePicker
                                            style={{width: window.width*0.9}}
                                            date={this.state.licenceExpiryDate}
                                            mode="date"
                                            placeholder={Strings.DRIVERS_LICENCE_EXP_DATE}
                                            format="DD-MM-YYYY"
                                            minDate={this.state.minExpiryDate}
                                            maxDate={this.state.maxExpiryDate}
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
                                            onDateChange={this.onLicenceExpiryDateChange.bind(this)}
                                        />                        
                                    </View>
                                    {(this.state.licenceExpiryDateError == '')?null:
                                        <Text style={CommonStyles.errorText}>{this.state.licenceExpiryDateError}</Text>                                
                                    }
                                </View>
                                :null
                            }

                            <View style={{width:window.width*0.8, flexDirection:'row', justifyContent:'space-between', margin:20}}>

                                <TouchableOpacity 
                                    onPress={() => this.onBackClicked(2)}
                                    style={{backgroundColor:Colors.APP_THEME_RED_COLOR,height:40,width:70,alignItems:'center',justifyContent:'center'}}
                                > 
                                        <Image
                                            style={{width:20, height:20}}
                                            source={leftArrowImage}
                                        ></Image>
                                </TouchableOpacity>

                                {this.state.showDrivingDetail?
                                    <TouchableOpacity 
                                        onPress={() => this.onSaveAndExitClicked(4)}
                                        style={{backgroundColor:Colors.APP_THEME_RED_COLOR,height:40,width:window.width*0.35,alignItems:'center',justifyContent:'center'}}
                                    > 
                                            <Text style={{color:'#ffffff'}}>Save</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity 
                                        onPress={() => this.onFrontClicked(4)}
                                        style={{backgroundColor:Colors.APP_THEME_RED_COLOR,height:40,width:70,alignItems:'center',justifyContent:'center'}}
                                    > 
                                            <Image
                                                style={{width:20, height:20}}
                                                source={rightArrowImage}
                                            ></Image>
                                    </TouchableOpacity>                                    
                                }

                            </View>

                        </View>
                        :null
                        }

                        {(this.state.showComponent == 4)?
                        <View style={{borderWidth:1, borderColor:Colors.DARK_GRAY_COLOR, width:window.width*0.95, marginTop:10, alignItems:'center'}}>

                            <Text style={{fontSize:16, fontWeight:'500', margin:10, color:Colors.APP_THEME_RED_COLOR}}>
                                {Strings.PASSPORT_DETAILS}                        
                            </Text>                          

                            <View>
                                <Dropdown
                                        containerStyle={{width:window.width*0.8, height:65}}
                                        label={Strings.PASSPORT_DETAILS}
                                        data={passportData}
                                        onChangeText={this.onPassportChange.bind(this)}
                                        value={this.state.havePassport}
                                />
                                {(this.state.titleError == '')?null:
                                    <Text style={CommonStyles.errorText}>{this.state.havePassportError}</Text>                                
                                }
                            </View>

                            {this.state.showPassportDetail?
                                <View>
                                    <View style={{width:window.width*0.8}}>
                                                                    
                                        <MaterialTextInput  label={Strings.PASSPORT_NUMBER}
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
                                                            maxLength={20}
                                                            onChangeText={this.onPassportNumberChange.bind(this)}
                                                            value={this.state.passportNumber}
                                        />                        
                                    </View>
                                    {(this.state.passportNumberError == '')?null:
                                        <Text style={CommonStyles.errorText}>{this.state.passportNumberError}</Text>                                
                                    }

                                    

                                    <View>
                                        <Dropdown
                                                containerStyle={{width:window.width*0.8, height:65}}
                                                label={Strings.PASSPORT_COUNTRY}
                                                data={this.state.countryList}
                                                onChangeText={this.onPassportCountryChange.bind(this)}
                                                value={this.state.passportCountry}
                                        />
                                        {(this.state.titleError == '')?null:
                                            <Text style={CommonStyles.errorText}>{this.state.havePassportError}</Text>                                
                                        }
                                    </View>

                                </View>
                                :null
                            }
                            
                            <View style={{width:window.width*0.8, flexDirection:'row', justifyContent:'space-between', margin:20}}>

                                <TouchableOpacity 
                                    onPress={() => this.onBackClicked(3)}
                                    style={{backgroundColor:Colors.APP_THEME_RED_COLOR,height:40,width:70,alignItems:'center',justifyContent:'center'}}
                                > 
                                        <Image
                                            style={{width:20, height:20}}
                                            source={leftArrowImage}
                                        ></Image>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    onPress={() => this.onSaveAndExitClicked(5)}
                                    style={{backgroundColor:Colors.APP_THEME_RED_COLOR,height:40,width:window.width*0.35,alignItems:'center',justifyContent:'center'}}
                                > 
                                        <Text style={{color:'#ffffff'}}>Save</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                        :null
                        }

                        {/*<View style={{flexDirection:'row' ,justifyContent:'space-between',marginTop:80}}>
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
                                                </View>*/}

                    </KeyboardAwareScrollView>
                    
                </View>
                {this.state.isScreenLoading?
                    <View style={styles.circles}>
                        <Progress.CircleSnail color={['#000000', '#000000', '#000000']} />
                    </View>
                    :null
                } 

                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    options={actionOptions}
                    cancelButtonIndex={CANCEL_INDEX}
                    destructiveButtonIndex={DESTRUCTIVE_INDEX}
                    onPress={this.handlePress}
                />
    		</View>
    	);
	}

}

const mapStateToProps = ({ generalInfoReducer }) => {

  const {
    tenantDetailResponse,
    updateTenantDetailResponse,
    stateListResponse,
    countryListResponse
  } = generalInfoReducer;
  
  return {
    tenantDetailResponse: tenantDetailResponse,
    updateTenantDetailResponse: updateTenantDetailResponse,
    stateListResponse: stateListResponse,
    countryListResponse: countryListResponse,
  }
}

export default connect(mapStateToProps,{    
    getStatesList,
    getCountryList,
    clearGetStatesListResponse,
    clearGetCountryListResponse,
    getTenantDetails,
    updateTenantDetails,
    clearGetTenantDetailsResponse,
    clearUpdateTenantDetailsResponse,
    refreshRentalResumeMenu
})(GeneralInfoScreen);
