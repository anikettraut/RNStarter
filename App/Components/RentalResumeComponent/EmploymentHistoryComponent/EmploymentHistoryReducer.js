import ACTION_TYPES from '../../../Action/ActionsType';

const INITIAL_STATE = {	
	tenantCurrentEmpResponse:'',	 	
	updateTenantCurrentEmpResponse:'',	 	
}

export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){
		
		case ACTION_TYPES.GET_TENANT_CURRENT_EMP_ACTION:
			return {...state, tenantCurrentEmpResponse: action.payload}

		case ACTION_TYPES.UPDATE_TENANT_CURRENT_EMP_ACTION:
			return {...state, updateTenantCurrentEmpResponse: action.payload}


		case ACTION_TYPES.CLEAR_GET_TENANT_CURRENT_EMP_ACTION:
			return {...state, tenantCurrentEmpResponse: ''}

		case ACTION_TYPES.CLEAR_UPDATE_TENANT_CURRENT_EMP_ACTION:
			return {...state, updateTenantCurrentEmpResponse: ''}		

		default:
			return state;
	}

};