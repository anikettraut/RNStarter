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
    clearGetTenantCurrentEmploymentResponse,
    clearAddUpdateTenantEmploymentResponse
} from './EmploymentHistoryAction';

import {    
    getTenantCurrentEmployment,
    addUpdateTenantEmployment,
} from "../../../Action/ActionCreators";

import {        
    refreshRentalResumeMenu
} from '../RentalResumeMenu/RentalResumeMenuAction';

import{ Actions}    from 'react-native-router-flux';

import Colors       from '../../../Constants/Colors';
import Strings      from '../../../Constants/Strings';
import styles       from './EmploymentHistoryStyle';
import CommonStyles from '../../../CommonStyle/CommonStyle';

import appLogoImage from '../../../Assets/logo.png';
import checkImage from '../../../Assets/check_selected.png';
import uncheckImage from '../../../Assets/check.png';
import callSmallImage from '../../../Assets/call_small.png';

import TextField from 'react-native-material-textfield';
import MaterialTextInput from 'react-native-material-textinput';
import { Dropdown } from 'react-native-material-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Progress from 'react-native-progress';

const window = Dimensions.get('window');
// let data = [{
//       value: 'Employed',
//     }, {
//       value: 'Self-employed',
//     }, {
//       value: 'Student',
//     }];

let data = [{
      value: 'I am currently employed',
    }, {
      value: 'I am a student',
    }, {
      value: 'I am currently self-employed',
    }];

let empTypeData = [{
      value: 'Full Time',
    }, {
      value: 'Casual',
    }, {
      value: 'Part Time',
    }];

// let years = [{value: '0'}, {value: '1'}, { value: '2'}, {value: '3'}, {value: '4'}, {value: '5'}, {value: '6'}, {value: '7'},
// {value: '8'}, {value: '9'}, {value: '10'}, {value: '11'}, {value: '12'}, {value: '13'}, {value: '14'}, {value: '15'},
// {value: '16'}, {value: '17'}, {value: '18'}, {value: '19'}, {value: '20'}, {value: '21'}, {value: '22'}, {value: '23'},
// {value: '24'}, {value: '25'}, {value: '26'}, {value: '27'}, {value: '28'}, {value: '29'}, {value: '30'}];

let years = [{value: '2018'}, {value: '2017'}, { value: '2016'}, {value: '2015'}, {value: '2014'}, {value: '2013'}, {value: '2012'}, {value: '2011'},
{value: '2010'}, {value: '2009'}, {value: '2008'}, {value: '2007'}, {value: '2006'}, {value: '2005'}, {value: '2004'}, {value: '2003'},
{value: '2002'}, {value: '2001'}, {value: '2000'}, {value: '1999'}, {value: '1998'}, {value: '1997'}, {value: '1996'}, {value: '1995'},
{value: '1994'}, {value: '1993'}, {value: '1992'}, {value: '1991'}, {value: '1990'}, {value: '1989'}, {value: '1988'}];

let months = [{value: 'January'}, { value: 'February'}, {value: 'March'}, {value: 'April'}, {value: 'May'}, {value: 'June'},
{value: 'July'},{value: 'August'}, {value: 'September'}, {value: 'October'}, {value: 'November'}, {value: 'December'}];


var monthIndex = 0;

class EmploymentHistoryScreen extends Component{


    constructor() {

        super();
            this.state = {
                isScreenLoading: false,

                currentEmpStatusIndex: '',
                currentEmpStatus:'',
                empType:'',
                yearSelected:'',
                monthSelected:'',

                occupation:'',
                empName:'',
                empAddress:'',
                postalCode:'',
                contactName:'',
                phoneNumber:'',
                weeklyIncome:'',
                otherIncome:'',
                annualIncome:'',

                loggedInUserData:'',
                empHistoryInformation:'',

                currentEmpStatusError:'',
                occupationError:'',
                empTypeError:'',
                empNameError:'',
                empAddressError:'',
                postalCodeError:'',
            };   
            
    }
    
    componentWillMount() {
            
            AsyncStorage.getItem("loggedInUserInfo").then((value) => {
                if(value) {                
                    var loggedInUserData = JSON.parse(value);                
                    this.setState({loggedInUserData: loggedInUserData});
                    this.callGetTenantCurrentEmploymentWebService(loggedInUserData.ID)             
                }            
            }).done();
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {                                                    

        });        
    } 


    componentWillReceiveProps(nextProps) {
        // Handle getTenantCurrentEmployment service response
        if(nextProps.tenantCurrentEmpResponse != undefined && nextProps.tenantCurrentEmpResponse != ''){

            this.setState({isScreenLoading:false});            

            if(nextProps.tenantCurrentEmpResponse.headerResponse.status == 200){  
                if(nextProps.tenantCurrentEmpResponse.data.Content.Content != null){
                    this.setState({empHistoryInformation :  nextProps.tenantCurrentEmpResponse.data.Content.Content});
                    this.fillUserInfo(nextProps.tenantCurrentEmpResponse.data.Content.Content);
                }
                // else{
                //     alert(nextProps.tenantCurrentEmpResponse.data.ReturnMessage[0]);
                // }                                
            }
            else if(nextProps.tenantCurrentEmpResponse.headerResponse.status == 400){
                alert(nextProps.tenantCurrentEmpResponse.data.error_description);
            }
            else if(nextProps.tenantCurrentEmpResponse.headerResponse.status == 500){
                alert('Internal Server Error');
            }
        }

        // Handle addUpdateTenantEmployment service response
        if(nextProps.updateTenantCurrentEmpResponse != undefined && nextProps.updateTenantCurrentEmpResponse != ''){

            this.setState({isScreenLoading:false});            

            if(nextProps.updateTenantCurrentEmpResponse.headerResponse.status == 200){  
                if(nextProps.updateTenantCurrentEmpResponse.data.IsSuccess){
                    this.props.refreshRentalResumeMenu(1); 
                    //Actions.popTo('RentalResumeMenu');
                    Actions.PreviousEmploymentDetails();
                }else{
                    alert(nextProps.updateTenantCurrentEmpResponse.data.ReturnMessage[0]);
                }                                
            }
            else if(nextProps.updateTenantCurrentEmpResponse.headerResponse.status == 400){
                alert(nextProps.updateTenantCurrentEmpResponse.data.error_description);
            }
            else if(nextProps.updateTenantCurrentEmpResponse.headerResponse.status == 500){
                alert('Internal Server Error');
            }
        }
    }

    componentDidUpdate() { 
        if(this.props.updateTenantCurrentEmpResponse != undefined && this.props.updateTenantCurrentEmpResponse != ''){  
            this.props.clearGetTenantCurrentEmploymentResponse();
        }

        if(this.props.updateTenantCurrentEmpResponse != undefined && this.props.updateTenantCurrentEmpResponse != ''){  
            this.props.clearAddUpdateTenantEmploymentResponse();
        }
    }

    componentWillUnmount() {        
        
        this.setState({
                isScreenLoading: false,

                currentEmpStatus:'',
                empType:'',
                yearSelected:'',
                monthSelected:'',

                occupation:'',
                empName:'',
                empAddress:'',
                postalCode:'',
                contactName:'',
                phoneNumber:'',
                weeklyIncome:'',
                otherIncome:'',

                contactNumber:'',

                loggedInUserData:'',
                empHistoryInformation:'',
        });        
    }

    callGetTenantCurrentEmploymentWebService(userID) {
        /***************** Call getTenantCurrentEmployment WebService ****************/            
            this.setState({isScreenLoading:true}); 
            var postData = {
                UserId: userID,
                EmploymentStatus: 'current'
            }                    
            this.props.getTenantCurrentEmployment(postData);            
        /*************************************************************************/
    }

    fillUserInfo(userInfo){ 

        console.log("userInfo>>> "+JSON.stringify(userInfo));  
        
        if(userInfo.EmplomentStatus){
            if(userInfo.EmplomentStatus == 'Current'){
                this.setState({currentEmpStatus: 'I am currently employed'});
            }
            else if(userInfo.EmploymentCategory == 'student'){
                this.setState({currentEmpStatus: 'I am a student'});
            }
            else if(userInfo.EmploymentCategory == 'self'){
                this.setState({currentEmpStatus: 'I am currently self-employed'});
            }
        }


        if(userInfo.EmploymentCategory){
            if(userInfo.EmploymentCategory == '1'){
                this.setState({empType: 'Full Time'});
            }
            else if(userInfo.EmploymentCategory == '2'){
                this.setState({empType: 'Casual'});
            }
            else if(userInfo.EmploymentCategory == '3'){
                this.setState({empType: 'Part Time'});
            }
        }

        /*
            "$id": "5",
            "ID": 101,
            "UserId": 280,
            "EmploymentCategory": 1,
            "Occupation": "Information Tech",
            "StudentIdNumber": null,
            "EmploymentType": "Full Time",
            "EmplomentStatus": "Current",
            "EmployersName": "smartData Enterprises",
            "EmploymentAddress": "sez Mihan, Nagpur",
            "PostalCode": "441445",
            "RefereeName": "",
            "RefereeContactNo": "07875559552",
            "Years": 2016,
            "Months": 0,
            "AnnualIncome": 0,
            "OtherIncome": 0,
            "BusinessType": null,
            "ContactNumber": null,
            "IsDeleted": null
        */

        /*
        currentEmpStatus: userInfo.EmplomentStatus?userInfo.EmplomentStatus:'',
        occupation: userInfo.Occupation?userInfo.Occupation:'',
        empName: userInfo.EmployersName?userInfo.EmployersName:'',
        empAddress: userInfo.EmploymentAddress?userInfo.EmploymentAddress:'',
        postalCode: userInfo.PostalCode?userInfo.PostalCode:'',
        contactNumber: userInfo.ContactNumber?userInfo.ContactNumber:'',
        monthSelected: (userInfo.Months != 0)?months[userInfo.Months]:'',
        yearSelected: userInfo.Years?userInfo.Years:'',                
        phoneNumber: userInfo.RefereeContactNo?userInfo.RefereeContactNo:'',        
        annualIncome: userInfo.AnnualIncome?userInfo.AnnualIncome.toString():'',
        */

        // this.setState({ 
        //     currentEmpStatusIndex: userInfo.EmploymentCategory?userInfo.EmploymentCategory:'',
        //     empType: userInfo.EmploymentType?userInfo.EmploymentType:'',
        //     yearSelected: userInfo.Years?userInfo.Years:'',
        //     monthSelected: userInfo.Months?months[userInfo.Months - 1].value:'',
            
        //     contactNumber: userInfo.ContactNumber?userInfo.ContactNumber:'',
        //     annualIncome: userInfo.AnnualIncome?userInfo.AnnualIncome.toString():'',

        //     occupation: userInfo.Occupation?userInfo.Occupation:'',
        //     empName: userInfo.EmployersName?userInfo.EmployersName:'',
        //     empAddress: userInfo.EmploymentAddress?userInfo.EmploymentAddress:'',
        //     postalCode: userInfo.PostalCode?userInfo.PostalCode:'',
        //     contactName: userInfo.RefereeName?userInfo.RefereeName:'',
        //     phoneNumber: userInfo.RefereeContactNo?userInfo.RefereeContactNo:'',
        //     weeklyIncome: userInfo.WeeklyIncome?userInfo.WeeklyIncome.toString():'',
        //     otherIncome: userInfo.OtherIncome?userInfo.OtherIncome.toString():'',
        // });


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
            occupation: userInfo.Occupation?userInfo.Occupation:'',
            empName: userInfo.EmployersName?userInfo.EmployersName:'',
            empAddress: userInfo.EmploymentAddress?userInfo.EmploymentAddress:'',
            postalCode: userInfo.PostalCode?userInfo.PostalCode:'',
            contactNumber: userInfo.ContactNumber?userInfo.ContactNumber:'',            
            phoneNumber: userInfo.RefereeContactNo?userInfo.RefereeContactNo:'',        
            annualIncome: userInfo.AnnualIncome?userInfo.AnnualIncome.toString():'',
        });
    } 


    updateEmploymentHistoryInfo() {

        var errors = []; 

        var checkCurrentEmpStatus = this.state.currentEmpStatus.replace(/\s/g,"");
        var checkOccupation = this.state.occupation.replace(/\s/g,"");
        var checkEmpType = this.state.empType.replace(/\s/g,"");
        var checkEmpName = this.state.empName.replace(/\s/g,"");
        var checkEmpAddress = this.state.empAddress.replace(/\s/g,"");
        var checkPostalCode = this.state.postalCode.replace(/\s/g,"");                       

        if(checkCurrentEmpStatus.length == 0){
            this.setState({currentEmpStatusError:Strings.ERROR_EMPTY_EMP_CATEGORY})
            errors.push('currentEmpStatusError');
        }else{
            this.setState({currentEmpStatusError:''})
        }

        if(checkOccupation.length == 0){
            this.setState({occupationError:Strings.ERROR_EMPTY_OCCUPATION})
            errors.push('occupationError');
        }else{
            this.setState({occupationError:''})
        }

        if(checkEmpType.length == 0){
            this.setState({empTypeError:Strings.ERROR_EMPTY_EMP_CATEGORY})
            errors.push('empTypeError');
        }else{
            this.setState({empTypeError:''})
        }

        if(checkEmpName.length == 0){
            this.setState({empAddressError:Strings.ERROR_EMPTY_COMPANY_NAME})
            errors.push('empAddressError');
        }else{
            this.setState({empAddressError:''})
        }

        if(checkEmpAddress.length == 0){
            this.setState({empAddressError:Strings.ERROR_EMPTY_ADDRESS})
            errors.push('empAddressError');
        }else{
            this.setState({empAddressError:''})
        }

        if(checkPostalCode.length == 0){
            this.setState({postalCodeError:Strings.ERROR_EMPTY_POSTALCODE})
            errors.push('postalCodeError');
        }else{
            this.setState({postalCodeError:''})
        }

        if(errors.length > 0){
            return;
        }
        else{    

            var postData = {
                UserId: this.state.loggedInUserData.ID,                                
                
                EmploymentCategory: this.state.currentEmpStatusIndex,
                Occupation: this.state.occupation,                
                EmploymentType: this.state.empType,
                EmplomentStatus: 'Current',
                EmployersName: this.state.empName,
                EmploymentAddress: this.state.empAddress,
                PostalCode: this.state.postalCode,
                RefereeName: this.state.contactName,
                RefereeContactNo: this.state.phoneNumber,
                Years: this.state.yearSelected,                
                Months: monthIndex,
                WeeklyIncome: this.state.weeklyIncome,
                OtherIncome: this.state.otherIncome,
                AnnualIncome: this.state.annualIncome,
            }            

            /********* Call addUpdateTenantEmployment WebService *********/            
                this.setState({isScreenLoading:true});                                 
                this.props.addUpdateTenantEmployment(postData);            
            /*************************************************************/

        }        

    }        

    onCurrentEmpStatusChange(value, index, data) {         
        this.setState({currentEmpStatusIndex:index+1, currentEmpStatus:value, currentEmpStatusError:''});
    }

    onEmpTypeChange(value, index, data) {        
        this.setState({empType:value, empTypeError:''});
    }

    onYearChange(value, index, data) {        
        this.setState({yearSelected:value});
    }

    onMonthChange(value, index, data) {        
        this.setState({monthSelected:value});
        monthIndex = index;
    }
    
    onOccupationChange(text) {
        this.setState({occupation:text, occupationError:''});
    }    

    onEmpNameChange(text) {
        this.setState({empName:text, empNameError:''});
    }

    onEmpAddressChange(text) {
        this.setState({empAddress:text, empAddressError:''});
    }

    onPostalCodeChange(text) {
        this.setState({postalCode:text, postalCodeError:''});
    }

    onContactNameChange(text) {
        this.setState({contactName:text});
    }

    onContactNumberChange(text) {
        this.setState({contactNumber:text});
    }

    onPhoneNumberChange(text) {
        this.setState({phoneNumber:text});
    }

    onWeeklyIncomeChange(text) {
        this.setState({weeklyIncome:text});
    }

    onAnnualIncomeChange(text) {
        this.setState({annualIncome:text});
    }

    onOtherIncomeChange(text) {
        this.setState({otherIncome:text});
    }

    onSaveAndExitClicked() {
        this.updateEmploymentHistoryInfo();        
    }

    onNextClicked() {
        Actions.PreviousEmploymentDetails();
    }

	render(){

        console.log("this.state.currentEmpStatusIndex>>> "+this.state.currentEmpStatusIndex);

    	return(
    		<View style={styles.container}>                 
                <KeyboardAwareScrollView contentContainerStyle={{paddingBottom:60}} showsVerticalScrollIndicator={false}>   
                    <View style={{borderWidth:1, borderColor:Colors.DARK_GRAY_COLOR, width:window.width*0.95, marginTop:10, alignItems:'center'}}>
                        <Text style={{fontSize:16, fontWeight:'500', margin:10, color:Colors.APP_THEME_RED_COLOR}}>
                            {Strings.EMPLOYMENT_DETAILS}
                        </Text>                        

                        <View style={{justifyContent:'space-between'}}>                                                
                            <Dropdown
                                containerStyle={{width:window.width*0.9}}
                                label={Strings.YOUR_CURRENT_EMPLOYMENT_STATUS}
                                data={data}
                                onChangeText={this.onCurrentEmpStatusChange.bind(this)}
                                value={this.state.currentEmpStatus}
                            />                      
                        </View>
                        {(this.state.currentEmpStatusError == '')?null:
                            <Text style={CommonStyles.errorText}>{this.state.currentEmpStatusError}</Text>                                
                        }

                        <View style={{width:window.width*0.9}}>
                            <MaterialTextInput  label={Strings.OCCUPATION}
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
                                                onChangeText={this.onOccupationChange.bind(this)}
                                                value={this.state.occupation}
                            />
                            {(this.state.occupationError == '')?null:
                                <Text style={CommonStyles.errorText}>{this.state.occupationError}</Text>                                
                            }
                        </View>

                        <Dropdown
                            containerStyle={{width:window.width*0.9}}
                            label={'Nature of employment'}
                            data={empTypeData}
                            onChangeText={this.onEmpTypeChange.bind(this)}
                            value={this.state.empType}
                        />

                        
                        {(this.state.currentEmpStatusIndex != 2)?
                            <View>
                                <View style={{width:window.width*0.9}}>                                
                                    <MaterialTextInput  label={'Company name'}
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
                                                        onChangeText={this.onEmpNameChange.bind(this)}
                                                        value={this.state.empName}
                                    />
                                </View>
                                {(this.state.empNameError == '')?null:
                                    <Text style={CommonStyles.errorText}>{this.state.empNameError}</Text>                                
                                }

                                <View style={{width:window.width*0.9}}>
                                    <MaterialTextInput  label={'Company address'} 
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
                                                    onChangeText={this.onEmpAddressChange.bind(this)}
                                                    value={this.state.empAddress}
                                    />
                                </View>
                                {(this.state.empAddressError == '')?null:
                                    <Text style={CommonStyles.errorText}>{this.state.empAddressError}</Text>                                
                                }
                            </View>
                            :null
                        }


                        <View style={{width:window.width*0.9}}>
                            <MaterialTextInput  label={Strings.POSTAL_CODE} 
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
                                                maxLength={6}
                                                onChangeText={this.onPostalCodeChange.bind(this)}
                                                value={this.state.postalCode}
                            />
                            {(this.state.postalCodeError == '')?null:
                                <Text style={CommonStyles.errorText}>{this.state.postalCodeError}</Text>                                
                            }
                        </View>


                        <View style={{width:window.width*0.9, flexDirection:'row', alignItems:'center'}}>
                            <View style={{borderBottomColor: Colors.BLACK, borderBottomWidth:0.5, width:38, height:52, marginTop:20, alignItems:'center', justifyContent:'center'}} >
                                <Image
                                    style={{width:20, height:20}}
                                    source={callSmallImage}
                                ></Image>
                            </View> 
                            <View style={{width:window.width*0.8}}>                               
                                <MaterialTextInput  label={'Contact number(optional)'} 
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
                                                    onChangeText={this.onContactNumberChange.bind(this)}
                                                    value={this.state.contactNumber}
                                />
                            </View>
                        </View>


                        <View style={{width:window.width*0.9, flexDirection:'row', justifyContent:'space-between'}}>                            
                            <Dropdown
                                containerStyle={{width:window.width*0.5}}
                                label={'Month started here'}
                                data={months}
                                onChangeText={this.onMonthChange.bind(this)}
                                value={this.state.monthSelected}
                            />
                            <Dropdown
                                containerStyle={{width:window.width*0.3}}
                                label={'Year'}
                                data={years}
                                onChangeText={this.onYearChange.bind(this)}
                                value={this.state.yearSelected}
                            />
                        </View>

                        {(this.state.currentEmpStatusIndex == 1)?
                            <View style={{width:window.width*0.9, flexDirection:'row', alignItems:'center'}}>
                                <View style={{borderBottomColor: Colors.BLACK, borderBottomWidth:0.5, width:38, height:52, marginTop:20, alignItems:'center', justifyContent:'center'}} >
                                    <Image
                                        style={{width:20, height:20}}
                                        source={callSmallImage}
                                    ></Image>
                                </View> 
                                <View style={{width:window.width*0.8}}>                               
                                    <MaterialTextInput  label={'Refree Contact number'} 
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
                                                        onChangeText={this.onPhoneNumberChange.bind(this)}
                                                        value={this.state.phoneNumber}
                                    />
                                </View>
                            </View>
                            :null
                        }       


                        {(this.state.currentEmpStatusIndex == 3)?
                            <View style={{alignItems:'center'}}>
                                <Text style={{width:window.width*0.6, fontSize:16, fontWeight:'500', marginTop:50, color:Colors.GRAY_COLOR}}>
                                    {'Reference for your current employment (optional)'}
                                </Text>

                                <Text style={{width:window.width*0.6, fontSize:14, fontWeight:'500', marginTop:30, color:Colors.GRAY_COLOR}}>
                                    {'If you have reference letters you can upload them at the end of the process'}
                                </Text>


                                <View style={{width:window.width*0.9}}>
                                    <MaterialTextInput  label={'Refree name'} 
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
                                                    onChangeText={this.onEmpAddressChange.bind(this)}
                                                    value={this.state.empAddress}
                                    />
                                </View>
                                {(this.state.empAddressError == '')?null:
                                    <Text style={CommonStyles.errorText}>{this.state.empAddressError}</Text>                                
                                }


                                <View style={{width:window.width*0.9, flexDirection:'row', alignItems:'center'}}>
                                    <View style={{borderBottomColor: Colors.BLACK, borderBottomWidth:0.5, width:38, height:52, marginTop:20, alignItems:'center', justifyContent:'center'}} >
                                        <Image
                                            style={{width:20, height:20}}
                                            source={callSmallImage}
                                        ></Image>
                                    </View> 
                                    <View style={{width:window.width*0.8}}>                               
                                        <MaterialTextInput  label={'Refree Contact number'} 
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
                                                            onChangeText={this.onPhoneNumberChange.bind(this)}
                                                            value={this.state.phoneNumber}
                                        />
                                    </View>
                                </View>

                            </View>
                            :null
                        }
                            
                            
                        <Text style={{width:window.width*0.6, fontSize:16, fontWeight:'500', marginTop:50, color:Colors.GRAY_COLOR}}>
                            {'Whats your annual income before taxes?'}
                        </Text>                                                  

                        <View style={{width:window.width*0.9}}>                                                                
                            <MaterialTextInput  label={'Annual income before taxes ($)'} 
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
                                                maxLength={7}
                                                onChangeText={this.onAnnualIncomeChange.bind(this)}
                                                value={this.state.annualIncome}
                            />
                        </View>

                        <Text style={{width:window.width*0.6, fontSize:14, fontWeight:'500', marginTop:30, color:Colors.GRAY_COLOR}}>
                            {'Agencies or owners will use this to reasonably assume you can meet your financial obligations.'}
                        </Text>

                        <View style={{width:window.width*0.8, alignItems:'center', margin:50}}>                            

                            <TouchableOpacity 
                                onPress={() => this.onSaveAndExitClicked()}
                                style={{backgroundColor:Colors.APP_THEME_RED_COLOR,height:40,width:window.width*0.35,alignItems:'center',justifyContent:'center'}}
                            > 
                                    <Text style={{color:'#ffffff'}}>Save</Text>
                            </TouchableOpacity>

                        </View>                        

                    </View>

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

const mapStateToProps = ({ employmentHistoryReducer }) => {

  const {
    tenantCurrentEmpResponse,
    updateTenantCurrentEmpResponse,
  } = employmentHistoryReducer;
  
  return {
    tenantCurrentEmpResponse: tenantCurrentEmpResponse,
    updateTenantCurrentEmpResponse: updateTenantCurrentEmpResponse,
  }
}

export default connect(mapStateToProps,{
    getTenantCurrentEmployment,
    addUpdateTenantEmployment,
    clearGetTenantCurrentEmploymentResponse,
    clearAddUpdateTenantEmploymentResponse,
    refreshRentalResumeMenu
})(EmploymentHistoryScreen);
