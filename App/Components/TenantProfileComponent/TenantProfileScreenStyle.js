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
  },
  profileImageContainer:{
    backgroundColor:'black',
    height:window.height*0.32,
    justifyContent:'center',
    alignItems:'center'

  },
  userImageViewStyle:{
     marginTop:window.height*0.06,
  },
  userImageStyle: {
        width: 80,
        height: 80,
        borderRadius: 40
  },  
  
  userInfoViewStyle:{
    marginTop:10,
    justifyContent:'center',
    alignItems:'center'
  },

  textColorStyle:{
    color:'white'
  },  

  tabViewStyle:{
    flex:1,
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    marginTop:10
  },
  cardViewStyle:{backgroundColor:'#ffffff',
  width:window.width*0.43,
  height:window.height*0.18,
   justifyContent:'center',
   alignItems:'center',
}

  
});