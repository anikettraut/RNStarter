import ACTION_TYPES from '../../../Action/ActionsType';
import API from '../../../Constants/APIUrls';

export const clearGetTenantDetailsResponse = () => ({
  type: ACTION_TYPES.CLEAR_GET_TENANT_DETAILS_ACTION
});

export const clearUpdateTenantDetailsResponse = () => ({
  type: ACTION_TYPES.CLEAR_UPDATE_TENANT_DETAILS_ACTION
});

export const clearGetStatesListResponse = () => ({
  type: ACTION_TYPES.CLEAR_GET_STATE_LIST_ACTION
});

export const clearGetCountryListResponse = () => ({
  type: ACTION_TYPES.CLEAR_GET_COUNTRY_LIST_ACTION
});