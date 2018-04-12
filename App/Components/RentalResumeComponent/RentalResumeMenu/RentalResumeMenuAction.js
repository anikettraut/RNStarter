import ACTION_TYPES from '../../../Action/ActionsType';
import API from '../../../Constants/APIUrls';

export const clearGetRentalResumeStatesResponse = () => ({
  type: ACTION_TYPES.CLEAR_GET_RENTAL_RESUME_STATES_ACTION
});

// Refresh Rental Resume Menu
export const refreshRentalResumeMenu = (isRefresh) => {
	return {
		type: ACTION_TYPES.REFRESH_RENTAL_RESUME_MENU,
		payload : isRefresh
	}
};

// Stop Refresh Rental Resume attribute
export const stopRefreshRentalResumeMenu = () => {
	return {
		type: ACTION_TYPES.STOP_REFRESH_RENTAL_RESUME_MENU,		
	}
};
