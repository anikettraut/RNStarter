import ACTION_TYPES from '../../Action/ActionsType';
const INITIAL_STATE = {	
	saveSearchPropertyResponse:'',
	indoorFeatureListResponse: '',
	outdoorFeatureListResponse: '',	 	
}


export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){
		
		case ACTION_TYPES.SAVE_SEARCH_PROPERTY_ACTION:
			return {...state, saveSearchPropertyResponse: action.payload}

		case ACTION_TYPES.GET_INDOOR_FEATURE_LIST_ACTION:
			return {...state, indoorFeatureListResponse: action.payload}

		case ACTION_TYPES.GET_OUTDOOR_FEATURE_LIST_ACTION:
			return {...state, outdoorFeatureListResponse: action.payload}

		case ACTION_TYPES.CLEAR_GET_INDOOR_FEATURE_LIST_ACTION:
			return {...state, indoorFeatureListResponse: ''}

		case ACTION_TYPES.CLEAR_GET_OUTDOOR_FEATURE_LIST_ACTION:
			return {...state, outdoorFeatureListResponse: ''}		

		default:
			return state;
	}

};