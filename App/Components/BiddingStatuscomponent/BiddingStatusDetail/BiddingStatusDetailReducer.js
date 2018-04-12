import ACTION_TYPES from '../../../Action/ActionsType';
const INITIAL_STATE = {	
	topBiddingDetailsResponse:'',	
}


export default 	(state = INITIAL_STATE, action) => {

	switch(action.type){
		
		case ACTION_TYPES.GET_TOP_BIDDING_DETAILS_ACTION:
			return {...state, topBiddingDetailsResponse: action.payload}		

		case ACTION_TYPES.CLEAR_TOP_BIDDING_DETAILS_ACTION:
			return {...state, topBiddingDetailsResponse: ''}		

		default:
			return state;
	}

};