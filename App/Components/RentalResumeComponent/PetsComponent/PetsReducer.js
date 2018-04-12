import ACTION_TYPES from '../../../Action/ActionsType';

const INITIAL_STATE = {	
	tenantPetsInfoResponse:'',	 	
	updateTenantPetsInfoResponse:'',	 	
	deleteTenantPetsInfoResponse:'',	 	
}

export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){
		
		case ACTION_TYPES.GET_TENANT_PETS_INFO_ACTION:
			return {...state, tenantPetsInfoResponse: action.payload}

		case ACTION_TYPES.UPDATE_TENANT_PETS_INFO_ACTION:
			return {...state, updateTenantPetsInfoResponse: action.payload}

		case ACTION_TYPES.DELETE_TENANT_PETS_INFO_ACTION:
			return {...state, deleteTenantPetsInfoResponse: action.payload}



		case ACTION_TYPES.CLEAR_GET_TENANT_PETS_INFO_ACTION:
			return {...state, tenantPetsInfoResponse: ''}

		case ACTION_TYPES.CLEAR_UPDATE_TENANT_PETS_INFO_ACTION:
			return {...state, updateTenantPetsInfoResponse: ''}

		case ACTION_TYPES.CLEAR_DELETE_TENANT_PETS_INFO_ACTION:
			return {...state, deleteTenantPetsInfoResponse: ''}		

		default:
			return state;
	}

};