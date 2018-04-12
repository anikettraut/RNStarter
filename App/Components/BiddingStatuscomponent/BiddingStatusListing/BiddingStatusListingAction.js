import ACTION_TYPES from "../../../Action/ActionsType";
import API from "../../../Constants/APIUrls";

export const clearGetTenantBidDetailsResponse = () => ({
  type: ACTION_TYPES.CLEAR_TENANT_BID_DETAILS_ACTION
});

export const clearBidTenantDetailResponse = () => ({
  type: ACTION_TYPES.CLEAR_BID_TENANT_DETAIL_RESPONSE
});

export const clearBidUserDetailResponse = () => ({
  type: ACTION_TYPES.CLEAR_BID_USER_DETAIL_RESPONSE
});
