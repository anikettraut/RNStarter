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

import{ Actions}    from 'react-native-router-flux';

import Colors       from '../../../Constants/Colors';
import Strings      from '../../../Constants/Strings';
import styles       from './OtherResidentScreenStyle';
import CommonStyles from '../../../CommonStyle/CommonStyle';

import ImageSlider from 'react-native-image-slider';

import appLogoImage from '../../../Assets/logo.png';
import checkImage from '../../../Assets/check_selected.png';
import uncheckImage from '../../../Assets/check.png';
import TextField from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
const window = Dimensions.get('window');
 let data = [{
      value: '1',
    }, {
      value: '2',
    }, {
      value: '3',
    }];

class OtherResidentScreen extends Component{


    constructor() {

        super();
            this.state = {
            };   
            
    }
    
    componentWillMount() {
        
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {                        
            
        });        
    }

    onGeneralInfoClicked() {
        Actions.GeneralInfoScreen();
    }


    onFirstnameChange() {

    }


	render(){
    	return(
    		<View style={styles.container}> 
                <View style={{flex:1,margin:15}}>                 
                    <Text style={{fontWeight:'bold'}}>Other Residents</Text>
                    <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:20}}>
                        
                        <Text style={{fontWeight:'400'}}>Who's moving with you?</Text>
                       

                    </View>

                   <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text>No of Residents</Text>

                             <Dropdown
                                containerStyle={{width:window.width*0.2}}
                                label='Action'
                                data={data}
                              />
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text>No of Dependents</Text>

                             <Dropdown
                                containerStyle={{width:window.width*0.2}}
                                label='Action'
                                data={data}
                              />
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text>No of Vehicle</Text>

                             <Dropdown
                                containerStyle={{width:window.width*0.2}}
                                label='Action'
                                data={data}
                              />
                    </View>

                     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text>Primary Vehicle Model</Text>

                             <Dropdown
                                containerStyle={{width:window.width*0.4}}
                                label='Action'
                                data={data}
                              />
                    </View>
                    
                    <View>
                         <TextField  label={Strings.ADULTS} 
                                    labelStyle={styles.regisLabelStyle}
                                    inputStyle={styles.regisLabelStyle}  
                                    highlightColor={Colors.BLACK}
                                    labelColor={Colors.TEXT_INPUT_LABEL_COLOR}
                                    textColor={Colors.TEXT_INPUT_LABEL_COLOR}
                                    borderColor={Colors.FORGOT_TEXT_COLOR}
                                    selectionColor={Colors.BLACK}
                                    returnKeyType='next'
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    onSubmitEditing={(event)=>{this.refs.inputPass.focus()}}
                                    onChangeText={this.onFirstnameChange.bind(this)}
                                    value={this.props.signInUsername}
                            />
                    </View>
                    


                    <View style={{flex:1,justifyContent:'flex-end',marginBottom:20}}>
                         <View style={{flexDirection:'row' ,justifyContent:'space-between'}}>
                            <TouchableOpacity style={{backgroundColor:'#333333',height:window.width*0.25/2,width:window.width*0.35,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{color:'#ffffff'}}>SAVE & EXIT</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{backgroundColor:'red',height:window.width*0.25/2,width:window.width*0.35,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{color:'#ffffff'}}>NEXT</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
    		</View>
    	);
	}

}

export default OtherResidentScreen;
