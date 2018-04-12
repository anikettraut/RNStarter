import ACTION_TYPES from '../../../Action/ActionsType';
import API from '../../../Constants/APIUrls';

// export const getTenantPreviousResidential = (postData) => {

//   console.log('===========getTenantPreviousResidential==============');
//   console.log(API.GET_TENANT_PRE_RES_INFO);  
//   console.log('postdata==='+JSON.stringify(postData));
//   console.log('===============================================');  

//   var serviceHeaderResponse = {};

//   return (dispatch) => {

//     //call the API and use the promise to check the response
//     // in response callBack .then() call the dispatcher.

//     fetch(API.GET_TENANT_PRE_RES_INFO, {
//       method: 'POST',
//       headers: {
//         'Accept'        : 'application/json',
//         'Content-Type'  : 'application/json',                
//       },
//       body: JSON.stringify(postData)
//     })
//     .then( (response) => {
//       console.log('*********************************************');
//       console.log('Received response getTenantPreviousResidential API: ', response);
//       console.log('*********************************************');
//       serviceHeaderResponse = response;
//       return response.json();
//     })
//     .then( (responseJSON) => {
//       console.log('*********************************************');
//       console.log('JSON response from getTenantPreviousResidential API: ', responseJSON);
//       console.log('*********************************************');
//       var responseData ={
//         data : responseJSON,
//         headerResponse : serviceHeaderResponse 
//       }
//       dispatch({
//         type      : ACTION_TYPES.GET_TENANT_PRE_RES_INFO_ACTION,
//         payload   : responseData
//       });

//     })
//     .catch(e => {
//       console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
//       console.log('Error: '+e);
//       console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

//     });
//   }

// };

// export const addUpdateTenantPreviousResidential = (postData) => {

//   console.log('===========addUpdateTenantPreviousResidential==============');
//   console.log(API.UPDATE_TENANT_PRE_RES_INFO);  
//   console.log('postdata==='+JSON.stringify(postData));
//   console.log('===============================================');  

//   var serviceHeaderResponse = {};

//   return (dispatch) => {

//     //call the API and use the promise to check the response
//     // in response callBack .then() call the dispatcher.

//     fetch(API.UPDATE_TENANT_PRE_RES_INFO, {
//       method: 'POST',
//       headers: {
//         'Accept'        : 'application/json',
//         'Content-Type'  : 'application/json',                
//       },
//       body: JSON.stringify(postData)
//     })
//     .then( (response) => {
//       console.log('*********************************************');
//       console.log('Received response addUpdateTenantPreviousResidential API: ', response);
//       console.log('*********************************************');
//       serviceHeaderResponse = response;
//       return response.json();
//     })
//     .then( (responseJSON) => {
//       console.log('*********************************************');
//       console.log('JSON response from addUpdateTenantPreviousResidential API: ', responseJSON);
//       console.log('*********************************************');
//       var responseData ={
//       	data : responseJSON,
//       	headerResponse : serviceHeaderResponse 
//       }
//       dispatch({
//         type      : ACTION_TYPES.UPDATE_TENANT_PRE_RES_INFO_ACTION,
//         payload   : responseData
//       });

//     })
//     .catch(e => {
//       console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
//       console.log('Error: '+e);
//       console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

//     });
//   }

// };

export const clearGetTenantPreviousResidentialResponse = () => ({
  type: ACTION_TYPES.CLEAR_GET_TENANT_PRE_RES_INFO_ACTION
});

export const clearAddUpdateTenantPreviousResidentialResponse = () => ({
  type: ACTION_TYPES.CLEAR_UPDATE_TENANT_PRE_RES_INFO_ACTION
});
