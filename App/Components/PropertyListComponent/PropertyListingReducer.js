import ACTION_TYPES from '../../Action/ActionsType';
const INITIAL_STATE = {	
	propertyListResponse:'',
	saveFavPropertyResponse:'',	 	
}


export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){
		
		case ACTION_TYPES.PROPERTY_INFO_BYSEARCH:
			return {...state, propertyListResponse: action.payload}

		case ACTION_TYPES.SAVE_FAV_PROPERTY_ACTION:
			return {...state, saveFavPropertyResponse: action.payload}	

		case ACTION_TYPES.CLEAR_PROPERTY_INFO_BYSEARCH_ACTION:
			return {...state, propertyListResponse: ''}

		case ACTION_TYPES.CLEAR_SAVE_FAV_PROPERTY_ACTION:
			return {...state, saveFavPropertyResponse: ''}		

		default:
			return state;
	}

};