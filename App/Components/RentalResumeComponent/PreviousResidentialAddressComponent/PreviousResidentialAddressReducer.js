import ACTION_TYPES from '../../../Action/ActionsType';

const INITIAL_STATE = {	
	tenantPreResidentInfoResponse:'',	 	
	updateTenantPreResidentInfoResponse:'',	 	
}

export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){
		
		case ACTION_TYPES.GET_TENANT_PRE_RES_INFO_ACTION:
			return {...state, tenantPreResidentInfoResponse: action.payload}

		case ACTION_TYPES.UPDATE_TENANT_PRE_RES_INFO_ACTION:
			return {...state, updateTenantPreResidentInfoResponse: action.payload}



		case ACTION_TYPES.CLEAR_GET_TENANT_PRE_RES_INFO_ACTION:
			return {...state, tenantPreResidentInfoResponse: ''}

		case ACTION_TYPES.CLEAR_UPDATE_TENANT_PRE_RES_INFO_ACTION:
			return {...state, updateTenantPreResidentInfoResponse: ''}		

		default:
			return state;
	}

};