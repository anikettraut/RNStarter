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
    AsyncStorage,
    Dimensions,
    ListView,
    InteractionManager,
    Modal
} from 'react-native';

import {    
    changePassword,        
} from "../../Action/ActionCreators";

import {        
    clearChangePasswordResponse,    
} from './ChangePasswordAction';

import{ Actions}    from 'react-native-router-flux';
import Colors       from '../../Constants/Colors';
import Strings      from '../../Constants/Strings';
import styles       from './ChangePasswordStyle';
import CommonStyles from '../../CommonStyle/CommonStyle';

import {validateEmail} from '../../Constants/CommonFunctions';

import MaterialTextInput from 'react-native-material-textinput';
import * as Progress from 'react-native-progress';

import check_selected from '../../Assets/check_selected.png';

var self;
const window = Dimensions.get('window');

class ChangePasswordScreen extends Component{

    constructor() {

        super();
        this.state = {
                        
            currentPass : '',            
            newPass : '',            
            confirmPass : '',

            currentPassError : '',
            newPassError : '',
            confirmPassError : '',

            loggedInUserData : '',
            isScreenLoading: false,
                                  
        };   
        self = this;
    }
    
    componentWillMount() {
        AsyncStorage.getItem("loggedInUserInfo").then((value) => {
            if(value) {                
                var loggedInUserData = JSON.parse(value);                
                this.setState({loggedInUserData: loggedInUserData});                
            }            
        }).done();
    }

    componentDidMount() {
           
    }

    componentWillReceiveProps(nextProps) {
        // Handle changePassword service response
        if(nextProps.changePasswordResponse != undefined && nextProps.changePasswordResponse != ''){

            this.setState({isScreenLoading:false});                        

            if(nextProps.changePasswordResponse.headerResponse.status == 200){                 
                if(nextProps.changePasswordResponse.data.Content != null){                    
                        Actions.pop();
                }                        
            }
            else if(nextProps.changePasswordResponse.headerResponse.status == 401){
                alert(nextProps.changePasswordResponse.data.Message);
            }
            else if(nextProps.changePasswordResponse.headerResponse.status == 400){
                alert(nextProps.changePasswordResponse.data.error_description);
            }
            else if(nextProps.changePasswordResponse.headerResponse.status == 500){
                alert('Internal Server Error');
            }
        }
    }

    componentDidUpdate() {   
        if(this.props.changePasswordResponse != undefined && this.props.changePasswordResponse != ''){              
            this.props.clearChangePasswordResponse();        
        }        
    }
    
    componentWillUnmount(){   
    }

    callChangePasswordWebService(userID) {
        /***************** Call changePassword WebService ****************/            
            this.setState({isScreenLoading:true}); 
            var postData = {
                OldPassword: this.state.currentPass,
                NewPassword: this.state.newPass,
                UserId: userID
            }                    
            this.props.changePassword(postData);            
        /*************************************************************************/
    }

    onSubmitClicked(){

        var errors = [];

        var checkCurrentPass = this.state.currentPass.replace(/\s/g,"");
        var checkNewPass = this.state.newPass.replace(/\s/g,"");
        var checkConfirmPass = this.state.confirmPass.replace(/\s/g,"");

        if(checkCurrentPass.length == 0){        
            this.setState({currentPassError:'Please provide your current password'})
            errors.push('currentPassError');
        }else{
            this.setState({currentPassError:''})
        }

        if(checkNewPass.length == 0){        
            this.setState({newPassError:'Please provide your new password'})
            errors.push('newPassError');
        }else{
            this.setState({newPassError:''})
        }

        if(checkConfirmPass.length == 0){        
            this.setState({confirmPassError:'Please confirm your new password'})
            errors.push('confirmPassError');
        }else{
            this.setState({confirmPassError:''})
        }

        // if(!validateEmail(this.state.newPass)){
        //     this.setState({newPassError:'Please provide valid password'})
        //     errors.push('newPassError');
        // }else{
        //     this.setState({newPassError:''})
        // }

        if(this.state.newPass != this.state.confirmPass){          
            this.setState({confirmPassError:'New password and confirm password must be same'})
            errors.push('confirmPassError');
        }else{
            this.setState({confirmPassError:''})
        }

        if(errors.length > 0){
            return;
        }
        else{
            this.callChangePasswordWebService(this.state.loggedInUserData.UserID);
        }
    }

    onCurrentPassChange(pass) {
        this.setState({currentPass:pass, currentPassError:''});
    }    
    
    onNewPassChange(pass) {
        this.setState({newPass:pass, newPassError:''});
    }    

    onConfirmPassMobileChange(pass) {
        this.setState({confirmPass:pass, confirmPassError:''});
    }    

    render(){
        return(
            <View style={styles.mainContainer}>  
                

                    <View style={{width:window.width*0.9}}>
                        <MaterialTextInput  label={'Current Password'}
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
                                            secureTextEntry={true}
                                            onChangeText={this.onCurrentPassChange.bind(this)}
                                            value={this.state.currentPass}
                        /> 
                    </View>
                    {(this.state.applicantMobileError == '')?null:
                        <Text style={CommonStyles.errorText}>{this.state.currentPassError}</Text>                                
                    } 

                    <View style={{width:window.width*0.9}}>
                        <MaterialTextInput  label={'New Password'}
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
                                            secureTextEntry={true}
                                            onChangeText={this.onNewPassChange.bind(this)}
                                            value={this.state.newPass}
                        /> 
                    </View>
                    {(this.state.applicantMobileError == '')?null:
                        <Text style={CommonStyles.errorText}>{this.state.newPassError}</Text>                                
                    } 
                    <View style={{width:window.width*0.9}}>
                        <Text style={CommonStyles.passwordText}>Password must be atleast 6 character long, with 1 capital letter, 1 small letter, 1 special chracter and a number.</Text>
                    </View>

                    <View style={{width:window.width*0.9}}>
                        <MaterialTextInput  label={'Confirm Password'}
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
                                            secureTextEntry={true}
                                            onChangeText={this.onConfirmPassMobileChange.bind(this)}
                                            value={this.state.confirmPass}
                        /> 
                    </View>
                    {(this.state.applicantMobileError == '')?null:
                        <Text style={CommonStyles.errorText}>{this.state.confirmPassError}</Text>                                
                    }       
                    
                    <View style={{width:window.width*0.6, alignItems:'center', margin:20}}>                            

                        <TouchableOpacity 
                            onPress={() => this.onSubmitClicked()}
                            style={{borderRadius:6, backgroundColor:Colors.APP_THEME_RED_COLOR,height:40,width:window.width*0.4,alignItems:'center',justifyContent:'center'}}
                        > 
                                <Text style={{color:'#ffffff'}}>Submit</Text>
                        </TouchableOpacity>

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

const mapStateToProps = ({ changePasswordReducer }) => {

  const {
    changePasswordResponse
  } = changePasswordReducer;

  return {
    changePasswordResponse: changePasswordResponse,    
  }
}

export default connect(mapStateToProps,{
    changePassword,    
    clearChangePasswordResponse
})(ChangePasswordScreen);