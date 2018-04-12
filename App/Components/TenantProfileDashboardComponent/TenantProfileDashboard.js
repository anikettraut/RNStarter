import React,{Component} from 'react';
import { connect } from 'react-redux';
import {
	Image,
	StyleSheet,
	View,
    Text,
    TextInput,
    Button,
	TouchableOpacity,
	Alert,
	Platform,
	ScrollView,
    ListView,
    AsyncStorage,
    Dimensions,
    InteractionManager
} from 'react-native';

import{ Actions}    from 'react-native-router-flux';

import Colors       from '../../Constants/Colors';
import Strings      from '../../Constants/Strings';
import styles       from './TenantProfileDashboardStyle';
import CommonStyles from '../../CommonStyle/CommonStyle';
import DynamicListRow from '../CommonComponent/DynamicListRow';

import ImageSlider from 'react-native-image-slider';

import appLogoImage from '../../Assets/logo.png';
import homebgImage from '../../Assets/homebg.png';
import searchImage from '../../Assets/search.png';
import arrowImage from '../../Assets/arrow.png';
import clockImage from '../../Assets/clock.png';

const window = Dimensions.get('window');

class TenantProfileDashboard extends Component{


    constructor() {

        super();
            this.state = {
                dataSource  : new ListView.DataSource({
                    rowHasChanged : (row1, row2) => true
                }),
                responseData:['a','b','c','d','e','f','g'],                
                position: 1,
                interval: null,
                searchKeyword:'',
                showSignINButton: true,
            };   
            
    }
    
    componentWillMount() {
        this.setState({interval: setInterval(() => {
            this.setState({position: this.state.position === 2 ? 0 : this.state.position + 1});
        }, 5000)});
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {                        
            this._loadData();
        });        
    }

    componentWillReceiveProps(nextProps) {
        
    }

    componentDidUpdate() {   

    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
        this.setState({responseData:[]});
    }

    _loadData(refresh) {
            refresh && this.setState({
                    refreshing : true
            });

            this.dataLoadSuccess({data :  this.state.responseData});
    }

    dataLoadSuccess(result) {

            this._data = result.data;

            let ds = this.state.dataSource.cloneWithRows(this._data);

            this.setState({
                    loading     : false,
                    refreshing  : false,
                    dataSource  : ds
            });
    }

    onRentalResumeClick(){        
        Actions.RentalResumeMenu();            
    }

    onSearchChangeText(text){
     
    }    

	render(){
    	return(
    		<View style={styles.container}>                  
                <View style={styles.rentalResumeButtonViewStyle}>
                        <TouchableOpacity               
                            onPress={() => this.onRentalResumeClick()}    
                            style={styles.buttonOpacityStyle}>
                                    <Text style={styles.buttonTextStyle}>{Strings.RENTAL_RESUME}</Text>
                        </TouchableOpacity>
                </View>
    		</View>
    	);
	}

}

export default TenantProfileDashboard;
