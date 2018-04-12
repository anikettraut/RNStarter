import ACTION_TYPES from '../../../Action/ActionsType';

const INITIAL_STATE = {	
	tenantCurrentResidentInfoResponse:'',	 	
	updateTenantCurrentResidentInfoResponse:'',	 	
}

export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){
		
		case ACTION_TYPES.GET_TENANT_CURRENT_RES_INFO_ACTION:
			return {...state, tenantCurrentResidentInfoResponse: action.payload}

		case ACTION_TYPES.UPDATE_TENANT_CURRENT_RES_INFO_ACTION:
			return {...state, updateTenantCurrentResidentInfoResponse: action.payload}		



		case ACTION_TYPES.CLEAR_GET_TENANT_CURRENT_RES_INFO_ACTION:
			return {...state, tenantCurrentResidentInfoResponse: ''}

		case ACTION_TYPES.CLEAR_UPDATE_TENANT_CURRENT_RES_INFO_ACTION:
			return {...state, updateTenantCurrentResidentInfoResponse: ''}

		default:
			return state;
	}

};