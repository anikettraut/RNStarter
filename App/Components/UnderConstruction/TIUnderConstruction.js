import React,{Component} from 'react';
import { connect } from 'react-redux';
import {
	Image,
	StyleSheet,
	View,
  Text,
	Alert,
	Platform,
} from 'react-native';

import {Actions}  from 'react-native-router-flux';

import styles     from './TIUnderConstructionStyle';
import Colors     from '../../Constants/Colors';
import Strings    from '../../Constants/Strings';

import constructionImage     from '../../Assets/construction.png';

class TIUnderConstruction extends Component{

	_moveBack() {
	}

	render(){

    	return(
    			<View style={styles.container}>
            <Image source={constructionImage}
                  style={styles.cardImg}
            />
            <Text style={styles.cardLabel}>{Strings.UNDER_CONSTRUCTION_TEXT}</Text>
    			</View>
    	);

	}

}
module.exports = (TIUnderConstruction);