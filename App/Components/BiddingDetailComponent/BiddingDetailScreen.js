import React,{Component} from 'react';
import { connect } from 'react-redux';
import {
	Image,
	StyleSheet,
	View,
    Text,
    Button,
	TouchableOpacity,
	Alert,
	Platform,
	ScrollView,
    AsyncStorage,
    Dimensions,
    ListView,
    InteractionManager,
    Modal
} from 'react-native';


import{ Actions}    from 'react-native-router-flux';
import Colors       from '../../Constants/Colors';
import Strings      from '../../Constants/Strings';
import styles       from './BiddingDetailStyle';

import check_selected from '../../Assets/check_selected.png';
import meterImage from '../../Assets/meter.png';

var self;
const window = Dimensions.get('window');

class BiddingDetailScreen extends Component{


    constructor() {

        super();
        this.state = {
            accessToken : '',  
            tenantBid:0,          
        };   
        self = this;
    }
    
    componentWillMount() {
        
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {                        
            
        });   
    }
    
    componentWillUnmount(){   
    }

    decrementBid(){
        if(this.state.tenantBid > 0){
            var currentBid = this.state.tenantBid;
            currentBid--;
            this.setState({tenantBid:currentBid});
        }
    }

    incrementBid(){
        var currentBid = this.state.tenantBid;
        currentBid++;
        this.setState({tenantBid:currentBid});
    }

    render(){
        return(
            <View style={styles.mainContainer}>  
                <ScrollView>        

                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>{'Demand'}</Text>
                        <Image source={meterImage} style={{marginTop:20}}/>
                        
                        <View style={{alignItems:'center', justifyContent:'center', width:window.width}}>
                            <Text style={{marginTop:10, fontSize:20}}> Low Demand </Text>   
                            <Text style={{marginTop:5}}> 0-1 applicant </Text>
                        </View>
                           
                    </View>

                    <View style={styles.seperatorLine}/>

                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>{'Agents Price'}</Text>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:window.width*0.9}}>
                            <Text style={{marginTop:10}}> Base Price </Text>
                            <Text style={{marginTop:10}}> $ 100 </Text>
                        </View> 
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:window.width*0.9}}>  
                            <Text style={{marginTop:10}}> Max Price </Text>  
                            <Text style={{marginTop:10}}> $ 100 </Text> 
                        </View> 
                    </View>

                    <View style={styles.seperatorLine}/>

                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>{'Your Offer'}</Text>
                        <View style={{alignItems:'center', justifyContent:'center', width:window.width*0.9}}>
                            <Text style={{marginTop:10}}> Bid Price </Text>   
                        </View>
                        
                        <View style={styles.stepperView}>
                            <TouchableOpacity  onPress={() => this.decrementBid()} >
                                <Text style={{fontSize:24, color:'red', margin:10}}> - </Text>
                            </TouchableOpacity>
                            <Text style={{fontSize:20}}>{this.state.tenantBid}</Text>   
                            <TouchableOpacity  onPress={() => this.incrementBid()} >
                                <Text style={{fontSize:24, color:'red', margin:10}}> + </Text>   
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

            </View>
        );
    }

}

export default BiddingDetailScreen;