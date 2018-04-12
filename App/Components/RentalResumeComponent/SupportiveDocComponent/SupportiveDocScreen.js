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
   FlatList
} from 'react-native';

import {    
    getTenantSupportingDocu
} from './SupportiveDocAction';

import{ Actions}    from 'react-native-router-flux';

import Colors       from '../../../Constants/Colors';
import Strings      from '../../../Constants/Strings';
import styles       from './SupportiveDocStyle';
import CommonStyles from '../../../CommonStyle/CommonStyle';

import { Dropdown } from 'react-native-material-dropdown';
import * as Progress from 'react-native-progress';

import binImage from '../../../Assets/bin.png';

const window = Dimensions.get('window');
let data = [{
      value: 'Accountant letter',
    }, {
      value: 'Bank statements',
    }, {
      value: 'Centrelink statement',
    }, {
      value: 'Group certificate',
    }, {
      value: 'Other',
    }, {
      value: 'Recent payslip',
    }, {
      value: 'References',
    }, {
      value: 'Rental ledger',
    }, {
      value: 'Tax return',
    }];


class SupportiveDocScreen extends Component{


    constructor() {

        super();
            this.state = {
                isScreenLoading: false,
                showSelectFileButton: false,
                supportiveProof:'',

                uploadedFiles:[],
                loggedInUserData:'',
            };   
            
    }
    
    componentWillMount() {
        
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {                        
            
              AsyncStorage.getItem("loggedInUserInfo").then((value) => {
                    if(value) {                
                        var loggedInUserData = JSON.parse(value);                
                        this.setState({loggedInUserData: loggedInUserData});
                        //this.callGetTenantSupportingDocuWebService(loggedInUserData.ID)             
                    }            
                }).done(); 

        });        
    }


    componentWillReceiveProps(nextProps) {
        // Handle getTenantSupportingDocu service response
        if(nextProps.tenantSupportingDocResponse != undefined && nextProps.tenantSupportingDocResponse != ''){

            this.setState({isScreenLoading:false});            

            if(nextProps.tenantSupportingDocResponse.headerResponse.status == 200){  
                if(nextProps.tenantSupportingDocResponse.data.Content.Content != null){
                    this.setState({uploadedFiles :  nextProps.tenantSupportingDocResponse.data.Content.Content});
                    this.fillUserInfo(nextProps.tenantSupportingDocResponse.data.Content.Content);
                }else{
                    alert(nextProps.tenantSupportingDocResponse.data.ReturnMessage[0]);
                }                                
            }
            else if(nextProps.tenantSupportingDocResponse.headerResponse.status == 400){
                alert(nextProps.tenantSupportingDocResponse.data.error_description);
            }
            else if(nextProps.tenantSupportingDocResponse.headerResponse.status == 500){
                alert('Internal Server Error');
            }
        }
    }

    componentDidUpdate() { 
        if(this.props.tenantSupportingDocResponse != undefined && this.props.tenantSupportingDocResponse != ''){  
            console.log("uploadedFiles>>> "+JSON.stringify(this.state.uploadedFiles));            
        }
    }

    componentWillUnmount() {        
        var emptyArray = [];
        this.setState({uploadedFiles:emptyArray});        
    }

    callGetTenantSupportingDocuWebService(userID) {
        /***************** Call getTenantSupportingDocu WebService ****************/            
            this.setState({isScreenLoading:true}); 
            var postData = {
                UserId: userID
            }                    
            this.props.getTenantSupportingDocu(postData);            
        /*************************************************************************/
    }

    fillUserInfo(files){       

        this.setState({uploadedFiles:files});
    }

    onSupportiveStatusChange(value, index, data) {                
        this.setState({showSelectFileButton:true, supportiveProof:value});
    } 

    onSaveAndExitClicked() {
        Actions.popTo('RentalResumeMenu');
    }

    onNextClicked() {
        Actions.ContactReferenceScreen();
    }

    deleteItem(index) {
        var tempArray = this.state.uploadedFiles;
        tempArray.splice(index, 1);
        this.setState({uploadedFiles:tempArray});
    }  


    renderItem({ item, index }) {

        console.log("item>>> "+JSON.stringify(item));

        var docType =  data[item.DocuTypeId-1].value;

        return(
                <View style={{flex:1, margin:10, width:window.width*0.85}}>

                    <View style={{flexDirection:'row'}}>
                        <Text style={{color:'#000000', fontSize:12, fontWeight:'700', marginRight:10}}>{index+1}</Text>

                        <View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize:12, fontWeight:'700'}}>FileName: </Text>
                                <Text style={{width:window.width*0.5, fontSize:12, fontWeight:'500'}}>{item.Docuname?item.Docuname:''}</Text>                  
                            </View>

                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize:12, fontWeight:'700'}}>FileType: </Text>
                                <Text style={{width:window.width*0.5, fontSize:12, fontWeight:'500'}}>{docType?docType:''}</Text>                  
                            </View>
                        </View>

                        <TouchableOpacity onPress={() => this.deleteItem(index)} style={{flex:1,justifyContent:'flex-end'}}>
                            <Image style={{marginLeft:10, width:15, height:15}} source={binImage} />
                        </TouchableOpacity>

                    </View>
                </View>
            );
    }    


	  render(){
    	return(
    		<View style={styles.container}>                 
                  
                    <View style={{borderWidth:1, borderColor:Colors.DARK_GRAY_COLOR, width:window.width*0.95, marginTop:10, alignItems:'center'}}>
                        <Text style={{fontSize:16, fontWeight:'500', margin:10, color:Colors.APP_THEME_RED_COLOR}}>
                            Supporting documents
                        </Text>

                        <View>                                                
                            <Dropdown
                                containerStyle={{width:window.width*0.9}}
                                label={Strings.SELECT_SUPPORTIVE_PROOF}
                                data={data}
                                onChangeText={this.onSupportiveStatusChange.bind(this)}
                                value={this.state.supportiveProof}
                            />     
                            {this.state.showSelectFileButton?                          
                                <TouchableOpacity style={{marginTop:10, backgroundColor:'#333333',height:window.width*0.1,width:window.width*0.9,alignItems:'center',justifyContent:'center'}}>
                                    <Text style={{color:'#ffffff'}}>{Strings.SELECT_FILE_TO_UPLOAD}</Text>
                                </TouchableOpacity>          
                                :null           
                            }                 
                        </View>

                        {(this.state.uploadedFiles > 0) ?
                            <View style={{width:window.width*0.9, backgroundColor:'#ffffff', marginTop:30}}>
                                <Text style={{fontWeight:'bold'}}>{Strings.UPLOADED_FILES}</Text>
                                <FlatList                        
                                    data={this.state.uploadedFiles}
                                    renderItem={this.renderItem}
                                    extraData={this.state}
                                />
                            </View>
                        :null
                        }

                        <View style={{width:window.width*0.8, alignItems:'center', margin:20}}>                            

                            <TouchableOpacity 
                                onPress={() => this.onSaveAndExitClicked()}
                                style={{backgroundColor:Colors.APP_THEME_RED_COLOR,height:40,width:window.width*0.35,alignItems:'center',justifyContent:'center'}}
                            > 
                                    <Text style={{color:'#ffffff'}}>Save & Continue</Text>
                            </TouchableOpacity>

                        </View>
                        
                        {/*<View style={{flex:1,justifyContent:'flex-end',marginTop:30}}>
                                                     <View style={{flexDirection:'row' ,justifyContent:'space-between'}}>
                                                        <TouchableOpacity 
                                                            onPress={() => this.onSaveAndExitClicked()}
                                                            style={{backgroundColor:'#333333',height:window.width*0.25/2,width:window.width*0.35,alignItems:'center',justifyContent:'center'}}>
                                                            <Text style={{color:'#ffffff'}}>SAVE & EXIT</Text>
                                                        </TouchableOpacity>
                        
                                                        <TouchableOpacity
                                                            onPress={() => this.onNextClicked()}
                                                            style={{backgroundColor:'red',height:window.width*0.25/2,width:window.width*0.35,alignItems:'center',justifyContent:'center'}}>
                                                            <Text style={{color:'#ffffff'}}>NEXT</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>*/}

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

const mapStateToProps = ({ supportiveDocReducer }) => {

  const {
    tenantSupportingDocResponse,
  } = supportiveDocReducer;
  
  return {
    tenantSupportingDocResponse: tenantSupportingDocResponse,
  }
}

export default connect(mapStateToProps,{
    getTenantSupportingDocu
})(SupportiveDocScreen);