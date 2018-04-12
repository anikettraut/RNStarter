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
    getTenantPreviousEmployment,
    addUpdateTenantPreEmployment,
} from "../../../Action/ActionCreators";

import {        
    clearGetTenantPreviousEmploymentResponse,
    clearAddUpdateTenantEmploymentResponse
} from './PreviousEmploymentAction';

import {        
    refreshRentalResumeMenu
} from '../RentalResumeMenu/RentalResumeMenuAction';

import{ Actions}    from 'react-native-router-flux';

import Colors       from '../../../Constants/Colors';
import Strings      from '../../../Constants/Strings';
import styles       from './PreviousEmploymentStyle';
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
let data = [{
      value: 'Employed',
    }, {
      value: 'Self-employed',
    }, {
      value: 'Student',
    }];

let empTypeData = [{
      value: 'Full Time',
    }, {
      value: 'Part Time',
    }, {
      value: 'Casual',
    }];

// let years = [{value: '0'}, {value: '1'}, { value: '2'}, {value: '3'}, {value: '4'}, {value: '5'}, {value: '6'}, {value: '7'},
// {value: '8'}, {value: '9'}, {value: '10'}, {value: '11'}, {value: '12'}, {value: '13'}, {value: '14'}, {value: '15'},
// {value: '16'}, {value: '17'}, {value: '18'}, {value: '19'}, {value: '20'}, {value: '21'}, {value: '22'}, {value: '23'},
// {value: '24'}, {value: '25'}, {value: '26'}, {value: '27'}, {value: '28'}, {value: '29'}, {value: '30'}];

// let months = [{value: '1'}, { value: '2'}, {value: '3'}, {value: '4'}, {value: '5'}, {value: '6'}, {value: '7'},
// {value: '8'}, {value: '9'}, {value: '10'}, {value: '11'}];

let years = [{value: '2018'}, {value: '2017'}, { value: '2016'}, {value: '2015'}, {value: '2014'}, {value: '2013'}, {value: '2012'}, {value: '2011'},
{value: '2010'}, {value: '2009'}, {value: '2008'}, {value: '2007'}, {value: '2006'}, {value: '2005'}, {value: '2004'}, {value: '2003'},
{value: '2002'}, {value: '2001'}, {value: '2000'}, {value: '1999'}, {value: '1998'}, {value: '1997'}, {value: '1996'}, {value: '1995'},
{value: '1994'}, {value: '1993'}, {value: '1992'}, {value: '1991'}, {value: '1990'}, {value: '1989'}, {value: '1988'}];

let months = [{value: 'January'}, { value: 'February'}, {value: 'March'}, {value: 'April'}, {value: 'May'}, {value: 'June'},
{value: 'July'},{value: 'August'}, {value: 'September'}, {value: 'October'}, {value: 'November'}, {value: 'December'}];

var monthIndex = 0;

class PreviousEmploymentDetails extends Component{


    constructor() {

        super();
            this.state = {
                isScreenLoading: false,

                currentEmpStatusIndex: 0,
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
                preEmploymentInformation:'',

                currentEmpStatusError:'',
                occupationError:'',
                empTypeError:'',
                empNameError:'',
                empAddressError:'',
                postalCodeError:'',
                annualIncomeError:'',
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
        if(nextProps.tenantPreEmpResponse != undefined && nextProps.tenantPreEmpResponse != ''){

            this.setState({isScreenLoading:false});            

            if(nextProps.tenantPreEmpResponse.headerResponse.status == 200){  
                if(nextProps.tenantPreEmpResponse.data.Content.Content != null){
                    this.setState({preEmploymentInformation :  nextProps.tenantPreEmpResponse.data.Content.Content});
                    this.fillUserInfo(nextProps.tenantPreEmpResponse.data.Content.Content);
                }else{
                    if(nextProps.tenantPreEmpResponse.data.ReturnMessage.length){
                        alert(nextProps.tenantPreEmpResponse.data.ReturnMessage[0]);
                    }
                }                                
            }
            else if(nextProps.tenantPreEmpResponse.headerResponse.status == 400){
                alert(nextProps.tenantPreEmpResponse.data.error_description);
            }
            else if(nextProps.tenantPreEmpResponse.headerResponse.status == 500){
                alert('Internal Server Error');
            }
        }

        // Handle addUpdateTenantEmployment service response
        if(nextProps.updateTenantPreEmpResponse != undefined && nextProps.updateTenantPreEmpResponse != ''){

            this.setState({isScreenLoading:false});            

            if(nextProps.updateTenantPreEmpResponse.headerResponse.status == 200){  
                if(nextProps.updateTenantPreEmpResponse.data.IsSuccess){
                    this.props.refreshRentalResumeMenu(1); 
                    Actions.popTo('RentalResumeMenu');
                }else{
                    alert(nextProps.updateTenantPreEmpResponse.data.ReturnMessage[0]);
                }                                
            }
            else if(nextProps.updateTenantPreEmpResponse.headerResponse.status == 400){
                alert(nextProps.updateTenantPreEmpResponse.data.error_description);
            }
            else if(nextProps.updateTenantPreEmpResponse.headerResponse.status == 500){
                alert('Internal Server Error');
            }
        }
    }

    componentDidUpdate() { 
        if(this.props.tenantPreEmpResponse != undefined && this.props.tenantPreEmpResponse != ''){  
            this.props.clearGetTenantPreviousEmploymentResponse();            
        }

        if(this.props.updateTenantPreEmpResponse != undefined && this.props.updateTenantPreEmpResponse != ''){  
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

                loggedInUserData:'',
                preEmploymentInformation:'',
        });        
    }

    callGetTenantCurrentEmploymentWebService(userID) {
        /***************** Call getTenantCurrentEmployment WebService ****************/            
            this.setState({isScreenLoading:true}); 
            var postData = {
                UserId: userID
            }                    
            this.props.getTenantPreviousEmployment(postData);            
        /*************************************************************************/
    }

    fillUserInfo(userInfo){ 

        console.log("userInfo>>> "+JSON.stringify(userInfo));   

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
            empName: userInfo.EmployersName?userInfo.EmployersName:'',
            occupation: userInfo.Occupation?userInfo.Occupation:'',
            empType: userInfo.EmploymentType?userInfo.EmploymentType:'',
            empAddress: userInfo.EmploymentAddress?userInfo.EmploymentAddress:'',
            postalCode: userInfo.PostalCode?userInfo.PostalCode:'',
            phoneNumber: userInfo.ContactNumber?userInfo.ContactNumber:'',                     
            annualIncome: userInfo.AnnualIncome?userInfo.AnnualIncome.toString():'',            
        });
        
    }


    updatePreviousEmploymentDetailsInfo() {

        var errors = []; 

        var checkEmpName = this.state.empName.replace(/\s/g,"");
        var checkAnnualIncome = this.state.annualIncome.replace(/\s/g,"");

        if(checkEmpName.length == 0){
            this.setState({empNameError:Strings.ERROR_EMPTY_COMPANY_NAME})
            errors.push('empNameError');
        }else{
            this.setState({empNameError:''})
        }

        if(checkAnnualIncome.length == 0){
            this.setState({annualIncomeError:'Please provide your Annual Income.'})
            errors.push('annualIncomeError');
        }else{
            this.setState({annualIncomeError:''})
        }

        

        if(errors.length > 0){
            return;
        }
        else{  

            var postData = {
                UserId: this.state.loggedInUserData.ID,                                
                EmplomentStatus: 'Previous',

                EmployersName : this.state.empName,
                Occupation : this.state.occupation,
                EmploymentType : this.state.empType,
                EmploymentAddress : this.state.empAddress,
                PostalCode : this.state.postalCode,
                ContactNumber : this.state.phoneNumber,
                Months : monthIndex,
                Years : this.state.yearSelected,
                AnnualIncome : this.state.annualIncome,     
            }            

            /********* Call addUpdateTenantEmployment WebService *********/            
                this.setState({isScreenLoading:true});                                 
                this.props.addUpdateTenantPreEmployment(postData);            
            /*************************************************************/

        }        

    }          

    onCurrentEmpStatusChange(value, index, data) {                
        this.setState({currentEmpStatusIndex:index, currentEmpStatus:value, currentEmpStatusError:''});
    }

    onEmpTypeChange(value, index, data) {        
        this.setState({empType:value});
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

    onPhoneNumberChange(text) {
        this.setState({phoneNumber:text});
    }

    onWeeklyIncomeChange(text) {
        this.setState({weeklyIncome:text});
    }

    onOtherIncomeChange(text) {
        this.setState({otherIncome:text});
    }

    onAnnualIncomeChange(text) {
        this.setState({annualIncome:text, annualIncomeError:''});
    }

    onSaveAndExitClicked() {
        this.updatePreviousEmploymentDetailsInfo();        
    }

    onNextClicked() {
        Actions.IdentificationDocScreen();
    }

    onSkipClicked() {
        Actions.popTo('RentalResumeMenu');
    }

	render(){
    	return(
    		<View style={styles.container}>                 
                <KeyboardAwareScrollView contentContainerStyle={{paddingBottom:60}} showsVerticalScrollIndicator={false}>   
                    <View style={{borderWidth:1, borderColor:Colors.DARK_GRAY_COLOR, width:window.width*0.95, marginTop:10, alignItems:'center'}}>
                        
                        <Text style={{fontSize:16, fontWeight:'500', margin:10, color:Colors.APP_THEME_RED_COLOR}}>
                            {Strings.PREVIOUS_EMPLOYMENT_DETAILS}
                        </Text>

                        <View style={{width:window.width*0.8}}>                             
                            <MaterialTextInput  label={Strings.EMPLOYERS_NAME} 
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

                        <View style={{width:window.width*0.8}}>                             
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
                                                returnKeyType='done'
                                                maxLength={50}
                                                onChangeText={this.onOccupationChange.bind(this)}
                                                value={this.state.occupation}
                            />
                        </View>
                        {(this.state.occupationError == '')?null:
                            <Text style={CommonStyles.errorText}>{this.state.occupationError}</Text>                                
                        }

                        <Dropdown
                            containerStyle={{width:window.width*0.8}}
                            label={'Nature Of Employment'}
                            data={empTypeData}
                            onChangeText={this.onEmpTypeChange.bind(this)}
                            value={this.state.empType}
                        />


                        <View style={{width:window.width*0.8}}>                             
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
                                                maxLength={50}
                                                onChangeText={this.onEmpAddressChange.bind(this)}
                                                value={this.state.empAddress}
                            />
                        </View>
                        {(this.state.empAddressError == '')?null:
                            <Text style={CommonStyles.errorText}>{this.state.empAddressError}</Text>                                
                        }


                        <View style={{width:window.width*0.8}}>                             
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
                        </View>
                        {(this.state.postalCodeError == '')?null:
                            <Text style={CommonStyles.errorText}>{this.state.postalCodeError}</Text>                                
                        }
                        

                        <View style={{width:window.width*0.8, flexDirection:'row', alignItems:'center'}}>
                            <View style={{borderBottomColor: Colors.BLACK, borderBottomWidth:0.5, width:38, height:50, marginTop:20, alignItems:'center', justifyContent:'center'}} >
                                <Image
                                    style={{width:20, height:20}}
                                    source={callSmallImage}
                                ></Image>
                            </View>
                            
                            <View style={{width:window.width*0.7}}>                             
                                <MaterialTextInput  label={'Contact Number(optional)'} 
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
                                                    maxLength={10}
                                                    onChangeText={this.onPhoneNumberChange.bind(this)}
                                                    value={this.state.phoneNumber}
                                />
                            </View>
                        </View>

                        <View style={{width:window.width*0.8, flexDirection:'row', justifyContent:'space-between'}}>                            
                            <Dropdown
                                containerStyle={{width:window.width*0.45}}
                                label={'Month started here'}
                                data={months}
                                onChangeText={this.onMonthChange.bind(this)}
                                value={this.state.monthSelected}
                            />
                            <Dropdown
                                containerStyle={{width:window.width*0.25}}
                                label={'Years'}
                                data={years}
                                onChangeText={this.onYearChange.bind(this)}
                                value={this.state.yearSelected}
                            />
                        </View>


                        <View style={{width:window.width*0.8}}>                             
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
                        {(this.state.annualIncomeError == '')?null:
                            <Text style={CommonStyles.errorText}>{this.state.annualIncomeError}</Text>                                
                        }


                       <View style={{width:window.width*0.8, alignItems:'center', margin:50}}>                            

                            <TouchableOpacity 
                                onPress={() => this.onSaveAndExitClicked()}
                                style={{backgroundColor:Colors.APP_THEME_RED_COLOR,height:40,width:window.width*0.35,alignItems:'center',justifyContent:'center'}}
                            > 
                                    <Text style={{color:'#ffffff'}}>Save</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                onPress={() => this.onSkipClicked()}
                                style={{marginTop:10, height:40,width:70,alignItems:'center',justifyContent:'center'}}
                            > 
                                    <Text>Skip</Text>
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

const mapStateToProps = ({ previousEmploymentReducer }) => {

  const {
    tenantPreEmpResponse,
    updateTenantPreEmpResponse
  } = previousEmploymentReducer;
  
  return {
    tenantPreEmpResponse: tenantPreEmpResponse,
    updateTenantPreEmpResponse: updateTenantPreEmpResponse
  }
}

export default connect(mapStateToProps,{
    getTenantPreviousEmployment,
    addUpdateTenantPreEmployment,
    clearGetTenantPreviousEmploymentResponse,
    clearAddUpdateTenantEmploymentResponse,
    refreshRentalResumeMenu
})(PreviousEmploymentDetails);
