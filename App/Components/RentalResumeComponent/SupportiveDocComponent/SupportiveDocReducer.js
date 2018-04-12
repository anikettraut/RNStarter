import ACTION_TYPES from '../../../Action/ActionsType';

const INITIAL_STATE = { 
  tenantSupportingDocResponse:'',   
}

export default  (state = INITIAL_STATE, action) => {

  switch(action.type){
    
    case ACTION_TYPES.GET_TENANT_SUPPORT_DOCUMENT_ACTION:
      return {...state, tenantSupportingDocResponse: action.payload}    

    default:
      return state;
  }

};