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
      alignItems:'center'
  }, 

  searchOverlayViewStyle:{
      width:window.width,
      height:67,
      backgroundColor: Colors.BLACK, 
      justifyContent:'center'   
  },

  overlayInnerViewStyle:{
      flexDirection:'row',
      alignItems:'center'   
  },

  searchImageStyle:{
      position:'absolute',
      left:10   
  },

  tagContainer:{
      backgroundColor:'#ffffff',
      height:40,
      width:window.width*0.77,
      justifyContent:'center',
      borderColor: '#FFF',
      marginLeft:40,
      borderRadius:5   
  },

  listItemContainer:{
      flex:1, margin:20
  },

  listItemImage:{
      marginLeft:10, width:15, height:15
  },

  listItemText:{
      fontSize:12, fontWeight:'700', marginLeft:10
  },

  tags:{
      backgroundColor:'#dedede', margin:5, borderRadius:5      
  },

  starIconStyle:{
      height:40,
      width:40,
      justifyContent:'center',
      alignItems:'center'  
  },

  resetFilterContainer:{
      width:window.width,
      height:55,
      alignItems:'center',
      justifyContent:'center'  
  },

  resetButtonContainer:{
      alignItems:'center',
      justifyContent:'center',
      height:35,
      width:100,
      borderWidth:1,
      borderColor:'#000000'  
  },

  priceRangeContainer:{
      width:window.width*0.8,
      height:150,
      justifyContent:'center'  
  },

  priceRangeText:{
      color:'#000000',
      fontSize:16,
      fontWeight:'bold'  
  },

  priceRangeTextContainer:{
      width:window.width*0.8, height:50, alignItems:'center'  
  },

  filterAttributeText:{
      color:'#000000', fontSize:16, fontWeight:'bold'
  }, 

  bedroomTypesContainer:{
      width:window.width, height:60, alignItems:'center', justifyContent:'space-between', flexDirection:'row'
  },

  priceRangeAttributes:{
      flexDirection:'row',
      justifyContent:'space-between'  
  },

  priceRangeAttributesText:{
      color:'#000000',
      fontSize:16  
  },

  regisLabelStyle:{
      color:Colors.INPUT_COLOR_GRAY,
      width:window.width*0.6,
      fontSize:12,
      fontWeight:'400',
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