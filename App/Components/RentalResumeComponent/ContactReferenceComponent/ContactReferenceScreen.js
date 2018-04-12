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
    
    clearGetTenantPersonalReferenceResponse,
    clearAddUpdateTenantPersonalReferenceResponse
} from './ContactReferenceAction';

import {    
    getTenantPersonalReference,
    addUpdateTenantPersonalReference,
} from "../../../Action/ActionCreators";

import {        
    refreshRentalResumeMenu
} from '../RentalResumeMenu/RentalResumeMenuAction';

import{ Actions}    from 'react-native-router-flux';

import Colors       from '../../../Constants/Colors';
import Strings      from '../../../Constants/Strings';
import styles       from './ContactReferenceStyle';
import CommonStyles from '../../../CommonStyle/CommonStyle';

import appLogoImage from '../../../Assets/logo.png';
import checkImage from '../../../Assets/check_selected.png';
import uncheckImage from '../../../Assets/check.png';
import callSmallImage from '../../../Assets/call_small.png';

import blackCheckImage from '../../../Assets/blackCheck.png';
import blackUnCheckImage from '../../../Assets/blackUnCheck.png';

import TextField from 'react-native-material-textfield';
import MaterialTextInput from 'react-native-material-textinput';
import { Dropdown } from 'react-native-material-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Progress from 'react-native-progress';

const window = Dimensions.get('window');

let relationsData = [{
      value: 'Friend',
    }, {
      value: 'Work colleague',
    }, {
      value: 'Associate',
    }, {
      value: 'Other',
    }];

class ContactReferenceScreen extends Component{


    constructor() {

        super();
            this.state = {
                isScreenLoading: false,

                emergencySurname: '',
                emergencyName: '',
                emergencyRelation: '',
                emergencyContact: '',
                
                ref1Surname: '',
                ref1Name: '',
                ref1Relation: '',
                ref1Contact: '',
                
                ref2Surname: '',
                ref2Name: '',
                ref2Relation: '',
                ref2Contact: '',

                loggedInUserData:'',
                contactReferenceInformation:'',

                emergencySurnameError: '',
                emergencyNameError: '',
                emergencyRelationError: '',
                emergencyContactError: '',

                referenceRelationError:'',

                refRelationError:'',
                referenceRelation:'',
                isEmergencyContact:0,
            };   
            
    }
    
    componentWillMount() {
        
            AsyncStorage.getItem("loggedInUserInfo").then((value) => {
                if(value) {                
                    var loggedInUserData = JSON.parse(value);                
                    this.setState({loggedInUserData: loggedInUserData});
                    this.callGetTenantPersonalReferenceWebService(loggedInUserData.ID)             
                }            
            }).done();
            
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {                                         

        });        
    }   


    componentWillReceiveProps(nextProps) {
        // Handle getTenantPersonalReference service response
        if(nextProps.tenantPersonalRefResponse != undefined && nextProps.tenantPersonalRefResponse != ''){

            this.setState({isScreenLoading:false});            

            if(nextProps.tenantPersonalRefResponse.headerResponse.status == 200){  
                if(nextProps.tenantPersonalRefResponse.data.Content != null){
                    this.setState({contactReferenceInformation :  nextProps.tenantPersonalRefResponse.data.Content});
                    this.fillUserInfo(nextProps.tenantPersonalRefResponse.data.Content);
                }else{
                    if(nextProps.tenantPersonalRefResponse.data.ReturnStatus[0]){
                        alert(nextProps.tenantPersonalRefResponse.data.ReturnStatus[0]);
                    }
                }                                
            }
            else if(nextProps.tenantPersonalRefResponse.headerResponse.status == 400){
                alert(nextProps.tenantPersonalRefResponse.data.error_description);
            }
            else if(nextProps.tenantPersonalRefResponse.headerResponse.status == 500){
                alert('Internal Server Error');
            }
        }

        // Handle addUpdateTenantPersonalReference service response
        if(nextProps.updateTenantPersonalRefResponse != undefined && nextProps.updateTenantPersonalRefResponse != ''){

            this.setState({isScreenLoading:false});            

            if(nextProps.updateTenantPersonalRefResponse.headerResponse.status == 200){  
                if(nextProps.updateTenantPersonalRefResponse.data.IsSuccess){
                    this.props.refreshRentalResumeMenu(1);
                    Actions.popTo('RentalResumeMenu');
                }else{
                    alert(nextProps.updateTenantPersonalRefResponse.data.ReturnMessage[0]);
                }                                
            }
            else if(nextProps.updateTenantPersonalRefResponse.headerResponse.status == 400){
                alert(nextProps.updateTenantPersonalRefResponse.data.error_description);
            }
            else if(nextProps.updateTenantPersonalRefResponse.headerResponse.status == 500){
                alert('Internal Server Error');
            }
        }
    }

    componentDidUpdate() { 
        if(this.props.tenantPersonalRefResponse != undefined && this.props.tenantPersonalRefResponse != ''){  
            this.props.clearGetTenantPersonalReferenceResponse();
        }

        if(this.props.updateTenantPersonalRefResponse != undefined && this.props.updateTenantPersonalRefResponse != ''){  
            this.props.clearAddUpdateTenantPersonalReferenceResponse();
        }
    }

    componentWillUnmount() {        
        
        this.setState({
            isScreenLoading: false,

            emergencySurname: '',
            emergencyName: '',
            emergencyRelation: '',
            emergencyContact: '',
            
            ref1Surname: '',
            ref1Name: '',
            ref1Relation: '',
            ref1Contact: '',
            
            ref2Surname: '',
            ref2Name: '',
            ref2Relation: '',
            ref2Contact: '',

            loggedInUserData:'',
            contactReferenceInformation:'',
        });        
    }

    callGetTenantPersonalReferenceWebService(userID) {
        /***************** Call getTenantPersonalReference WebService ****************/            
            this.setState({isScreenLoading:true}); 
            var postData = {
                UserId: userID
            }                    
            this.props.getTenantPersonalReference(postData);            
        /*************************************************************************/
    }

    fillUserInfo(userInfo){ 

        this.setState({           

            referenceRelation: userInfo.Relationship?userInfo.Relationship:'', 
            
            emergencySurname: userInfo.SurName?userInfo.SurName:'',
            emergencyName: userInfo.RefereeName?userInfo.RefereeName:'',
            emergencyRelation: userInfo.Relationship?userInfo.Relationship:'',
            emergencyContact: userInfo.ContactNumber1?userInfo.ContactNumber1:'',
            
            ref1Surname: userInfo.SurName1?userInfo.SurName1:'',
            ref1Name: userInfo.RefereeName1?userInfo.RefereeName1:'',
            ref1Relation: userInfo.Relationship1?userInfo.Relationship1:'',
            ref1Contact: userInfo.ContactNumber1?userInfo.ContactNumber1:'',
            
            ref2Surname: userInfo.SurName2?userInfo.SurName2:'',
            ref2Name: userInfo.RefereeName2?userInfo.RefereeName2:'',
            ref2Relation: userInfo.Relationship2?userInfo.Relationship2:'',
            ref2Contact: userInfo.ContactNumber2?userInfo.ContactNumber2:'',            
        });
    } 

    updateContactReferenceInfo() {

        var errors = []; 

        //var checkEmergencySurname = this.state.emergencySurname.replace(/\s/g,"");
        // var checkEmergencyName = this.state.emergencyName.replace(/\s/g,"");
        // var checkEmergencyRelation = this.state.emergencyRelation.replace(/\s/g,"");
        // var checkEmergencyContact = this.state.emergencyContact.replace(/\s/g,"");  

        var checkReferenceRelation = this.state.referenceRelation.replace(/\s/g,"");
        var checkEmergencyName = this.state.emergencyName.replace(/\s/g,"");
        var checkEmergencyContact = this.state.emergencyContact.replace(/\s/g,"");      

        // if(checkEmergencySurname.length == 0){
        //     this.setState({emergencySurnameError:Strings.ERROR_EMPTY_SURNAME})
        //     errors.push('emergencySurnameError');
        // }else{
        //     this.setState({emergencySurnameError:''})
        // }

        

        // if(checkEmergencyRelation.length == 0){
        //     this.setState({emergencyRelationError:Strings.ERROR_EMPTY_RELATIONSHIP})
        //     errors.push('emergencyRelationError');
        // }else{
        //     this.setState({emergencyRelationError:''})
        // }

        if(checkReferenceRelation.length == 0){
            this.setState({refRelationError:'Please Select Relationship'})
            errors.push('refRelationError');
        }else{
            this.setState({refRelationError:''})
        }

        if(checkEmergencyName.length == 0){
            this.setState({emergencyNameError:Strings.ERROR_EMPTY_NAME})
            errors.push('emergencyNameError');
        }else{
            this.setState({emergencyNameError:''})
        }
        
        if(checkEmergencyContact.length == 0){
            this.setState({emergencyContactError:Strings.ERROR_EMPTY_CONTACT_NUMBER})
            errors.push('emergencyContactError');
        }else{
            this.setState({emergencyContactError:''})
        }

        if(errors.length > 0){
            return;
        }
        else{    

            // var postData = {
            //     UserId: this.state.loggedInUserData.ID,                                
                            
            //     Relationship: this.state.emergencyRelation,
            //     SurName: this.state.emergencySurname,
            //     RefereeName: this.state.emergencyName,
            //     ContactNumber: this.state.emergencyContact,
                
            //     SurName1: this.state.ref1Surname,
            //     RefereeName1: this.state.ref1Name,
            //     Relationship1: this.state.ref1Relation,
            //     ContactNumber1: this.state.ref1Contact,
                
            //     SurName2: this.state.ref2Surname,
            //     RefereeName2: this.state.ref2Name,
            //     Relationship2: this.state.ref2Relation,
            //     ContactNumber2: this.state.ref2Contact,
                
            // }

            var postData = {
                UserId: this.state.loggedInUserData.ID,                                                                            

                Relationship: this.state.referenceRelation,
                RefereeName: this.state.emergencyName,
                ContactNumber1: this.state.emergencyContact              
            }            

            /********* Call addUpdateTenantPersonalReference WebService *********/            
                this.setState({isScreenLoading:true});                                 
                this.props.addUpdateTenantPersonalReference(postData);            
            /*************************************************************/

        }        

    } 

    onEmergencySurnameChange(text) {
        this.setState({emergencySurname:text, emergencySurnameError:''});
    }

    onEmergencyNameChange(text) {
        this.setState({emergencyName:text, emergencyNameError:''});
    }

    onEmergencyRelationChange(text) {
        this.setState({emergencyRelation:text, emergencyRelationError:''});
    } 

    onEmergencyContactChange(text) {
        this.setState({emergencyContact:text, emergencyContactError:''});
    }


    onRef1SurnameChange(text) {
        this.setState({ref1Surname:text});
    }

    onRef1NameChange(text) {
        this.setState({ref1Name:text});
    }

    onRef1RelationChange(text) {
        this.setState({ref1Relation:text});
    } 

    onRef1ContactChange(text) {
        this.setState({ref1Contact:text});
    }  


    onRef2SurnameChange(text) {
        this.setState({ref2Surname:text});
    }

    onRef2NameChange(text) {
        this.setState({ref2Name:text});
    }

    onRef2RelationChange(text) {
        this.setState({ref2Relation:text});
    } 

    onRef2ContactChange(text) {
        this.setState({ref2Contact:text});
    }  

    onSaveAndExitClicked() {
        this.updateContactReferenceInfo();        
    }

    onDoneClicked() {
        Actions.popTo('RentalResumeMenu');        
    }  

    onRelationChange(value, index, data) {        
        this.setState({referenceRelation:value, refRelationError:''});
    }

    emergencyContactClicked(){
        this.setState({isEmergencyContact:!this.state.isEmergencyContact});
    }

	render()
    {
    	return(
    		<View style={styles.container}>   
                <KeyboardAwareScrollView contentContainerStyle={{paddingBottom:60}} showsVerticalScrollIndicator={false}> 
                    <View style={{borderWidth:1, borderColor:Colors.DARK_GRAY_COLOR, width:window.width*0.95, marginTop:10, alignItems:'center'}}>
                        <Text style={{fontSize:16, fontWeight:'500', margin:10, color:Colors.APP_THEME_RED_COLOR}}>
                            Personal References
                        </Text> 

                        <View>

                            <Dropdown
                                containerStyle={{width:window.width*0.8}}
                                label={Strings.RELATIONSHIP}
                                data={relationsData}
                                onChangeText={this.onRelationChange.bind(this)}
                                value={this.state.referenceRelation}
                            />
                            {(this.state.refRelationError == '')?null:
                                <Text style={CommonStyles.errorText}>{this.state.refRelationError}</Text>                                
                            }
                            
                            <View style={{width:window.width*0.8}}>                             
                                <MaterialTextInput  label={Strings.NAME} 
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
                                                    onChangeText={this.onEmergencyNameChange.bind(this)}
                                                    value={this.state.emergencyName}
                                />
                            </View>
                            {(this.state.emergencyNameError == '')?null:
                                <Text style={CommonStyles.errorText}>{this.state.emergencyNameError}</Text>                                
                            }

                            
                                <View style={{width:window.width*0.8, flexDirection:'row', alignItems:'center'}}>
                                    <View style={{borderBottomColor: Colors.BLACK, borderBottomWidth:0.5, width:38, height:52, marginTop:20, alignItems:'center', justifyContent:'center'}} >
                                        <Image
                                            style={{width:20, height:20}}
                                            source={callSmallImage}
                                        ></Image>
                                    </View>
                                    <View style={{width:window.width*0.7}}>
                                    <MaterialTextInput  label={Strings.CONTACT_NUMBER} 
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
                                                    onChangeText={this.onEmergencyContactChange.bind(this)}
                                                    value={this.state.emergencyContact}
                                    />
                                    </View>
                                </View>                                
                                {(this.state.emergencyContactError == '')?null:
                                    <Text style={CommonStyles.errorText}>{this.state.emergencyContactError}</Text>                                
                                }

                                {/*<TouchableOpacity style={{flexDirection:'row', marginTop:30, alignItems:'center'}} onPress={() => this.emergencyContactClicked()}>
                                                                    <Image source={this.state.isEmergencyContact?blackCheckImage:blackUnCheckImage} />
                                                                    <Text style={CommonStyles.ageConfirmText}>{'Is this an emergency contact?'}</Text>
                                                                </TouchableOpacity>*/}
                            

                        </View>

                        <View style={{width:window.width*0.8, alignItems:'center', margin:20}}>                            

                            <TouchableOpacity 
                                onPress={() => this.onSaveAndExitClicked()}
                                style={{backgroundColor:Colors.APP_THEME_RED_COLOR,height:40,width:window.width*0.35,alignItems:'center',justifyContent:'center'}}
                            > 
                                    <Text style={{color:'#ffffff'}}>Save</Text>
                            </TouchableOpacity>

                        </View>

                    </View>    
                </KeyboardAwareScrollView>


                {/*<KeyboardAwareScrollView contentContainerStyle={{paddingBottom:60}} showsVerticalScrollIndicator={false}>   
                    <View style={{flex:1,margin:15}}>
                        <Text style={{fontWeight:'bold'}}>{Strings.CONTACTS_REF}</Text>                        

                        <View>
                            <Text style={{fontWeight:'500', marginTop:40}}>{Strings.PLEASE_PROVIDE_A_CONTATC_IN_CASE_OF_EMERGENCY}</Text>                      
                            
                            <View style={{flexDirection:'row', justifyContent:'space-between'}}>

                                <View>
                                    <TextField  label={Strings.SURNAME} 
                                                labelStyle={styles.labelStyle}
                                                inputStyle={styles.labelStyle}  
                                                highlightColor={Colors.BLACK}
                                                labelColor={Colors.TEXT_INPUT_LABEL_COLOR}
                                                textColor={Colors.TEXT_INPUT_LABEL_COLOR}
                                                borderColor={Colors.FORGOT_TEXT_COLOR}
                                                selectionColor={Colors.BLACK}
                                                returnKeyType='next'
                                                autoCapitalize='none'
                                                autoCorrect={false}
                                                onSubmitEditing={(event)=>{this.refs.emergencyName.focus()}}
                                                onChangeText={this.onEmergencySurnameChange.bind(this)}
                                                value={this.state.emergencySurname}
                                    />
                                    {(this.state.emergencySurnameError == '')?null:
                                        <Text style={CommonStyles.errorText}>{this.state.emergencySurnameError}</Text>                                
                                    }
                                </View>


                                <View>
                                    <TextField  label={Strings.NAME} 
                                                labelStyle={styles.labelStyle}
                                                inputStyle={styles.labelStyle}  
                                                highlightColor={Colors.BLACK}
                                                labelColor={Colors.TEXT_INPUT_LABEL_COLOR}
                                                textColor={Colors.TEXT_INPUT_LABEL_COLOR}
                                                borderColor={Colors.FORGOT_TEXT_COLOR}
                                                selectionColor={Colors.BLACK}
                                                returnKeyType='next'
                                                autoCapitalize='none'
                                                autoCorrect={false}
                                                onSubmitEditing={(event)=>{this.refs.emergencyRelation.focus()}}
                                                ref='emergencyName'
                                                onChangeText={this.onEmergencyNameChange.bind(this)}
                                                value={this.state.emergencyName}
                                    />
                                    {(this.state.emergencyNameError == '')?null:
                                        <Text style={CommonStyles.errorText}>{this.state.emergencyNameError}</Text>                                
                                    }
                                </View>

                            </View>

                            

                            <View style={{flexDirection:'row', justifyContent:'space-between'}}>

                                <View>
                                    <TextField  label={Strings.RELATIONSHIP} 
                                                labelStyle={styles.labelStyle}
                                                inputStyle={styles.labelStyle}  
                                                highlightColor={Colors.BLACK}
                                                labelColor={Colors.TEXT_INPUT_LABEL_COLOR}
                                                textColor={Colors.TEXT_INPUT_LABEL_COLOR}
                                                borderColor={Colors.FORGOT_TEXT_COLOR}
                                                selectionColor={Colors.BLACK}
                                                returnKeyType='next'
                                                autoCapitalize='none'
                                                autoCorrect={false}
                                                onSubmitEditing={(event)=>{this.refs.emergencyContact.focus()}}
                                                ref='emergencyRelation'
                                                onChangeText={this.onEmergencyRelationChange.bind(this)}
                                                value={this.state.emergencyRelation}
                                    />
                                    {(this.state.emergencyRelationError == '')?null:
                                        <Text style={CommonStyles.errorText}>{this.state.emergencyRelationError}</Text>                                
                                    }
                                </View>

                                <View>
                                    <View style={{width:window.width*0.4, flexDirection:'row', alignItems:'center'}}>
                                        <View style={{borderBottomColor: Colors.TEXT_INPUT_LABEL_COLOR, borderBottomWidth:0.5, width:38, height:38, marginTop:20, alignItems:'center', justifyContent:'center'}} >
                                            <Image
                                                style={{width:20, height:20}}
                                                source={callSmallImage}
                                            ></Image>
                                        </View>
                                        <TextField  label={Strings.CONTACT_NUMBER} 
                                                    labelStyle={styles.narrowLabelStyle}
                                                    inputStyle={styles.narrowLabelStyle}  
                                                    highlightColor={Colors.BLACK}
                                                    labelColor={Colors.TEXT_INPUT_LABEL_COLOR}
                                                    textColor={Colors.TEXT_INPUT_LABEL_COLOR}
                                                    borderColor={Colors.FORGOT_TEXT_COLOR}
                                                    selectionColor={Colors.BLACK}
                                                    returnKeyType='next'
                                                    autoCapitalize='none'
                                                    autoCorrect={false}
                                                    onSubmitEditing={(event)=>{this.refs.ref1Surname.focus()}}
                                                    ref='emergencyContact'
                                                    onChangeText={this.onEmergencyContactChange.bind(this)}
                                                    value={this.state.emergencyContact}
                                        />
                                    </View>                                
                                    {(this.state.emergencyContactError == '')?null:
                                        <Text style={CommonStyles.errorText}>{this.state.emergencyContactError}</Text>                                
                                    }
                                </View>


                            </View>

                        </View>


                        <View>
                            <Text style={{fontWeight:'500', marginTop:40}}>{Strings.PLEASE_PROVIDE_TWO_PERSONAL_REFERENCES}</Text>                      
                            <Text style={{fontWeight:'500', marginTop:20}}>1)</Text>                      
                            
                            <View style={{flexDirection:'row', justifyContent:'space-between'}}>

                                <TextField  label={Strings.SURNAME} 
                                            labelStyle={styles.labelStyle}
                                            inputStyle={styles.labelStyle}  
                                            highlightColor={Colors.BLACK}
                                            labelColor={Colors.TEXT_INPUT_LABEL_COLOR}
                                            textColor={Colors.TEXT_INPUT_LABEL_COLOR}
                                            borderColor={Colors.FORGOT_TEXT_COLOR}
                                            selectionColor={Colors.BLACK}
                                            returnKeyType='next'
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            onSubmitEditing={(event)=>{this.refs.ref1Name.focus()}}
                                            ref='ref1Surname'
                                            onChangeText={this.onRef1SurnameChange.bind(this)}
                                            value={this.state.ref1Surname}
                                />


                                <TextField  label={Strings.NAME} 
                                            labelStyle={styles.labelStyle}
                                            inputStyle={styles.labelStyle}  
                                            highlightColor={Colors.BLACK}
                                            labelColor={Colors.TEXT_INPUT_LABEL_COLOR}
                                            textColor={Colors.TEXT_INPUT_LABEL_COLOR}
                                            borderColor={Colors.FORGOT_TEXT_COLOR}
                                            selectionColor={Colors.BLACK}
                                            returnKeyType='next'
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            onSubmitEditing={(event)=>{this.refs.ref1Relation.focus()}}
                                            ref='ref1Name'
                                            onChangeText={this.onRef1NameChange.bind(this)}
                                            value={this.state.ref1Name}
                                />

                            </View>

                            

                            <View style={{flexDirection:'row', justifyContent:'space-between'}}>

                                <TextField  label={Strings.RELATIONSHIP} 
                                            labelStyle={styles.labelStyle}
                                            inputStyle={styles.labelStyle}  
                                            highlightColor={Colors.BLACK}
                                            labelColor={Colors.TEXT_INPUT_LABEL_COLOR}
                                            textColor={Colors.TEXT_INPUT_LABEL_COLOR}
                                            borderColor={Colors.FORGOT_TEXT_COLOR}
                                            selectionColor={Colors.BLACK}
                                            returnKeyType='next'
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            onSubmitEditing={(event)=>{this.refs.ref1Contact.focus()}}
                                            ref='ref1Relation'
                                            onChangeText={this.onRef1RelationChange.bind(this)}
                                            value={this.state.ref1Relation}
                                />

                                <View style={{width:window.width*0.4, flexDirection:'row', alignItems:'center'}}>
                                    <View style={{borderBottomColor: Colors.TEXT_INPUT_LABEL_COLOR, borderBottomWidth:0.5, width:38, height:38, marginTop:20, alignItems:'center', justifyContent:'center'}} >
                                        <Image
                                            style={{width:20, height:20}}
                                            source={callSmallImage}
                                        ></Image>
                                    </View>
                                    <TextField  label={Strings.CONTACT_NUMBER} 
                                                labelStyle={styles.narrowLabelStyle}
                                                inputStyle={styles.narrowLabelStyle}  
                                                highlightColor={Colors.BLACK}
                                                labelColor={Colors.TEXT_INPUT_LABEL_COLOR}
                                                textColor={Colors.TEXT_INPUT_LABEL_COLOR}
                                                borderColor={Colors.FORGOT_TEXT_COLOR}
                                                selectionColor={Colors.BLACK}
                                                returnKeyType='next'
                                                autoCapitalize='none'
                                                autoCorrect={false}
                                                onSubmitEditing={(event)=>{this.refs.ref2Surname.focus()}}
                                                ref='ref1Contact'
                                                onChangeText={this.onRef1ContactChange.bind(this)}
                                                value={this.state.ref1Contact}
                                    />
                                </View>

                            </View>


                            <Text style={{fontWeight:'500', marginTop:20}}>2)</Text>                      
                            
                            <View style={{flexDirection:'row', justifyContent:'space-between'}}>

                                <TextField  label={Strings.SURNAME} 
                                            labelStyle={styles.labelStyle}
                                            inputStyle={styles.labelStyle}  
                                            highlightColor={Colors.BLACK}
                                            labelColor={Colors.TEXT_INPUT_LABEL_COLOR}
                                            textColor={Colors.TEXT_INPUT_LABEL_COLOR}
                                            borderColor={Colors.FORGOT_TEXT_COLOR}
                                            selectionColor={Colors.BLACK}
                                            returnKeyType='next'
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            onSubmitEditing={(event)=>{this.refs.ref2Name.focus()}}
                                            ref='ref2Surname'
                                            onChangeText={this.onRef2SurnameChange.bind(this)}
                                            value={this.state.ref2Surname}
                                />


                                <TextField  label={Strings.NAME} 
                                            labelStyle={styles.labelStyle}
                                            inputStyle={styles.labelStyle}  
                                            highlightColor={Colors.BLACK}
                                            labelColor={Colors.TEXT_INPUT_LABEL_COLOR}
                                            textColor={Colors.TEXT_INPUT_LABEL_COLOR}
                                            borderColor={Colors.FORGOT_TEXT_COLOR}
                                            selectionColor={Colors.BLACK}
                                            returnKeyType='next'
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            onSubmitEditing={(event)=>{this.refs.ref2Relation.focus()}}
                                            ref='ref2Name'
                                            onChangeText={this.onRef2NameChange.bind(this)}
                                            value={this.state.ref2Name}
                                />

                            </View>

                            <View style={{flexDirection:'row', justifyContent:'space-between'}}>

                                <TextField  label={Strings.RELATIONSHIP} 
                                            labelStyle={styles.labelStyle}
                                            inputStyle={styles.labelStyle}  
                                            highlightColor={Colors.BLACK}
                                            labelColor={Colors.TEXT_INPUT_LABEL_COLOR}
                                            textColor={Colors.TEXT_INPUT_LABEL_COLOR}
                                            borderColor={Colors.FORGOT_TEXT_COLOR}
                                            selectionColor={Colors.BLACK}
                                            returnKeyType='next'
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            onSubmitEditing={(event)=>{this.refs.ref2Contact.focus()}}
                                            ref='ref2Relation'
                                            onChangeText={this.onRef2RelationChange.bind(this)}
                                            value={this.state.ref2Relation}
                                />

                                <View style={{width:window.width*0.4, flexDirection:'row', alignItems:'center'}}>
                                    <View style={{borderBottomColor: Colors.TEXT_INPUT_LABEL_COLOR, borderBottomWidth:0.5, width:38, height:38, marginTop:20, alignItems:'center', justifyContent:'center'}} >
                                        <Image
                                            style={{width:20, height:20}}
                                            source={callSmallImage}
                                        ></Image>
                                    </View>
                                    <TextField  label={Strings.CONTACT_NUMBER} 
                                                labelStyle={styles.narrowLabelStyle}
                                                inputStyle={styles.narrowLabelStyle}  
                                                highlightColor={Colors.BLACK}
                                                labelColor={Colors.TEXT_INPUT_LABEL_COLOR}
                                                textColor={Colors.TEXT_INPUT_LABEL_COLOR}
                                                borderColor={Colors.FORGOT_TEXT_COLOR}
                                                selectionColor={Colors.BLACK}
                                                returnKeyType='done'
                                                autoCapitalize='none'
                                                autoCorrect={false}                                                
                                                ref='ref2Contact'
                                                onChangeText={this.onRef2ContactChange.bind(this)}
                                                value={this.state.ref2Contact}
                                    />
                                </View>

                            </View>

                        </View>
                       

                        <View style={{flex:1,justifyContent:'flex-end',marginTop:30}}>
                             <View style={{flexDirection:'row' ,justifyContent:'space-between'}}>
                                <TouchableOpacity 
                                    onPress={() => this.onSaveAndExitClicked()}
                                    style={{backgroundColor:'#333333',height:window.width*0.25/2,width:window.width*0.35,alignItems:'center',justifyContent:'center'}}>
                                    <Text style={{color:'#ffffff'}}>SAVE & EXIT</Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    onPress={() => this.onDoneClicked()}
                                    style={{backgroundColor:Colors.APP_THEME_RED_COLOR,height:window.width*0.25/2,width:window.width*0.35,alignItems:'center',justifyContent:'center'}}>
                                    <Text style={{color:'#ffffff'}}>DONE</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>

                </KeyboardAwareScrollView>*/}
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


const mapStateToProps = ({ contactReferenceReducer }) => {

  const {
    tenantPersonalRefResponse,
    updateTenantPersonalRefResponse
  } = contactReferenceReducer;
  
  return {
    tenantPersonalRefResponse: tenantPersonalRefResponse,
    updateTenantPersonalRefResponse: updateTenantPersonalRefResponse
  }
}

export default connect(mapStateToProps,{
    getTenantPersonalReference,
    addUpdateTenantPersonalReference,
    clearGetTenantPersonalReferenceResponse,
    clearAddUpdateTenantPersonalReferenceResponse,
    refreshRentalResumeMenu
})(ContactReferenceScreen);
