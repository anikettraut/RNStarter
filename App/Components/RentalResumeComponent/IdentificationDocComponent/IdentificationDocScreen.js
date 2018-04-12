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
    clearUploadMyFileDocResponse,
} from './IdentificationDocAction';

import {    
    getTenantIdentificationDocu,
    deleteIdentityDocument,
    uploadMyFileDoc
} from "../../../Action/ActionCreators";

import {        
    refreshRentalResumeMenu
} from '../RentalResumeMenu/RentalResumeMenuAction';

import{ Actions}    from 'react-native-router-flux';

import Colors       from '../../../Constants/Colors';
import Strings      from '../../../Constants/Strings';
import styles       from './IdentificationDocStyle';
import CommonStyles from '../../../CommonStyle/CommonStyle';

import { Dropdown } from 'react-native-material-dropdown';
import * as Progress from 'react-native-progress';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import RNFetchBlob from 'react-native-fetch-blob';

import binImage from '../../../Assets/bin.png';

var self;

const window = Dimensions.get('window');
let data = [{
      value: 'Concession - 10pts',
    }, {
      value: 'Copy of Electricity - 10pts',
    }, {
      value: 'Copy of Gas - 10pts',
    }, {
      value: 'Copy of Medicare Card - 20pts',
    }, {
      value: 'Copy of Utilities Account - 10pts',
    }, {
      value: 'Copy of Water - 10pts',
    }, {
      value: 'Drivers License - 30pts',
    }, {
      value: 'Offer Confirmation - 10pts',
    }, {
      value: 'Passport - 30pts',
    }, {
      value: 'Pension Card - 10pts',
    }, {
      value: 'Pet Registration - 10pts',
    }, {
      value: 'Proof of Age card - 10pts',
    }, {
      value: 'Proof of Income - 30pts',
    }, {
      value: 'Student ID card - 10pts',
    }, {
      value: 'Student Visa Confirmation - 10pts',
    }];


class IdentificationDocScreen extends Component{


    constructor() {

        super();
            this.state = {
                isScreenLoading: false,
                showSelectFileButton: false,
                idProof:'',

                uploadedFiles:[],
                loggedInUserData:'',
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
                        this.setState({loggedInUserData: loggedInUserData});
                        this.callGetTenantIdentificationDocuWebService(loggedInUserData.ID)             
                    }            
                }).done();  

        });        
    } 

    componentWillReceiveProps(nextProps) {
        // Handle getTenantIdentificationDocu service response
        if(nextProps.tenantIdentificationDocResponse != undefined && nextProps.tenantIdentificationDocResponse != ''){

            this.setState({isScreenLoading:false});                    

            if(nextProps.tenantIdentificationDocResponse.headerResponse.status == 200){  
                if(nextProps.tenantIdentificationDocResponse.data.Content != null){                    
                    this.setState({uploadedFiles :  nextProps.tenantIdentificationDocResponse.data.Content});
                    this.fillUserInfo(nextProps.tenantIdentificationDocResponse.data.Content);
                }else{
                    alert(nextProps.tenantIdentificationDocResponse.data.ReturnMessage[0]);
                }                                
            }
            else if(nextProps.tenantIdentificationDocResponse.headerResponse.status == 400){
                alert(nextProps.tenantIdentificationDocResponse.data.error_description);
            }
            else if(nextProps.tenantIdentificationDocResponse.headerResponse.status == 500){
                alert('Internal Server Error');
            }
        }

        //uploadTenantIdentityDocResponse
        if(nextProps.uploadTenantIdentityDocResponse != undefined && nextProps.uploadTenantIdentityDocResponse != ''){

            this.setState({isScreenLoading:false});               

            if(nextProps.uploadTenantIdentityDocResponse.IsSuccess){  
                this.callGetTenantIdentificationDocuWebService(this.state.loggedInUserData.ID)
            }
            else{
                alert('Internal Server Error');
            }

        }
    }

    componentDidUpdate() { 
        if(this.props.tenantIdentificationDocResponse != undefined && this.props.tenantIdentificationDocResponse != ''){  
        
        }

        if(this.props.uploadTenantIdentityDocResponse != undefined && this.props.uploadTenantIdentityDocResponse != ''){  
            this.props.clearUploadMyFileDocResponse();            
        }        
    }

    componentWillUnmount() {        
        var emptyArray = [];
        this.setState({uploadedFiles:emptyArray});        
    }

    callGetTenantIdentificationDocuWebService(userID) {
        /***************** Call getTenantIdentificationDocu WebService ****************/            
            this.setState({isScreenLoading:true}); 
            var postData = {
                UserId: userID
            }                    
            this.props.getTenantIdentificationDocu(postData);            
        /*************************************************************************/
    }

    fillUserInfo(files){       

        if(files.length > 0){
            this.setState({uploadedFiles:files});
        }
    }

    onIDProofStatusChange(value, index, data) {                
        this.setState({showSelectFileButton:true, idProof:value});
    } 

    onSaveAndExitClicked() {
        Actions.popTo('RentalResumeMenu');
    }

    onNextClicked() {
        Actions.SupportiveDocScreen();
    }

    deleteItem(index) {
        // var tempArray = this.state.uploadedFiles;
        // tempArray.splice(index, 1);
        // this.setState({uploadedFiles:tempArray});
        this.confirmDeletion(index);
    }

    confirmDeletion(index) {

        var alertMessage = 'Are you sure, you want to delete '+this.state.uploadedFiles[index].Docuname+' ?';


        Alert.alert(
            Strings.APP_TITLE_TEXT,
            alertMessage,
            [
                { text: 'Yes', onPress: () => this.callDeleteIdentityDocumentWebService(index) },
                { text: 'No', onPress: () => console.log("deletion Denied") },
            ],
            { cancelable: false }
        )
    }  

    
    callDeleteIdentityDocumentWebService (index){
        /********* Call deleteIdentityDocument WebService *********/
            var postData = {            
                UserId: this.state.loggedInUserData.ID,
                ID: this.state.uploadedFiles[index].ID,
            }
            this.setState({isScreenLoading:true});
            this.props.deleteIdentityDocument(postData);
        /**********************************************************/            
    }

    selectFileToUpload() {
        // iPhone/Android
        DocumentPicker.show({
              filetype: [DocumentPickerUtil.allFiles()],
        },(error,res) => {
            // Android
            console.log(
                res.uri,
                res.type, // mime type
                res.fileName,
                res.fileSize
            );

            this.setState({isScreenLoading:true}); 
            
            var postData = {
                data : res.uri.replace("file://", ""),
                id : this.state.loggedInUserData.ID.toString(),
                docType: res.type,
                docName: res.fileName,
            }            

            this.props.uploadMyFileDoc(postData);            
        });
    }


    renderItem({ item, index }) {        

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

                        <TouchableOpacity onPress={() => self.deleteItem(index)} style={{flex:1,justifyContent:'flex-end'}}>
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
                            Identification documents
                        </Text>

                        <View >                                                
                            <Dropdown
                                containerStyle={{width:window.width*0.9}}
                                label={'What does this upload contain?'}
                                data={data}
                                onChangeText={this.onIDProofStatusChange.bind(this)}
                                value={this.state.idProof}
                            />  
                            {this.state.showSelectFileButton?                          
                                <TouchableOpacity 
                                    onPress={() => this.selectFileToUpload()}
                                    style={{marginTop:10, backgroundColor:'#333333',height:window.width*0.1,width:window.width*0.9,alignItems:'center',justifyContent:'center'}}>
                                    <Text style={{color:'#ffffff'}}>{Strings.SELECT_FILE_TO_UPLOAD}</Text>
                                </TouchableOpacity>          
                                :null           
                            }
                        </View>

                        {(this.state.uploadedFiles.length > 0) ? 
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
                                    <Text style={{color:'#ffffff'}}>Save</Text>
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

const mapStateToProps = ({ identificationDocReducer }) => {

  const {
    tenantIdentificationDocResponse,
    deleteTenantIdentificationDocResponse,
    uploadTenantIdentityDocResponse,
  } = identificationDocReducer;
  
  return {
    tenantIdentificationDocResponse: tenantIdentificationDocResponse,
    deleteTenantIdentificationDocResponse: deleteTenantIdentificationDocResponse,
    uploadTenantIdentityDocResponse: uploadTenantIdentityDocResponse,
  }
}

export default connect(mapStateToProps,{
    getTenantIdentificationDocu,
    deleteIdentityDocument,
    uploadMyFileDoc,
    refreshRentalResumeMenu,
    clearUploadMyFileDocResponse
})(IdentificationDocScreen);
