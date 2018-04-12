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


import{ Actions}    from 'react-native-router-flux';
import Colors       from '../../Constants/Colors';
import Strings      from '../../Constants/Strings';
import styles       from './ProfileStatusStyle';

import check_selected from '../../Assets/check_selected.png';

import * as Animatable from 'react-native-animatable';

var self;
const window = Dimensions.get('window');

class ProfileStatusScreen extends Component{


    constructor() {

        super();
        this.state = {
            accessToken : '',                       
        };   
        self = this;
    }
    
    componentWillMount() {
        console.log("loggedInUserData>>>> "+JSON.stringify(this.props.loggedInUserData));
    }

    componentDidMount() {
           
    }
    
    componentWillUnmount(){   
    }

    onChangePasswordClicked(){
        Actions.ChangePasswordScreen();
    }    

    render(){
        return(
            <View style={styles.mainContainer}>  
                <ScrollView>        
                    <View style={{paddingTop:10, margin:10, flexDirection:'row', alignItems:'center'}}>
                        <Text style={{fontSize:14, fontWeight:'700', width:110}}> Name </Text>   
                        <Animatable.Text animation="fadeInRight" style={{fontSize:14, marginLeft:20}}>{this.props.loggedInUserData.FirstName? this.props.loggedInUserData.FirstName : ''}</Animatable.Text>
                    </View>
                    <View style={styles.seperatorLine}/>
                    <View style={{margin:10, flexDirection:'row', alignItems:'center'}}>
                        <Text style={{fontSize:14, fontWeight:'700', width:110}}> Email </Text>   
                        <Animatable.Text animation="fadeInRight" style={{fontSize:14, marginLeft:20}}>{this.props.loggedInUserData.Email? this.props.loggedInUserData.Email : ''}</Animatable.Text>
                    </View>
                    <View style={styles.seperatorLine}/>
                    <View style={{margin:10, flexDirection:'row', alignItems:'center'}}>
                        <Text style={{fontSize:14, fontWeight:'700', width:110}}> Rental Resume </Text>   
                        <Animatable.Text animation="fadeInRight" style={{fontSize:14, marginLeft:20}}>{this.props.loggedInUserData.IsRentalResumeCompleted? 'Verified' : 'Not Verified'}</Animatable.Text>
                    </View>
                    <View style={styles.seperatorLine}/>
                    <View style={{margin:10, flexDirection:'row', alignItems:'center'}}>
                        <Text style={{fontSize:14, fontWeight:'700', width:110}}> Vetting Status </Text>   
                        <Animatable.Text animation="fadeInRight" style={{fontSize:14, marginLeft:20}}>{this.props.loggedInUserData.IsVettingDone? 'Verified' : 'Not Verified'}</Animatable.Text>
                    </View>
                    <View style={styles.seperatorLine}/>
                    <View style={{margin:10, flexDirection:'row', alignItems:'center'}}>
                        <Text style={{fontSize:14, fontWeight:'700', width:110}}> Bidding Done </Text>   
                        <Animatable.Text animation="fadeInRight" style={{fontSize:14, marginLeft:20}}> No </Animatable.Text>
                    </View>
                    <View style={styles.seperatorLine}/>
                    <View style={{width:window.width*0.9, alignItems:'center', margin:20}}>                            

                        <TouchableOpacity 
                            onPress={() => this.onChangePasswordClicked()}
                            style={{borderRadius:6, backgroundColor:Colors.APP_THEME_RED_COLOR,height:40,width:window.width*0.6,alignItems:'center',justifyContent:'center'}}
                        > 
                                <Text style={{color:'#ffffff'}}>Change Password</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </View>
        );
    }

}

export default ProfileStatusScreen;