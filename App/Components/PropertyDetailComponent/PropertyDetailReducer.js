import ACTION_TYPES from '../../Action/ActionsType';

const INITIAL_STATE = {	
	propertyDetailsResponse:'',	
	saveFavPropertyResponse:'', 	
}

export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){
		
		case ACTION_TYPES.GET_PROPERTY_DETAILS_ACTION:
			return {...state, propertyDetailsResponse: action.payload}


		case ACTION_TYPES.SAVE_FAV_PROPERTY_DETAIL_ACTION:
			return {...state, saveFavPropertyResponse: action.payload}		

		
		case ACTION_TYPES.CLEAR_GET_PROPERTY_DETAILS_ACTION:
			return { ...state, propertyDetailsResponse: '' }

		case ACTION_TYPES.CLEAR_SAVE_FAV_PROPERTY_DETAIL_ACTION:
			return {...state, saveFavPropertyResponse: ''}

		default:
			return state;
	}

};