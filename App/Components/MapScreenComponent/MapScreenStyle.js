import {
  StyleSheet,
  Platform,
  Dimensions
} from 'react-native';
import Colors from '../../Constants/Colors';
const window = Dimensions.get('window');
export default StyleSheet.create({


  mainContainer: {
    flex: 1,    
  },

  imageContainerStyle:{
    width:window.width,
    height:window.height*0.35,    
  },  

  sepratoreImage:{
    height:5,
    width:window.width
  },

});