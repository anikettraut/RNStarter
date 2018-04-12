import React,{Component} from 'react';

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

import{ Actions}    from 'react-native-router-flux';

import Colors       from '../../Constants/Colors';
import Strings      from '../../Constants/Strings';
import styles       from './HomeStyle';

import * as Animatable from 'react-native-animatable';

import appLogoImage from '../../Assets/logo.png';
import homebgImage from '../../Assets/homebg.png';

class HomeScreen extends Component{


    constructor() {

        super();
            this.state = {
                accessToken : '',
            };   
            
    }
    
    componentWillMount() {
        // AsyncStorage.clear();
    }

    componentWillUnmount(){        
        
    }    

    onTenantClick(){                
        

        AsyncStorage.getItem("loggedInUserInfo").then((value) => {
            if(value) {                
                var loggedInUserData = JSON.parse(value);                
                Actions.Dashboard({userType: Strings.kTENANT, loggedInUserData:loggedInUserData});                
            }
            else{
                Actions.Dashboard({userType: Strings.kTENANT, loggedInUserData:''});                      
            }
        }).done();

    }

    onLandlordClick(){        
        //Actions.Login({userType: Strings.kLANDLORD});
    }

	render(){
    	return(
    		<View style={styles.mainContainer}>
                <Image source={homebgImage} style={styles.imageContainer} />
                
                <View style={styles.logoContainerViewStyle}>
                    <Image source={appLogoImage} />                     
                </View>

                <View style={styles.taglineContainerViewStyle}>
                    <Text style={styles.taglineTextStyle}>FIND A RENTAL, FIND A HOME.</Text>
                    <Text style={styles.tagDescTextStyle}>At LeaseAgent we believe in giving you real service; real people; real conversations and real outcomes, we listen to you and focus on exactly what it is you need</Text>
                </View>

                <View style={styles.buttonsContainerViewStyle}>
                    
                    <Animatable.View animation="flipInX" style={styles.buttonViewStyle}>
                        <TouchableOpacity onPress={() => this.onTenantClick()}                  
                            style={styles.tenantButtonOpacityStyle}>
                                <Text style={styles.buttonTextStyle}>{Strings.TENANT_BUTTON_TITLE}</Text>
                        </TouchableOpacity>
                    </Animatable.View>

                    <Animatable.View animation="flipInX" style={styles.buttonViewStyle}>
                        <TouchableOpacity onPress={() => this.onLandlordClick()}                   
                            style={styles.landlordButtonOpacityStyle}>
                                <Text style={styles.buttonTextStyle}>{Strings.LANDLORD_BUTTON_TITLE}</Text>
                        </TouchableOpacity>
                    </Animatable.View>

                </View>

    		</View>
    	);
	}

}

export default HomeScreen;
