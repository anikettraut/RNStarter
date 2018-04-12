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
    marginTop:64,
    backgroundColor:Colors.LIGHT_BACK_COLOR
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
  
  rentalResumeButtonViewStyle:{
    paddingTop:30,
    alignSelf: 'stretch',
    paddingBottom:20,
  },
  
});