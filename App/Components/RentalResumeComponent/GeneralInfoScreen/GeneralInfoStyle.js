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
    
  }, 

  labelStyle:{
    color:Colors.INPUT_COLOR_GRAY,
    width:window.width*0.3,
    fontSize:14,
    fontWeight:'500',
  },

  valueStyle:{
    color:Colors.BLACK,
    width:window.width*0.3,
    height:37,
    fontSize:14,
    fontWeight:'500',
  },

  broadLabelStyle:{
    color:Colors.INPUT_COLOR_GRAY,
    width:window.width*0.9,
    height:37,
    fontSize:14,
    fontWeight:'500',
  },

  profileImageContainer:{
    
    height:window.height*0.2,
    justifyContent:'center',
    alignItems:'center'

  },
  
  userImageViewStyle:{
     marginTop:window.height*0.04,
  },

  userImageStyle: {
        width: 80,
        height: 80,
        borderRadius: 40
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