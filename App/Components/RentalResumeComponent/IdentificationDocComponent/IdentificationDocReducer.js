import ACTION_TYPES from '../../../Action/ActionsType';

const INITIAL_STATE = {	
	tenantIdentificationDocResponse:'',	 	
	uploadTenantIdentityDocResponse:'',	 	
}

export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){
		
		case ACTION_TYPES.GET_TENANT_IDENT_DOCUMENT_ACTION:
			return {...state, tenantIdentificationDocResponse: action.payload}

		case ACTION_TYPES.DELETE_TENANT_IDENT_DOCUMENT_ACTION:
			return {...state, deleteTenantIdentificationDocResponse: action.payload}		

		case ACTION_TYPES.UPLOAD_TENANT_IDENTITY_DOC_ACTION:
			return {...state, uploadTenantIdentityDocResponse: action.payload}	

		case ACTION_TYPES.CLEAR_UPLOAD_TENANT_IDENTITY_DOC_ACTION:
			return {...state, uploadTenantIdentityDocResponse: ''}		

		default:
			return state;
	}

};