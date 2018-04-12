import ACTION_TYPES from '../../../Action/ActionsType';

const INITIAL_STATE = {	
	tenantPersonalRefResponse:'',
	updateTenantPersonalRefResponse:'',	 	
}

export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){
		
		case ACTION_TYPES.GET_TENANT_PERSONAL_REF_ACTION:
			return {...state, tenantPersonalRefResponse: action.payload}	

		case ACTION_TYPES.UPDATE_TENANT_PERSONAL_REF_ACTION:
			return {...state, updateTenantPersonalRefResponse: action.payload}

		case ACTION_TYPES.CLEAR_GET_TENANT_PERSONAL_REF_ACTION:
			return {...state, tenantPersonalRefResponse: ''}	

		case ACTION_TYPES.CLEAR_UPDATE_TENANT_PERSONAL_REF_ACTION:
			return {...state, updateTenantPersonalRefResponse: ''}		

		default:
			return state;
	}

};