import React, { Component } from 'react';
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
	TextInput,
	AsyncStorage
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation';

import styles       from './DashboardStyle';
import Strings      from '../../Constants/Strings';

import tabActive1 	from '../../Assets/search_s.png';
import tab1 		from '../../Assets/searchTab.png';
import tabActive2 	from '../../Assets/home_s.png';
import tab2 		from '../../Assets/home.png';
import tabActive3 	from '../../Assets/notification_s.png';
import tab3 		from '../../Assets/notification.png';
import tabActive4 	from '../../Assets/profile_s.png';
import tab4 		from '../../Assets/profile.png';

const SearchScreen = require('../SearchComponent/SearchScreen');
const TenantProfileScreen = require('../TenantProfileComponent/TenantProfileScreen');
const TIUnderConstruction = require('../UnderConstruction/TIUnderConstruction');
const LoginScreen = require('../LoginComponent/Login');
const WeatherUpdates = require('../WeatherUpdatesComponent/WeatherUpdates');

class Dashboard extends Component {

	constructor() {

		super();
		this.state = {
			activeTab: 0,
			previousTab: 0,
			selected: ''
		};
		this.handleTabChange = this.handleTabChange.bind(this);
		
	}

	componentDidMount() {

	}

	handleTabChange(newTabIndex, oldTabIndex) {
		this.setState({ activeTab: newTabIndex, previousTab: oldTabIndex });
	}

	_showSelectedScreen(newTabIndex) {

		switch (newTabIndex) {
			case 0:
				return (

					<SearchScreen/>
				);
				
				break;
			case 1:
				return (

					<TIUnderConstruction />
				);
				
				break;
			case 2:				
				return (

					<TIUnderConstruction />
				);
				break;
			case 3:				

				if(this.props.loggedInUserData == ''){					
					return (
							<LoginScreen 
								userType={this.props.userType}
							/>
						);
				}
				else{
					return (
							<TenantProfileScreen 
								userType={this.props.userType}
								loggedInUserData={this.props.loggedInUserData}
							/>
						);
				}								

				break;			
				
			default:

		}

	}

	render() {

		return (

			<View style={styles.container}>

				{this._showSelectedScreen(this.state.activeTab)}

				<BottomNavigation
					activeTab={this.state.activeTab}
					labelColor="black"
					rippleColor="white"
					style={styles.bottomNavigationStyle}
					innerStyle={{ paddingTop: 10 }}
					onTabChange={this.handleTabChange}
					shifting={false}
				>

					<Tab
						barBackgroundColor="#FFFFFF"
						activeLabelColor='red'
						label="Search"
						icon={<Image source={tab1} style={styles.iconStyle} />}
						activeIcon={<Image source={tabActive1} style={styles.iconStyle} />}
					/>
					<Tab
						barBackgroundColor="#FFFFFF"
						label="Home"
						activeLabelColor='red'
						icon={<Image source={tab2} style={styles.iconStyle} />}
						activeIcon={<Image source={tabActive2} style={styles.iconStyle} />}
					/>
				
					<Tab
						barBackgroundColor="#FFFFFF"
						activeLabelColor='red'
						label="Notifications"
						icon={<Image source={tab3} style={styles.iconStyle} />}
						activeIcon={<Image source={tabActive3} style={styles.iconStyle} />}
					/>
					<Tab
						barBackgroundColor="#FFFFFF"
						label="Me"
						activeLabelColor='red'
						icon={<Image source={tab4} style={styles.iconStyle} />}
						activeIcon={<Image source={tabActive4} style={styles.iconStyle} />}
					/>

				</BottomNavigation>

				
			</View>
		);
	}

}

export default Dashboard;
