import API_CONST from "../Constants/APIConstants";

export const registerUser = data => {
  return {
    type: API_CONST.N_REGISTER_USER,
    data
  };
};

export const getToken = data => {
  return {
    type: API_CONST.N_GET_TOKEN,
    data
  };
};

export const getExternalLogins = data => {
  return {
    type: API_CONST.N_GET_EXT_TOKEN,
    data
  };
};

export const getLoggedInUserDetails = (xauthtoken, data) => {
  return {
    type: API_CONST.N_LOGGED_IN_USER_DETAIL,
    data,
    xauthtoken
  };
};

export const getIndoorFeatureList = data => {
  return {
    type: API_CONST.N_INDOOR_FEATURE_LIST,
    data
  };
};

export const getOutdoorFeatureList = data => {
  return {
    type: API_CONST.N_OUTDOOR_FEATURE_LIST,
    data
  };
};

export const saveSearchProperty = data => {
  return {
    type: API_CONST.N_SAVE_SEARCH_PROPERTY,
    data
  };
};

export const getSavedSearchProperty = data => {
  return {
    type: API_CONST.N_GET_SAVED_SEARCH_PROPERTY,
    data
  };
};

export const getPropertyInfoBySearch = data => {
  return {
    type: API_CONST.N_PROPERTY_INFO_BYSEARCH,
    data
  };
};

export const saveFavouriteProperty = data => {
  return {
    type: API_CONST.N_SAVE_FAV_PROPERTY,
    data
  };
};

export const getPropertyDetails = data => {
  return {
    type: API_CONST.N_GET_PROPERTY_DETAILS,
    data
  };
};

export const saveFavouritePropertyDetail = data => {
  return {
    type: API_CONST.N_SAVE_FAV_PROPERTY_DETAIL,
    data
  };
};

export const getTenantDetails = data => {
  return {
    type: API_CONST.N_GET_TENANT_DETAILS,
    data
  };
};

export const getRentalResumeStates = data => {
  return {
    type: API_CONST.N_GET_RENTAL_RESUME_STATES,
    data
  };
};

export const getStatesList = data => {
  return {
    type: API_CONST.N_GET_STATE_LIST,
    data
  };
};

export const getCountryList = data => {
  return {
    type: API_CONST.N_GET_COUNTRY_LIST,
    data
  };
};

export const updateTenantDetails = data => {
  return {
    type: API_CONST.N_UPDATE_TENANT_DETAILS,
    data
  };
};

export const getTenantResidentsInfo = data => {
  return {
    type: API_CONST.N_GET_TENANT_RESIDENT_INFO,
    data
  };
};

export const addUpdateTenantResidentsInfo = data => {
  return {
    type: API_CONST.N_UPDATE_TENANT_RESIDENT_INFO,
    data
  };
};

export const getTenantPetsInfo = data => {
  return {
    type: API_CONST.N_GET_TENANT_PETS_INFO,
    data
  };
};

export const addUpdateTenantPetsInfo = data => {
  return {
    type: API_CONST.N_UPDATE_TENANT_PETS_INFO,
    data
  };
};

export const deleteCoAppliocantInfo = data => {
  return {
    type: API_CONST.N_DELETE_CO_APPLICANT_INFO,
    data
  };
};

export const deletePetInfo = data => {
  return {
    type: API_CONST.N_DELETE_TENANT_PETS_INFO,
    data
  };
};

export const getTenantCurrentResidential = data => {
  return {
    type: API_CONST.N_GET_TENANT_CURRENT_RES_INFO,
    data
  };
};

export const addUpdateTenantCurrentResidential = data => {
  return {
    type: API_CONST.N_UPDATE_TENANT_CURRENT_RES_INFO,
    data
  };
};

export const getTenantPreviousResidential = data => {
  return {
    type: API_CONST.N_GET_TENANT_PRE_RES_INFO,
    data
  };
};

export const addUpdateTenantPreviousResidential = data => {
  return {
    type: API_CONST.N_UPDATE_TENANT_PRE_RES_INFO,
    data
  };
};

export const getTenantCurrentEmployment = data => {
  return {
    type: API_CONST.N_GET_TENANT_CURRENT_EMP,
    data
  };
};

export const addUpdateTenantEmployment = data => {
  return {
    type: API_CONST.N_UPDATE_TENANT_CURRENT_EMP,
    data
  };
};

export const getTenantPersonalReference = data => {
  return {
    type: API_CONST.N_GET_TENANT_PERSONAL_REF,
    data
  };
};

export const addUpdateTenantPersonalReference = data => {
  return {
    type: API_CONST.N_UPDATE_TENANT_PERSONAL_REF,
    data
  };
};

export const getTenantPreviousEmployment = data => {
  return {
    type: API_CONST.N_GET_TENANT_PREVIOUS_EMP,
    data
  };
};

export const addUpdateTenantPreEmployment = data => {
  return {
    type: API_CONST.N_UPDATE_TENANT_PREVIOUS_EMP,
    data
  };
};

export const getTenantIdentificationDocu = data => {
  return {
    type: API_CONST.N_GET_TENANT_IDENT_DOCUMENT,
    data
  };
};

export const deleteIdentityDocument = data => {
  return {
    type: API_CONST.N_DELETE_TENANT_IDENT_DOCUMENT,
    data
  };
};

export const getWeatherUpdates = data => {
  return {
    type: API_CONST.N_GET_WEATHER_UPDATES,
    data
  };
};

export const uploadMyFileDoc = data => {
  return {
    type: API_CONST.N_UPLOAD_TENANT_IDENTITY_DOC,
    data
  };
};

export const getTenantBidDetails = data => {
  return {
    type: API_CONST.N_GET_TENANT_BID_DETAILS,
    data
  };
};

export const getTopBiddingDetails = data => {
  return {
    type: API_CONST.N_GET_TOP_BIDDING_DETAILS,
    data
  };
};

export const cancelBid = data => {
  return {
    type: API_CONST.N_CANCEL_BID,
    data
  };
};

export const saveResumepdf = data => {
  return {
    type: API_CONST.N_SAVE_RENTAL_RESUME_PDF,
    data
  };
};

export const changePassword = data => {
  return {
    type: API_CONST.N_CHANGE_PASSWORD,
    data
  };
};

export const getBidUserDetails = data => {
  return {
    type: API_CONST.N_GET_BID_USER_DETAILS,
    data
  };
};

export const getTransactions = data => {
  return {
    type: API_CONST.N_GET_TRANSACTIONS,
    data
  };
};

export const getBidTenantDetails = data => {
  return {
    type: API_CONST.N_GET_BID_TENANT_DETAILS,
    data
  };
};

export const getInspections = data => {
  return {
    type: API_CONST.N_GET_INSPECTIONS,
    data
  };
};
