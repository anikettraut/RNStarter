import ACTION_TYPES from "../../../Action/ActionsType";
const INITIAL_STATE = {
  tenantBidDetailResponse: "",
  cancelBidResponse: "",
  bidUserDetailResponse: "",
  bidTenantDetailResponse: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_TENANT_BID_DETAILS_ACTION:
      return { ...state, tenantBidDetailResponse: action.payload };

    case ACTION_TYPES.CLEAR_TENANT_BID_DETAILS_ACTION:
      return { ...state, tenantBidDetailResponse: "" };

    case ACTION_TYPES.CANCEL_BID_ACTION:
      return { ...state, cancelBidResponse: action.payload };

    case ACTION_TYPES.GET_BID_USER_DETAILS_ACTION:
      return { ...state, bidUserDetailResponse: action.payload };

    case ACTION_TYPES.GET_BID_TENANT_DETAILS:
      return { ...state, bidTenantDetailResponse: action.payload };

    case ACTION_TYPES.CLEAR_BID_TENANT_DETAIL_RESPONSE:
      return { ...state, bidTenantDetailResponse: "" };

    case ACTION_TYPES.CLEAR_BID_USER_DETAIL_RESPONSE:
      return { ...state, bidUserDetailResponse: "" };

    default:
      return state;
  }
};
