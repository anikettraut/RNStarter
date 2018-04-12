import {
  StyleSheet,
  Platform,
  Dimensions
} from 'react-native';
import Colors from '../../Constants/Colors';
const window = Dimensions.get('window');
export default StyleSheet.create({
  
  container: {    
    flex: 1,
    backgroundColor:Colors.LIGHT_BACK_COLOR    
  },

  signInViewContainerStyle:{
    flex: 1,
    marginLeft: 40,
    marginRight: 40,
  },

  buttonViewStyle:{
    paddingTop:30,
    alignSelf: 'stretch',
  },

  buttonOpacityStyle:{
    height: 45,    
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: Colors.BUTTONBACKGROUND
  },

  buttonTextStyle:{

     color:Colors.WHITE,
     fontSize: 18,
     alignSelf: 'center',
     
  },

  forgotViewStyle:{
    
      paddingTop:20,
  },

  socialButtonsContainer:{
    justifyContent: 'center', 
    alignItems: 'center',
  },

  newMemberContainerStyle:{
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 15,
  },

  socialButtonStyle:{
      width:38,
      height:44,
      alignItems:'center',
      justifyContent:'center',
  },

  socialButtonsLine:{
      backgroundColor:Colors.BLACK,
      width:40,
      height:3,
  },

  selectedTabIndicator:{
      backgroundColor:Colors.APP_THEME_RED_COLOR,
      width:80,
      height:3,
      alignItems:'flex-end',
  },

  newMemberContainer:{
      marginTop:20,
      height:44,
      alignItems:'center',
      justifyContent:'center',
  },
  

  forgotTextStyle:{

     color:Colors.BLACK,
     fontSize: 16,
     alignSelf: 'center',
     
  },

  logoContainerViewStyle:{
      width:window.width,
      height:window.height*0.33,
      backgroundColor:Colors.BLACK,
      alignItems:'center',
      justifyContent:'center'
  },

  tabContainerViewStyle:{
      flexDirection:'row',
      width:window.width,
      height:44,
      alignItems:'center',
      justifyContent:'center',

  },

  tabStyle:{
      width:80,
      height:44,
      alignItems:'center',
      justifyContent:'center',
  },
  
  loginInputContainerStyle:{
    marginTop:10,
  },
  logoTextStyle:{
    color:Colors.WHITE,
    fontSize: 74,
    alignSelf: 'center',
    backgroundColor: Colors.TRANSPARENT
  },
  inlineInputImg: {
    height:20,
    width:20,
    position: 'absolute',
    left: 0,    
    bottom:(Platform.OS === 'ios') ? 22 : 12,

  },

  reaseInputImg: {
    position: 'absolute',
    right: -30,
    bottom:(Platform.OS === 'ios') ? 15 : 12,
  },

  labelStyle:{
    paddingLeft:30,
    color:Colors.BLACK,
  },

  newMemberTextStyle:{
      color:Colors.GRAY_COLOR
  },

  createAccountTextStyle:{
      marginTop:5,
  },

  registerButtonViewStyle:{
    paddingTop:30,
    alignSelf: 'stretch',
    paddingBottom:20,
  },

  datePickerViewStyle:{
    width:window.width*0.8,
    height:50,
  },

  circles: {
    flex:1,
    left:0,
    right:0,
    top:0,
    bottom:0,
    position:'absolute',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:Colors.TRANSPARENT,
    width: null,
    height: null
  },

});