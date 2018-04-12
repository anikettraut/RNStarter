import {
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import Colors from '../../Constants/Colors';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardImg: {
    height:DEVICE_WIDTH*0.5,
    width:DEVICE_WIDTH*0.5,
  },

  cardLabel:{
     color:Colors.WHITE,
     fontSize: 12,
     alignSelf: 'center',
     marginTop: 20,
     width: DEVICE_WIDTH*0.7,
  },

});
