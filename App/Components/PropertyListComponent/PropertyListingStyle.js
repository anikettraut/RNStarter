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
    backgroundColor:Colors.WHITE
  }, 

  searchOverlayViewStyle:{
    width:window.width,
    height:44,
    backgroundColor: Colors.BLACK,    
  }, 

  titlelineTextStyle:{
    color:Colors.BLACK,
    fontSize:18,
    marginLeft:20
  },
  
  titlelineContainerViewStyle:{
    backgroundColor:Colors.TRANSPARENT,       
    marginTop:20,
    height:44 ,
    justifyContent:'center'
  },

  listViewStyle:{
    marginTop:0,
    backgroundColor:Colors.WHITE,
    height: window.height*0.55
  },

  list: {
    paddingBottom:20
  },

  listRowContainerStyle:{
    flex:1,
    flexDirection:'row',
    marginTop:10,
    paddingLeft:15,
    paddingRight:20,
    marginBottom:10,
    alignItems:'center',
  },
  
  propertyImageStyle:{
    width:window.width,
    height:window.height*0.35,    
    marginBottom:10,
  },  

  propertyDetailViewStyle:{
    paddingLeft:12,
    justifyContent:'center',
    width:window.width*0.55,
  },

  propertyNameTextStyle:{
    color:Colors.BLACK,
    fontSize:18,  
    marginBottom:10  
  },

  propertyAttributeTextStyle:{
    color:Colors.BLACK,
    fontSize:11,
    fontWeight:'bold', 
    width:window.width*0.35,
  },

  propertyValueBoldTextStyle:{
    color:Colors.BLACK,
    fontSize:11,
    fontWeight:'bold',     
  },

  propertyValueTextStyle:{
    color:Colors.BLACK,
    fontSize:11,
  },

  propertyAttributeViewStyle:{    
    marginBottom:5,
    flexDirection:'row',    
    width:window.width*0.45,
  },

  clockImageStyle:{
    marginLeft:5
  },

  autocomplete: {
    alignSelf: 'stretch',
    height: 30,
    marginLeft: 5,
    backgroundColor: '#FFF',
    borderRadius: 5,
  },

  autocompleteView: {
    alignSelf: 'stretch',
    height: 35,
    marginLeft: 35,
    marginRight: 5,
    backgroundColor: '#FFF',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5
  },

  cell: {  
    flex:1,  
    height:60,
    justifyContent:'center'
  },

  cellText: {
    color:'#4c4c4c',
    fontSize:14,
    fontWeight:'bold',
    marginLeft:20
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