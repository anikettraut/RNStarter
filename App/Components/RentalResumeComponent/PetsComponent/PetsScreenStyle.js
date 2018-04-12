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
    backgroundColor:Colors.WHITE,
    alignItems: 'center',
    
  },
   labelStyle:{
    color:Colors.INPUT_COLOR_GRAY,
    width:window.width*0.8,
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
    width:window.width*0.8,
    fontSize:14,
    fontWeight:'500',
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