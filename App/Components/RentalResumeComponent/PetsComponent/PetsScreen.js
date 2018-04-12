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
    Modal,
    FlatList,
} from 'react-native';

import {        
    clearGetTenantPetsInfoResponse,
    clearAddUpdateTenantPetsInfoResponse,
    clearDeletePetInfoResponse
} from './PetsAction';

import {    
    getTenantPetsInfo,
    addUpdateTenantPetsInfo,
    deletePetInfo,    
} from "../../../Action/ActionCreators";

import {        
    refreshRentalResumeMenu
} from '../RentalResumeMenu/RentalResumeMenuAction';

import{ Actions}    from 'react-native-router-flux';

import Colors       from '../../../Constants/Colors';
import Strings      from '../../../Constants/Strings';
import styles       from './PetsScreenStyle';
import CommonStyles from '../../../CommonStyle/CommonStyle';

import appLogoImage from '../../../Assets/logo.png';
import checkImage from '../../../Assets/check_selected.png';
import uncheckImage from '../../../Assets/check.png';
import addImage from '../../../Assets/add.png';
import binImage from '../../../Assets/bin.png';

import TextField from 'react-native-material-textfield';
import MaterialTextInput from 'react-native-material-textinput';
import { Dropdown } from 'react-native-material-dropdown';
import * as Progress from 'react-native-progress';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const window = Dimensions.get('window');
let petType = [{
      value: 'Dog',
    }, {
      value: 'Cat',
    }, {
      value: 'Other',
    }];

var pets = ['a', 'b', 'c'];

var self;

class PetsScreen extends Component{


    constructor() {

        super();
            this.state = {
                isScreenLoading: false,
                showModal:0,
                typeOfPet:'',
                whatsYourPet:'',
                breedtype:'',
                registerationNumber:'',
                petList:[],

                loggedInUserData:'',
                petsInformation:'',

                showWhatsYourPet:false,                
                typeOfPetError:'',
                breedtypeError:'',
                registerationNumberError:'',
                whatsYourPetError:'',
            }; 

            self = this;  
            
    }
    
    componentWillMount() {
            
            AsyncStorage.getItem("loggedInUserInfo").then((value) => {
                if(value) {                
                    var loggedInUserData = JSON.parse(value);                
                    this.setState({loggedInUserData: loggedInUserData});
                    this.callGetTenantPetsInfoWebService(loggedInUserData.ID)             
                }            
            }).done();  
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {                                       
            
        });        
    }

    componentWillReceiveProps(nextProps) {
        // Handle getTenantPetsInfo service response
        if(nextProps.tenantPetsInfoResponse != undefined && nextProps.tenantPetsInfoResponse != ''){

            this.setState({isScreenLoading:false});            

            if(nextProps.tenantPetsInfoResponse.headerResponse.status == 200){  
                if(nextProps.tenantPetsInfoResponse.data.Content != null){
                    this.setState({petsInformation :  nextProps.tenantPetsInfoResponse.data.Content});
                    this.fillUserInfo(nextProps.tenantPetsInfoResponse.data.Content);
                }else{
                    alert(nextProps.tenantPetsInfoResponse.data.ReturnMessage[0]);
                }                                
            }
            else if(nextProps.tenantPetsInfoResponse.headerResponse.status == 400){
                alert(nextProps.tenantPetsInfoResponse.data.error_description);
            }
            else if(nextProps.tenantPetsInfoResponse.headerResponse.status == 500){
                alert('Internal Server Error');
            }
        }


        // Handle addUpdateTenantPetsInfo service response
        if(nextProps.updateTenantPetsInfoResponse != undefined && nextProps.updateTenantPetsInfoResponse != ''){

            this.setState({isScreenLoading:false});            

            if(nextProps.updateTenantPetsInfoResponse.headerResponse.status == 200){  
                if(nextProps.updateTenantPetsInfoResponse.data.IsSuccess){
                    
                }else{
                    alert(nextProps.updateTenantPetsInfoResponse.data.ReturnMessage[0]);
                }                                
            }
            else if(nextProps.updateTenantPetsInfoResponse.headerResponse.status == 400){
                alert(nextProps.updateTenantPetsInfoResponse.data.error_description);
            }
            else if(nextProps.updateTenantPetsInfoResponse.headerResponse.status == 500){
                alert('Internal Server Error');
            }
        }

        // Handle deletePetInfo service response
        if(nextProps.deleteTenantPetsInfoResponse != undefined && nextProps.deleteTenantPetsInfoResponse != ''){

            this.setState({isScreenLoading:false});            

            if(nextProps.deleteTenantPetsInfoResponse.headerResponse.status == 200){  
                if(nextProps.deleteTenantPetsInfoResponse.data.IsSuccess){
                    
                }else{
                    alert(nextProps.deleteTenantPetsInfoResponse.data.ReturnMessage[0]);
                }                                
            }
            else if(nextProps.deleteTenantPetsInfoResponse.headerResponse.status == 400){
                alert(nextProps.deleteTenantPetsInfoResponse.data.error_description);
            }
            else if(nextProps.deleteTenantPetsInfoResponse.headerResponse.status == 500){
                alert('Internal Server Error');
            }
        }
    }

    componentDidUpdate() { 
        if(this.props.tenantPetsInfoResponse != undefined && this.props.tenantPetsInfoResponse != ''){  
                this.props.clearGetTenantPetsInfoResponse();
        }

        if(this.props.updateTenantPetsInfoResponse != undefined && this.props.updateTenantPetsInfoResponse != ''){  
                this.props.clearAddUpdateTenantPetsInfoResponse();
        }

        if(this.props.deleteTenantPetsInfoResponse != undefined && this.props.deleteTenantPetsInfoResponse != ''){  
                this.props.clearDeletePetInfoResponse();
        }
    }

    componentWillUnmount() {        
             
    }

    callGetTenantPetsInfoWebService(userID) {
        /***************** Call getTenantPetsInfo WebService ****************/            
            this.setState({isScreenLoading:true}); 
            var postData = {
                UserId: userID
            }                    
            this.props.getTenantPetsInfo(postData);            
        /*************************************************************************/
    }

    fillUserInfo(petsList){       
        console.log("petsList>>>> "+JSON.stringify(petsList));
        this.setState({petList:petsList});
    }

    onGeneralInfoClicked() {
        Actions.GeneralInfoScreen();
    }

    onPetTypeChange(value, index, data) {        
        this.setState({typeOfPet:value, typeOfPetError:''}); 

        if(index == 2){
            this.setState({showWhatsYourPet:true}); 
        }else{
            this.setState({showWhatsYourPet:false}); 
        }
    }

    onWhatsYourPetChange(text){
        this.setState({whatsYourPet:text, whatsYourPetError:''});
    }

    onBreedTypeChange(text) {
        this.setState({breedtype:text, breedtypeError:''});
    }

    onRegisterationNoChange(text) {
        this.setState({registerationNumber:text, registerationNumberError:''});
    }

    addPet() {
        this.setState({showModal:!this.state.showModal, breedtype:'', registerationNumber:''});
    }

    onAddPetClicked() {
        var tempArray = this.state.petList;


        var errors = [];

        var checkWhatsYourPet = this.state.whatsYourPet.replace(/\s/g,"");
        var checkBreedtype = this.state.breedtype.replace(/\s/g,"");
        var checkRegisterationNumber = this.state.registerationNumber.replace(/\s/g,"");        

        if(checkBreedtype.length == 0){        
            this.setState({breedtypeError:Strings.ERROR_EMPTY_PET_NAME})
            errors.push('breedtypeError');
        }else{
            this.setState({breedtypeError:''})
        }

        if(checkRegisterationNumber.length == 0){
            this.setState({registerationNumberError:Strings.ERROR_EMPTY_REGISTRATION_NO})
            errors.push('registerationNumberError');
        }else{
            this.setState({registerationNumberError:''})
        }

        if(this.state.typeOfPet == 'Other'){
            if(checkWhatsYourPet.length == 0){
                this.setState({whatsYourPetError:Strings.ERROR_EMPTY_BREED_TYPE})
                errors.push('whatsYourPetError');
            }else{
                this.setState({whatsYourPetError:''})
            }
        }

        if(errors.length > 0){
            return;
        }
        else{

            var petInfo = {
                UserId: this.state.loggedInUserData.ID,
                Breed: this.state.typeOfPet,
                PetName: this.state.breedtype,
                RegistrationNo: this.state.registerationNumber
            }  

            if(this.state.typeOfPet == 'Other'){
                petInfo.OtherBreed = this.state.whatsYourPet
            }   

            tempArray.push(petInfo);
            this.setState({showModal:0, petList:tempArray});

            /***************** Call addUpdateTenantResidentsInfo WebService ***************/            
                this.setState({isScreenLoading:true});                                 
                this.props.addUpdateTenantPetsInfo(petInfo);            
            /*********************************************************************/

        }
                 
    }

    onCancelPetClicked() {
        this.setState({showModal:0});   
    }

    deleteItem(index) {

        Alert.alert(
            'LeaseAgent',
            'Are you sure you want to delete selected pet?',
            [
                { text: 'Yes', onPress: () => this.calldeletePetInfoWebService(index) },
                { text: 'No', onPress: () => console.log("Denied") },
            ],
            { cancelable: false }
        )        
    }

    calldeletePetInfoWebService(index) {

            var tempArray = this.state.petList;

            /***************** Call deletePetInfo WebService ***************/            
                this.setState({isScreenLoading:true});  

                var petInfo = {
                    UserId: this.state.loggedInUserData.ID,
                    ID: tempArray[index].ID,                
                }

                this.props.deletePetInfo(petInfo);            
            /***************************************************************/
            
            tempArray.splice(index, 1);
            this.setState({petList:tempArray});
    }

    onSaveAndExitClicked() {
        this.props.refreshRentalResumeMenu(1);
        Actions.popTo('RentalResumeMenu');
        // Actions.CurrentAddressScreen();
    }

    onNextClicked() {        
        Actions.CurrentAddressScreen();
    }


    renderItem({ item, index }) {

        return(
                <View style={{flex:1, justifyContent:'center', margin:10}}>

                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:12, fontWeight:'700', marginRight:20}}>{index+1}</Text>


                        <View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize:12, fontWeight:'700'}}>Breedtype: </Text>
                                <Text style={{fontSize:12, fontWeight:'500'}}>{item.Breed}</Text>                  
                            </View>

                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize:12, fontWeight:'700'}}>Registeration Number: </Text>
                                <Text style={{width:window.width*0.3, fontSize:12, fontWeight:'500'}}>{item.RegistrationNo}</Text>                  
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
                {this.state.showModal?

                        
                    <Modal transparent>                    
                        
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <KeyboardAwareScrollView  contentContainerStyle={{paddingBottom:65}} showsVerticalScrollIndicator={false} >
                            <View style={{width:window.width*0.9, backgroundColor:'#ffffff', justifyContent:'center', alignItems:'center', borderColor:'gray', borderWidth:0.5, borderRadius:10, marginTop:20}}>
                                
                                <Text style={{fontWeight:'500', marginTop:20}}>Tell us about your pet</Text> 

                                <View>
                                    <Dropdown
                                            containerStyle={{width:window.width*0.7, height:65}}
                                            label={'Type of Pet'}
                                            data={petType}
                                            onChangeText={this.onPetTypeChange.bind(this)}
                                            value={this.state.typeOfPet}
                                    />
                                    {(this.state.titleError == '')?null:
                                        <Text style={CommonStyles.errorText}>{this.state.titleError}</Text>                                
                                    }
                                </View>

                                {this.state.showWhatsYourPet?
                                    <View>
                                        <View style={{width:window.width*0.7}}>                                   
                                            <MaterialTextInput  label={'What is your pet'}
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
                                                                onChangeText={this.onWhatsYourPetChange.bind(this)}
                                                                value={this.state.whatsYourPet}
                                            />
                                        </View>
                                        {(this.state.breedtypeError == '')?null:
                                            <View style={{width:window.width*0.8}}>
                                                <Text style={CommonStyles.errorText}>{this.state.breedtypeError}</Text>                                
                                            </View>
                                        }
                                    </View>
                                    :null
                                }

                                <View style={{width:window.width*0.7}}>                                   
                                    <MaterialTextInput  label={'Pet Name'}
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
                                                        onChangeText={this.onBreedTypeChange.bind(this)}
                                                        value={this.state.breedtype}
                                    />
                                </View>
                                {(this.state.breedtypeError == '')?null:
                                    <View style={{width:window.width*0.8}}>
                                        <Text style={CommonStyles.errorText}>{this.state.breedtypeError}</Text>                                
                                    </View>
                                }


                                <View style={{width:window.width*0.7}}>                                  
                                    <MaterialTextInput  label={Strings.REGISREARION_NO}
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
                                                        maxLength={10}
                                                        onChangeText={this.onRegisterationNoChange.bind(this)}
                                                        value={this.state.registerationNumber}
                                    />
                                </View>
                                {(this.state.registerationNumberError == '')?null:
                                    <View style={{width:window.width*0.8}}>
                                        <Text style={CommonStyles.errorText}>{this.state.registerationNumberError}</Text>                                
                                    </View>
                                }  

                                <View style={{margin:40}}>
                                    <View style={{width:window.width*0.7, flexDirection:'row' ,justifyContent:'space-between'}}>
                                        <TouchableOpacity 
                                            onPress={() => this.onAddPetClicked()}
                                            style={{backgroundColor:'#333333',height:window.width*0.2/2,width:window.width*0.3,alignItems:'center',justifyContent:'center'}}
                                        >
                                            <Text style={{color:'#ffffff'}}>Add</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity 
                                            onPress={() => this.onCancelPetClicked()}
                                            style={{backgroundColor:'#333333',height:window.width*0.2/2,width:window.width*0.3,alignItems:'center',justifyContent:'center'}}
                                        >
                                            <Text style={{color:'#ffffff'}}>Cancel</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                
                            </View>
                            </KeyboardAwareScrollView> 
                        </View>
                        
                    </Modal>
                    

                    :null
                } 

                <View style={{borderWidth:1, borderColor:Colors.DARK_GRAY_COLOR, width:window.width*0.95, marginTop:10, alignItems:'center'}}>
                        
                    <Text style={{fontSize:16, fontWeight:'500', margin:10, color:Colors.APP_THEME_RED_COLOR}}>
                        Add a Pet !!!
                    </Text>

                    {(this.state.petList.length > 0)?
                        <Text style={{width:window.width*0.9, fontSize:12, fontWeight:'500', margin:10}}>
                            Saved Pets :
                        </Text>
                        :null
                    }

                    <View style={{width:window.width*0.9, backgroundColor:'#ffffff'}}>
                        <FlatList                        
                            data={this.state.petList}
                            renderItem={this.renderItem}
                            extraData={this.state}
                        />
                    </View>

                    <View style={{flexDirection:'row', alignItems:'center', marginTop:30}}>
                        
                        <Text style={{fontWeight:'400'}}>Click on Plus Icon to add pets if any</Text>
                        <TouchableOpacity onPress={() => this.addPet()}>
                            <Image style={{marginLeft:10}} source={addImage} />
                        </TouchableOpacity>

                    </View>                                        

                    <View style={{justifyContent:'flex-end',marginBottom:20}}>
                        <View style={{width:window.width*0.8, alignItems:'center', margin:20}}>                            

                            <TouchableOpacity 
                                onPress={() => this.onSaveAndExitClicked()}
                                style={{backgroundColor:Colors.APP_THEME_RED_COLOR,height:40,width:window.width*0.35,alignItems:'center',justifyContent:'center'}}
                            > 
                                    <Text style={{color:'#ffffff'}}>Save</Text>
                            </TouchableOpacity>

                        </View>
                         {/*<View style={{flexDirection:'row' ,justifyContent:'space-between'}}>
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
                                                 </View>*/}
                    </View>
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

const mapStateToProps = ({ petsReducer }) => {

  const {
    tenantPetsInfoResponse,
    updateTenantPetsInfoResponse,
    deleteTenantPetsInfoResponse,
  } = petsReducer;
  
  return {
    tenantPetsInfoResponse: tenantPetsInfoResponse,
    updateTenantPetsInfoResponse: updateTenantPetsInfoResponse,
    deleteTenantPetsInfoResponse: deleteTenantPetsInfoResponse
  }
}

export default connect(mapStateToProps,{
    getTenantPetsInfo,
    addUpdateTenantPetsInfo,
    deletePetInfo,
    clearGetTenantPetsInfoResponse,
    clearAddUpdateTenantPetsInfoResponse,
    clearDeletePetInfoResponse,
    refreshRentalResumeMenu
})(PetsScreen);
