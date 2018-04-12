import {
  StyleSheet,
  Platform,
  Dimensions
} from 'react-native';
import Colors from '../../Constants/Colors';
const window = Dimensions.get('window');
export default StyleSheet.create({

  container:{
    flex:1,
    paddingLeft:25,
    paddingRight:25,
  },

  mainContainer: {
    flex: 1,
    width: null,
    height: null,    
    alignItems:'center',    
  },

  imageContainer: {
    position: 'absolute',
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: null,
    height: null,

  },

  logoContainerViewStyle:{
      width:window.width,
      height:window.height*0.3,
      backgroundColor:Colors.TRANSPARENT,
      alignItems:'center',
      justifyContent:'center',
  },

  taglineTextStyle:{
    color:Colors.WHITE,
    fontSize:20,
    fontWeight:'bold',
  },

  tagDescTextStyle:{
    color:Colors.WHITE,
    fontSize:8,  
    textAlign:'center',
    width:window.width*0.9,
    marginTop:10,
  },

  taglineContainerViewStyle:{
    backgroundColor:Colors.TRANSPARENT,
    alignItems:'center',
    justifyContent:'center',
  },

  buttonsContainerViewStyle:{
    width:window.width*0.75,
    alignItems:'center',
    justifyContent:'center',
    marginTop:20,
  },


  agentButtonOpacityStyle:{
    height: 45,    
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: Colors.APP_THEME_RED_COLOR
  },

  tenantButtonOpacityStyle:{
    height: 45,    
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: Colors.TRANSPARENT,
    borderWidth:2,
    borderColor:Colors.DARK_GRAY_COLOR,

  },

  landlordButtonOpacityStyle:{
    height: 45,    
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: Colors.DARK_GRAY_COLOR
  },

  buttonViewStyle:{
    paddingTop:10,
    alignSelf: 'stretch',
    borderRadius: 5,
  },

  buttonTextStyle:{
     color:Colors.WHITE,
     fontSize: 14,
     fontWeight:'600',
     alignSelf: 'center',     
  },
  
});