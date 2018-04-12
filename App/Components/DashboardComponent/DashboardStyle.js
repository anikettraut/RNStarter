import {
    StyleSheet,
    Platform,
    Dimensions
} from 'react-native';

import Colors from '../../Constants/Colors';

const window = Dimensions.get('window');

export default StyleSheet.create({

  container:{
      flex: 1        
  },

  bottomNavigationStyle:{
      height: 56,
      elevation: 8,
      position: 'absolute',
      left: 0,
      bottom: 0,
      right: 0        
  },

  iconStyle:{
      width: 24,
      height: 24        
  },

});