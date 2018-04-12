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
import styles       from './MapScreenStyle';

import check_selected from '../../Assets/check_selected.png';
import mapview from '../../Assets/mapview.png';

import MapView from 'react-native-maps';

var self;
const window = Dimensions.get('window');

class MapScreen extends Component{


    constructor() {

        super();
        this.state = {
            accessToken : '',            
        };   
        self = this;
    }
    
    componentWillMount() {
        console.log("markers>>>>> "+JSON.stringify(this.props.markers));
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {                        
            
        });   
    }
    
    componentWillUnmount(){   
    }

    showDetails(data) {        
        Actions.PropertyDetailScreen({propertyInfo: data.detail})
    }

    render(){
        return(
            <View style={styles.mainContainer}>  
                <MapView
                    style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, width: null, height: null}}
                    initialRegion={{
                        latitude: this.props.markers[0].LatLng.latitude,
                        longitude: this.props.markers[0].LatLng.longitude,
                        latitudeDelta: 0.4,
                        longitudeDelta: 0.4,
                    }}
                >
                    {this.props.markers.map(marker => (
                        <MapView.Marker
                            coordinate={marker.LatLng}
                            title={marker.title}
                            description={marker.description}
                            onCalloutPress = {this.showDetails.bind(this, marker)}
                        />
                        
                    ))}
                </MapView>
            </View>
        );
    }

}

export default MapScreen;