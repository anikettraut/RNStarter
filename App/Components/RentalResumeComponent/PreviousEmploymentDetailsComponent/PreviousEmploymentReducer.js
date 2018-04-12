import ACTION_TYPES from '../../../Action/ActionsType';

const INITIAL_STATE = {	
	tenantPreEmpResponse:'',	 	
	updateTenantPreEmpResponse:'',	 	
}

export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){
		
		case ACTION_TYPES.GET_TENANT_PREVIOUS_EMP_ACTION:
			return {...state, tenantPreEmpResponse: action.payload}

		case ACTION_TYPES.UPDATE_TENANT_PREVIOUS_EMP_ACTION:
			return {...state, updateTenantPreEmpResponse: action.payload}

		case ACTION_TYPES.CLEAR_GET_TENANT_PREVIOUS_EMP_ACTION:
			return {...state, tenantPreEmpResponse: ''}

		case ACTION_TYPES.CLEAR_UUPDATE_TENANT_PREVIOUS_EMP_ACTION:
			return {...state, updateTenantPreEmpResponse: ''}		

		default:
			return state;
	}

};