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
    InteractionManager,
    Modal
} from 'react-native';

import {        
    clearGetTenantResidentsInfoResponse,
    clearAddUpdateTenantResidentsInfoResponse
} from './OtherInformationAction';

import {    
    getTenantResidentsInfo,
    addUpdateTenantResidentsInfo,    
    deleteCoAppliocantInfo,
} from "../../../Action/ActionCreators";

import {        
    refreshRentalResumeMenu
} from '../RentalResumeMenu/RentalResumeMenuAction';

import{ Actions}    from 'react-native-router-flux';

import Colors       from '../../../Constants/Colors';
import Strings      from '../../../Constants/Strings';
import styles       from './OtherInformationScreenStyle';
import CommonStyles from '../../../CommonStyle/CommonStyle';
import {validateEmail, validateMobileNumber} from '../../../Constants/CommonFunctions';

import appLogoImage from '../../../Assets/logo.png';
import checkImage from '../../../Assets/check_selected.png';
import uncheckImage from '../../../Assets/check.png';
import addImage from '../../../Assets/add.png';
import binImage from '../../../Assets/bin.png';

import TextField from 'react-native-material-textfield';
import MaterialTextInput from 'react-native-material-textinput';
import { Dropdown } from 'react-native-material-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Progress from 'react-native-progress';

import leftArrowImage from '../../../Assets/leftArrow.png';
import rightArrowImage from '../../../Assets/rightArrow.png';

const window = Dimensions.get('window');
 
let numberOfAdults = [{value: '1'}, { value: '2'}, {value: '3'}, {value: '4'}, {value: '5'}, {value: '6'}, {value: '7'},
{value: '8'}, {value: '9'}, {value: '10'}];

let numberOfChildren = [{value: '0'}, {value: '1'}, { value: '2'}, {value: '3'}, {value: '4'}, {value: '5'}, {value: '6'}, {value: '7'},
{value: '8'}, {value: '9'}, {value: '10'}];

let numberOfVehicles = [{value: '1'}, { value: '2'}, {value: '3'}, {value: '4'}, {value: '5'}, {value: '6'}, {value: '7'},
{value: '8'}, {value: '9'}, {value: '10'}];

var isAdultAdded = 0;
var isChildAdded = 0;

class OtherInformationScreen extends Component{


    constructor() {

        super();
            this.state = {
                isScreenLoading: false,
                showModal:0,
                showChildModal:0,
                applicants:[],
                children:[],
                applicantName:'',
                applicantMobile:'',
                applicantEmail:'',

                childName: '',
                childAge: '',

                isCoApplicant: 0,
                
                noOfAdults:'',
                noOfChildren:'',
                noOfVehicles:'',
                makeModel:'',
                vehicleRegNumber:'',
                propertyHearing:'',
                additionalNotes:'',

                loggedInUserData:'',
                otherInformation:'',

                noOfAdultsError:'',
                noOfChildrenError:'',
                noOfVehiclesError:'',
                vehicleRegNumberError:'',
                propertyHearingError:'',
                additionalNotesError:'',

                applicantNameError:'',
                applicantMobileError:'',
                applicantEmailError:'',

                childNameError:'',
                childAgeError:'',

                showComponent : 1,
            };   
            
    }
    
    componentWillMount() {
        
        AsyncStorage.getItem("loggedInUserInfo").then((value) => {
            if(value) {                
                var loggedInUserData = JSON.parse(value);                
                this.setState({loggedInUserData: loggedInUserData});
                this.callGetTenantResidentsInfoWebService(loggedInUserData.ID)             
            }            
        }).done(); 
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {                                       
            
        });        
    }

    componentWillReceiveProps(nextProps) {
        // Handle getTenantResidentsInfo service response
        if(nextProps.tenantResidentInfoResponse != undefined && nextProps.tenantResidentInfoResponse != ''){

            this.setState({isScreenLoading:false});            

            if(nextProps.tenantResidentInfoResponse.headerResponse.status == 200){  
                if(nextProps.tenantResidentInfoResponse.data.Content != null){
                    this.setState({otherInformation :  nextProps.tenantResidentInfoResponse.data.Content});
                    this.fillUserInfo(nextProps.tenantResidentInfoResponse.data.Content);
                }
                // else{
                //     alert(nextProps.tenantResidentInfoResponse.data.ReturnMessage[0]);
                // }                                
            }
            else if(nextProps.tenantResidentInfoResponse.headerResponse.status == 400){
                alert(nextProps.tenantResidentInfoResponse.data.error_description);
            }
            else if(nextProps.tenantResidentInfoResponse.headerResponse.status == 500){
                alert('Internal Server Error');
            }
        }

        // Handle addUpdateTenantResidentsInfo service response
        if(nextProps.updateTenantResidentInfoResponse != undefined && nextProps.updateTenantResidentInfoResponse != ''){

            this.setState({isScreenLoading:false});            

            if(nextProps.updateTenantResidentInfoResponse.headerResponse.status == 200){  
                if(nextProps.updateTenantResidentInfoResponse.data.IsSuccess){
                    
                    if(isAdultAdded == 0 && isChildAdded == 0){
                        if(this.state.showComponent == 1){
                            this.setState({showComponent:2});    
                        }
                        else if(this.state.showComponent == 2){
                            this.setState({showComponent:3});    
                        }
                        else if(this.state.showComponent == 3){
                            this.setState({showComponent:4});    
                        }
                        else{  
                            this.props.refreshRentalResumeMenu(1);                      
                            Actions.popTo('RentalResumeMenu');
                        }  
                    }
                    else{
                        isAdultAdded = 0;
                        isChildAdded = 0;
                    }                  
                }
                else{
                    alert(nextProps.updateTenantResidentInfoResponse.data.ReturnMessage[0]);
                }                                
            }
            else if(nextProps.updateTenantResidentInfoResponse.headerResponse.status == 400){
                alert(nextProps.updateTenantResidentInfoResponse.data.error_description);
            }
            else if(nextProps.updateTenantResidentInfoResponse.headerResponse.status == 500){
                alert('Internal Server Error');
            }
        }

        // Handle deleteCoAppliocantInfo service response
        if(nextProps.deleteCoAppliocantInfoResponse != undefined && nextProps.deleteCoAppliocantInfoResponse != ''){

            this.setState({isScreenLoading:false});            

            if(nextProps.deleteCoAppliocantInfoResponse.headerResponse.status == 200){  
                if(nextProps.deleteCoAppliocantInfoResponse.data.IsSuccess){
                    
                                      
                }
                else{
                    alert(nextProps.deleteCoAppliocantInfoResponse.data.ReturnMessage[0]);
                }                                
            }
            else if(nextProps.deleteCoAppliocantInfoResponse.headerResponse.status == 400){
                alert(nextProps.deleteCoAppliocantInfoResponse.data.error_description);
            }
            else if(nextProps.deleteCoAppliocantInfoResponse.headerResponse.status == 500){
                alert('Internal Server Error');
            }
        }
    }

    componentDidUpdate() { 
        if(this.props.tenantResidentInfoResponse != undefined && this.props.tenantResidentInfoResponse != ''){  
                this.props.clearGetTenantResidentsInfoResponse();
        }

        if(this.props.updateTenantResidentInfoResponse != undefined && this.props.updateTenantResidentInfoResponse != ''){  
                this.props.clearAddUpdateTenantResidentsInfoResponse();
        }
    }

    componentWillUnmount() {        
        var emptyArray = [];
        this.setState({
            noOfAdults: '',
            noOfChildren: '',
            vehicleRegNumber: '',
            propertyHearing: '',
            additionalNotes: '',
            applicants: emptyArray,
            children: emptyArray,
        });        
    }

    callGetTenantResidentsInfoWebService(userID) {
        /***************** Call getTenantResidentsInfo WebService ****************/            
            this.setState({isScreenLoading:true}); 
            var postData = {
                UserId: userID
            }                    
            this.props.getTenantResidentsInfo(postData);            
        /*************************************************************************/
    }

    fillUserInfo(userInfo){              

        var applicantsArray = [];
        var childArray = [];        

        if(userInfo.TenantCoApplicants.length>0){
            userInfo.TenantCoApplicants.map((data, index)=>{
                if(data.AdultOrChild == 'Adult'){
                    applicantsArray.push(data);
                }else if(data.AdultOrChild == 'Child'){
                    childArray.push(data);
                }                
            })
        }        

        this.setState({            
            noOfAdults: userInfo.NoOfAdults?userInfo.NoOfAdults.toString():'',
            noOfChildren: userInfo.NoOfChildren?userInfo.NoOfChildren.toString():'',
            noOfVehicles: userInfo.NoVehicles?userInfo.NoVehicles.toString():'',
            makeModel: userInfo.PrimaryVehicleModel?userInfo.PrimaryVehicleModel.toString():'',
            vehicleRegNumber:userInfo.RegistrationNo?userInfo.RegistrationNo:'',
            propertyHearing:userInfo.Source?userInfo.Source:'',
            additionalNotes:userInfo.Description?userInfo.Description:'',
            applicants: (applicantsArray.length>0)?applicantsArray:[],
            children: (childArray.length>0)?childArray:[],
            isCoApplicant: (userInfo.TenantCoApplicants.length>0)?1:0,
        });
    }

    updateOtherInfo(componentID) {               

        var errors = [];        

        if(componentID == 5){
            var checkVehicleRegNumber = this.state.vehicleRegNumber.replace(/\s/g,"");

            if(checkVehicleRegNumber.length == 0){
                this.setState({vehicleRegNumberError:''})
                errors.push('vehicleRegNumberError');
            }else{
                this.setState({vehicleRegNumberError:''})
            } 
        }                       

        if(errors.length > 0){
            return;
        }
        else{            

            var postData = {
                UserId: this.state.loggedInUserData.ID,                
                NoOfAdults: this.state.noOfAdults,
                NoOfChildren: this.state.noOfChildren,
                Description: this.state.additionalNotes,                
                RegistrationNo: this.state.vehicleRegNumber,
            }             

            // var tempTenantCoApplicants = [];            
            // tempTenantCoApplicants = this.state.applicants.concat(this.state.children);
            // postData.TenantCoApplicants = tempTenantCoApplicants; 

            console.log("postData>>> ", JSON.stringify(postData));

            if(componentID == 3){
                postData.Flag = true; 
            }
            else if(componentID == 4){
                postData.IsDesc = true; 
                postData.IsDescOrVehi = true; 
            }else if(componentID == 5){             
                postData.IsDescOrVehi = true; 
            }
            

            /***************** Call addUpdateTenantResidentsInfo WebService ***************/            
                this.setState({isScreenLoading:true});                                 
                this.props.addUpdateTenantResidentsInfo(postData);            
            /*********************************************************************/

        }        

    }

    onFrontClicked(componentID) {  

        console.log("componentID>>> "+componentID)           

        if(componentID == 2){

            var errors = [];

            var checkNoOfAdults = this.state.noOfAdults.replace(/\s/g,"");
            if(checkNoOfAdults.length == 0){        
                this.setState({noOfAdultsError:Strings.ERROR_EMPTY_NO_OF_ADULTS})
                errors.push('noOfAdultsError');
            }else{
                this.setState({noOfAdultsError:''})
            }

            if(errors.length > 0){
                return;
            }
            else{
                this.updateOtherInfo(componentID);
            }

        }
        else if(componentID == 3){
            var errors = [];

            var checkNoOfChildren = this.state.noOfChildren.replace(/\s/g,"");
            
            if(checkNoOfChildren.length == 0){
                this.setState({noOfChildrenError:Strings.ERROR_EMPTY_NO_OF_CHILD})
                errors.push('noOfChildrenError');
            }else{
                this.setState({noOfChildrenError:''})
            }

            if(errors.length > 0){
                return;
            }
            else{
                this.updateOtherInfo(componentID);
            }

        }
        else if(componentID == 4){
            // var errors = [];
            
            // var checkAdditionalNotes = this.state.additionalNotes.replace(/\s/g,"");

            // if(checkAdditionalNotes.length == 0){
            //     this.setState({additionalNotesError:Strings.ERROR_EMPTY_EMAIL})
            //     errors.push('additionalNotesError');
            // }else{
            //     this.setState({additionalNotesError:''})
            // } 

            // if(errors.length > 0){
            //     return;
            // }
            // else{
                
            // }

            this.updateOtherInfo(componentID);

        }
        
    }

    onBackClicked(componentID) {
        this.setState({showComponent:componentID});
    }

    onGeneralInfoClicked() {
        Actions.GeneralInfoScreen();
    }


    onAdultNoChange(value, index, data) {        
        this.setState({noOfAdults:value, noOfAdultsError:''});
    }

    onChildrenNoChange(value, index, data) {        
        this.setState({noOfChildren:value, noOfChildrenError:''});
    }

    onVehicleNoChange(value, index, data) {        
        this.setState({noOfVehicles:value, noOfVehiclesError:''});
    }

    onFirstnameChange() {

    }

    onApplicantNameChange(name) {
        this.setState({applicantName:name, applicantNameError:''});
    }

    onApplicantMobileChange(name) {
        this.setState({applicantMobile:name, applicantMobileError:''});
    }

    onChildNameChange(childNameValue) {
        this.setState({childName:childNameValue, childNameError:''});
    }

    onChildAgeChange(childAgeValue) {
        this.setState({childAge:childAgeValue, childAgeError:''});
    }

    onApplicantEmailChange(name) {
        this.setState({applicantEmail:name, applicantEmailError:''});
    }

    onVehicleRegNumberChange(text) {
        this.setState({vehicleRegNumber:text, vehicleRegNumberError:''});
    }

    onMakeModelChange(text) {
        this.setState({makeModel:text});
    }

    onPropertyHearingChange(text) {
        this.setState({propertyHearing:text});
    }

    onAdditionalNotesChange(text) {
        this.setState({additionalNotes:text});
    }

    onSaveAndExitClicked() {
        this.updateOtherInfo(5);        
    }

    onNextClicked() {
        Actions.PetsScreen();
    }

    addApplicants() {
        if(this.state.applicants.length < this.state.noOfAdults){
            this.setState({showModal:!this.state.showModal, applicantName:'', applicantMobile:'', applicantEmail:''});
        }
        else{
            alert('Maximum '+this.state.noOfAdults+' applicants can be added');
        }
    }

    addChildren() {
        if(this.state.children.length < this.state.noOfChildren){
            this.setState({showChildModal:!this.state.showChildModal, childName:'', childAge:''});
        }
        else{
            alert('Maximum '+this.state.noOfChildren+' children can be added');
        }
    }

    deleteItem(index) {

        Alert.alert(
            'LeaseAgent',
            'Are you sure you want to delete selected applicant?',
            [
                { text: 'Yes', onPress: () => this.callDeleteCoAppliocantInfoWebService(index) },
                { text: 'No', onPress: () => console.log("Denied") },
            ],
            { cancelable: false }
        ) 
        
    }

    callDeleteCoAppliocantInfoWebService(index) {

        var postData = {
            UserId: this.state.loggedInUserData.ID,
            Id: this.state.applicants[index].ID
        }
        /***************** Call deleteCoAppliocantInfo WebService ***************/            
            this.setState({isScreenLoading:true});                                 
            this.props.deleteCoAppliocantInfo(postData);            
        /*********************************************************************/

        var tempArray = this.state.applicants;
        tempArray.splice(index, 1);
        this.setState({applicants:tempArray});

    }

    deleteChild(index) {

        Alert.alert(
            'LeaseAgent',
            'Are you sure you want to delete selected child?',
            [
                { text: 'Yes', onPress: () => this.calldeleteChildAPI(index) },
                { text: 'No', onPress: () => console.log("Denied") },
            ],
            { cancelable: false }
        ) 

        
    }

    calldeleteChildAPI(index) {

        var postData = {
            UserId: this.state.loggedInUserData.ID,
            Id: this.state.children[index].ID
        }
        /***************** Call deleteCoAppliocantInfo WebService ***************/            
            this.setState({isScreenLoading:true});                                 
            this.props.deleteCoAppliocantInfo(postData);            
        /*********************************************************************/

        var tempArray = this.state.children;
        tempArray.splice(index, 1);
        this.setState({children:tempArray});

    }

    onAddApplicantClicked() {

        var errors = [];

        var checkApplicantName = this.state.applicantName.replace(/\s/g,"");
        var checkApplicantMobile = this.state.applicantMobile.replace(/\s/g,"");
        var checkApplicantEmail = this.state.applicantEmail.replace(/\s/g,"");

        if(checkApplicantName.length == 0){        
            this.setState({applicantNameError:Strings.ERROR_EMPTY_NO_OF_ADULTS})
            errors.push('applicantNameError');
        }else{
            this.setState({applicantNameError:''})
        }

        if(checkApplicantMobile.length == 0){        
            this.setState({applicantMobileError:Strings.ERROR_EMPTY_NO_OF_ADULTS})
            errors.push('applicantMobileError');
        }else{
            this.setState({applicantMobileError:''})
        }

        if(checkApplicantEmail.length == 0){        
            this.setState({applicantEmailError:Strings.ERROR_EMPTY_NO_OF_ADULTS})
            errors.push('applicantEmailError');
        }else{
            this.setState({applicantEmailError:''})
        }

        if(!validateEmail(this.state.applicantEmail)){
                            
            this.setState({applicantEmailError:Strings.ERROR_INVALID_EMAIL})
            errors.push('applicantEmailError');
        } 

        if(!validateMobileNumber(this.state.applicantMobile)){
                        
            this.setState({applicantMobileError:Strings.ERROR_INVALID_MOBILE})
            errors.push('applicantMobileError');
        } 

        if(errors.length > 0){
            return;
        }
        else{
            var tempApplicantArray = this.state.applicants;                

            var adult = {
                ApplicantName: this.state.applicantName,
                ApplicantMobile: this.state.applicantMobile,
                ApplicantEmail: this.state.applicantEmail,
                ChildName: null,
                ChildAge: null,
                AdultOrChild: "Adult"
            }

            tempApplicantArray.push(adult);        
            this.setState({showModal:0, applicants:tempApplicantArray});

            var postData = {
                UserId: this.state.loggedInUserData.ID,                
                NoOfAdults: this.state.noOfAdults,
                ApplicantName: this.state.applicantName,
                ApplicantMobile: this.state.applicantMobile,
                ApplicantEmail: this.state.applicantEmail,
                ChildName: null,
                ChildAge: null,
                AdultOrChild: "Adult",                
            } 

            console.log("postData>>> ", JSON.stringify(postData));       
            isAdultAdded = 1;     
            /***************** Call addUpdateTenantResidentsInfo WebService ***************/            
                this.setState({isScreenLoading:true});                                 
                this.props.addUpdateTenantResidentsInfo(postData);            
            /*********************************************************************/
        }           
        
    }

    onCancelApplicantClicked() {
        this.setState({showModal:0});   
    }

    onAddChildrenClicked() {

        var errors = [];

        var checkChildName = this.state.childName.replace(/\s/g,"");
        var checkChildAge = this.state.childAge.replace(/\s/g,"");

        if(checkChildName.length == 0){        
            this.setState({childNameError:'Please provide Child Name'})
            errors.push('childNameError');
        }else{
            this.setState({childNameError:''})
        }

        if(checkChildAge.length == 0){        
            this.setState({childAgeError:'Please provide Child Age'})
            errors.push('childAgeError');
        }else{
            this.setState({childAgeError:''})
        }        

        if(errors.length > 0){
            return;
        }
        else{

            var tempChildArray = this.state.children;        

            var child = {
                ApplicantName: null,
                ApplicantMobile: null,
                ApplicantEmail: null,
                ChildName: this.state.childName,
                ChildAge: this.state.childAge,
                AdultOrChild: "Child"
            }

            tempChildArray.push(child);        
            this.setState({showChildModal:0, children:tempChildArray});

            var postData = {
                UserId: this.state.loggedInUserData.ID,
                NoOfChildren: this.state.noOfChildren,
                ApplicantName: null,
                ApplicantMobile: null,
                ApplicantEmail: null,
                ChildName: this.state.childName,
                ChildAge: this.state.childAge,
                AdultOrChild: "Child",                
            } 
            console.log("postData>>> ", JSON.stringify(postData));    
            isChildAdded = 1;
            /***************** Call addUpdateTenantResidentsInfo WebService ***************/            
                this.setState({isScreenLoading:true});                                 
                this.props.addUpdateTenantResidentsInfo(postData);            
            /*********************************************************************/

        }           


        
    }

    onCancelChildrenClicked() {
        this.setState({showChildModal:0});   
    }    

    coApplicantClicked(value) {
        this.setState({isCoApplicant:value});
    }

    _renderApplicants(applicant, index) {

        return(
                <View style={{margin:10, width:window.width*0.85}} key={index}>

                    <View style={{flexDirection:'row'}}>
                        <Text style={{color:'#000000', fontSize:12, fontWeight:'700', marginRight:10}}>{index+1}</Text>

                        <View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize:12, fontWeight:'700'}}>Name: </Text>
                                <Text style={{width:window.width*0.45, fontSize:12, fontWeight:'500'}}>{applicant.ApplicantName}</Text>                  
                            </View>

                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize:12, fontWeight:'700'}}>Mobile Number: </Text>
                                <Text style={{width:window.width*0.45, fontSize:12, fontWeight:'500'}}>{applicant.ApplicantMobile}</Text>                  
                            </View>

                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize:12, fontWeight:'700'}}>Email: </Text>
                                <Text style={{width:window.width*0.45, fontSize:12, fontWeight:'500'}}>{applicant.ApplicantEmail}</Text>                  
                            </View>
                        </View>

                        <TouchableOpacity onPress={() => this.deleteItem(index)} style={{flex:1,justifyContent:'flex-end'}}>
                            <Image style={{marginLeft:10, width:15, height:15}} source={binImage} />
                        </TouchableOpacity>

                    </View>
                </View>
            );
    }

    _renderChildren(child, index) {

        return(
                <View style={{margin:10, width:window.width*0.85}} key={index}>

                    <View style={{flexDirection:'row'}}>
                        <Text style={{color:'#000000', fontSize:12, fontWeight:'700', marginRight:10}}>{index+1}</Text>

                        <View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize:12, fontWeight:'700'}}>Name: </Text>
                                <Text style={{width:window.width*0.6, fontSize:12, fontWeight:'500'}}>{child.ChildName}</Text>                  
                            </View>

                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize:12, fontWeight:'700'}}>Age: </Text>
                                <Text style={{width:window.width*0.6, fontSize:12, fontWeight:'500'}}>{child.ChildAge}</Text>                  
                            </View>
                            
                        </View>

                        <TouchableOpacity onPress={() => this.deleteChild(index)} style={{flex:1,justifyContent:'flex-end'}}>
                            <Image style={{marginLeft:10, width:15, height:15}} source={binImage} />
                        </TouchableOpacity>

                    </View>
                </View>
            );
    }

	render(){
    	return(
    		<View style={styles.container}> 

                <View style={{flex:1, alignItems:'center'}}>                 
                    
                    {this.state.showModal?
                        
                        <Modal transparent>

                            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                                <View style={{width:window.width*0.9, backgroundColor:'#ffffff', justifyContent:'center', alignItems:'center', borderColor:'gray', borderWidth:0.5, borderRadius:10}}>
                                    
                                    <Text style={{fontWeight:'500', marginTop:20}}>Other Applicant Detail</Text>                                    

                                    <View style={{width:window.width*0.7}}>
                                        <MaterialTextInput  label={Strings.NAME_OF_OTHER}
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
                                                            onChangeText={this.onApplicantNameChange.bind(this)}
                                                            value={this.state.applicantName}
                                        /> 
                                    </View> 
                                    {(this.state.applicantNameError == '')?null:
                                        <Text style={CommonStyles.errorText}>{this.state.applicantNameError}</Text>                                
                                    }

                                    <View style={{width:window.width*0.7}}>
                                        <MaterialTextInput  label={'Mobile Number'}
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
                                                            returnKeyType='done'
                                                            maxLength={10}
                                                            onChangeText={this.onApplicantMobileChange.bind(this)}
                                                            value={this.state.applicantMobile}
                                        /> 
                                    </View>
                                    {(this.state.applicantMobileError == '')?null:
                                        <Text style={CommonStyles.errorText}>{this.state.applicantMobileError}</Text>                                
                                    }

                                    <View style={{width:window.width*0.7}}>
                                        <MaterialTextInput  label={'Email'}
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
                                                            onChangeText={this.onApplicantEmailChange.bind(this)}
                                                            value={this.state.applicantEmail}
                                        /> 
                                    </View>
                                    {(this.state.applicantEmailError == '')?null:
                                        <Text style={CommonStyles.errorText}>{this.state.applicantEmailError}</Text>                                
                                    }                                

                                    <View style={{margin:40}}>
                                        <View style={{width:window.width*0.7, flexDirection:'row' ,justifyContent:'space-between'}}>
                                            <TouchableOpacity 
                                                onPress={() => this.onAddApplicantClicked()}
                                                style={{backgroundColor:'#333333',height:window.width*0.2/2,width:window.width*0.3,alignItems:'center',justifyContent:'center'}}
                                            >
                                                <Text style={{color:'#ffffff'}}>Add</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity 
                                                onPress={() => this.onCancelApplicantClicked()}
                                                style={{backgroundColor:'#333333',height:window.width*0.2/2,width:window.width*0.3,alignItems:'center',justifyContent:'center'}}
                                            >
                                                <Text style={{color:'#ffffff'}}>Cancel</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                </View> 
                            </View>
                        </Modal>
                        

                        :null
                    }

                    {this.state.showChildModal?
                        
                        <Modal transparent>

                            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                                <View style={{width:window.width*0.9, backgroundColor:'#ffffff', justifyContent:'center', alignItems:'center', borderColor:'gray', borderWidth:0.5, borderRadius:10}}>
                                    
                                    <Text style={{fontWeight:'500', marginTop:20}}>Children Detail</Text>                                    

                                    <View style={{width:window.width*0.7}}>
                                        <MaterialTextInput  label={'Child Name'}
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
                                                            onChangeText={this.onChildNameChange.bind(this)}
                                                            value={this.state.childName}
                                        /> 
                                    </View>
                                    {(this.state.childNameError == '')?null:
                                        <Text style={CommonStyles.errorText}>{this.state.childNameError}</Text>                                
                                    } 

                                    <View style={{width:window.width*0.7}}>
                                        <MaterialTextInput  label={'Child Age'}
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
                                                            maxLength={2}
                                                            onChangeText={this.onChildAgeChange.bind(this)}
                                                            value={this.state.childAge}
                                        /> 
                                    </View>
                                    {(this.state.childAgeError == '')?null:
                                        <Text style={CommonStyles.errorText}>{this.state.childAgeError}</Text>                                
                                    }                                                                  

                                    <View style={{margin:40}}>
                                        <View style={{width:window.width*0.7, flexDirection:'row' ,justifyContent:'space-between'}}>
                                            <TouchableOpacity 
                                                onPress={() => this.onAddChildrenClicked()}
                                                style={{backgroundColor:'#333333',height:window.width*0.2/2,width:window.width*0.3,alignItems:'center',justifyContent:'center'}}
                                            >
                                                <Text style={{color:'#ffffff'}}>Add</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity 
                                                onPress={() => this.onCancelChildrenClicked()}
                                                style={{backgroundColor:'#333333',height:window.width*0.2/2,width:window.width*0.3,alignItems:'center',justifyContent:'center'}}
                                            >
                                                <Text style={{color:'#ffffff'}}>Cancel</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                </View> 
                            </View>
                        </Modal>
                        

                        :null
                    }


                    <KeyboardAwareScrollView contentContainerStyle={{paddingBottom:60}} showsVerticalScrollIndicator={false}>
                    

                    {(this.state.showComponent == 1)?
                    <View style={{borderWidth:1, borderColor:Colors.DARK_GRAY_COLOR, width:window.width*0.95, marginTop:10, alignItems:'center'}}>
                        
                        <Text style={{fontSize:16, fontWeight:'500', margin:10, color:Colors.APP_THEME_RED_COLOR}}>
                            Other Information                       
                        </Text> 
                       
                        <Dropdown
                            containerStyle={{width:window.width*0.8}}
                            label={Strings.ADULTS}
                            data={numberOfAdults}
                            onChangeText={this.onAdultNoChange.bind(this)}
                            value={this.state.noOfAdults}
                        />
                        {(this.state.noOfAdultsError == '')?null:
                            <Text style={CommonStyles.errorText}>{this.state.noOfAdultsError}</Text>                                
                        }                        
                        
                        {(this.state.noOfAdults > 1) ?
                            <View>
                                {this.state.applicants.length?null:
                                    <View>
                                        <Text style={{fontWeight:'500', marginTop:40}}>{'Is there any co-applicant?'}</Text>
                        
                                        <View style={{width:window.width*0.4, flexDirection:'row', justifyContent:'space-between', margin:20}}>

                                            <TouchableOpacity 
                                                onPress={() => this.coApplicantClicked(1)}
                                                style={{backgroundColor:this.state.isCoApplicant ? Colors.APP_THEME_RED_COLOR : Colors.WHITE,height:30,width:60,alignItems:'center',justifyContent:'center'}}
                                            > 
                                                    <Text style={{fontWeight:'600', color:this.state.isCoApplicant ? Colors.WHITE : Colors.BLACK}}>{'Yes'}</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity 
                                                onPress={() => this.coApplicantClicked(0)}
                                                style={{backgroundColor:this.state.isCoApplicant ? Colors.WHITE : Colors.APP_THEME_RED_COLOR,height:30,width:60,alignItems:'center',justifyContent:'center'}}
                                            > 
                                                    <Text style={{fontWeight:'600', color: this.state.isCoApplicant ? Colors.BLACK : Colors.WHITE}}>{'No'}</Text>
                                            </TouchableOpacity>

                                        </View>
                                    </View>                                    
                                }

                                {(this.state.isCoApplicant == 1) ?                                                
                                    <View>
                                        {this.state.applicants.length?

                                            <View style={{backgroundColor:'#ffffff', borderColor: '#FFF', borderRadius:5, marginTop:20}}>                                
                                                    {
                                                        this.state.applicants.map((data, index)=>{
                                                           return this._renderApplicants(data, index);
                                                        })
                                                    }                                                                            
                                            </View> 

                                            :null
                                        } 

                                        <View style={{flexDirection:'row', alignItems:'center', marginTop:10}}>
                                        
                                            <Text style={{fontWeight:'400'}}>Click on Plus Icon to add applicants details</Text>
                                            <TouchableOpacity onPress={() => this.addApplicants()}>
                                                <Image style={{marginLeft:10}} source={addImage} />
                                            </TouchableOpacity>

                                        </View>

                                         
                                        
                                    </View>
                                    :null
                                }
                            </View>
                            :null
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
                            Child Information                       
                        </Text>

                        <Dropdown
                            containerStyle={{width:window.width*0.8}}
                            label={Strings.CHILDREN}
                            data={numberOfChildren}
                            onChangeText={this.onChildrenNoChange.bind(this)}
                            value={this.state.noOfChildren}
                        />
                        {(this.state.noOfChildrenError == '')?null:
                            <Text style={CommonStyles.errorText}>{this.state.noOfChildrenError}</Text>                                
                        }

                        {this.state.children.length?

                            <View style={{backgroundColor:'#ffffff', borderColor: '#FFF', borderRadius:5, marginTop:20}}>                                
                                    {
                                        this.state.children.map((data, index)=>{
                                           return this._renderChildren(data, index);
                                        })
                                    }                                                                            
                            </View> 

                            :null
                        }

                        {(this.state.noOfChildren > 0) ?
                            <View style={{flexDirection:'row', alignItems:'center', marginTop:10}}>
                            
                                <Text style={{fontWeight:'400'}}>Click on Plus Icon to add children details</Text>
                                <TouchableOpacity onPress={() => this.addChildren()}>
                                    <Image style={{marginLeft:10}} source={addImage} />
                                </TouchableOpacity>

                            </View>
                            :null
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
                                Any Description
                            </Text>

                            <View style={{width:window.width*0.8}}>                             
                                <MaterialTextInput  label={'Description(optional)'}
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
                                                    maxLength={250}
                                                    multiline={true}
                                                    onChangeText={this.onAdditionalNotesChange.bind(this)}
                                                    value={this.state.additionalNotes}
                                />
                            </View>

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

                                <TouchableOpacity 
                                    onPress={() => this.onFrontClicked(4)}
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

                    {(this.state.showComponent == 4)?
                    <View style={{borderWidth:1, borderColor:Colors.DARK_GRAY_COLOR, width:window.width*0.95, marginTop:10, alignItems:'center'}}>
                        
                        <Text style={{fontSize:16, fontWeight:'500', margin:10, color:Colors.APP_THEME_RED_COLOR}}>
                            Vehicle Information                       
                        </Text>

                        <View style={{width:window.width*0.8, marginTop:30}}>                             
                            <MaterialTextInput  label={'Vehicle Registeration Number'}
                                                labelColor={Colors.BLACK}
                                                activeColor={Colors.BLACK}
                                                color={Colors.BLACK}
                                                fontSize={14}
                                                marginTop={0}                                                    
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
                                                onChangeText={this.onVehicleRegNumberChange.bind(this)}
                                                value={this.state.vehicleRegNumber}
                            />
                        </View>
                        {(this.state.vehicleRegNumberError == '')?null:
                            <Text style={CommonStyles.errorText}>{this.state.vehicleRegNumberError}</Text>                                
                        }



                        {/*
                        <Dropdown
                            containerStyle={{width:window.width*0.8}}
                            label={Strings.VEHICLES}
                            data={numberOfVehicles}
                            onChangeText={this.onVehicleNoChange.bind(this)}
                            value={this.state.noOfVehicles}
                        />
                        {(this.state.noOfVehiclesError == '')?null:
                            <Text style={CommonStyles.errorText}>{this.state.noOfVehiclesError}</Text>                                
                        } 

                        {(this.state.noOfVehicles >= 1) ?
                            <View>
                                <Text style={{fontWeight:'500', marginTop:40}}>{'Primary Vehicle Details :'}</Text>

                                <View style={{width:window.width*0.8}}>                             
                                    <MaterialTextInput  label={'Make / Model (optional)'}
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
                                                        onChangeText={this.onMakeModelChange.bind(this)}
                                                        value={this.state.makeModel}
                                    />
                                </View>

                                <View style={{width:window.width*0.8, marginTop:30}}>                             
                                    <MaterialTextInput  label={'Registeration No. (optional)'}
                                                        labelColor={Colors.BLACK}
                                                        activeColor={Colors.BLACK}
                                                        color={Colors.BLACK}
                                                        fontSize={14}
                                                        marginTop={0}                                                    
                                                        labelActiveTop={-30}
                                                        underlineColor={Colors.BLACK}
                                                        underlineActiveColor={Colors.BLACK}
                                                        underlineHeight={0.5}
                                                        underlineActiveHeight={0.5}
                                                        autoCapitalize='none'
                                                        autoCorrect={false}
                                                        underlineColorAndroid='transparent'
                                                        returnKeyType='next'
                                                        onChangeText={this.onVehicleRegNumberChange.bind(this)}
                                                        value={this.state.vehicleRegNumber}
                                    />
                                </View>
                            </View>
                            :null
                        }
                         
                    */}

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

                        {/*<View style={{flex:1,justifyContent:'flex-end', marginTop:60}}>
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

const mapStateToProps = ({ otherInformationReducer }) => {

  const {
    tenantResidentInfoResponse,
    updateTenantResidentInfoResponse,
    deleteCoAppliocantInfoResponse,
  } = otherInformationReducer;
  
  return {
    tenantResidentInfoResponse: tenantResidentInfoResponse,
    updateTenantResidentInfoResponse: updateTenantResidentInfoResponse,
    deleteCoAppliocantInfoResponse: deleteCoAppliocantInfoResponse
  }
}

export default connect(mapStateToProps,{
    getTenantResidentsInfo,
    addUpdateTenantResidentsInfo,
    deleteCoAppliocantInfo,
    clearGetTenantResidentsInfoResponse,
    clearAddUpdateTenantResidentsInfoResponse,
    refreshRentalResumeMenu
})(OtherInformationScreen);
