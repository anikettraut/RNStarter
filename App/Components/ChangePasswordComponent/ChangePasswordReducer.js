import ACTION_TYPES from '../../Action/ActionsType';
const INITIAL_STATE = {	
	changePasswordResponse:'',	
}


export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){		

		case ACTION_TYPES.CHANGE_PASSWORD_ACTION:
			return {...state, changePasswordResponse: action.payload}		

		case ACTION_TYPES.CLEAR_CHANGE_PASSWORD_ACTION:
			return {...state, changePasswordResponse: ''}				

		default:
			return state;
	}

};