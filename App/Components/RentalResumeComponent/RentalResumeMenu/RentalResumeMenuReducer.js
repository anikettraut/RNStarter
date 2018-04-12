import ACTION_TYPES from '../../../Action/ActionsType';

const INITIAL_STATE = {	
	rentalResumeStates:'',
	isRefreshRentalResumeMenu:'',
}

export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){
		
		case ACTION_TYPES.GET_RENTAL_RESUME_STATES_ACTION:
			return {...state, rentalResumeStates: action.payload}

		case ACTION_TYPES.CLEAR_GET_RENTAL_RESUME_STATES_ACTION:
			return { ...state, rentalResumeStates: '' }		

		case ACTION_TYPES.REFRESH_RENTAL_RESUME_MENU:
			return {...state, isRefreshRentalResumeMenu: action.payload}

		case ACTION_TYPES.STOP_REFRESH_RENTAL_RESUME_MENU:
			return { ...state, isRefreshRentalResumeMenu: '' }

		default:
			return state;
	}

};