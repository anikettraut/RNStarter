import {
  StyleSheet,
  Platform,
  Dimensions
} from 'react-native';
import Colors from '../../../Constants/Colors';

const window = Dimensions.get('window');

export default StyleSheet.create({


  mainContainer: {
    flex: 1,    
  },

  seperatorLine:{
      width:window.width*0.95, height:2,backgroundColor:'#E1E1E1', marginLeft:10, marginRight: 10,marginTop:5, 
  },

  stepperView:{
      marginTop:10, width:window.width*0.7, height:50, borderColor:'red', borderWidth:1,
      alignItems: 'center', alignSelf: 'center',
      justifyContent:'space-between', flexDirection:'row', alignItems:'center', borderRadius:25
  },

});