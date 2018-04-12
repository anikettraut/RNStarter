import React,{Component} from 'react';
import { connect } from 'react-redux';
import {
    AppRegistry,
	Image,
	StyleSheet,
	View,
    Text,    
    Button,
	TouchableOpacity,
	Alert,
	Platform,	
    FlatList,
    AsyncStorage,
    Dimensions,
    InteractionManager
} from 'react-native';

import{ Actions}    from 'react-native-router-flux';

import {    
    clearGetSavedSearchPropertyResponse
} from './SavedSearchesAction';

import {    
    getSavedSearchProperty,    
} from "../../Action/ActionCreators";

import * as Progress from 'react-native-progress';

import Colors       from '../../Constants/Colors';
import Strings      from '../../Constants/Strings';
import styles       from './SavedSearchesStyle';
import CommonStyles from '../../CommonStyle/CommonStyle';
import DynamicListRow from '../CommonComponent/DynamicListRow';

import arrowImage from '../../Assets/arrow.png';
import clockImage from '../../Assets/clock.png';

import bathImage from '../../Assets/bath.png';
import bedImage from '../../Assets/bed.png';
import parkingImage from '../../Assets/parking.png';
import alertImage from '../../Assets/notification_s.png';
import binImage from '../../Assets/bin.png';

const window = Dimensions.get('window');

var self;

class SavedSearchesScreen extends Component{


    constructor() {        

        super();
            this.state = {
                isScreenLoading:false,                
                savedSearchesList: [],  
                loggedInUserData: '',                              
            };
            self = this;  
    }
    
    componentWillMount() {
        
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {                                                

            AsyncStorage.getItem("loggedInUserInfo").then((value) => {
                if(value) {                
                    var loggedInUserData = JSON.parse(value); 
                    console.log("loggedInUserData>>>> "+JSON.stringify(loggedInUserData));
                    this.setState({loggedInUserData: loggedInUserData});
                    this.callGetPropertyInfoBySearchWebService(loggedInUserData.ID);              
                }            
            }).done();


        }); 

          
    }

    componentWillReceiveProps(nextProps) {
        
        // Handle getSavedSearchProperty service response
        if(nextProps.savedSearchPropertyList != undefined && nextProps.savedSearchPropertyList != ''){

            this.setState({isScreenLoading:false});            

            if(nextProps.savedSearchPropertyList.headerResponse.status == 200){                  
                this.setState({savedSearchesList :  nextProps.savedSearchPropertyList.data.Content});
            }
            else if(nextProps.savedSearchPropertyList.headerResponse.status == 400){
                alert(nextProps.savedSearchPropertyList.data.error_description);
            }
            else if(nextProps.savedSearchPropertyList.headerResponse.status == 500){
                alert('Internal Server Error');
            }
        }
    }

    componentDidUpdate() {           
        if(this.props.savedSearchPropertyList != undefined && this.props.savedSearchPropertyList != ''){  
            //this.props.clearGetSavedSearchPropertyResponse();
        }
    }

    componentWillUnmount() {        
        this.setState({savedSearchesList:[]});
    }

    callGetPropertyInfoBySearchWebService(userID) {
        /***************** Call getSavedSearchProperty WebService ****************/ 

            this.setState({isScreenLoading:true});   
            var postData = {                  
                UserId: userID,                
            }                  
            this.props.getSavedSearchProperty(postData);            
        /*************************************************************************/
    }    
    
    onListItemClicked(index) {

    }

    onStarClicked(index) {

    }

    deleteItem(index) {

    }

    alertClicked(index) {

    }

    _renderRow({ item, index }) {                     
        return (
            <DynamicListRow>                     
                <TouchableOpacity style={styles.rowContainer} onPress={() => self.onListItemClicked(index)}>
                    <View style={{width:window.width*0.9, borderBottomColor: 'gray', borderBottomWidth:1}}>
                        <Text style={{fontWeight:'bold', marginTop:15, marginBottom:15}}>{item.NameSearch?item.NameSearch:''}</Text>
                    </View>
                    <View style={{width:window.width*0.9, marginTop:10}}>
                        <Text style={{fontSize:14}}>{item.MaxPrice?('Price: '+item.MaxPrice):'Any Price'}</Text>                        
                    </View>
                    <View style={{width:window.width*0.9, marginTop:10, flexDirection:'row'}}>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', width:window.width*0.3, height:50}}>                                                        
                            <Image source={bedImage} style={{width:20, height:20}}/>
                            <Text textAlign='center' style={{margin:8, fontSize:14, fontWeight:'500'}}>{item.Bedrooms?item.Bedrooms:'0'}</Text>
                        </View>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', width:window.width*0.3, height:50}}>                                                        
                            <Image source={bathImage} style={{width:20, height:20}}/>
                            <Text textAlign='center' style={{margin:8, fontSize:14, fontWeight:'500'}}>{item.Bathrooms?item.Bathrooms:'0'}</Text>
                        </View>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', width:window.width*0.3, height:50}}>                                                        
                            <Image source={parkingImage} style={{width:20, height:20}}/>
                            <Text textAlign='center' style={{margin:8, fontSize:14, fontWeight:'500'}}>{'2'}</Text>
                        </View>
                    </View>
                    <View style={{width:window.width*0.9, marginTop:10}}>
                        <Text style={{fontSize:14, color:'gray', marginBottom:20}}>Wantiool, NSW 2663; Wantabadgery, NSW 2650; inc surrounding.</Text>
                    </View>
                    <View style={{width:window.width*0.9, marginTop:10, flexDirection:'row', justifyContent:'space-between'}}>
                        <TouchableOpacity onPress={() => self.deleteItem(index)} style={{width:40, height:40}}>
                            <Image style={{width:15, height:15}} source={binImage} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => self.alertClicked(index)} style={{width:40, height:40}}>
                            <Image  source={alertImage} />
                        </TouchableOpacity>

                    </View>
                </TouchableOpacity>                 
            </DynamicListRow>
        );
    }

	render(){
    	return(
    		<View style={styles.container}> 
                <View style={{width:window.width, alignItems:'center',}}>
                    <FlatList                        
                        data={this.state.savedSearchesList}
                        renderItem={this._renderRow}
                        extraData={this.state}
                        showsVerticalScrollIndicator={false}
                    />
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

const mapStateToProps = ({ savedSearchesReducer }) => {

  const {
    savedSearchPropertyList,
  } = savedSearchesReducer;
  
  return {
    savedSearchPropertyList: savedSearchPropertyList,
  }
}

export default connect(mapStateToProps,{    
    getSavedSearchProperty
})(SavedSearchesScreen);
