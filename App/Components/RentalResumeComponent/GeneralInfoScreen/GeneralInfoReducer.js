import ACTION_TYPES from '../../../Action/ActionsType';

const INITIAL_STATE = {	
	tenantDetailResponse:'',
	updateTenantDetailResponse:'',	
	stateListResponse:'',	 	
	countryListResponse:'',	 	
}

export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){

		case ACTION_TYPES.GET_STATE_LIST_ACTION:
			return {...state, stateListResponse: action.payload}

		case ACTION_TYPES.GET_COUNTRY_LIST_ACTION:
			return {...state, countryListResponse: action.payload}

		case ACTION_TYPES.CLEAR_GET_STATE_LIST_ACTION:
			return { ...state, stateListResponse: '' }

		case ACTION_TYPES.CLEAR_GET_COUNTRY_LIST_ACTION:
			return { ...state, countryListResponse: '' }

		
		case ACTION_TYPES.GET_TENANT_DETAILS_ACTION:
			return {...state, tenantDetailResponse: action.payload}

		case ACTION_TYPES.UPDATE_TENANT_DETAILS_ACTION:
			return {...state, updateTenantDetailResponse: action.payload}

		case ACTION_TYPES.CLEAR_GET_TENANT_DETAILS_ACTION:
			return { ...state, tenantDetailResponse: '' }

		case ACTION_TYPES.CLEAR_UPDATE_TENANT_DETAILS_ACTION:
			return { ...state, updateTenantDetailResponse: '' }		

		default:
			return state;
	}

};