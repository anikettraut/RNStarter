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
    backgroundColor:Colors.WHITE,    
  }, 

  rowContainer:{    
    width:window.width*0.9,    
    backgroundColor:'#ffffff',
    borderRadius: 3,        
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 10,    
    shadowOpacity: 0.25,    
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