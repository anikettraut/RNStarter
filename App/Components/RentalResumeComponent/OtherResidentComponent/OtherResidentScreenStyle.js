import {
  StyleSheet,
  Platform,
  Dimensions
} from 'react-native';
import Colors from '../../../Constants/Colors';
const window = Dimensions.get('window');
export default StyleSheet.create({

  container:{
    flex:1,  
    marginTop:64,
    backgroundColor:Colors.WHITE,
    
  },
   labelStyle:{
    color:Colors.INPUT_COLOR_GRAY,
    width:window.width,
    fontSize:14,
    fontWeight:'500',
  },
  regisLabelStyle:{
    color:Colors.INPUT_COLOR_GRAY,
    width:window.width*0.4,
    fontSize:14,
    fontWeight:'500',
  },

  broadLabelStyle:{
    color:Colors.INPUT_COLOR_GRAY,
    width:window.width*0.9,
    fontSize:14,
    fontWeight:'500',
  },
   
  
});