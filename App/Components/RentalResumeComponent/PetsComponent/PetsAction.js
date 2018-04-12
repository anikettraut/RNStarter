import ACTION_TYPES from '../../../Action/ActionsType';
import API from '../../../Constants/APIUrls';


export const clearGetTenantPetsInfoResponse = () => ({
  type: ACTION_TYPES.CLEAR_GET_TENANT_PETS_INFO_ACTION
});

export const clearAddUpdateTenantPetsInfoResponse = () => ({
  type: ACTION_TYPES.CLEAR_UPDATE_TENANT_PETS_INFO_ACTION
});

export const clearDeletePetInfoResponse = () => ({
  type: ACTION_TYPES.CLEAR_DELETE_TENANT_PETS_INFO_ACTION
});
