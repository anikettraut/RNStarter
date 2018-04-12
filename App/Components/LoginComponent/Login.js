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
	AsyncStorage
} from 'react-native';

import {
  	signInUsernameChanged,
	signInPasswordChanged,
	signupFirstNameChanged,
	signupLastNameChanged,
	signupEmailChanged,
	signupPasswordChanged,
	signupConfirmPasswordChanged,	
	clearRegisterUserResponse,	
	clearTokenResponse,
	clearExtTokenResponse,	
	clearLoggedInUserDetailsResponse,
	userAuthenticated
} from './LoginAction';

import {    
    registerUser,
	getToken,
	getExternalLogins,
	getLoggedInUserDetails,    
} from "../../Action/ActionCreators";

import{ Actions} from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';
import * as Progress from 'react-native-progress';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

import styles from './LoginStyle';
import TextField from 'react-native-material-textfield';
import MaterialTextInput from 'react-native-material-textinput';
import Colors from '../../Constants/Colors';
import Strings from '../../Constants/Strings';
import CommonStyles from '../../CommonStyle/CommonStyle';
import {validateEmail} from '../../Constants/CommonFunctions';

import userNameInputImage from '../../Assets/email.png';
import passInputImage from '../../Assets/Pass.png';
import userInputImage from '../../Assets/user.png';

import errorInputImage from '../../Assets/error.png';
import blackCheckImage from '../../Assets/blackCheck.png';
import blackUnCheckImage from '../../Assets/blackUnCheck.png';

import facebookImage from '../../Assets/facebook.png';
import twitterImage from '../../Assets/twitter.png';
import googleImage from '../../Assets/google.png';

import appLogoImage from '../../Assets/logo.png';

const TenantProfileScreen = require('../TenantProfileComponent/TenantProfileScreen');

var loggedInUserData;
var self; 

class Login extends Component{

	constructor() {

        super();
            this.state = {   
            	isScreenLoading:false,             
                isSignINselected:true,     
                errorMsg: '',
				errorOnTextField:'', 	
				accessToken : '',				
				
				showUserErase:false,
				showpassErase:false,
				showFNameErase:false,
				showLNameErase:false,
				showEmailErase:false,
				showPasswordErase:false,
				showCPasswordErase:false,

				dateOfBirth: '',
				minDate: Moment().add(-100,'y').format('DD MMM YYYY'),
				maxDate: Moment().add(-18,'y').format('DD MMM YYYY'),

				isAbove18:0,

				isLoginSuccessfull:0,
            }; 
            self = this         
    }

    componentWillMount(){
    }

    componentDidMount() {
    	this.setupGoogleSignin();
    }

    componentWillReceiveProps(nextProps) {

    	// Handle getToken service response
        if(nextProps.getTokenResp != undefined && nextProps.getTokenResp != ''){

            this.setState({isScreenLoading:false});

            console.log("getTokenResp: "+JSON.stringify(nextProps.getTokenResp));

            if(nextProps.getTokenResp.headerResponse.status == 200){
                if(nextProps.getTokenResp.data.access_token){                                
                    this.callGetUserDetailWebService(nextProps.getTokenResp.data.access_token);                    
                }else{
                    alert(nextProps.getTokenResp.error);
                }
            }
            else if(nextProps.getTokenResp.headerResponse.status == 400){
                alert(nextProps.getTokenResp.data.error_description);
            }
            else if(nextProps.getTokenResp.headerResponse.status == 500){
                alert('Internal Server Error');
            }
        }

        


        // Handle registerUser service response
        if(nextProps.registerRes != undefined && nextProps.registerRes != ''){

            this.setState({isScreenLoading:false});

            if(nextProps.registerRes.headerResponse.status == 200){
            		
            	if(nextProps.registerRes.data){
                    if(this.props.userType == Strings.kTENANT){
                    	this.props.userAuthenticated(true);
                    	alert(nextProps.registerRes.data.Message?nextProps.registerRes.data.Message:'You have Registered Successfully');
                    	Actions.pop();
                    }else{
                    	Actions.UnderConstruction();
                    }
                }
                
            }
            else{
                alert(nextProps.registerRes.error);
            }
        }


        // Handle getLoggedInUserDetails service response
        if(nextProps.loggedInUserDetail != undefined && nextProps.loggedInUserDetail != ''){

            this.setState({isScreenLoading:false});            

            if(nextProps.loggedInUserDetail.headerResponse.status == 200){
            		            	
                if(this.props.userType == Strings.kTENANT){ 
                	if(nextProps.loggedInUserDetail.data.Content){
                		loggedInUserData = nextProps.loggedInUserDetail.data.Content;
                		AsyncStorage.setItem("loggedInUserInfo", JSON.stringify(loggedInUserData));               	                 	
                		this.setState({isLoginSuccessfull:1});
                	}
                	else{
                		alert(nextProps.loggedInUserDetail.data.Message);
                	}
                }                
                
            }
            else if(nextProps.loggedInUserDetail.headerResponse.status == 500){
                alert('Internal Server Error');
            }
            else{
                alert(nextProps.loggedInUserDetail.error);
            }
        }

        // Handle getExternalLogins service response        

        if(nextProps.getExternalLoginsResp != undefined && nextProps.getExternalLoginsResp != ''){

            this.setState({isScreenLoading:false});            

            if(nextProps.getExternalLoginsResp.headerResponse.status == 200){
            	console.log("OUTPUT>>> "+JSON.stringify(nextProps.getExternalLoginsResp.data));
            	if(this.props.userType == Strings.kTENANT){ 
            		if(nextProps.getExternalLoginsResp.data.Content){
	                	loggedInUserData = nextProps.getExternalLoginsResp.data.Content;
	                	AsyncStorage.setItem("loggedInUserInfo", JSON.stringify(loggedInUserData));               	                 	
	                	this.setState({isLoginSuccessfull:1});
	                }
                	else{
                		if(nextProps.getExternalLoginsResp.data.ReturnMessage.length > 0){
                			alert(nextProps.getExternalLoginsResp.data.ReturnMessage[0]);
                		}else{
                			alert(nextProps.getExternalLoginsResp.data.Message);	
                		}
                		                		
                	}
                }  
                
            }
            else if(nextProps.getExternalLoginsResp.headerResponse.status == 400){
                alert(nextProps.getExternalLoginsResp.data.error_description);
            }
            else if(nextProps.getExternalLoginsResp.headerResponse.status == 500){
                alert('Internal Server Error');
            }
        }

    }

    componentDidUpdate() {   

        if(this.props.getTokenResp != undefined && this.props.getTokenResp != ''){
            this.props.clearTokenResponse();
        }
        if(this.props.registerRes != undefined && this.props.registerRes != ''){
            this.props.clearRegisterUserResponse();
        }
        if(this.props.getExternalLoginsResp != undefined && this.props.getExternalLoginsResp != ''){
            this.props.clearExtTokenResponse();
        }

        if(this.props.loggedInUserDetail != undefined && this.props.loggedInUserDetail != ''){
        	this.props.clearLoggedInUserDetailsResponse();
        }

    }

    componentWillUnmount() {
    	this.props.signInUsernameChanged('');
		this.setState({errorMsg:''});
      	this.setState({errorOnTextField:''});
		this.props.signInPasswordChanged('');
		this.props.signupFirstNameChanged('');
		this.props.signupLastNameChanged('');
		this.props.signupEmailChanged('');
		this.props.signupPasswordChanged('');
		this.props.signupConfirmPasswordChanged('');
    }

    callGetUserDetailWebService(xAuthToken) {
        /***************** Call getLoggedInUserDetails WebService ****************/            
            this.setState({isScreenLoading:true});
            var postData = {
            	'Email' : this.props.signInUsername,
            	'Password' : this.props.signInPassword
            }            
			this.props.getLoggedInUserDetails(xAuthToken, postData);            
        /*************************************************************************/
    }

	onSignInClicked() {		

		this.props.signupPasswordChanged('');
		this.props.signupConfirmPasswordChanged('');

		this.setState({isSignINselected:true});
	}

	onRegisterTabClicked() {

		this.props.signInUsernameChanged('');
		this.props.signInPasswordChanged('');

		this.setState({isSignINselected:false});
	}

	onLogINClicked() {
		if(this.props.signInUsername == ''){
			
			this.setState({errorMsg:Strings.ERROR_EMPTY_EMAIL});
    		this.setState({errorOnTextField:0});
		}
		else if(!validateEmail(this.props.signInUsername)){
			
			this.setState({errorMsg:Strings.ERROR_INVALID_EMAIL});
    		this.setState({errorOnTextField:0});
		}
		else if(this.props.signInPassword == ''){
			
			this.setState({errorMsg:Strings.ERROR_EMPTY_EMAIL});
    		this.setState({errorOnTextField:1});
		}
		else{
			/********************** Call getToken WebService **********************/ 
				this.setState({isScreenLoading:true});    
				var postData = "grant_type=password&UserName=" + this.props.signInUsername + "&Password=" + this.props.signInPassword;      
            	this.props.getToken(postData);
        	/***********************************************************************/
		}
	}

	onRegisterClicked() {
		if(this.props.signupFirstName == ''){			
			this.setState({errorMsg:Strings.ERROR_EMPTY_FIRST_NAME});
    		this.setState({errorOnTextField:2});
		}
		else if(this.props.signupLastName == ''){			
			this.setState({errorMsg:Strings.ERROR_EMPTY_LAST_NAME});
    		this.setState({errorOnTextField:3});
		}
		else if(this.props.singupEmail == ''){			
			this.setState({errorMsg:Strings.ERROR_EMPTY_EMAIL});
    		this.setState({errorOnTextField:4});
		}
		else if(!validateEmail(this.props.singupEmail)){			
			this.setState({errorMsg:Strings.ERROR_INVALID_EMAIL});
    		this.setState({errorOnTextField:4});
		}
		else if(this.props.signupPassword == ''){			
			this.setState({errorMsg:Strings.ERROR_EMPTY_PASSWORD});
    		this.setState({errorOnTextField:5});
		}
		else if(this.props.signupConfirmPassword == ''){			
			this.setState({errorMsg:Strings.ERROR_EMPTY_CONFIRM_PASSWORD});
    		this.setState({errorOnTextField:6});
		}
		else if(this.props.signupPassword != this.props.signupConfirmPassword){			
			this.setState({errorMsg:Strings.ERROR_PASSWORD_NOT_MATCHED});
    		this.setState({errorOnTextField:6});
		}
		else if(this.state.isAbove18 == 0){
			alert("User should be above 18 years to regiter this application");
		}
		else{
			/********************** Call registerUser WebService **********************/ 
				this.setState({isScreenLoading:true}); 			
				var postData = {				
					FirstName: this.props.signupFirstName,
					LastName: this.props.signupLastName,
					Email: this.props.singupEmail,
					Password: this.props.signupPassword,
					UserRole: this.props.userType
				}      
	            this.props.registerUser(postData);
        	/***********************************************************************/
		}
	}

	onFacebookClicked() {

		//this.props.getExternalLogins('Facebook');

		LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
	      	function (result) {
	        	if (result.isCancelled) {
	          		console.log('Login was cancelled');
	        	} else {
	          		// console.log('Login was successful with permissions: '
	            // 	+ result.grantedPermissions.toString());
	            	AccessToken.getCurrentAccessToken().then(
                        (data) => {
                        	console.log("data>>>"+JSON.stringify(data));
                            // self.setState({ accessToken: data.accessToken });
                            // self.setState({ isFacebookAuthorize: true });
                            fetch('https://graph.facebook.com/v2.5/me?fields=email,first_name,last_name,name,friends&access_token=' + data.accessToken.toString())
                                .then((response) => response.json())
                                .then((json) => {

                                    if (json.id != '') {
                                    	console.log("json>>>"+JSON.stringify(json));
                                        self.callLoginWithFacebookAPI(json, data);
                                        
                                    }


                                }).catch((err) => {
                                    console.log("excep", err)
                                })

                        }
                    )
	        	}
	      	},
	      	
	      	function (error) {
	        	console.log('Login failed with error: ' + error);
	      	}
	    );
	}
	

	onTwitterClicked() {			

	}

	onGoogleClicked() {			
		
		GoogleSignin.signIn()
	      		.then((user) => {
	        	console.log(user);
	        	self.callLoginWithGoogleAPI(user);
	    })
	    .catch((err) => {
	        console.log('WRONG SIGNIN', err);
	    })
	    .done();

	}

	async setupGoogleSignin() {
	    try {
	      	await GoogleSignin.hasPlayServices({ autoResolve: true });
	      	await GoogleSignin.configure({
	        	iosClientId: '895621549120-6k83nv138rr3nu71ush84pv7mtpi0563.apps.googleusercontent.com',	        	
	        	offlineAccess: false
	      	});

	      	const user = await GoogleSignin.currentUserAsync();
	      	console.log(user);
	    }
	    catch (err) {
	      	console.log("Google signin error", err.code, err.message);
	    }
	}	

	callLoginWithFacebookAPI(loginData, fbData) {
		/********************** Call getExternalLogins WebService **********************/ 
			this.setState({isScreenLoading:true}); 			
			var postData = {																												
				Email: loginData.email,
				FirstName: loginData.first_name,
				LastName: loginData.last_name,
				LoginProvider: "Facebook",
				ProviderKey: fbData.applicationID,												
				RoleName: this.props.userType
			}      
            this.props.getExternalLogins(postData);
    	/***********************************************************************/
	}

	callLoginWithGoogleAPI(loginData) {

		var completeName = loginData.name.split(" ");
		var fName = completeName[0];
		var lName = completeName[1];
		/********************** Call getExternalLogins WebService **********************/ 
			this.setState({isScreenLoading:true}); 			
			var postData = {																												
				Email: loginData.email,
				FirstName: fName,
				LastName: lName,
				LoginProvider: "Google",
				ProviderKey: '895621549120-6k83nv138rr3nu71ush84pv7mtpi0563.apps.googleusercontent.com',												
				RoleName: this.props.userType
			}      
            this.props.getExternalLogins(postData);
    	/***********************************************************************/
	}

	onCreateAccountClicked() {

		this.props.signInUsernameChanged('');
		this.props.signInPasswordChanged('');
		
		this.setState({isSignINselected:false});
	}

	onUsernameChange(text){
		
		this.setState({showUserErase:true});

		this.props.signInUsernameChanged(text);
		this.setState({errorMsg:''});
      	this.setState({errorOnTextField:''});
	}

	onSignINPasswordChange(text){
		
		this.setState({showpassErase:true});

		this.props.signInPasswordChanged(text);
		this.setState({errorMsg:''});
      	this.setState({errorOnTextField:''});
	}

	onSignUPFirstnameChange(text){

		this.setState({showFNameErase:true});
		
		this.props.signupFirstNameChanged(text);
		this.setState({errorMsg:''});
      	this.setState({errorOnTextField:''});
	}

	onSignUPLastnameChange(text){

		this.setState({showLNameErase:true});
		
		this.props.signupLastNameChanged(text);
		this.setState({errorMsg:''});
      	this.setState({errorOnTextField:''});
	}

	onSignUPEmailChange(text){

		this.setState({showEmailErase:true});
		
		this.props.signupEmailChanged(text);
		this.setState({errorMsg:''});
      	this.setState({errorOnTextField:''});
	}
	
	onSignUPPasswordChange(text){

		this.setState({showPasswordErase:true});
		
		this.props.signupPasswordChanged(text);
		this.setState({errorMsg:''});
      	this.setState({errorOnTextField:''});
	}

	onSignUPConfirmPasswordChange(text){

		this.setState({showCPasswordErase:true});
		
		this.props.signupConfirmPasswordChanged(text);
		this.setState({errorMsg:''});
      	this.setState({errorOnTextField:''});
	}

	onDateChange(text){
		console.log("dateOfBirth : "+text);
		this.setState({dateOfBirth:text});
	}	
	
	onUserNameEraseClicked(){
		this.setState({showUserErase:false});
		this.props.signInUsernameChanged('');		
	}

	onPasswordEraseClicked(){
		this.setState({showpassErase:false});
		this.props.signInPasswordChanged('');
	}

	onFirstNameEraseClicked(){
		this.setState({showFNameErase:false});
		this.props.signupFirstNameChanged('');
	}
	onLastNameEraseClicked(){
		this.setState({showLNameErase:false});
		this.props.signupLastNameChanged('');
	}
	onEmailEraseClicked(){
		this.setState({showEmailErase:false});
		this.props.signupEmailChanged('');
	}
	onSignupPasswordEraseClicked(){
		this.setState({showPasswordErase:false});
		this.props.signupPasswordChanged('');
	}
	onConfirmPassEraseClicked(){
		this.setState({showCPasswordErase:false});
		this.props.signupConfirmPasswordChanged('');
	}
	
	above18Clicked(){
		this.setState({isAbove18:!this.state.isAbove18});
	}

	render(){

    	return(
    		<View style={styles.container}>

    			{this.state.isLoginSuccessfull?
    				<TenantProfileScreen 
						userType={this.props.userType}
						loggedInUserData={loggedInUserData}
					/>
    				:
    			<KeyboardAwareScrollView contentContainerStyle={{paddingBottom:40}} keyboardShouldPersistTaps={'always'}>
    			

    				<View style={styles.logoContainerViewStyle}>
						<Image source={appLogoImage} />    					
    				</View>

    				<View style={styles.tabContainerViewStyle}>
						<TouchableOpacity onPress={() => this.onSignInClicked()} style={styles.tabStyle}>
							<Text>SIGNIN</Text>	
							{this.state.isSignINselected?<View style={styles.selectedTabIndicator}></View>:null}
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.onRegisterTabClicked()} style={styles.tabStyle}>
							<Text>REGISTER</Text>
							{this.state.isSignINselected?null:<View style={styles.selectedTabIndicator}></View>}
						</TouchableOpacity>
    				</View>

    				{this.state.isSignINselected?
	    				<View style={styles.signInViewContainerStyle}>	    				

		    					<View>
			    												    					
									<MaterialTextInput 	label={Strings.USERNAME}
							                            labelColor={Colors.BLACK}
							                            activeColor={Colors.BLACK}
							                            color={Colors.BLACK}
							                            fontSize={15}
							                            marginTop={30}
							                            paddingLeft={30}
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
							                            onChangeText={this.onUsernameChange.bind(this)}
							                            value={this.props.signInUsername}
			                        />
			                        <Image source={userNameInputImage}
												  style={styles.inlineInputImg} />
									
									{this.state.showUserErase?
										<TouchableOpacity onPress={() => this.onUserNameEraseClicked()} style={styles.reaseInputImg}>
											<Image source={errorInputImage} />
										</TouchableOpacity>	
										:null								
									}
				    			</View>
				    			{
						            this.state.errorMsg!=''&&this.state.errorOnTextField==0?<Text style={CommonStyles.errorText}>{this.state.errorMsg}</Text>:null
						        }

			    				<View>

									<MaterialTextInput 	label={Strings.PASSWORD}
							                            labelColor={Colors.BLACK}
							                            activeColor={Colors.BLACK}
							                            color={Colors.BLACK}
							                            fontSize={15}
							                            marginTop={30}
							                            paddingLeft={30}
							                            labelActiveTop={-30}
							                            underlineColor={Colors.BLACK}
							                            underlineActiveColor={Colors.BLACK}
							                            underlineHeight={0.5}
							                            underlineActiveHeight={0.5}
							                            autoCapitalize='none'
							                            autoCorrect={false}
							                            underlineColorAndroid='transparent'
							                            returnKeyType='done'
							                            secureTextEntry={true}
							                            onChangeText={this.onSignINPasswordChange.bind(this)}
							                            value={this.props.signInPassword}
			                        />
			                        <Image source={passInputImage}
												  style={styles.inlineInputImg} />	
									{this.state.showpassErase?
										<TouchableOpacity onPress={() => this.onPasswordEraseClicked()} style={styles.reaseInputImg}>
											<Image source={errorInputImage} />
										</TouchableOpacity>	
										:null								
									}								
			    				</View>
			    				{
						            this.state.errorMsg!=''&&this.state.errorOnTextField==1?<Text style={CommonStyles.errorText}>{this.state.errorMsg}</Text>:null
						        }

			    				<View style={styles.buttonViewStyle}>
										<TouchableOpacity
											onPress={() => this.onLogINClicked()}					
											style={styles.buttonOpacityStyle}>
													<Text style={styles.buttonTextStyle}>{Strings.BUTTON_LOGIN_TEXT}</Text>
										</TouchableOpacity>
								</View>

								<View style={styles.forgotViewStyle}>
									<Text style={styles.forgotTextStyle}>{Strings.FORGOT_PASS_TEXT}</Text>
								</View>

								<View style={styles.socialButtonsContainer}>
			    				<View style={styles.tabContainerViewStyle}>
									<TouchableOpacity onPress={() => this.onFacebookClicked()} style={styles.socialButtonStyle}>
										<Image source={facebookImage} />
									</TouchableOpacity>
									<TouchableOpacity onPress={() => this.onGoogleClicked()} style={styles.socialButtonStyle}>
										<Image source={googleImage} />
									</TouchableOpacity>
			    				</View>
			    				<View style={styles.socialButtonsLine}>
		    					</View>
		    				</View>

		    				<View style={styles.newMemberContainerStyle}>
		    					<TouchableOpacity onPress={() => this.onCreateAccountClicked()} style={styles.newMemberContainer}>
									<Text style={styles.newMemberTextStyle} >New Member?</Text>							
									<Text style={styles.createAccountTextStyle}>CREATE ACCOUNT</Text>							
								</TouchableOpacity>
		    				</View>

		    				
	    				</View>
	    				:
	    				
	    					<View style={styles.signInViewContainerStyle}>	    					
		    					<View>
										<MaterialTextInput 	label={Strings.FIRST_NAME}
								                            labelColor={Colors.BLACK}
								                            activeColor={Colors.BLACK}
								                            color={Colors.BLACK}
								                            fontSize={15}
								                            marginTop={20}
								                            paddingLeft={30}
								                            labelActiveTop={-30}
								                            underlineColor={Colors.BLACK}
								                            underlineActiveColor={Colors.BLACK}
								                            underlineHeight={0.5}
								                            underlineActiveHeight={0.5}
								                            autoCapitalize='none'
								                            autoCorrect={false}
								                            underlineColorAndroid='transparent'
								                            returnKeyType='next'
								                            onChangeText={this.onSignUPFirstnameChange.bind(this)}
								                            value={this.props.signupFirstName}
			                        	/>
			                        	<Image source={userInputImage}
													  style={styles.inlineInputImg} />
										{this.state.showFNameErase?
											<TouchableOpacity onPress={() => this.onFirstNameEraseClicked()} style={styles.reaseInputImg}>
												<Image source={errorInputImage} />
											</TouchableOpacity>	
											:null								
										}
					    		</View>
					    		{
						            this.state.errorMsg!=''&&this.state.errorOnTextField==2?<Text style={CommonStyles.errorText}>{this.state.errorMsg}</Text>:null
						        }

					    		<View>				    					
				    					
										<MaterialTextInput 	label={Strings.LAST_NAME}
								                            labelColor={Colors.BLACK}
								                            activeColor={Colors.BLACK}
								                            color={Colors.BLACK}
								                            fontSize={15}
								                            marginTop={20}
								                            paddingLeft={30}
								                            labelActiveTop={-30}
								                            underlineColor={Colors.BLACK}
								                            underlineActiveColor={Colors.BLACK}
								                            underlineHeight={0.5}
								                            underlineActiveHeight={0.5}
								                            autoCapitalize='none'
								                            autoCorrect={false}
								                            underlineColorAndroid='transparent'
								                            returnKeyType='done'
								                            onChangeText={this.onSignUPLastnameChange.bind(this)}
								                            value={this.props.signupLastName}
			                        	/>
			                        	<Image source={userInputImage}
													  style={styles.inlineInputImg} />
										{this.state.showLNameErase?
											<TouchableOpacity onPress={() => this.onLastNameEraseClicked()} style={styles.reaseInputImg}>
												<Image source={errorInputImage} />
											</TouchableOpacity>	
											:null								
										}
					    		</View>
					    		{
						            this.state.errorMsg!=''&&this.state.errorOnTextField==3?<Text style={CommonStyles.errorText}>{this.state.errorMsg}</Text>:null
						        }


						        {/*<View style={{marginTop:40}}>
						        				    					<Image source={userInputImage}
						        													  style={styles.inlineInputImg} />
						        										<DatePicker
						        
						                                                    style={styles.datePickerViewStyle}                                                         
						                                                    mode="date"
						                                                    date={this.state.dateOfBirth}
						                                                    showIcon={false}
						                                                    placeholder={Strings.DATE_OF_BIRTH}
						                                                    format={Strings.DATE_FORMAT}                                                         
						                                                    confirmBtnText={Strings.DATE_CONFIRM}
						                                                    cancelBtnText={Strings.DATE_CANCEL}
						                                                    minDate={this.state.minDate}
						                									maxDate={this.state.maxDate}
						                                                    customStyles={
						        
						                                                        {dateInput: 
						                                                                  {
						                                                                    width:window.width*0.6,
						                                                                    marginTop:0,
						                                                                    borderBottomWidth: 0.5,
						                                                                    borderLeftWidth: 0,
						                                                                    borderTopWidth: 0,
						                                                                    borderRightWidth: 0,
						                                                                    borderBottomColor:Colors.BLACK 
						                                                                  },
						                                                                  dateText:
						                                                                  {
						                                                                    color:Colors.BLACK,
						                                                                    fontSize:15,
						                                                                    fontWeight:'400',
						                                                                    paddingLeft:30,                                                            
						                                                                    alignSelf:'flex-start'
						                                                                                                                             
						                                                                  },
						                                                                  placeholderText:
						                                                                  {
						                                                                    color:Colors.BLACK,
						                                                                    fontSize:15,
						                                                                    paddingLeft:30,                                                            
						                                                                    alignSelf:'flex-start'
						                                                                                                                             
						                                                                  }}
						                                                	}
						                                                	onDateChange={this.onDateChange.bind(this)}
						                                              	/>  
						        				    															
						        					    		</View>*/}

					    		<View>				    					
				    					
										<MaterialTextInput 	label={Strings.EMAIL_ADDRESS}
								                            labelColor={Colors.BLACK}
								                            activeColor={Colors.BLACK}
								                            color={Colors.BLACK}
								                            fontSize={15}
								                            marginTop={30}
								                            paddingLeft={30}
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
								                            onChangeText={this.onSignUPEmailChange.bind(this)}
								                            value={this.props.singupEmail}
			                        	/>
			                        	<Image source={userNameInputImage}
													  style={styles.inlineInputImg} />
										{this.state.showEmailErase?
											<TouchableOpacity onPress={() => this.onEmailEraseClicked()} style={styles.reaseInputImg}>
												<Image source={errorInputImage} />
											</TouchableOpacity>	
											:null								
										}
					    		</View>
					    		{
						            this.state.errorMsg!=''&&this.state.errorOnTextField==4?<Text style={CommonStyles.errorText}>{this.state.errorMsg}</Text>:null
						        }

					    		<View>				    					
				    					
										<MaterialTextInput 	label={Strings.PASSWORD}
								                            labelColor={Colors.BLACK}
								                            activeColor={Colors.BLACK}
								                            color={Colors.BLACK}
								                            fontSize={15}
								                            marginTop={20}
								                            paddingLeft={30}
								                            labelActiveTop={-30}
								                            underlineColor={Colors.BLACK}
								                            underlineActiveColor={Colors.BLACK}
								                            underlineHeight={0.5}
								                            underlineActiveHeight={0.5}
								                            autoCapitalize='none'
								                            autoCorrect={false}
								                            underlineColorAndroid='transparent'
								                            returnKeyType='done'
								                            secureTextEntry={true}
								                            onChangeText={this.onSignUPPasswordChange.bind(this)}
								                            value={this.props.signupPassword}
				                        />
				                        <Image source={passInputImage}
													  style={styles.inlineInputImg} />
										{this.state.showPasswordErase?
											<TouchableOpacity onPress={() => this.onSignupPasswordEraseClicked()} style={styles.reaseInputImg}>
												<Image source={errorInputImage} />
											</TouchableOpacity>	
											:null								
										}
				    			</View>				    			
				    			{
						            this.state.errorMsg!=''&&this.state.errorOnTextField==5?<Text style={CommonStyles.errorText}>{this.state.errorMsg}</Text>:null
						        }
						        <Text style={CommonStyles.passwordText}>Password must be atleast 6 character long, with 1 capital letter, 1 small letter, 1 special chracter and a number.</Text>

				    			<View>				    									    					
										<MaterialTextInput 	label={Strings.CONFIRM_PASSWORD}
								                            labelColor={Colors.BLACK}
								                            activeColor={Colors.BLACK}
								                            color={Colors.BLACK}
								                            fontSize={15}
								                            marginTop={20}
								                            paddingLeft={30}
								                            labelActiveTop={-30}
								                            underlineColor={Colors.BLACK}
								                            underlineActiveColor={Colors.BLACK}
								                            underlineHeight={0.5}
								                            underlineActiveHeight={0.5}
								                            autoCapitalize='none'
								                            autoCorrect={false}
								                            underlineColorAndroid='transparent'
								                            returnKeyType='done'
								                            secureTextEntry={true}
								                            onChangeText={this.onSignUPConfirmPasswordChange.bind(this)}
								                            value={this.props.signupConfirmPassword}
				                        />
				                        <Image source={passInputImage}
													  style={styles.inlineInputImg} />
										{this.state.showCPasswordErase?
											<TouchableOpacity onPress={() => this.onConfirmPassEraseClicked()} style={styles.reaseInputImg}>
												<Image source={errorInputImage} />
											</TouchableOpacity>	
											:null								
										}
				    			</View>
				    			{
						            this.state.errorMsg!=''&&this.state.errorOnTextField==6?<Text style={CommonStyles.errorText}>{this.state.errorMsg}</Text>:null
						        }

						        <TouchableOpacity style={{flexDirection:'row', marginTop:20, alignItems:'center'}} onPress={() => this.above18Clicked()}>
						        	<Image source={this.state.isAbove18?blackCheckImage:blackUnCheckImage} />
						        	<Text style={CommonStyles.ageConfirmText}>Yes I am 18 Years above</Text>
						        </TouchableOpacity>
				    			<View style={styles.registerButtonViewStyle}>
										<TouchableOpacity				
											onPress={() => this.onRegisterClicked()}	
											style={styles.buttonOpacityStyle}>
													<Text style={styles.buttonTextStyle}>{Strings.BUTTON_REGISTER_TEXT}</Text>
										</TouchableOpacity>
								</View>							

	    					</View>
	    				
    				}

    				

    			</KeyboardAwareScrollView>
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

const mapStateToProps = ({ loginReducer }) => {

  const {
  	signInUsername,
	signInPassword,
	getTokenResp,
	getExternalLoginsResp,
	signupFirstName,
	signupLastName,
	singupEmail,
	signupPassword,
	signupConfirmPassword,
	registerRes,
	loggedInUserDetail
  } = loginReducer;
    
  // console.log("registerRes Output: "+JSON.stringify(registerRes));
  // console.log("loggedInUserDetail Output: "+JSON.stringify(loggedInUserDetail));
  // console.log("getExternalLoginsResp Output: "+JSON.stringify(getExternalLoginsResp));

  return {
    signInUsername: signInUsername,
    signInPassword: signInPassword,
    getTokenResp: getTokenResp,
    getExternalLoginsResp: getExternalLoginsResp,
    signupFirstName: signupFirstName,
    signupLastName: signupLastName,
    singupEmail: singupEmail,
    signupPassword: signupPassword,
    signupConfirmPassword: signupConfirmPassword,
    registerRes: registerRes,
    loggedInUserDetail: loggedInUserDetail
  }
}

module.exports = connect(mapStateToProps,{
	signInUsernameChanged,
	signInPasswordChanged,
	signupFirstNameChanged,
	signupLastNameChanged,
	signupEmailChanged,
	signupPasswordChanged,
	signupConfirmPasswordChanged,
	registerUser,
	clearRegisterUserResponse,
	getToken,
	clearTokenResponse,
	getExternalLogins,
	clearExtTokenResponse,
	getLoggedInUserDetails,
	clearLoggedInUserDetailsResponse,
	userAuthenticated
})(Login);
