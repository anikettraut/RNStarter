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
    backgroundColor: Colors.WHITE,    
  },

  detailContainer:{  
    backgroundColor:Colors.WHITE,    
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:60,
    width: window.width
  }, 

  dayViewContainer:{
    flexDirection:'row', width:window.width*0.8, alignItems:'center', justifyContent:'center', margin:20
  },

  otherDayViewContainer:{
     width:window.width*0.45, height:120, alignItems:'center', justifyContent:'center', backgroundColor:'#BFEFFF'
  },

  todayTemprature:{
      color:Colors.BLACK,
      fontSize: 36,
      fontWeight:'600',
      alignSelf: 'center'
  },

  todayHumidity:{
      color:Colors.BLACK,
      fontSize: 20,
      fontWeight:'500',
      alignSelf: 'center'
  },

  otherTemprature:{
      color:Colors.BLACK,
      fontSize: 26,
      fontWeight:'600',
      alignSelf: 'center'
  },

  minMaxTemprature:{
      color:Colors.BLACK,
      fontSize: 12,
      fontWeight:'600',
      alignSelf: 'center'
  },

  degreeSign:{
      color:Colors.BLACK,
      fontSize: 18,
      fontWeight:'600',
      alignSelf: 'center',
      paddingBottom: 20
  },

  smallDegreeSign:{
      color:Colors.BLACK,
      fontSize: 12,
      fontWeight:'600',
      alignSelf: 'center',
      paddingBottom: 20
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