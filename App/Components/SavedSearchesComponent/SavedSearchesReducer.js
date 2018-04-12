import ACTION_TYPES from '../../Action/ActionsType';

const INITIAL_STATE = {	
	savedSearchPropertyList:'',	 	
}

export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){
		
		case ACTION_TYPES.GET_SAVED_SEARCH_PROPERTY_ACTION:
			return {...state, savedSearchPropertyList: action.payload}		

		case ACTION_TYPES.CLEAR_GET_SAVED_SEARCH_PROPERTY_ACTION:
			return {...state, savedSearchPropertyList:''}		

		default:
			return state;
	}

};