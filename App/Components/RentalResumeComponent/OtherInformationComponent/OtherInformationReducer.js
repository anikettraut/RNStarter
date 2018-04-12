import ACTION_TYPES from '../../../Action/ActionsType';

const INITIAL_STATE = {	
	tenantResidentInfoResponse:'',	 	
	updateTenantResidentInfoResponse:'',	 	
	deleteCoAppliocantInfoResponse:'',	 	
}

export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){
		
		case ACTION_TYPES.GET_TENANT_RESIDENT_INFO_ACTION:
			return {...state, tenantResidentInfoResponse: action.payload}		

		case ACTION_TYPES.UPDATE_TENANT_RESIDENT_INFO_ACTION:
			return {...state, updateTenantResidentInfoResponse: action.payload}

		case ACTION_TYPES.DELETE_CO_APPLICANT_INFO_ACTION:
			return {...state, deleteCoAppliocantInfoResponse: action.payload}


		case ACTION_TYPES.CLEAR_GET_TENANT_RESIDENT_INFO_ACTION:
			return { ...state, tenantResidentInfoResponse: '' }

		case ACTION_TYPES.CLEAR_UPDATE_TENANT_RESIDENT_INFO_ACTION:
			return { ...state, updateTenantResidentInfoResponse: '' }	
			

		default:
			return state;
	}

};