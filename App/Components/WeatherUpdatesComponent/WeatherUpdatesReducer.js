import ACTION_TYPES from '../../Action/ActionsType';

const INITIAL_STATE = {	
	weatherUpdatesResponse:'',	 	
}

export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){
		
		case ACTION_TYPES.GET_WEATHER_UPDATES_ACTION:
			return {...state, weatherUpdatesResponse: action.payload}		

		case ACTION_TYPES.CLEAR_WEATHER_UPDATES_ACTION:
			return {...state, weatherUpdatesResponse:''}		

		default:
			return state;
	}

};