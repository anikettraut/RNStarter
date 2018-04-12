import {
  StyleSheet,
  Platform,
} from 'react-native';
import Colors from '../Constants/Colors';
export default StyleSheet.create({
  mainContainer: {
    
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  
  },

  buttonViewStyle:{

    paddingTop:20,
    alignSelf: 'stretch',
  },

  blackTransparentViewStyle:{

    height: 50,
    borderRadius: 5,
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor:Colors.TRANSLUCENT_BLACK
   
  },

  buttonTextStyle:{

     color:Colors.WHITE,
     fontSize: 13,
     fontWeight:'600',
     alignSelf: 'center',
     backgroundColor:Colors.TRANSPARENT,
     fontFamily:'Proxima Nova'
     
  },
  navigationBarStyle:{
     backgroundColor: Colors.BLACK,
     borderBottomColor:Colors.BLACK
  },
  navigationBarBackButtonStyle:{
    tintColor:Colors.APP_THEME_RED_COLOR,
  },
  navigationBarTitleStyle:{
    color:Colors.APP_THEME_RED_COLOR,
    fontSize: 18,
  },

  navigationBarWhiteStyle:{
     backgroundColor: Colors.WHITE,
     borderBottomColor:Colors.WHITE
  },
  navigationBarTitleBlackStyle:{
    color:Colors.BLACK,
    fontSize: 16,
  },
  navigationBarBackButtonBlackStyle:{
    tintColor:Colors.BLACK,
  },
  textInputStyle:{
    height:50,
    backgroundColor:Colors.TRANSLUCENT_BLACK,
    borderRadius: 5,
    color:Colors.WHITE,
    paddingLeft:20,
    fontSize: 13,
    marginTop:10
  },

  
  searchTextInputStyle:{
    height:42,    
    color:Colors.WHITE,
    paddingLeft:35,
    fontSize: 12,     
    fontWeight:'500'   
  },
  errorText: {
    color:'red',
    fontSize: 10,
    textAlign: 'left',
    paddingTop:5,
    backgroundColor:Colors.TRANSPARENT,

  },

  passwordText: {
    color:'#000000',
    fontSize: 12,
    textAlign: 'left',
    paddingTop:5,
    backgroundColor:Colors.TRANSPARENT,
  },

  ageConfirmText: {
    color:'#000000',
    fontSize: 16,
    textAlign: 'left',
    paddingLeft:10,
    backgroundColor:Colors.TRANSPARENT,
  },

  titleCenter: {
      flexDirection: 'row',
      height: 30,
      justifyContent: 'center',
      marginTop:(Platform.OS==='ios')?30:20,
  },

  profileErrorText: {
    color:'red',
    fontSize: 12,
    textAlign: 'left',
    paddingTop:5,
    backgroundColor:Colors.TRANSPARENT,
    marginLeft:10,
  },
  navigationBarRightUpdateButtonStyle:{
    color:Colors.WHITE,
    fontSize: 12,
    marginTop:5
  },

});