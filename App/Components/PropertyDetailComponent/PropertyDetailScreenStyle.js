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
      backgroundColor:Colors.WHITE,   
  },

  imageContainerStyle:{
      width:window.width,
      height:window.height*0.35,    
  },  

  tags:{
      backgroundColor:'#dedede', margin:5, borderRadius:5
  },  

  inspectionListItemContainer:{
      flexDirection:'row',justifyContent:'space-between', marginTop:10
  },

  carouselItemContainer:{
      height:window.height, width:window.width, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(0,0,0,0.5)'
  },

  carouselInnerView:{
      height:window.height, width:window.width, backgroundColor:'black', borderWidth:5, borderColor:'#ffffff'
  },

  closeButtonContainer:{
      height:40, width:60, position: 'absolute', top: 0, right: 0, justifyContent:'center', alignItems:'center'
  },

  closeText:{
      color:'#ffffff', margin:5
  },

  starContainer:{
      height:40, width:40, position: 'absolute', top: 0, left: 0, justifyContent:'center', alignItems:'center'
  },

  inspectionFloatView:{
      height:50, width:100, backgroundColor:'#d72614', position: 'absolute', top: 0, right: 0, alignItems:'center',
      justifyContent:'center'
  },

  inspectionTitle:{
      fontSize:13, color:'#ffffff'
  },

  inspectionTime:{
      fontSize:16, color:'#ffffff'
  },

  propertyTitleText:{
      fontSize:20,fontWeight:'bold'
  },

  propertyIconContainer:{
      flexDirection:'row',justifyContent:'space-between',paddingTop:20
  },
  
  propertyIcon:{
      width:20, height:20, marginLeft:10
  },

  seperatorLine:{
      width:window.width*0.95, height:2,backgroundColor:'#E1E1E1', marginLeft:10, marginTop:20, margin:10
  },

  biddingBaseRateView:{
      flex:1, alignItems:'center', justifyContent:'center'
  },

  biddingBaseRateInnerView:{
      padding:1, borderWidth:0.5, borderRadius:10, alignItems:'center', justifyContent:'center'
  },

  biddingBaseRate:{
      fontSize:22, fontWeight:'bold'
  },

  openView:{
      marginTop:20, alignItems:'center', justifyContent:'center', width:window.width*0.5, height:30, backgroundColor:'#dedede'
  },

  biddingView:{
      borderBottomLeftRadius:10, borderBottomRightRadius:10, alignItems:'center', justifyContent:'center',
      width:window.width*0.5, height:40, backgroundColor:'#86CF94'
  },

  biddingText:{
      color:'#ffffff', fontSize:22, fontWeight:'bold'
  },

  discriptionTitleView:{
      marginLeft:10, marginTop:10, marginRight: 10,
  },

  discriptionTitle:{
      fontWeight:'bold',paddingTop:5
  },

  generalFeatureItemContainer:{
      flexDirection:'row',justifyContent:'space-between'
  },

  propertyAttributeTitle:{
    fontWeight:'bold', paddingLeft:10, paddingTop:20      
  },
  row: {
    marginRight: 10,
    marginTop: 8,
    backgroundColor: "#F5F5F5"
  },
  listRowContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    paddingLeft: 5,
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 5,
    alignItems: "center",
    backgroundColor: "#F5F5F5"
  },
  title: {
    color: "black",
    paddingLeft: 10
  },
  normalText: {
    color: "gray",
  },
  signInViewContainerStyle:{
    flex: 1,
    marginLeft: 40,
    marginRight: 40,
  },
  inlineInputImg: {
    height:20,
    width:20,
    position: 'absolute',
    left: 0,    
    bottom:(Platform.OS === 'ios') ? 22 : 12,

  },
});