import {
  put,
  call,
  takeEvery,
  takeLatest,
  select,
  cps
} from "redux-saga/effects";
import API from "../Constants/APIUrls";
import API_CONST from "../Constants/APIConstants";
import ACTION_TYPES from "../Action/ActionsType";
import RNFetchBlob from "react-native-fetch-blob";

//Call for fetching data from api
const _apiCall = (url, data) => {
  return fetch(url, data)
    .then(res => {
      return { res: res, res_json: res.json() };
    })
    .catch(e => {
      throw e;
    });
};

//get response json
const _extJSON = p => {
  return p.then(res => res);
};

const uploadMyFileCall = (fileURI, id, types, docName) => {
  var postData = [
    {
      name: "file",
      filename: docName,
      type: types,
      data: RNFetchBlob.wrap(fileURI)
    },
    {
      name: "UserId",
      data: id
    },
    {
      name: "DocuTypeId",
      data: "1"
    }
  ];

  console.log("======uploadMyFileDoc=========");
  console.log(API.UPLOAD_MULTIPART_FILE);
  console.log("=== postdata ===" + JSON.stringify(postData));
  console.log("====================================");

  return RNFetchBlob.fetch(
    "POST",
    API.UPLOAD_MULTIPART_FILE,
    {
      Accept: "application/json",
      "Content-Type": "multipart/form-data"
    },
    postData
  )
    .then(resp => resp.json())
    .catch(e => {
      console.log(JSON.stringify(e));
      //throw e;
    });
};

function* uploadMyFileDoc(action) {
  var fileURI = action.data.data;
  var id = action.data.id;
  var docType = action.data.docType;
  var docName = action.data.docName;

  var uploadImageHeaderResponse = {};
  try {
    let resp = yield call(uploadMyFileCall, fileURI, id, docType, docName);

    console.log("**************************************************");
    console.log("resp>>> " + JSON.stringify(resp));
    console.log("**************************************************");

    yield put({
      type: ACTION_TYPES.UPLOAD_TENANT_IDENTITY_DOC_ACTION,
      payload: resp
    });
  } catch (e) {
    //console.log('Error: ' + e);
  }
}

//registerUser
function* registerUser(action) {
  var postData = action.data;

  console.log("======registerUser=========");
  console.log(API.REGISTER_USER);
  console.log("postdata===" + JSON.stringify(postData));
  console.log("====================================");

  try {
    let response = yield call(_apiCall, API.REGISTER_USER, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log("Received headerResponse registerUser API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data registerUser API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.REGISTER_USER_RES,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//getToken
function* getToken(action) {
  var postData = action.data;

  console.log("======getToken=========");
  console.log(API.GET_TOKEN);
  console.log("postdata===" + JSON.stringify(postData));
  console.log("====================================");

  try {
    let response = yield call(_apiCall, API.GET_TOKEN, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: postData
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log(responseData);
    console.log("**************************************************");
    console.log("Received headerResponse getToken API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data getToken API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.GET_TOKEN_RES,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//getExternalLogins
function* getExternalLogins(action) {
  var postData = action.data;

  console.log("======getExternalLogins=========");
  console.log(API.LOGIN_SOCIAL);
  console.log("postdata===" + JSON.stringify(postData));
  console.log("====================================");

  try {
    let response = yield call(_apiCall, API.LOGIN_SOCIAL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log("Received headerResponse getExternalLogins API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data getExternalLogins API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.GET_EXT_TOKEN_RES,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//getLoggedInUserDetails
function* getLoggedInUserDetails(action) {
  var postData = action.data;

  console.log("======getLoggedInUserDetails=========");
  console.log(API.GET_LOGGEDIN_USER_DETAILS);
  console.log("xauthtoken=== " + action.xauthtoken);
  console.log("postdata===" + JSON.stringify(postData));
  console.log("====================================");

  try {
    let response = yield call(_apiCall, API.GET_LOGGEDIN_USER_DETAILS, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + action.xauthtoken
      },
      body: JSON.stringify(postData)
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log("Received headerResponse getLoggedInUserDetails API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data getLoggedInUserDetails API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.LOGGED_IN_USER_DETAIL_RESP,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//getIndoorFeatures
function* getIndoorFeatureList(action) {
  var postData = action.data;

  console.log("======getIndoorFeatureList=========");
  console.log(API.GET_INDOOR_FEATURE_LIST);
  console.log("postdata===" + JSON.stringify(postData));
  console.log("====================================");

  try {
    let response = yield call(_apiCall, API.GET_INDOOR_FEATURE_LIST, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log("Received headerResponse getIndoorFeatureList API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data getIndoorFeatureList API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.GET_INDOOR_FEATURE_LIST_ACTION,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//getOutdoorFeature
function* getOutdoorFeatureList(action) {
  var postData = action.data;

  console.log("======getOutdoorFeatureList=========");
  console.log(API.GET_OUTDOOR_FEATURE_LIST);
  console.log("postdata===" + JSON.stringify(postData));
  console.log("====================================");

  try {
    let response = yield call(_apiCall, API.GET_OUTDOOR_FEATURE_LIST, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log("Received headerResponse getOutdoorFeatureList API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data getOutdoorFeatureList API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.GET_OUTDOOR_FEATURE_LIST_ACTION,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//saveSearchProperty
function* saveSearchProperty(action) {
  var postData = action.data;

  console.log("======saveSearchProperty=========");
  console.log(API.SAVE_SEARCH_PROPERTY);
  console.log("postdata===" + JSON.stringify(postData));
  console.log("====================================");

  try {
    let response = yield call(_apiCall, API.SAVE_SEARCH_PROPERTY, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log("Received headerResponse saveSearchProperty API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data saveSearchProperty API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.SAVE_SEARCH_PROPERTY_ACTION,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//getPropertyInfoBySearch
function* getPropertyInfoBySearch(action) {
  var postData = action.data;

  console.log("======getPropertyInfoBySearch=========");
  console.log(API.GET_PROPERTY_INFO_BYSEARCH);
  console.log("postdata===" + JSON.stringify(postData));
  console.log("====================================");

  try {
    let response = yield call(_apiCall, API.GET_PROPERTY_INFO_BYSEARCH, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log("Received headerResponse getPropertyInfoBySearch API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data getPropertyInfoBySearch API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.PROPERTY_INFO_BYSEARCH,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//saveFavouriteProperty
function* saveFavouriteProperty(action) {
  var postData = action.data;

  console.log("======saveFavouriteProperty=========");
  console.log(API.SAVE_FAV_PROPERTY);
  console.log("postdata===" + JSON.stringify(postData));
  console.log("====================================");

  try {
    let response = yield call(_apiCall, API.SAVE_FAV_PROPERTY, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log("Received headerResponse saveFavouriteProperty API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data saveFavouriteProperty API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.SAVE_FAV_PROPERTY_ACTION,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//getPropertyDetails
function* getPropertyDetails(action) {
  var postData = action.data;

  console.log("======getPropertyDetails=========");
  console.log(API.GET_PROPERTY_DETAILS);
  console.log("postdata===" + JSON.stringify(postData));
  console.log("====================================");

  try {
    let response = yield call(_apiCall, API.GET_PROPERTY_DETAILS, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log("Received headerResponse getPropertyDetails API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data getPropertyDetails API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.GET_PROPERTY_DETAILS_ACTION,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//saveFavouriteProperty
function* saveFavouritePropertyDetail(action) {
  var postData = action.data;

  console.log("======saveFavouriteProperty=========");
  console.log(API.SAVE_FAV_PROPERTY);
  console.log("postdata===" + JSON.stringify(postData));
  console.log("====================================");

  try {
    let response = yield call(_apiCall, API.SAVE_FAV_PROPERTY, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log("Received headerResponse saveFavouriteProperty API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data saveFavouriteProperty API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.SAVE_FAV_PROPERTY_DETAIL_ACTION,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//getSavedSearchProperty
function* getSavedSearchProperty(action) {
  var postData = action.data;

  console.log("======getSavedSearchProperty=========");
  console.log(API.GET_SAVED_SEARCH_PROPERTY);
  console.log("postdata===" + JSON.stringify(postData));
  console.log("====================================");

  try {
    let response = yield call(_apiCall, API.GET_SAVED_SEARCH_PROPERTY, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log("Received headerResponse getSavedSearchProperty API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data getSavedSearchProperty API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.GET_SAVED_SEARCH_PROPERTY_ACTION,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//getRentalResumeStates
function* getRentalResumeStates(action) {
  var serviceURL =
    API.GET_RENTAL_RESUME_STATES + "?UserId=" + action.data.UserId;
  console.log("======getRentalResumeStates=========");
  console.log(serviceURL);
  console.log("====================================");

  try {
    let response = yield call(_apiCall, serviceURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log("Received headerResponse getRentalResumeStates API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data getRentalResumeStates API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.GET_RENTAL_RESUME_STATES_ACTION,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//getStatesList
function* getStatesList(action) {
  var serviceURL = API.GET_STATE_LIST;
  console.log("======getStatesList=========");
  console.log(serviceURL);
  console.log("====================================");

  try {
    let response = yield call(_apiCall, serviceURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log("Received headerResponse getStatesList API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data getStatesList API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.GET_STATE_LIST_ACTION,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//getCountryList
function* getCountryList(action) {
  var serviceURL = API.GET_COUNTRY_LIST;
  console.log("======getCountryList=========");
  console.log(serviceURL);
  console.log("====================================");

  try {
    let response = yield call(_apiCall, serviceURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log("Received headerResponse getCountryList API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data getCountryList API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.GET_COUNTRY_LIST_ACTION,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//getTenantDetails
function* getTenantDetails(action) {
  var postData = action.data;

  console.log("======getTenantDetails=========");
  console.log(API.GET_TENANT_DETAILS);
  console.log("postdata===" + JSON.stringify(postData));
  console.log("====================================");

  try {
    let response = yield call(_apiCall, API.GET_TENANT_DETAILS, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log("Received headerResponse getTenantDetails API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data getTenantDetails API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.GET_TENANT_DETAILS_ACTION,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//updateTenantDetails
function* updateTenantDetails(action) {
  var postData = action.data;

  console.log("======updateTenantDetails=========");
  console.log(API.UPDATE_TENANT_DETAILS);
  console.log("postdata===" + JSON.stringify(postData));
  console.log("====================================");

  try {
    let response = yield call(_apiCall, API.UPDATE_TENANT_DETAILS, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log("Received headerResponse updateTenantDetails API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data updateTenantDetails API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.UPDATE_TENANT_DETAILS_ACTION,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//getTenantResidentsInfo
function* getTenantResidentsInfo(action) {
  var postData = action.data;

  console.log("======getTenantResidentsInfo=========");
  console.log(API.GET_TENANT_RESIDENT_INFO);
  console.log("postdata===" + JSON.stringify(postData));
  console.log("====================================");

  try {
    let response = yield call(_apiCall, API.GET_TENANT_RESIDENT_INFO, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log("Received headerResponse getTenantResidentsInfo API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data getTenantResidentsInfo API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.GET_TENANT_RESIDENT_INFO_ACTION,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//addUpdateTenantResidentsInfo
function* addUpdateTenantResidentsInfo(action) {
  var postData = action.data;

  console.log("======addUpdateTenantResidentsInfo=========");
  console.log(API.UPDATE_TENANT_RESIDENT_INFO);
  console.log("postdata===" + JSON.stringify(postData));
  console.log("====================================");

  try {
    let response = yield call(_apiCall, API.UPDATE_TENANT_RESIDENT_INFO, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log("Received headerResponse addUpdateTenantResidentsInfo API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data addUpdateTenantResidentsInfo API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.UPDATE_TENANT_RESIDENT_INFO_ACTION,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//getTenantPetsInfo
function* getTenantPetsInfo(action) {
  var postData = action.data;

  console.log("======getTenantPetsInfo=========");
  console.log(API.GET_TENANT_PETS_INFO);
  console.log("postdata===" + JSON.stringify(postData));
  console.log("====================================");

  try {
    let response = yield call(_apiCall, API.GET_TENANT_PETS_INFO, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log("Received headerResponse getTenantPetsInfo API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data getTenantPetsInfo API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.GET_TENANT_PETS_INFO_ACTION,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//addUpdateTenantPetsInfo
function* addUpdateTenantPetsInfo(action) {
  var postData = action.data;

  console.log("======addUpdateTenantPetsInfo=========");
  console.log(API.UPDATE_TENANT_PETS_INFO);
  console.log("postdata===" + JSON.stringify(postData));
  console.log("====================================");

  try {
    let response = yield call(_apiCall, API.UPDATE_TENANT_PETS_INFO, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log("Received headerResponse addUpdateTenantPetsInfo API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data addUpdateTenantPetsInfo API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.UPDATE_TENANT_PETS_INFO_ACTION,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//deleteCoAppliocantInfo
function* deleteCoAppliocantInfo(action) {
  var postData = action.data;

  console.log("======deleteCoAppliocantInfo=========");
  console.log(API.DELETE_CO_APPLICANT_INFO);
  console.log("postdata===" + JSON.stringify(postData));
  console.log("====================================");

  try {
    let response = yield call(_apiCall, API.DELETE_CO_APPLICANT_INFO, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log("Received headerResponse deleteCoAppliocantInfo API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data deleteCoAppliocantInfo API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.DELETE_CO_APPLICANT_INFO_ACTION,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//deletePetInfo
function* deletePetInfo(action) {
  var postData = action.data;

  console.log("======deletePetInfo=========");
  console.log(API.DELETE_TENANT_PETS_INFO);
  console.log("postdata===" + JSON.stringify(postData));
  console.log("====================================");

  try {
    let response = yield call(_apiCall, API.DELETE_TENANT_PETS_INFO, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log("Received headerResponse deletePetInfo API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data deletePetInfo API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.DELETE_TENANT_PETS_INFO_ACTION,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//getTenantCurrentResidential
function* getTenantCurrentResidential(action) {
  var postData = action.data;

  console.log("======getTenantCurrentResidential=========");
  console.log(API.GET_TENANT_CURRENT_RES_INFO);
  console.log("postdata===" + JSON.stringify(postData));
  console.log("====================================");

  try {
    let response = yield call(_apiCall, API.GET_TENANT_CURRENT_RES_INFO, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log("Received headerResponse getTenantCurrentResidential API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data getTenantCurrentResidential API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.GET_TENANT_CURRENT_RES_INFO_ACTION,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//addUpdateTenantCurrentResidential
function* addUpdateTenantCurrentResidential(action) {
  var postData = action.data;

  console.log("======addUpdateTenantCurrentResidential=========");
  console.log(API.UPDATE_TENANT_CURRENT_RES_INFO);
  console.log("postdata===" + JSON.stringify(postData));
  console.log("====================================");

  try {
    let response = yield call(_apiCall, API.UPDATE_TENANT_CURRENT_RES_INFO, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log(
      "Received headerResponse addUpdateTenantCurrentResidential API: "
    );
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data addUpdateTenantCurrentResidential API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.UPDATE_TENANT_CURRENT_RES_INFO_ACTION,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//getTenantPreviousResidential
function* getTenantPreviousResidential(action) {
  var postData = action.data;

  console.log("======getTenantPreviousResidential=========");
  console.log(API.GET_TENANT_PRE_RES_INFO);
  console.log("postdata===" + JSON.stringify(postData));
  console.log("====================================");

  try {
    let response = yield call(_apiCall, API.GET_TENANT_PRE_RES_INFO, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log("Received headerResponse getTenantPreviousResidential API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data getTenantPreviousResidential API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.GET_TENANT_PRE_RES_INFO_ACTION,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//addUpdateTenantPreviousResidential
function* addUpdateTenantPreviousResidential(action) {
  var postData = action.data;

  console.log("======addUpdateTenantPreviousResidential=========");
  console.log(API.UPDATE_TENANT_PRE_RES_INFO);
  console.log("postdata===" + JSON.stringify(postData));
  console.log("====================================");

  try {
    let response = yield call(_apiCall, API.UPDATE_TENANT_PRE_RES_INFO, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log(
      "Received headerResponse addUpdateTenantPreviousResidential API: "
    );
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data addUpdateTenantPreviousResidential API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.UPDATE_TENANT_PRE_RES_INFO_ACTION,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//getTenantCurrentEmployment
function* getTenantCurrentEmployment(action) {
  var postData = action.data;

  console.log("======getTenantCurrentEmployment=========");
  console.log(API.GET_TENANT_CURRENT_EMP);
  console.log("postdata===" + JSON.stringify(postData));
  console.log("====================================");

  try {
    let response = yield call(_apiCall, API.GET_TENANT_CURRENT_EMP, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log("Received headerResponse getTenantCurrentEmployment API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data getTenantCurrentEmployment API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.GET_TENANT_CURRENT_EMP_ACTION,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//addUpdateTenantEmployment
function* addUpdateTenantEmployment(action) {
  var postData = action.data;

  console.log("======addUpdateTenantEmployment=========");
  console.log(API.UPDATE_TENANT_CURRENT_EMP);
  console.log("postdata===" + JSON.stringify(postData));
  console.log("====================================");

  try {
    let response = yield call(_apiCall, API.UPDATE_TENANT_CURRENT_EMP, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log("Received headerResponse addUpdateTenantEmployment API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data addUpdateTenantEmployment API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.UPDATE_TENANT_CURRENT_EMP_ACTION,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//getTenantPersonalReference
function* getTenantPersonalReference(action) {
  var postData = action.data;

  console.log("======getTenantPersonalReference=========");
  console.log(API.GET_TENANT_PERSONAL_REF);
  console.log("postdata===" + JSON.stringify(postData));
  console.log("====================================");

  try {
    let response = yield call(_apiCall, API.GET_TENANT_PERSONAL_REF, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log("Received headerResponse getTenantPersonalReference API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data getTenantPersonalReference API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.GET_TENANT_PERSONAL_REF_ACTION,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//addUpdateTenantPersonalReference
function* addUpdateTenantPersonalReference(action) {
  var postData = action.data;

  console.log("======addUpdateTenantPersonalReference=========");
  console.log(API.UPDATE_TENANT_PERSONAL_REF);
  console.log("postdata===" + JSON.stringify(postData));
  console.log("====================================");

  try {
    let response = yield call(_apiCall, API.UPDATE_TENANT_PERSONAL_REF, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log(
      "Received headerResponse addUpdateTenantPersonalReference API: "
    );
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data addUpdateTenantPersonalReference API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.UPDATE_TENANT_PERSONAL_REF_ACTION,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//getTenantPreviousEmployment
function* getTenantPreviousEmployment(action) {
  var postData = action.data;

  console.log("======getTenantPreviousEmployment=========");
  console.log(API.GET_TENANT_PREVIOUS_EMP);
  console.log("postdata===" + JSON.stringify(postData));
  console.log("====================================");

  try {
    let response = yield call(_apiCall, API.GET_TENANT_PREVIOUS_EMP, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log("Received headerResponse getTenantPreviousEmployment API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data getTenantPreviousEmployment API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.GET_TENANT_PREVIOUS_EMP_ACTION,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//addUpdateTenantEmployment
function* addUpdateTenantPreEmployment(action) {
  var postData = action.data;

  console.log("======addUpdateTenantEmployment=========");
  console.log(API.UPDATE_TENANT_CURRENT_EMP);
  console.log("postdata===" + JSON.stringify(postData));
  console.log("====================================");

  try {
    let response = yield call(_apiCall, API.UPDATE_TENANT_CURRENT_EMP, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log("Received headerResponse addUpdateTenantEmployment API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data addUpdateTenantEmployment API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.UPDATE_TENANT_PREVIOUS_EMP_ACTION,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//getTenantIdentificationDocu
function* getTenantIdentificationDocu(action) {
  var postData = action.data;

  console.log("======getTenantIdentificationDocu=========");
  console.log(API.GET_TENANT_IDENT_DOCUMENT);
  console.log("postdata===" + JSON.stringify(postData));
  console.log("====================================");

  try {
    let response = yield call(_apiCall, API.GET_TENANT_IDENT_DOCUMENT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log("Received headerResponse getTenantIdentificationDocu API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data getTenantIdentificationDocu API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.GET_TENANT_IDENT_DOCUMENT_ACTION,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//deleteIdentityDocument
function* deleteIdentityDocument(action) {
  var postData = action.data;

  console.log("======deleteIdentityDocument=========");
  console.log(API.DELETE_TENANT_IDENT_DOCUMENT);
  console.log("postdata===" + JSON.stringify(postData));
  console.log("====================================");

  try {
    let response = yield call(_apiCall, API.DELETE_TENANT_IDENT_DOCUMENT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log("Received headerResponse deleteIdentityDocument API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data deleteIdentityDocument API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.DELETE_TENANT_IDENT_DOCUMENT_ACTION,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//getWeatherUpdates
function* getWeatherUpdates(action) {
  var postData = action.data;

  //e8716555ec3f922f07617483c5fd37e9

  var serviceName =
    "http://api.openweathermap.org/data/2.5/forecast?lat=" +
    postData.lat +
    "&lon=" +
    postData.long +
    "&APPID=e8716555ec3f922f07617483c5fd37e9";

  console.log("======getWeatherUpdates=========");
  console.log(serviceName);
  console.log("====================================");

  try {
    let response = yield call(_apiCall, serviceName, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log("Received headerResponse getWeatherUpdates API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data getWeatherUpdates API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.GET_WEATHER_UPDATES_ACTION,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//getTenantBidDetails
function* getTenantBidDetails(action) {
  var postData = action.data;

  console.log("======getTenantBidDetails=========");
  console.log(API.GET_TENANT_BIDDING_DETAILS);
  console.log("postdata===" + JSON.stringify(postData));
  console.log("====================================");

  try {
    let response = yield call(_apiCall, API.GET_TENANT_BIDDING_DETAILS, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log("Received headerResponse getTenantBidDetails API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data getTenantBidDetails API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.GET_TENANT_BID_DETAILS_ACTION,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//getTopBiddingDetails
function* getTopBiddingDetails(action) {
  var postData = action.data;

  // var serviceURL = API.GET_TOP_BIDDING_DETAILS+'?AuctionId='+action.data;
  var serviceURL =
    API.GET_TOP_BIDDING_DETAILS +
    "?PropertyInfoId=" +
    action.data.PropertyInfoId +
    "&userId=" +
    action.data.userId;

  console.log("======getTopBiddingDetails=========");
  console.log(serviceURL);
  console.log("postdata===" + JSON.stringify(postData));
  console.log("====================================");

  try {
    let response = yield call(_apiCall, serviceURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log("Received headerResponse getTopBiddingDetails API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data getTopBiddingDetails API: ");
    console.log(JSON.stringify(responseData.data));

    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.GET_TOP_BIDDING_DETAILS_ACTION,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//cancelBid
function* cancelBid(action) {
  var postData = action.data;

  console.log("======cancelBid=========");
  console.log(API.CANCEL_BID);
  console.log("postdata===" + JSON.stringify(postData));
  console.log("====================================");

  try {
    let response = yield call(_apiCall, API.CANCEL_BID, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log("Received headerResponse cancelBid API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data cancelBid API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.CANCEL_BID_ACTION,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//saveResumepdf
function* saveResumepdf(action) {
  var postData = action.data;

  console.log("======saveResumepdf=========");
  console.log(API.SAVE_RENTAL_RESUME_PDF);
  console.log("postdata===" + JSON.stringify(postData));
  console.log("====================================");

  try {
    let response = yield call(_apiCall, API.SAVE_RENTAL_RESUME_PDF, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log("Received headerResponse saveResumepdf API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data saveResumepdf API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.SAVE_RENTAL_RESUME_PDF_ACTION,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//changePassword
function* changePassword(action) {
  var postData = action.data;

  console.log("======changePassword=========");
  console.log(API.CHANGE_PASSWORD);
  console.log("postdata===" + JSON.stringify(postData));
  console.log("====================================");

  try {
    let response = yield call(_apiCall, API.CHANGE_PASSWORD, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log("Received headerResponse changePassword API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data changePassword API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.CHANGE_PASSWORD_ACTION,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//getBidUserDetails
function* getBidUserDetails(action) {
  var serviceURL = API.GET_BID_USER_DETAILS + "?AuctionId=" + action.data;

  console.log("======getBidUserDetails=========");
  console.log(serviceURL);
  console.log("====================================");

  try {
    let response = yield call(_apiCall, serviceURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log("Received headerResponse getBidUserDetails API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data getBidUserDetails API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.GET_BID_USER_DETAILS_ACTION,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//getMyTransactions
function* getTransactions(action) {
  var postData = action.data;

  console.log("======getTransactions=========");
  console.log(API.GET_TRANSACTIONS);
  console.log("postdata===" + JSON.stringify(postData));
  console.log("====================================");

  try {
    let response = yield call(_apiCall, API.GET_TRANSACTIONS, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log("Received headerResponse getTransactions API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data getTransactions API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.GET_TRANSACTIONS,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//getBidTenantDetails
function* getBidTenantDetails(action) {
  var postData = action.data;

  console.log("======getBidTenantDetails=========");
  console.log(API.GET_BID_TENANT_DETAILS);
  console.log("postdata===" + JSON.stringify(postData));
  console.log("====================================");

  try {
    let response = yield call(_apiCall, API.GET_BID_TENANT_DETAILS, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log("Received headerResponse getBidTenantDetails API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data getBidTenantDetails API: ");
    console.log(JSON.stringify(responseData.data));
    // alert(JSON.stringify(responseData.data))
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.GET_BID_TENANT_DETAILS,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

//getPropertyInspections
function* getInspections(action) {
  var postData = action.data;
  console.log("======getInspections=========");
  console.log(API.GET_INSPECTIONS);
  console.log("postdata===" + JSON.stringify(postData));
  console.log("====================================");
  try {
    let response = yield call(_apiCall, API.GET_INSPECTIONS, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
    var responseJSON = yield call(_extJSON, response.res_json);
    var responseData = {
      data: responseJSON,
      headerResponse: response.res
    };
    console.log("**************************************************");
    console.log("Received headerResponse getInspections API: ");
    console.log(JSON.stringify(responseData.headerResponse));
    console.log("Received data getInspections API: ");
    console.log(JSON.stringify(responseData.data));
    console.log("**************************************************");
    yield put({
      type: ACTION_TYPES.GET_INSPECTIONS,
      payload: responseData
    });
  } catch (e) {
    console.log("Error: " + e);
  }
}

function* rootSaga() {
  yield takeLatest(API_CONST.N_REGISTER_USER, registerUser);

  yield takeLatest(API_CONST.N_GET_TOKEN, getToken);

  yield takeLatest(API_CONST.N_GET_EXT_TOKEN, getExternalLogins);

  yield takeLatest(API_CONST.N_LOGGED_IN_USER_DETAIL, getLoggedInUserDetails);

  yield takeLatest(API_CONST.N_INDOOR_FEATURE_LIST, getIndoorFeatureList);

  yield takeLatest(API_CONST.N_INDOOR_FEATURE_LIST, getOutdoorFeatureList);

  yield takeLatest(API_CONST.N_SAVE_SEARCH_PROPERTY, saveSearchProperty);

  yield takeLatest(
    API_CONST.N_GET_SAVED_SEARCH_PROPERTY,
    getSavedSearchProperty
  );

  yield takeLatest(API_CONST.N_PROPERTY_INFO_BYSEARCH, getPropertyInfoBySearch);

  yield takeLatest(API_CONST.N_SAVE_FAV_PROPERTY, saveFavouriteProperty);

  yield takeLatest(API_CONST.N_GET_PROPERTY_DETAILS, getPropertyDetails);

  yield takeLatest(
    API_CONST.N_SAVE_FAV_PROPERTY_DETAIL,
    saveFavouritePropertyDetail
  );

  yield takeLatest(API_CONST.N_GET_RENTAL_RESUME_STATES, getRentalResumeStates);

  yield takeLatest(API_CONST.N_GET_STATE_LIST, getStatesList);

  yield takeLatest(API_CONST.N_GET_COUNTRY_LIST, getCountryList);

  yield takeLatest(API_CONST.N_GET_TENANT_DETAILS, getTenantDetails);

  yield takeLatest(API_CONST.N_UPDATE_TENANT_DETAILS, updateTenantDetails);

  yield takeLatest(
    API_CONST.N_GET_TENANT_RESIDENT_INFO,
    getTenantResidentsInfo
  );

  yield takeLatest(
    API_CONST.N_UPDATE_TENANT_RESIDENT_INFO,
    addUpdateTenantResidentsInfo
  );

  yield takeLatest(API_CONST.N_GET_TENANT_PETS_INFO, getTenantPetsInfo);

  yield takeLatest(
    API_CONST.N_UPDATE_TENANT_PETS_INFO,
    addUpdateTenantPetsInfo
  );

  yield takeLatest(
    API_CONST.N_DELETE_CO_APPLICANT_INFO,
    deleteCoAppliocantInfo
  );

  yield takeLatest(API_CONST.N_DELETE_TENANT_PETS_INFO, deletePetInfo);

  yield takeLatest(
    API_CONST.N_GET_TENANT_CURRENT_RES_INFO,
    getTenantCurrentResidential
  );

  yield takeLatest(
    API_CONST.N_UPDATE_TENANT_CURRENT_RES_INFO,
    addUpdateTenantCurrentResidential
  );

  yield takeLatest(
    API_CONST.N_GET_TENANT_PRE_RES_INFO,
    getTenantPreviousResidential
  );

  yield takeLatest(
    API_CONST.N_UPDATE_TENANT_PRE_RES_INFO,
    addUpdateTenantPreviousResidential
  );

  yield takeLatest(
    API_CONST.N_GET_TENANT_CURRENT_EMP,
    getTenantCurrentEmployment
  );

  yield takeLatest(
    API_CONST.N_UPDATE_TENANT_CURRENT_EMP,
    addUpdateTenantEmployment
  );

  yield takeLatest(
    API_CONST.N_GET_TENANT_PERSONAL_REF,
    getTenantPersonalReference
  );

  yield takeLatest(
    API_CONST.N_UPDATE_TENANT_PERSONAL_REF,
    addUpdateTenantPersonalReference
  );

  yield takeLatest(
    API_CONST.N_GET_TENANT_PREVIOUS_EMP,
    getTenantPreviousEmployment
  );

  yield takeLatest(
    API_CONST.N_UPDATE_TENANT_PREVIOUS_EMP,
    addUpdateTenantPreEmployment
  );

  yield takeLatest(
    API_CONST.N_GET_TENANT_IDENT_DOCUMENT,
    getTenantIdentificationDocu
  );

  yield takeLatest(
    API_CONST.N_DELETE_TENANT_IDENT_DOCUMENT,
    deleteIdentityDocument
  );

  yield takeLatest(API_CONST.N_GET_WEATHER_UPDATES, getWeatherUpdates);

  yield takeLatest(API_CONST.N_UPLOAD_TENANT_IDENTITY_DOC, uploadMyFileDoc);

  yield takeLatest(API_CONST.N_GET_TENANT_BID_DETAILS, getTenantBidDetails);

  yield takeLatest(API_CONST.N_GET_TOP_BIDDING_DETAILS, getTopBiddingDetails);

  yield takeLatest(API_CONST.N_CANCEL_BID, cancelBid);

  yield takeLatest(API_CONST.N_SAVE_RENTAL_RESUME_PDF, saveResumepdf);

  yield takeLatest(API_CONST.N_CHANGE_PASSWORD, changePassword);

  yield takeLatest(API_CONST.N_GET_BID_USER_DETAILS, getBidUserDetails);

  yield takeLatest(API_CONST.N_GET_TRANSACTIONS, getTransactions);

  yield takeLatest(API_CONST.N_GET_BID_TENANT_DETAILS, getBidTenantDetails);

  yield takeLatest(API_CONST.N_GET_INSPECTIONS, getInspections);
}
export default rootSaga;
